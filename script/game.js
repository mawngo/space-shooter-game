rockGenerator(3);
ammoGenerator(2);


function ballState() {
    for (let ball of balls) {
        ball.toBall(balls);
        ball.toEdge();
    }
}


let Game = function () {
    this.ship = new Ship(1200, 800, 6, 100, "white");
    this.spawner = new Ball(undefined, undefined, 80, undefined, 0, 0, "planet");
    this.balls = [];
    this.ammos = [];
    this.spammos = [];
    this.spammostate = function () {
        for (let ammo of this.spammos){
            if (ammo.toObj(this.ship)){
                this.ship.health -= ammo.damage;
            }
            ammo.makeAMove();
            drawImgInBall(ammo);
        }
    };

    this.ammostate = function () {
      for (let ammo of this.ammos){
          ammo.toEdge();
          ammo.toObj(this.spawner);
          if (ammo.toObj(this.ship)){
              this.ship.health -= ammo.damage;
              console.log(this.ship.health)
          }
          if (ammo.toArrOfObj(this.balls)>=0){
              if (radNum(1,0)){
                  this.balls[ammo.toArrOfObj(this.balls)].explore(this.balls,2);
                  ammo.remove(this.ammos);
              }else {ammo.toBall(this.balls)}
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
                console.log(this.ship.health)
            }
            if (ball.toArrOfObj(this.ammos) >= 0) {
                if (radNum(1, 0)) {
                    this.ammos[ball.toArrOfObj(this.ammos)].remove(this.ammos);
                    ball.explore(this.balls, 2);
                }else {
                    ball.toBall(this.ammos);
                }
            }
            if (ball.toArrOfObj(this.spammos)>=0) {ball.remove(this.balls)}
            ball.toBall(this.balls);
            ball.makeAMove();
        }
    };
    this.drawBall = function () {
        for (let ball of this.balls) {
            drawImgInBall(ball)
        }
    };
    this.drawAmmo =function () {
      for (let ammo of this.ammos){
          drawImgInBall(ammo,true)
      }
    };
    this.shipstate = function () {
        if (this.ship.health <= 0){alert("you lose!")}
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
    game.spammostate();
    game.ammostate();
    game.ballstate();
    game.shipstate();
    game.drawAmmo();
    game.drawBall();
    drawImgInBall(game.ship, true);

    setTimeout(gameplay, 20);
}

function spawnBalls() {
    game.spawner.spawn(game.balls);
    game.spawner.color = rainbow(Math.random());
    setTimeout(spawnBalls, 3000);
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
            game.ship.shoot(game.spammos, this.angle, "ammo1",10);
            break;
        case "s":
            game.ship.shoot(game.ammos, this.angle, "ammo0");
            break;
    }
});

