'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

function getWaveY(x, amplitude, xOffset, yOffset, frequency) {
    return amplitude * Math.sin(x / width * Math.PI * frequency + xOffset) + yOffset;
}

function mix(a, b, v)
{
    return (1-v)*a + v*b;
}

function HSVtoRGB(H, S, V)
{
    var V2 = V * (1 - S);
    var r  = ((H>=0 && H<=60) || (H>=300 && H<=360)) ? V : ((H>=120 && H<=240) ? V2 : ((H>=60 && H<=120) ? mix(V,V2,(H-60)/60) : ((H>=240 && H<=300) ? mix(V2,V,(H-240)/60) : 0)));
    var g  = (H>=60 && H<=180) ? V : ((H>=240 && H<=360) ? V2 : ((H>=0 && H<=60) ? mix(V2,V,H/60) : ((H>=180 && H<=240) ? mix(V,V2,(H-180)/60) : 0)));
    var b  = (H>=0 && H<=120) ? V2 : ((H>=180 && H<=300) ? V : ((H>=120 && H<=180) ? mix(V2,V,(H-120)/60) : ((H>=300 && H<=360) ? mix(V,V2,(H-300)/60) : 0)));

    var rgb = {
        r : Math.round(r * 255),
        g : Math.round(g * 255),
        b : Math.round(b * 255)
    };

    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')'
}

function getColorStyle(t) {
    return HSVtoRGB((Math.sin(t) + 1) * 180, 1, 1);
}

function wobble(t) {
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, width, height);

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
    ctx.fillRect(0, 0, width, height);

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
    ctx.fillStyle = getColorStyle(-t / 2000);
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 5;

    var x = width / 2;
    var y = height / 2;
    for (var r = 0; r < width / 2 * 3; r++) {
        ctx.beginPath();
        ctx.moveTo(x, y);

        x = Math.sin(r / width * Math.PI * 20 + t / 500) * r + width / 2;
        y = Math.cos(r / width * Math.PI * 20 + t / 750) * r + height / 2;
        ctx.lineWidth = 20 + Math.sin(r / width * 20 + t / 200) * 10
        ctx.lineTo(x, y);

        ctx.strokeStyle = getColorStyle(t / 3000);
        ctx.stroke();
    }

    requestAnimationFrame(spiral);
}

function crawler(t) {
    ctx.fillStyle = '#222222';
    // ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00ff00';
    var lastY = getWaveY(0, 5, t / 2000, 0, 1);
    var lastYy = getWaveY(0, 5, t / 1500, 0, 1);
    var lastYyy = getWaveY(0, 5, t / 2500, 0, 1);
    for (var x = 0; x < width / 2; x++) {
        var yOffset = Math.sin(t / 500) * 50;
        var yyOffset = Math.sin(t / 1000) * 50;
        var yyyOffset = Math.sin(t / 1500) * 50;

        var y = getWaveY(x, 5, t / 2000, 0, 1);
        y = Math.round(y) * height / 15 + height / 2;
        var yy = getWaveY(x, 5, t / 1500, 0, 1);
        yy = Math.round(yy) * height / 15 + height / 2;
        var yyy = getWaveY(x, 5, t / 2500, 0, 1);
        yyy = Math.round(yyy) * height / 15 + height / 2;

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
requestAnimationFrame(crawler)
