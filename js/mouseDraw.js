let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext('2d');
let points = [];

function drawLine() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 3;
    if(document.getElementById("fcolor").checked) {
        context.strokeStyle = String(document.documentElement.style.getPropertyValue("--background-grid-color"));
    } else {
        context.strokeStyle = '#ffffff';
    }
    context.beginPath();
    let now = Date.now();
    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        if (now - point.timestamp > 50) {
            points.splice(i, 1);
            i--;
            continue;
        }
        if (i === 0) {
            context.moveTo(point.x, point.y);
        } else {
            let previousPoint = points[i - 1];
            context.moveTo(previousPoint.x, previousPoint.y);
            context.lineTo(point.x, point.y);
        }
    }
    context.stroke();
}

function addPoint(event) {
    let x = event.pageX - canvas.offsetLeft;
    let y = event.pageY - canvas.offsetTop;
    points.push({x: x, y: y, timestamp: Date.now()});
}
//
function addPointMob(event) {
    let x = event.targetTouches()[0].pageX - canvas.offsetLeft;
    let y = event.targetTouches()[0].pageY - canvas.offsetTop;
    points.push({x: x, y: y, timestamp: Date.now()});
}

function removePoint() {
    points.shift();
}

document.addEventListener('mousemove', function(event) {
    addPoint(event);
    drawLine();
});
document.addEventListener('touchmove', function(event) {
    addPointMob(event);
    drawLine();
});

setInterval(function() {
    if (points.length > 0) {
        removePoint();
        drawLine();
    }
}, 5000);