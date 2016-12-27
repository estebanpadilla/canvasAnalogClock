var stats = new Stats();
document.body.appendChild(stats.dom);

const xpos = 0;
const ypos = 0;
const canvasWidth = 300;
const canvasHeight = 300;

const clockXpos = 140;
const clockYpos = 160;

var seconds = 0;
var minutes = 0;
var hours = 0;

var canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.background = "#ee3344";
canvas.style.position = 'absolute';
canvas.style.left = "" + xpos + "px";
canvas.style.top = "" + ypos + "px";
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

function Circle() {
    this.radius = 100;
    this.x = 0;
    this.y = 0;
    this.lineWidth = 3;
    this.color = 'none';
    this.strokeStyle = 'none';
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

function Arrow() {
    this.length = 0;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.lineWidth = 0;
    this.color = 'white';
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
    context.stroke();
    context.restore();
};

var secondsArrow = new Arrow();
secondsArrow.length = 50;
secondsArrow.lineWidth = 3;
secondsArrow.x = clockXpos;
secondsArrow.y = clockYpos;
secondsArrow.color = '#2b0d3b';

var minutesArrow = new Arrow();
minutesArrow.length = 50;
minutesArrow.lineWidth = 5;
minutesArrow.x = clockXpos;
minutesArrow.y = clockYpos;
minutesArrow.color = '#2b0d3b';

var hoursArrow = new Arrow();
hoursArrow.length = 50;
hoursArrow.lineWidth = 10;
hoursArrow.x = clockXpos;
hoursArrow.y = clockYpos;
hoursArrow.color = '#2b0d3b';

var clockBackground = new Circle();
clockBackground.radius = 75;
clockBackground.lineWidth = 5;
clockBackground.x = clockXpos;
clockBackground.y = clockYpos;
clockBackground.color = '#ffdd17';
clockBackground.strokeStyle = '#2b0d3b';

var clockCenter = new Circle();
clockCenter.radius = 10;
clockCenter.lineWidth = 5;
clockCenter.x = clockXpos;
clockCenter.y = clockYpos;
clockCenter.color = '#2b0d3b';
clockCenter.strokeStyle = '#2b0d3b';

var point12 = new Circle();
point12.radius = 1;
point12.lineWidth = 5;
point12.x = clockXpos;
point12.y = clockYpos - 61;
point12.color = '#2b0d3b';
point12.strokeStyle = '#2b0d3b';

var point3 = new Circle();
point3.radius = 1;
point3.lineWidth = 5;
point3.x = clockXpos + 61;
point3.y = clockYpos;
point3.color = '#2b0d3b';
point3.strokeStyle = '#2b0d3b';

var point6 = new Circle();
point6.radius = 1;
point6.lineWidth = 5;
point6.x = clockXpos;
point6.y = clockYpos + 61;
point6.color = '#2b0d3b';
point6.strokeStyle = '#2b0d3b';

var point9 = new Circle();
point9.radius = 1;
point9.lineWidth = 5;
point9.x = clockXpos - 61;
point9.y = clockYpos;
point9.color = '#2b0d3b';
point9.strokeStyle = '#2b0d3b';


function animate() {
    stats.begin();

    clockBackground.draw(ctx);
    point12.draw(ctx);
    point3.draw(ctx);
    point6.draw(ctx);
    point9.draw(ctx);
    hoursArrow.draw(ctx);
    minutesArrow.draw(ctx);
    secondsArrow.draw(ctx);
    clockCenter.draw(ctx);

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

function init() {
    setCurrentTime();
    animate();
}

init();

