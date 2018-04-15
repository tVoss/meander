'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

function getWaveY(x, amplitude, xOffset, yOffset, frequency) {
    return amplitude * Math.sin(x / width * Math.PI * frequency + xOffset) + yOffset;
}

function getColorStyle(t) {
    const h = (Math.sin(t) + 1) * 180;
    return 'hsl(' + h + ', 100%, 50%)';
}

function wobble(t) {
    ctx.fillStyle = '#222222';
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1.0;

    for (var x = 0; x < width; x++) {
        var y = getWaveY(x, height / 5, 0, height / 2 - 100, 5 * t / 1000);
        ctx.fillStyle = getColorStyle(t / 2000)
        ctx.fillRect(x, y, 1, 200);
        var yy = getWaveY(x, height / 7, 0, y + 75, 12);
        ctx.fillStyle = getColorStyle(t / 3000);
        ctx.fillRect(x, yy, 1, 50);
    }
    requestAnimationFrame(wobble)
}

function wavey(t) {
    ctx.fillStyle = '#222222';
    ctx.globalAlpha = 0.01;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1.0

    for (var x = 0; x < width; x++) {
        var y = getWaveY(x, height / 5, t / 500, height / 2 - 100, 5);
        ctx.fillStyle = getColorStyle(t / 2000);
        ctx.fillRect(x, y, 1, 200);

        var yy = getWaveY(x, height / 7, t / 1000, height / 7 + y + 5, 12);
        ctx.fillStyle = getColorStyle(t / 3000);
        ctx.fillRect(x, yy, 1, 50);
    }
    requestAnimationFrame(wavey)
}

function spiral(t) {
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#22222';
    // ctx.fillStyle = getColorStyle(-t / 2000);
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 5;
    ctx.globalAlpha = 1.0;

    var x = width / 2;
    var y = height / 2;
    for (var r = 0; r < width / 2 * 3; r++) {
        ctx.beginPath();
        ctx.moveTo(x, y);

        x = Math.sin(r / width * Math.PI * 20 + t / 500) * r + width / 2;
        y = Math.cos(r / width * Math.PI * 20 + t / 500) * r + height / 2;
        ctx.lineWidth = 20 + Math.sin(r / width * 20 + t / 200) * 10
        ctx.lineTo(x, y);

        ctx.strokeStyle = getColorStyle(t / 3000);
        ctx.stroke();
    }

    requestAnimationFrame(spiral);
}

function crawler(t) {
    ctx.fillStyle = '#222222';
    ctx.globalAlpha = 0.05;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1.0;

    ctx.fillStyle = '#00ff00';
    var lastY = getWaveY(0, 5, t / 2000, 0, 1);
    var lastYy = getWaveY(0, 5, t / 1500, 0, 1);
    var lastYyy = getWaveY(0, 5, t / 2500, 0, 1);
    for (var x = 0; x < width; x++) {
        var yOffset = Math.sin(t / 500) * 50;
        var yyOffset = Math.sin(t / 1000) * 50;
        var yyyOffset = Math.sin(t / 1500) * 50;

        var y = getWaveY(x, 5, t / 2000, 0, 1);
        y = Math.round(y) * height / 15 + height / 2;
        var yy = getWaveY(x, 5, t / 1500, 0, 1);
        yy = Math.round(yy) * height / 15 + height / 2 + 50;
        var yyy = getWaveY(x, 5, t / 2500, 0, 1);
        yyy = Math.round(yyy) * height / 15 + height / 2 - 50;

        ctx.fillStyle = getColorStyle(t / 4000);
        if (lastY > y) {
            ctx.fillRect(x - 10, lastY + yOffset, 10, y - lastY);
        } else if (lastY < y) {
            ctx.fillRect(x - 10, lastY + yOffset, 10, y - lastY + 10)
        }
        ctx.fillRect(x, y + yOffset, 1, 10);
        
        
        ctx.fillStyle = getColorStyle(t / 7000);
        if (lastYy > yy) {
            ctx.fillRect(x - 10, lastYy + yyOffset, 10, yy - lastYy);
        } else if (lastYy < yy) {
            ctx.fillRect(x - 10, lastYy + yyOffset, 10, yy - lastYy + 10)
        }
        ctx.fillRect(x, yy + yyOffset, 1, 10);
        

        ctx.fillStyle = getColorStyle(t / 5000);
        if (lastYyy > yyy) {
            ctx.fillRect(x - 10, lastYyy + yyyOffset, 10, yyy - lastYyy);
        } else if (lastYyy < yyy) {
            ctx.fillRect(x - 10, lastYyy + yyyOffset, 10, yyy - lastYyy + 10)
        }
        ctx.fillRect(x, yyy + yyyOffset, 1, 10);

        lastY = y;
        lastYy = yy;
        lastYyy = yyy;
    }

    requestAnimationFrame(crawler);
}

ctx.fillStyle = '#222222'
ctx.fillRect(0, 0, width, height)
requestAnimationFrame(wobble)
