let Ammo = function (x, y, xSpeed, ySpeed, imgId, size = 25) {
    this.super = Ball;
    this.super.call(this, x, y, size, "green", xSpeed, ySpeed);
    this.imgId = imgId || "ammo0";
    this.damage = 10;

};
let Item = function (x, y, imgId, size = 25) {
    this.super = Ball;
    this.super.call(this, x, y, size, "blue", 0.5, 0.5);
    this.imgId = imgId || "item0";

    this.doFunc = function (obj) {
        switch (this.imgId) {
            case "item0":
                for (let i = 0; i < 10; i++) {
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
};

function ammoRemoval(ammos) {
    let i = 0;
    for (let ammo of ammos) {
        if (ammo.x > canvas.width || ammo.y > canvas.height) {
            ammos.splice(i, 1);
        }
        if (ammo.x < 0 || ammo.y < 0) {
            ammos.splice(i, 1);
        }
        i++;
    }
}