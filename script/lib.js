const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
const background = document.getElementById("background");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;


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

function radNum(max, min = 0) {
    max = max - min;
    return Math.round(Math.random() * max + min);
}

function sqrtOf2Sqr(a, b) {
    return Math.sqrt(
        (Math.abs(a) * Math.abs(a)) +
        (Math.abs(b) * Math.abs(b))
    );

}

function canvasClean() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawImgInBall(container, shadow = false, imgId = container.imgId) {
    let img = document.getElementById(imgId);
    ctx.beginPath();
    ctx.save();
    if (shadow) {
        ctx.shadowOffX = 10;
        ctx.shadowOffY = 10;
        ctx.shadowBlur = 20;
        ctx.shadowColor = container.color;
    }
    ctx.translate(container.x, container.y);
    ctx.rotate(container.angle * Math.PI / 180);
    ctx.drawImage(img, -container.radius - 1, -container.radius - 1, container.radius * 2 + 2, container.radius * 2 + 2);
    ctx.restore();
}

function drawBackGround() {
    ctx.beginPath();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}


//img id only
function rockGenerator(maxImg) {
    let innerImg = "";
    for (let i = 0; i < maxImg + 1; i++) {
        innerImg += "<img src=\"img/rock/rock" + i
            + ".png\" id=\"rock" + i + "\" style=\"display: none\">";
    }
    document.getElementById("imgfolder").innerHTML += innerImg;
}

function rockRadId(maxImg) {
    let id = "rock";
    id += (radNum(maxImg, 0) + "");
    return id;
}

function explosiveRadId(maxImg) {
    let id = "explosive";
    id += (radNum(maxImg, 0) + "");
    return id;
}

function ammoGenerator(maxImg) {
    let innerImg = "";
    for (let i = 0; i < maxImg + 1; i++) {
        innerImg += "<img src=\"img/ammo/ammo" + i +
            ".png\" id=\"ammo" + i + "\" style=\"display: none\">"
    }
    document.getElementById("imgfolder").innerHTML += innerImg;
}

function itemsGenerator(maxImg) {
    let innerImg = "";
    for (let i = 0; i < maxImg + 1; i++) {
        innerImg += "<img src=\"img/item/item" + i + ".png\" id=\"item"
            + i + "\" style=\"display: none\">"
    }
    document.getElementById("imgfolder").innerHTML += innerImg;
}

function explosiveGenerator(maxImg) {
    let innerImg = "";
    for (let i = 0; i < maxImg + 1; i++) {
        innerImg += "<img src=\"img/explosive/explosive" + i + ".png\" id=\"explosive"
            + i + "\" style=\"display: none\">"
    }
    document.getElementById("imgfolder").innerHTML += innerImg;
}


