import {
    config,
    drawImgInBall,
    explosiveRadId,
    height,
    radNum,
    rainbow,
    rockRadId,
    scale,
    sqrtOf2Sqr,
    width
} from "../context";


export class Ball {
    constructor(x, y, radius, color, xSpeed, ySpeed, imgId, spinSpeed) {
        this.imgId = imgId || rockRadId(7);
        this.spinSpeed = spinSpeed === 0 ? 0 : (spinSpeed || config.asteroid.spin);
        this.isExist = true;
        this.x = x || width / 2;
        this.y = y || height / 2;
        this.color = color || rainbow(Math.random());
        this.radius = scale(radius || radNum(config.asteroid.maxSize, config.asteroid.minSize));
        this.xSpeed = scale(xSpeed || radNum(config.asteroid.maxSpeed, config.asteroid.minSpeed));
        this.ySpeed = scale(ySpeed || radNum(config.asteroid.maxSpeed, config.asteroid.minSpeed));
        this.angle = 0;
        this.damage = this.radius * config.asteroid.damagePerRadius;
    }

    increaseAngle(n) {
        this.angle = this.angle + n;
        if (this.angle >= 360) {
            this.angle = 0;
        }
    };

    makeAMove() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.spinSpeed) {
            this.increaseAngle(sqrtOf2Sqr(this.xSpeed, this.ySpeed) * this.spinSpeed);
        }
    };

    relocate(x, y, distance) {
        const maxDistance = this.radius + distance;
        const realDistance = sqrtOf2Sqr(this.x - x, this.y - y);
        if (maxDistance > realDistance) {
            this.x = (this.x - x) * (maxDistance / realDistance) + x;
            this.y = (this.y - y) * (maxDistance / realDistance) + y;
        }
    };

    toEdge() {
        if (this.x <= this.radius) {
            this.x = this.radius;
            this.xSpeed *= -1;

        } else if (this.x >= (width - this.radius)) {
            this.x = width - this.radius;
            this.xSpeed *= -1;

        } else if (this.y <= this.radius) {
            this.y = this.radius;
            this.ySpeed *= -1;
        } else if (this.y >= (height - this.radius)) {
            this.y = height - this.radius;
            this.ySpeed *= -1;
        }
    };

    toBall(otherBall) {
        for (const ball of otherBall) {
            const ballMaxDistance = ball.radius + this.radius;
            const ballRealDistance = sqrtOf2Sqr(ball.x - this.x, ball.y - this.y);
            if (ballRealDistance !== 0) {
                if (ballMaxDistance > ballRealDistance) {
                    this.relocate(ball.x, ball.y, ball.radius);
                }
                if (ballMaxDistance >= ballRealDistance) {
                    const thisXSpeedAfter =
                      ((this.radius - ball.radius) * this.xSpeed
                       + 2 * ball.radius * ball.xSpeed) / ballMaxDistance;
                    const thisYSpeedAfter =
                      ((this.radius - ball.radius) * this.ySpeed
                       + 2 * ball.radius * ball.ySpeed) / ballMaxDistance;
                    const ballXSpeedAfter =
                      ((ball.radius - this.radius) * ball.xSpeed
                       + 2 * this.radius * this.xSpeed) / ballMaxDistance;
                    const ballYSpeedAfter =
                      ((ball.radius - this.radius) * ball.ySpeed
                       + 2 * this.radius * this.ySpeed) / ballMaxDistance;
                    this.xSpeed = thisXSpeedAfter;
                    this.ySpeed = thisYSpeedAfter;
                    ball.xSpeed = ballXSpeedAfter;
                    ball.ySpeed = ballYSpeedAfter;

                }

            }
        }
    };

    toObj(obj) {
        const ballMaxDistance = this.radius + obj.radius;
        const ballRealDistance = sqrtOf2Sqr(this.x - obj.x, this.y - obj.y);
        if (ballRealDistance !== 0) {
            if (ballRealDistance < ballMaxDistance) {
                this.relocate(obj.x, obj.y, obj.radius);
            }
            if (ballRealDistance <= ballMaxDistance) {
                this.xSpeed *= -1;
                this.ySpeed *= -1;
                return true;
            }
        }

    };

    toArrOfObj(otherBall) {
        for (let i = 0; i < otherBall.length; i++) {
            const ballMaxDistance = otherBall[i].radius + this.radius;
            const ballRealDistance = sqrtOf2Sqr(otherBall[i].x - this.x, otherBall[i].y - this.y);
            if (ballMaxDistance >= ballRealDistance) {
                return i;
            }
        }
        return -1;
    }

    remove(balls) {
        this.isExist = false;
        for (let i = 0; i < balls.length; i++) {
            if (!balls[i].isExist) {
                balls.splice(i, 1);
            }
        }
    };

    explore(balls) {
        this.remove(balls);
        const numberOfChild = radNum(config.asteroid.maxNumberOfChild, config.asteroid.minNumberOfChild);
        if (numberOfChild && this.canExploreToSmaller()) {
            for (let j = 0; j < numberOfChild; j++) {
                balls.push(new Ball(this.x, this.y, this.radius * config.asteroid.childrenSizeRatio, this.color, undefined, undefined, this.imgId));
            }
        }
    };

    canExploreToSmaller() {
        return this.radius > config.asteroid.minimalSizeCanSplit;
    };

    spawn(balls, n = 1) {
        for (let i = 0; i < n; i++) {
            balls.push(new Ball(this.x, this.y, undefined, this.color));
        }
    };

    makeExplosive(containerArr, time) {
        if (radNum(1, 0)) {
            containerArr.push(new ExplosiveBall(this.x, this.y, this.radius * 2, "explosive0", time));
            containerArr.push(new ExplosiveBall(this.x, this.y, this.radius * 1.2, undefined, time));
        } else if (radNum(1, 0)) {
            containerArr.push(new ExplosiveBall(this.x, this.y, this.radius * 2, undefined, time));
        } else {
            containerArr.push(new ExplosiveBall(this.x, this.y, this.radius * 3.5, "explosive4", time));
            containerArr.push(new ExplosiveBall(this.x, this.y, this.radius * 1, undefined, time));
        }
    };

}

export class ExplosiveBall extends Ball {
    constructor(x, y, radius, imgId, time) {
        super(x, y, radius, "yellow", 0.2, 0.2);
        this.imgId = imgId || explosiveRadId(4);
        this.count = time * 50 || 50;
    }

    drawExplosive(containerArr) {
        if (this.count > 0) {
            drawImgInBall(this, false);
            this.count -= 1;
        } else {
            this.remove(containerArr);
        }
    }
}
