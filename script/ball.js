let Ball = function (x, y, radius, color, xSpeed, ySpeed) {
    this.isExist = true;
    this.x = x || 640;
    this.y = y || 360;
    this.color = color || rainbow(Math.random());
    this.radius = radius || radNum(80, 20);
    this.xSpeed = xSpeed || radNum(10, 0);
    this.ySpeed = ySpeed || radNum(10, 0);


    this.makeAMove = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    };
    this.relocale = function (x, y, distance) {
        let maxDistance = this.radius + distance;
        let realDistance = sqrtOf2Sqr(this.x - x, this.y - y);
        if (maxDistance > realDistance) {
            this.x = (this.x - x) * (maxDistance / realDistance) + x;
            this.y = (this.y - y) * (maxDistance / realDistance) + y;
        }
    };
    this.toEdge = function () {
        if (this.x <= this.radius) {
            this.x = this.radius;
            this.xSpeed *= -1;
        }
        else if (this.x >= (1280 - this.radius)) {
            this.x = 1280 - this.radius;
            this.xSpeed *= -1
        } else if (this.y <= this.radius) {
            this.y = this.radius;
            this.ySpeed *= -1;
        } else if (this.y >= (720 - this.radius)) {
            this.y = 720 - this.radius;
            this.ySpeed *= -1;
        }
    };
    this.toBall = function (otherBall) {
        for (let ball of otherBall) {
            let ballMaxDistance = ball.radius + this.radius;
            let ballRealDistance = sqrtOf2Sqr(ball.x - this.x, ball.y - this.y);
            if (ballRealDistance !== 0) {
                if (ballMaxDistance > ballRealDistance) {
                    this.relocale(ball.x, ball.y, ball.radius);
                }
                if (ballMaxDistance >= ballRealDistance) {
                    let thisXSpeedAfter =
                        ((this.radius - ball.radius) * this.xSpeed
                            + 2 * ball.radius * ball.xSpeed) / ballMaxDistance;
                    let thisYSpeedAfter =
                        ((this.radius - ball.radius) * this.ySpeed
                            + 2 * ball.radius * ball.ySpeed) / ballMaxDistance;
                    let ballXSpeedAfter =
                        ((ball.radius - this.radius) * ball.xSpeed
                            + 2 * this.radius * this.xSpeed) / ballMaxDistance;
                    let ballYSpeedAfter =
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
    this.toObj = function (obj) {
        let ballMaxDistance = this.radius + obj.radius;
        let ballRealDistance = sqrtOf2Sqr(this.x - obj.x, this.y - obj.y);
        if (ballRealDistance !== 0) {
            if (ballRealDistance < ballMaxDistance) {
                this.relocale(obj.x, obj.y, obj.radius);
            }
            if (ballRealDistance <= ballMaxDistance) {
                this.xSpeed *= -1;
                this.ySpeed *= -1;
                return true;
            }
        }

    };


    this.remove = function (balls) {
        this.isExist = false;
        for (let i = 0; i < balls.length; i++) {
            if (balls[i].isExist) {
            }
            else {
                balls.splice(i, 1);
            }
        }
    };
    this.explore = function (balls, n) {
        this.remove(balls);
        if (this.radius/2 > 15) {
            for (let j = 0; j < n; j++) {
                balls.push(new Ball(this.x, this.y, this.radius / 1.5, this.color));
            }

        }
    };
    this.spawn = function (balls, n) {
        for (let i = 0; i < n; i++) {
            balls.push(new Ball(this.x, this.y, undefined, this.color))
        }
    }

};



