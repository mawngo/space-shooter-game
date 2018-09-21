let ship = new Ship(100, 100, 10);
let balls = [new Ball(), new Ball(), new Ball(), new Ball(), new Ball()];
let spawner = new Ball();
function spawning(ball) {
    drawBall(ball,"black");
    ball.spawn(balls);
    ball.color = rainbow(Math.random());
    setTimeout(spawning,2000,ball);
}

function test() {
    canvasClean();
    ship.toEdge();
    ship.makeAMove();
    drawSquareInBall(ship, true);
    for (let ball of balls) {
        ball.toBall(balls);
        if (ball.toObj(ship)) {
            ball.explore(2, balls)
        }
        ball.toEdge();
        ball.makeAMove();
        drawBall(ball);
    }

    setTimeout(test, 20);
}

spawning(spawner);
test();
window.addEventListener("keydown", function (evt) {
    switch (evt.key) {
        case "ArrowRight":
            ship.moveRight();
            break;
        case "ArrowLeft":
            ship.moveLeft();
            break;
        case"ArrowUp":
            ship.moveUp();
            break;
        case "ArrowDown":
            ship.moveDown();

    }
});