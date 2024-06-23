import { loadConfig } from "./config";

export const canvas = document.getElementById("screen");
export const ctx = canvas.getContext("2d");
export const config = window.gameConfig || loadConfig();

const background = document.getElementById("background");
const imgDir = document.getElementById("img-dir");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

export function rainbow(h) {
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
    return ("#" + ("00" + (~~(r * 255)).toString(16)).slice(-2)
            + ("00" + (~~(g * 255)).toString(16)).slice(-2)
            + ("00" + (~~(b * 255)).toString(16)).slice(-2));
}

export function radNum(max, min = 0) {
    if (max === min) return max;
    max = max - min;
    return Math.round(Math.random() * max + min);
}

export function radRate(rate) {
    return Math.random() <= rate;
}

export function sqrtOf2Sqr(a, b) {
    return Math.sqrt(
      (Math.abs(a) * Math.abs(a)) +
      (Math.abs(b) * Math.abs(b))
    );
}

export function canvasClean() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawImgInBall(container, shadow = false, imgId = container.imgId) {
    const img = document.getElementById(imgId);
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

//img id only
export function rockGenerator(maxImg) {
    let innerImg = "";
    for (let i = 0; i < maxImg + 1; i++) {
        innerImg += "<img alt=\"rock\" src=\"img/rock/rock" + i
                    + ".png\" id=\"rock" + i + "\" style=\"display: none\">";
    }
    imgDir.innerHTML += innerImg;
}

export function rockRadId(maxImg) {
    let id = "rock";
    id += (radNum(maxImg, 0) + "");
    return id;
}

export function explosiveRadId(maxImg) {
    let id = "explosive";
    id += (radNum(maxImg, 0) + "");
    return id;
}

export function ammoGenerator(maxImg) {
    let innerImg = "";
    for (let i = 0; i < maxImg + 1; i++) {
        innerImg += "<img alt=\"ammo\" src=\"img/ammo/ammo" + i +
                    ".png\" id=\"ammo" + i + "\" style=\"display: none\">";
    }
    imgDir.innerHTML += innerImg;
}

export function itemsGenerator(maxImg) {
    let innerImg = "";
    for (let i = 0; i < maxImg + 1; i++) {
        innerImg += "<img alt=\"object\" src=\"img/item/item" + i + ".png\" id=\"item"
                    + i + "\" style=\"display: none\">";
    }
    imgDir.innerHTML += innerImg;
}

export function explosiveGenerator(maxImg) {
    let innerImg = "";
    for (let i = 0; i < maxImg + 1; i++) {
        innerImg += "<img alt=\"explosive\" src=\"img/explosive/explosive" + i + ".png\" id=\"explosive"
                    + i + "\" style=\"display: none\">";
    }
    imgDir.innerHTML += innerImg;
}

export async function showConfirmBox(title, message) {
    if (window.Neu) {
        const confirm = await window.Neu.os.showMessageBox(title, message, "YES_NO");
        return confirm === "YES";
    }
    return confirm(message);
}
