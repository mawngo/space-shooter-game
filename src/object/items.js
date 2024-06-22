import { Ball } from "./ball";
import { config } from "../context";

export class Ammo extends Ball {
    constructor(x, y, xSpeed, ySpeed, imgId, size) {
        super(x, y, size || config.ammo.size, "green", xSpeed, ySpeed);
        this.imgId = imgId || "ammo0";
        this.damage = config.ammo.damage;
    }
}

export class Item extends Ball {
    constructor(x, y, imgId, size = 25) {
        super(x, y, size, "blue", 0.5, 0.5);
        this.imgId = imgId || "item0";
    }

    doFunc(obj) {
        switch (this.imgId) {
            case "item0":
                for (let i = 0; i < config.items.item0.amount; i++) {
                    obj.totalAmmo.push(new Ammo(obj.x, obj.y, 1, 1, "ammo1", 30));
                }
                break;
            case "item1":
                obj.health += config.items.item1.heal;
                break;
            case "item2":
                for (let i = 0; i < config.items.item2.amount; i++) {
                    obj.totalAmmo.push(new Ammo(obj.x, obj.y, 1, 1, "ammo2", 30));
                }
                break;
            case "item3":
                for (let i = 0; i < config.items.item3.amount; i++) {
                    obj.totalAmmo.push(new Ammo(obj.x, obj.y, 1, 1, "ammo3", 30));
                }
                break;
        }
    }
}
