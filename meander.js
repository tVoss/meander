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

function wobble(t) {
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, width, height);

    for (var x = 0; x < width; x++) {
        var y = Math.sin(x / width * Math.PI * 5 * t / 1000) * height / 5 + height / 2 - 100;
        ctx.fillStyle = '#00ffff'
        ctx.fillRect(x, y, 1, 200);
        var yy = Math.cos(x / width * Math.PI * 12) * height / 7 + y + 75 
        ctx.fillStyle = '#00ff00'
        ctx.fillRect(x, yy, 1, 50);
    }
    requestAnimationFrame(wobble)
}

function render(t) {
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, width, height);

    for (var x = 0; x < width; x++) {
        var y = getWaveY(x, height / 5, t / 500, height / 2 - 100, 5);
        var h = (Math.sin(t / 2000) + 1) * 180;
        ctx.fillStyle = HSVtoRGB(h, 1, 1);
        ctx.fillRect(x, y, 1, 200);

        var h = (Math.sin(t / 3000) + 1) * 180;
        var yy = getWaveY(x, height / 7, t / 1000, height / 7 + y + 5, 12);
        ctx.fillStyle = HSVtoRGB(h, 1, 1);
        ctx.fillRect(x, yy, 1, 50);
    }
    requestAnimationFrame(render)
}

requestAnimationFrame(render)
