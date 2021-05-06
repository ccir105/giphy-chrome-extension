// Initialising the canvas
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ12345678901023009239ASDADS';
letters = letters.split('');

// Setting up the columns
var fontSize = 10,
    columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Setting up the draw function
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = '#0f0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
            drops[i] = 0;
        }
    }
}

// Loop the animation
setInterval(draw, 45);

setTimeout(() => {
    pointerThing(canvas)
}, 1000)



function pointerThing(canvas) {
    var c = canvas.getContext('2d')
    var drag = false;
    var color = [
        'red',
        '#45B29D',
        '#FFFFFF',
    ]

    var mouse = {
        x: 0,
        y: 0
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var radius = 5
    var Circle = function (x, y, radius, color) {
        this.radius = Math.floor(Math.random() * radius + 1)
        this.color = color
        this.dx = (Math.random() - 0.5) * 5;
        this.dy = (Math.random() - 0.5) * 5;
        this.pos = {
            x: x,
            y: y
        }
    }
    Circle.prototype.update = function () {
        this.pos.x += this.dx;
        this.pos.y += this.dy
        if (this.pos.x + this.radius > canvas.width || this.pos.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if (this.pos.y + radius > canvas.height || this.pos.y - radius < 0) {
            this.dy = -this.dy
        }

        if (this.pos.x + this.radius * 2 > mouse.x && mouse.x != 0) {
            this.dx -= 1
        }
        if (this.pos.x < mouse.x - this.radius * 2 && mouse.x != 0) {
            this.dx += 1.5
        }

        if (this.dx > 5)
            this.dx -= 1

        if (this.pos.y + this.radius * 2 > mouse.y + this.radius * 1 && mouse.y != 0) {
            this.dy -= 1
        }
        if (this.pos.y < mouse.y - this.radius * 2 && mouse.y != 0) {
            this.dy += 1.5
        }

        if (this.dy > 5)
            this.dy -= 1

    }
    Circle.prototype.render = function () {
        c.beginPath();
        c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.strokeStyle = this.color
        c.fill();
        c.stroke();
    }
    Circle.prototype.initCircle = function () {
        this.pos = {
            // x : Math.random() * (canvas.width - this.radius * 2) + this.radius,
            // y : Math.random() * (canvas.height - this.radius * 2) + this.radius
        }
    }


    addEventListener("mousemove", function (event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });



    /* ---- Functions ---- */


    var circle = [];
    for (var i = 0; i < 10; i++) {
        var randomX = Math.random() * (canvas.width - radius * 1) + radius
        var randomY = Math.random() * (canvas.height - radius * 1) + radius
        circle.push(new Circle(randomX, randomY, radius, color[Math.floor(Math.random() * color.length)]))
    }


    function loop() {

        for (var i = 0; i < circle.length; i++) {
            circle[i].update();
            circle[i].render();
        }

        requestAnimationFrame(loop);
    }
    loop();
}