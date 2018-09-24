let Game = function () {
    this.score = 0;
    this.items = [];
    this.ship = new Ship(200, 800, 5, 100, "white");
    this.spawner = new Ball(undefined, undefined, 100, undefined, 0, 0, "planet");
    this.balls = [];
    this.ammos = [];
    this.spammos = [];
    this.explosive = [];
    this.itemstate = function () {
        for (let item of this.items) {
            item.toBall(this.items);
            item.toObj(this.spawner);
            item.toEdge();
            if (item.toObj(this.ship)) {
                if (item.imgId === "item4") {
                    this.score += 30;
                }
                item.doFunc(this.ship);
                item.remove(this.items);
            }
            item.makeAMove();
            drawImgInBall(item);
        }
    };
    this.spammostate = function () {
        for (let ammo of this.spammos) {
            if (ammo.toObj(this.ship) && ammo.imgId === "ammo1") {
                this.ship.health -= ammo.damage;
            }
            if (ammo.imgId === "ammo3") {
                for (let ball of this.balls) {
                    ball.makeExplosive(this.explosive)
                }
                for (let ammo of this.ammos) {
                    this.explosive.push(new Explosiveball(ammo.x, ammo.y, ammo.radius / 2, "explosive5", 0.3));
                }
                this.balls = [];
                this.ammos = [];
                this.spammos.pop();
            }
            if (ammo.imgId === "ammo2") {
                ammo.toEdge();
                ammo.toObj(this.spawner);
                if (ammo.toObj(this.ship)) {
                    this.ship.health += 8;
                }
            }
            ammo.makeAMove();
            drawImgInBall(ammo);

        }
    };

    this.ammostate = function () {
        for (let ammo of this.ammos) {
            ammo.toEdge();
            ammo.toObj(this.spawner);
            if(ammo.toObj(this.ship)) {
                this.ship.health -= ammo.damage;
            }
            if (ammo.toArrOfObj(this.balls) >= 0) {
                let exball = this.balls[ammo.toArrOfObj(this.balls)];
                if (radNum(1, 0)) {
                    if (exball.radius / 2 > 10) {
                        exball.explore(this.balls, 2);
                        exball.makeExplosive(this.explosive);
                        ammo.remove(this.ammos);
                        this.score+=5;
                    }
                    else {
                        if (radNum(5, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y));
                        }
                        if (radNum(5, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y, "item1"));
                        }
                        if (radNum(15, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y, "item2"));
                        }
                        if (radNum(20, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y, "item3"));
                        }
                        if (radNum(3, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y, "item4"));
                        }
                        exball.remove(this.balls);
                        exball.makeExplosive(this.explosive, 0.3);
                        this.score+=5;
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
                this.score -=10;
                ball.makeExplosive(this.explosive);
            }
            if (ball.toArrOfObj(this.ammos) >= 0) {
                if (radNum(1, 0)) {
                    this.ammos[ball.toArrOfObj(this.ammos)].remove(this.ammos);
                    ball.makeExplosive(this.explosive);
                    if (ball.radius / 2 > 10) {
                        ball.explore(this.balls, 2);
                        this.score+=5;
                    } else {
                        if (radNum(5, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y));
                        }
                        if (radNum(5, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y, "item1"));
                        }
                        if (radNum(15, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y, "item2"));
                        }
                        if (radNum(25, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y, "item3"));
                        }
                        if (radNum(3, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y, "item4"));
                        }
                        ball.remove(this.balls);
                        ball.makeExplosive(this.explosive, 0.3);
                        this.score+=5;
                    }
                } else {
                    ball.toBall(this.ammos);
                }
            }
            if (ball.toArrOfObj(this.spammos) >= 0) {
                ball.remove(this.balls);
                ball.makeExplosive(this.explosive);
                this.score+=5;
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
            canvasClean();
            drawBackGround();
            setTimeout(function () {
                if (confirm("play again?")) {
                    window.location.reload();
                }
            }, 1000)

        }
        this.ship.toObj(this.spawner);
        this.ship.toEdge();
        this.ship.makeAMove();
    };

    this.displayscore = function (x, y, string = "") {
        ctx.font = "25px Verdana";
        ctx.fillStyle = "white";
        ctx.fillText(string, x, y - 30);
        ctx.fillText("Health " + Math.floor(this.ship.health), x, y);
        ctx.fillText("Items: " + this.ship.totalAmmo.length, x, y + 30);
        ctx.fillText("Score " + this.score, x, y + 80);
    };
    this.drawExplosion = function () {
        for (let e of this.explosive) {
            e.drawExplosive(this.explosive);
        }
    };
    this.combineState = function () {
        this.spammostate();
        this.ammostate();
        this.ballstate();
        this.shipstate();
        this.itemstate();
    }

};
let game = new Game();
let n = 0;
rockGenerator(7);
ammoGenerator(3);
itemsGenerator(4);
explosiveGenerator(5);

score();
gameplay();
harder();
spawnBalls();

function gameplay() {
    canvasClean();
    drawBackGround();
    game.combineState();
    game.drawExplosion();
    game.drawAmmo();
    game.drawBall();
    drawImgInBall(game.spawner, true);
    drawImgInBall(game.ship, true);
    game.displayscore(15, 60,"stage: "+n);
    if (game.ship.health > 0) {
        setTimeout(gameplay, 20);
    }
    else {
        drawImgInBall(game.ship, false, "explosive1")
    }
}
function harder() {
    n++;
    setTimeout(harder, 90000)
}
function spawnBalls() {
    game.spawner.spawn(game.balls, n);
    game.spawner.color = rainbow(Math.random());
    setTimeout(spawnBalls, 15000);
}
function score() {
    game.score += n + Math.floor((game.balls.length+game.ammos.length)/10);
    setTimeout(score, 5000);
}
window.addEventListener("keydown", function (evt) {
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

