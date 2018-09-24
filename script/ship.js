let Ship = function (x, y, speed, health, color, imgId) {
    this.originType = Ball;
    this.originType.call(this, x, y, 20, color, 0.2, 0.2);
    this.imgId = imgId || "heroship";
    this.speed = speed || 5;
    this.health = health || 100;
    this.isEnemy = false;
    this.totalAmmo = [];


    this.shoot = function (ammos, angle = this.angle, imgId, size) {
        let ammosXSpeed = 10 * Math.cos((angle - 90) * Math.PI / 180);
        let ammosYSpeed = 10 * Math.sin((angle - 90) * Math.PI / 180);
        ammos.push(new Ammo(this.x, this.y, ammosXSpeed, ammosYSpeed, imgId, size));
        this.health +=20;
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