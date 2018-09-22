rockGenerator(3);
ammoGenerator(2);
itemsGenerator(2);





let Game = function () {
    this.items = [];
    this.ship = new Ship(1200, 800, 5, 100, "white");
    this.spawner = new Ball(undefined, undefined, 80, undefined, 0, 0, "planet");
    this.balls = [];
    this.ammos = [];
    this.spammos = [];
    this.itemstate = function () {
        for (let item of this.items) {
            item.toEdge();
            if (item.toObj(this.ship)) {
                item.doFunc(this.ship);
                item.remove(this.items);
            }
            item.makeAMove();
            drawImgInBall(item);
        }
    };
    this.spammostate1 = function () {
        for (let ammo of this.spammos) {
            if (ammo.toObj(this.ship) && ammo.imgId === "ammo1") {
                this.ship.health -= ammo.damage;
            }
            ammo.makeAMove();
            drawImgInBall(ammo);
        }
    };
    this.spammostate2 = function () {
        for (let ammo of this.spammos) {
            if (ammo.toObj(this.ship) && ammo.imgId === "ammo2") {
                ammo.toEdge();
                ammo.toObj(this.spawner);
                this.ship.health += 10;
                console.log(this.ship.health);
            }
            ammo.makeAMove();
            drawImgInBall(ammo);
        }
    };

    this.ammostate = function () {
        for (let ammo of this.ammos) {
            ammo.toEdge();
            ammo.toObj(this.spawner);
            if (ammo.toObj(this.ship)) {
                this.ship.health -= ammo.damage;
                console.log(this.ship.health)
            }
            if (ammo.toArrOfObj(this.balls) >= 0) {
                let exball = this.balls[ammo.toArrOfObj(this.balls)];
                if (radNum(1, 0)) {
                    if (exball.radius / 2 > 10) {
                        exball.explore(this.balls, 2);
                        ammo.remove(this.ammos);
                    }
                    else {
                        if (radNum(3, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y));
                            exball.remove(this.balls);
                        }
                        if (radNum(2, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y, "item1"));
                            exball.remove(this.balls);
                        }
                        if (radNum(0, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y, "item2"));
                            exball.remove(this.balls);
                        }
                    }
                } else {
                    ammo.toBall(this.balls);
                }
            }
            ammo.makeAMove();
        }
    };

    this.ballstate = function () {
        for (let ball of this.balls) {
            ball.toEdge();
            ball.toObj(this.spawner);
            if (ball.toObj(this.ship)) {
                ball.explore(this.balls, 2);
                this.ship.health -= ball.damage;
                console.log(this.ship.health);
            }
            if (ball.toArrOfObj(this.ammos) >= 0) {
                if (radNum(1, 0)) {
                    this.ammos[ball.toArrOfObj(this.ammos)].remove(this.ammos);
                    if (ball.radius / 2 > 10) {
                        ball.explore(this.balls, 2);
                    } else {
                        if (radNum(3, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y));
                            ball.remove(this.balls);
                        }
                        if (radNum(2, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y, "item1"));
                            ball.remove(this.balls);
                        }
                        if (radNum(0, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y, "item2"));
                            ball.remove(this.balls);
                        }
                    }
                } else {
                    ball.toBall(this.ammos);
                }
            }
            if (ball.toArrOfObj(this.spammos) >= 0) {
                ball.remove(this.balls)
            }
            ball.toBall(this.balls);
            ball.makeAMove();
        }
    };
    this.drawBall = function () {
        for (let ball of this.balls) {
            drawImgInBall(ball)
        }
    };
    this.drawAmmo = function () {
        for (let ammo of this.ammos) {
            drawImgInBall(ammo, true)
        }
    };
    this.shipstate = function () {
        if (this.ship.health <= 0) {
            alert("you lose!")
        }
        this.ship.toObj(this.spawner);
        this.ship.toEdge();
        this.ship.makeAMove();
    }


};
let game = new Game();

function gameplay() {
    canvasClean();
    drawBackGround();
    drawImgInBall(game.spawner, true);
    game.spammostate1();
    game.spammostate2();
    game.ammostate();
    game.ballstate();
    game.shipstate();
    game.itemstate();
    game.drawAmmo();
    game.drawBall();
    drawImgInBall(game.ship, true);

    setTimeout(gameplay, 20);
}

function spawnBalls() {
    game.spawner.spawn(game.balls);
    game.spawner.color = rainbow(Math.random());
    setTimeout(spawnBalls, 20000);
}

gameplay();
spawnBalls();
window.addEventListener("keydown", function (evt) {
    console.log(evt.key);
    switch (evt.key) {
        case "ArrowRight":
            game.ship.moveRight();
            break;
        case "ArrowLeft":
            game.ship.moveLeft();
            break;
        case"ArrowUp":
            game.ship.moveUp();
            break;
        case "ArrowDown":
            game.ship.moveDown();
            break;
        case "a":
            if (game.ship.totalAmmo.length > 0) {
                let ammo = game.ship.totalAmmo.pop();
                game.ship.shoot(game.spammos, this.angle, ammo.imgId, 10);
            }
            break;
        case "s":
            game.ship.shoot(game.ammos, this.angle, "ammo0");
            break;
    }
});

