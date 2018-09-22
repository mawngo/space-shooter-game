rockGenerator(2);
ammoGenerator(2);


function ballState() {
    for (let ball of balls) {
        ball.toBall(balls);
        ball.toEdge();
    }
}


let Game = function () {
    this.ship = new Ship(1200, 800, 4, 100, "white");
    this.spawner = new Ball(undefined, undefined, 80, undefined, 0, 0, "planet");
    this.balls = [];
    this.ammos = [];
    this.spammos = [];

    this.ammostate = function () {
      for (let ammo of this.ammos){
          ammo.toObj(this.spawner);
          if (ammo.toObj(this.ship)){
              this.ship.health -= ammo.damage;
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
        this.ship.toObj(this.spawner);
        this.ship.toEdge();
        this.ship.makeAMove();
    }


};
let game = new Game();

function gameplay() {
    canvasClean();
    drawBackGround();
    game.ammostate();
    game.ballstate();
    game.shipstate();
    game.drawAmmo();
    game.drawBall();
    drawImgInBall(game.ship, true);
    drawImgInBall(game.spawner, true);
    setTimeout(gameplay, 20);
}

function spawnBalls() {
    game.spawner.spawn(game.balls);
    game.spawner.color = rainbow(Math.random());
    setTimeout(spawnBalls, 1000);
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
        case "q":
            game.ship.shoot(game.ammos, this.angle, "ammo2");
            break;
        case "w":
            game.ship.shoot(game.ammos, this.angle, "ammo1");
            break;
    }
});

