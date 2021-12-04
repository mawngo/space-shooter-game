import { Ball } from './ball';
import { Ammo } from './items';
import { config } from '../config';

export class Ship extends Ball {
    constructor(x, y, speed, health, color, imgId) {
        super(x, y, 20, color, 0.2, 0.2);
        this.color = color || 'white';
        this.imgId = imgId || 'ship';
        this.speed = speed || config.ship.speed;
        this.health = health || config.ship.health;
        this.spinSpeed = config.ship.spin;
        this.totalAmmo = [];
    }


    shoot(ammos, angle = this.angle, imgId, size) {
        let ammosXSpeed = config.ammo.speed * Math.cos((angle - 90) * Math.PI / 180);
        let ammosYSpeed = config.ammo.speed * Math.sin((angle - 90) * Math.PI / 180);
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


export class Spawner extends Ball {
    constructor() {
        super(undefined, undefined, 100, undefined, 0, 0, 'planet');
    }
}
