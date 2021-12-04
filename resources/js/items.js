class Ammo extends Ball {
    constructor(x, y, xSpeed, ySpeed, imgId, size = 25) {
        super(x, y, size, "green", xSpeed, ySpeed);
        this.imgId = imgId || "ammo0";
        this.damage = 10;
    }
}

class Item extends Ball {
    constructor(x, y, imgId, size = 25) {
        super(x, y, size, "blue", 0.5, 0.5);
        this.imgId = imgId || "item0";
    }

    doFunc(obj) {
        switch (this.imgId) {
            case "item0":
                for (let i = 0; i < 3; i++) {
                    obj.totalAmmo.push(new Ammo(obj.x, obj.y, 1, 1, "ammo1", 30));
                }
                break;
            case "item1":
                obj.health += 20;
                break;
            case "item2":
                obj.totalAmmo.push(new Ammo(obj.x, obj.y, 1, 1, "ammo2", 30));
                break;
            case "item3":
                obj.totalAmmo.push(new Ammo(obj.x, obj.y, 1, 1, "ammo3", 30));
                break;
        }
    }
}
