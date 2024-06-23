import { Ball } from "./ball";
import { Ammo } from "./items";
import { config } from "../context";

export class Ship extends Ball {
    constructor(x, y, speed, health, color, imgId) {
        super(x, y, config.ship.size, color, 0.2, 0.2);
        this.color = color || "white";
        this.imgId = imgId || "ship";
        this.speed = speed || config.ship.speed;
        this.health = health || config.ship.health;
        this.spinSpeed = config.ship.spin;
        this.totalAmmo = [];
    }


    shoot(ammos, angle = this.angle, imgId, size) {
        const xSpeed = config.ammo.speed * Math.cos((angle - 90) * Math.PI / 180);
        const ySpeed = config.ammo.speed * Math.sin((angle - 90) * Math.PI / 180);
        const x = this.x + (this.radius + config.ammo.size + 1) * Math.cos((angle - 90) * Math.PI / 180);
        const y = this.y + (this.radius + config.ammo.size + 1) * Math.sin((angle - 90) * Math.PI / 180);
        ammos.push(new Ammo(x, y, xSpeed, ySpeed, imgId, size));
    };

    moveLeft() {
        if (this.xSpeed >= -this.speed) {
            this.xSpeed = -1 * this.speed;
            this.ySpeed = 0;
        }
    };

    moveRight() {
        if (this.xSpeed <= this.speed) {
            this.xSpeed = this.speed;
            this.ySpeed = 0;
        }
    };

    moveUp() {
        if (this.ySpeed >= -this.speed) {
            this.ySpeed = -1 * this.speed;
            this.xSpeed = 0;
        }
    };

    moveDown() {
        if (this.ySpeed <= this.speed) {
            this.ySpeed = this.speed;
            this.xSpeed = 0;
        }
    };
}


export class Spawner extends Ball {
    constructor() {
        super(undefined, undefined, config.game.spawnerRadius, undefined, 0, 0, "center");
    }
}
