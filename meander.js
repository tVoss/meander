var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;


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
        var y = Math.sin(x / width * Math.PI * 5 + t / 500) * height / 5 + height / 2 - 100;
        ctx.fillStyle = '#00ffff'
        ctx.fillRect(x, y, 1, 200);
        var yy = Math.cos(x / width * Math.PI * 12 - t / 1000) * height / 7 + y + 75 
        ctx.fillStyle = '#00ff00'
        ctx.fillRect(x, yy, 1, 50);
    }
    requestAnimationFrame(render)
}

requestAnimationFrame(render)
