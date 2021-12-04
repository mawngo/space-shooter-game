class Ship extends Ball {
    constructor(x, y, speed, health, color, imgId) {
        super(x, y, 20, color, 0.2, 0.2);
        this.imgId = imgId || "ship";
        this.speed = speed || 5;
        this.health = health || 100;
        this.totalAmmo = [];
    }


    shoot(ammos, angle = this.angle, imgId, size) {
        let ammosXSpeed = 10 * Math.cos((angle - 90) * Math.PI / 180);
        let ammosYSpeed = 10 * Math.sin((angle - 90) * Math.PI / 180);
        ammos.push(new Ammo(this.x, this.y, ammosXSpeed, ammosYSpeed, imgId, size));
        this.health += 20;
    };

    moveLeft() {
        if (this.xSpeed >= 0) {
            this.xSpeed = -1 * this.speed;
            this.ySpeed = 0;
        }
    };

    moveRight() {
        if (this.xSpeed <= 0) {
            this.xSpeed = this.speed;
            this.ySpeed = 0;
        }
    };

    moveUp() {
        if (this.ySpeed >= 0) {
            this.ySpeed = -1 * this.speed;
            this.xSpeed = 0;
        }
    };

    moveDown() {
        if (this.ySpeed <= 0) {
            this.ySpeed = this.speed;
            this.xSpeed = 0;
        }
    };
}
