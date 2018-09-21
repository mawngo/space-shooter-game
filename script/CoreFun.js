const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
const BACKCOLOR = "gray";

function rainbow(h) {
    let r, g, b;
    let i = ~~(h * 6);
    let f = h * 6 - i;
    let q = 1 - f;
    switch (i % 6) {
        case 0:
            r = 1;
            g = f;
            b = 0;
            break;
        case 1:
            r = q;
            g = 1;
            b = 0;
            break;
        case 2:
            r = 0;
            g = 1;
            b = f;
            break;
        case 3:
            r = 0;
            g = q;
            b = 1;
            break;
        case 4:
            r = f;
            g = 0;
            b = 1;
            break;
        case 5:
            r = 1;
            g = 0;
            b = q;
            break;
    }
    let c = "#" + ("00" + (~~(r * 255)).toString(16)).slice(-2)
        + ("00" + (~~(g * 255)).toString(16)).slice(-2)
        + ("00" + (~~(b * 255)).toString(16)).slice(-2);
    return (c);
}

function radNum(max, min) {
    max = max - min;
    return Math.round(Math.random() * max + min);
}

function sqrtOf2Sqr(a, b) {
    return Math.sqrt(
        (Math.abs(a) * Math.abs(a)) +
        (Math.abs(b) * Math.abs(b))
    );

}

function dsdsd() {
    
}

function canvasClean() {
    ctx.clearRect(0, 0, 1280, 720);
}

function drawBall(ball, stroke) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = ball.color;
    ctx.strokeStyle = stroke || ball.color;
    ctx.fill();
    ctx.stroke();
}

function drawSquareInBall(square, isSpin) {
    if (isSpin || false) {
        square.increaseAngle();
    }
    let a = sqrtOf2Sqr(square.radius, square.radius);
    let startPoint = Math.sqrt(square.radius * square.radius / 2);
    ctx.beginPath();
    ctx.save();
    ctx.translate(square.x, square.y);
    ctx.rotate(square.angle * Math.PI / 180);
    ctx.rect(-startPoint, -startPoint, a, a);
    ctx.strokeStyle = square.color;
    ctx.stroke();
    ctx.restore();
}