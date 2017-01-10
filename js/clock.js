window.addEventListener('load', init, false);

function init() {

    var canvas, context, secondsArrow, minutesArrow, hoursArrow, clockBackground, clockCenter, point3, point6, point9, point12;

    var stats = new Stats();
    document.body.appendChild(stats.dom);

    const xpos = 0;
    const ypos = 0;
    const width = 300;
    const height = 300;

    const clockXpos = 140;
    const clockYpos = 160;

    var seconds = 0;
    var minutes = 0;
    var hours = 0;

    canvas = createCanvas(xpos, ypos, width, height);
    context = canvas.getContext('2d');

    secondsArrow = new Arrow(clockXpos, clockYpos, 50, 3, 0, '#2b0d3b');
    minutesArrow = new Arrow(clockXpos, clockYpos, 50, 5, '#2b0d3b');
    hoursArrow = new Arrow(clockXpos, clockYpos, 50, 10, 0, '#2b0d3b');
    clockBackground = new Circle(clockXpos, clockYpos, 75, 5, '#ffdd17', '#2b0d3b');
    clockCenter = new Circle(clockXpos, clockYpos, 10, 5, '#2b0d3b', '#2b0d3b');
    point12 = new Circle(clockXpos, clockYpos - 61, 1, 5, '#2b0d3b', '#2b0d3b');
    point3 = new Circle(clockXpos + 61, clockYpos, 1, 5, '#2b0d3b', '#2b0d3b');
    point6 = new Circle(clockXpos, clockYpos + 61, 1, 6, '#2b0d3b', '#2b0d3b');
    point9 = new Circle(clockXpos - 61, clockYpos, 1, 5, '#2b0d3b', '#2b0d3b');

    function animate() {
        stats.begin();

        clockBackground.draw(context);
        point12.draw(context);
        point3.draw(context);
        point6.draw(context);
        point9.draw(context);
        hoursArrow.draw(context);
        minutesArrow.draw(context);
        secondsArrow.draw(context);
        clockCenter.draw(context);

        stats.end();
        requestAnimationFrame(animate);
    }

    window.setInterval(function () {
        setCurrentTime();
    }, 1000);

    function setCurrentTime() {
        var currentdate = new Date();

        var hour = currentdate.getHours();
        minutes = currentdate.getMinutes();
        seconds = currentdate.getSeconds();

        if (hour > 12) {
            hour = (hour - 12);
        }

        hours = hour;
        secondsArrow.rotation = (seconds * 6) * Math.PI / 180;
        minutesArrow.rotation = (minutes * 6) * Math.PI / 180 + (secondsArrow.rotation / 60);
        hoursArrow.rotation = ((hours * 30) * Math.PI / 180) + (minutesArrow.rotation / 12);
    }

    function getASide() {
        const secondsCos = Math.cos((seconds * 6) * (Math.PI / 180));
        const aSide = secondsLineLength * secondsCos;
        return aSide;
    }

    function getBSide() {
        const secondsSin = Math.sin((seconds * 6) * (Math.PI / 180));
        const bSide = secondsLineLength * secondsSin;
        return bSide;
    }

    setCurrentTime();
    animate();
}

function createCanvas(xpos, ypos, width, height) {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;
    canvas.style.background = "#ee3344";
    canvas.style.position = 'absolute';
    canvas.style.left = "" + xpos + "px";
    canvas.style.top = "" + ypos + "px";
    return canvas;
}

function Circle(x, y, radius, lineWidth, color, strokeStyle) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.lineWidth = lineWidth;
    this.color = color;
    this.strokeStyle = strokeStyle;
}

Circle.prototype.draw = function draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.strokeStyle;

    context.stroke();
};

function Arrow(x, y, length, lineWidth, rotation, color) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.rotation = rotation;
    this.lineWidth = lineWidth;
    this.color = color;
}

Arrow.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, -this.length);
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.color;
    context.lineCap = 'round';
    context.shadowBlur = 6;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 4;
    context.shadowColor = "rgba(100, 100, 100, 0.75)";
    context.stroke();
    context.restore();
};
