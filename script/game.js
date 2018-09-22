rockGenerator(3);
ammoGenerator(3);
itemsGenerator(4);


let Game = function () {
    this.score = 0;
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
                if (item.imgId ==="item4"){this.score +=100}
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
                console.log(this.ship.health);
            }
            if (ammo.imgId === "ammo3"){
                this.balls =[];
                this.ammos =[];
                this.spammos =[];
            }
            ammo.makeAMove();
            drawImgInBall(ammo);

        }
    };
    this.spammostate2 = function () {
        for (let ammo of this.spammos) {
            if (ammo.imgId === "ammo2") {
                ammo.toEdge();
                ammo.toObj(this.spawner);
                if (ammo.toObj(this.ship)) {
                    this.ship.health += 8;
                    console.log(this.ship.health);
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
                        }
                        if (radNum(2, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y, "item1"));
                        }
                        if (radNum(10, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y, "item2"));
                        }
                        if (radNum(10, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y,"item3"));
                        }
                        if (radNum(2, 0)) {
                        } else {
                            this.items.push(new Item(exball.x, exball.y,"item4"));
                        }
                        exball.remove(this.balls);
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
                        }
                        if (radNum(2, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y, "item1"));
                        }
                        if (radNum(10, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y, "item2"));
                        }
                        if (radNum(10, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y,"item3"));
                        }
                        if (radNum(2, 0)) {
                        } else {
                            this.items.push(new Item(ball.x, ball.y,"item4"));
                        }
                        ball.remove(this.balls);
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
            canvasClean();
            drawBackGround();
            this.displayscore(canvas.width/2,canvas.height/2,"You Lose!");
            setTimeout(function () {
                if (confirm("play again?")){
                    window.location.reload();
                }
            },1000)

        }
        this.ship.toObj(this.spawner);
        this.ship.toEdge();
        this.ship.makeAMove();
    };

    this.displayscore = function (x,y,string ="") {
        ctx.font="25px Verdana";
        let gradient=ctx.createLinearGradient(0,0,canvas.width,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        ctx.fillStyle=gradient;
        ctx.fillText(string,x,y-30);
        ctx.fillText("Health "+Math.floor(this.ship.health),x,y);
        ctx.fillText("Items: "+this.ship.totalAmmo.length,x,y+30);
        ctx.fillText("Score "+this.score,x,y+80);
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
    game.displayscore(15,30);
    if (game.ship.health>0){
        setTimeout(gameplay, 20);}
}


let n =0;
function harder() {
    n++;
    setTimeout(harder,60000)
}
function spawnBalls() {
    game.spawner.spawn(game.balls,n);
    game.spawner.color = rainbow(Math.random());
    setTimeout(spawnBalls, 18000);
}
function score(){
    game.score += n;
    setTimeout(score,1000);
}
score();
gameplay();
harder();
spawnBalls();
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

