let Ship = function (x, y, speed, color) {
    this.originType = Ball;
    this.originType.call(this, x, y, 30, color, 0.1, 0.1);
    this.speed = speed || 1;
    this.angle = 0;


    this.increaseAngle = function () {
        this.angle += 0.5;
        if (this.angle === 360) {
            this.angle = 0;
        }
    };

    this.moveLeft = function () {
        if (this.xSpeed >= 0) {
            this.xSpeed = -1 * this.speed;
            this.ySpeed = 0;
        }
    };
    this.moveRight = function () {
        if (this.xSpeed <= 0) {
            this.xSpeed = this.speed;
            this.ySpeed = 0;
        }
    };
    this.moveUp = function () {
        if (this.ySpeed >= 0) {
            this.ySpeed = -1 * this.speed;
            this.xSpeed = 0;
        }
    };
    this.moveDown = function () {
        if (this.ySpeed <= 0) {
            this.ySpeed = this.speed;
            this.xSpeed = 0;
        }
    };

};