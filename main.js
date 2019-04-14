var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var eraser = document.getElementById('eraser');
var pencil = document.getElementById('pencil');

var eraserCanUse = false
var user = false
var lineWidth = 5

var lastpoint = {
    'x': undefined,
    'y': undefined,
}

autoSetCanvasSize(canvas)
listenToUser(context)
onlick()

function autoSetCanvasSize(canvas) {
    setCanvasSize(canvas)

    window.onresize = function () {
        setCanvasSize(canvas)
    }
}

function setCanvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}

function drawLine(x, y, x1, y1) {
    context.beginPath();
    context.lineWidth = lineWidth;
    context.moveTo(x, y);
    context.lineTo(x1, y1);
    context.stroke();
}

function drawCricle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
}

function onlick() {
    eraser.onclick = function () {
        eraserCanUse = true
        eraser.classList.add('active')
        pencil.classList.remove('active')
    }

    pencil.onclick = function () {
        eraserCanUse = false
        pencil.classList.add('active')
        eraser.classList.remove('active')
    }

    red.onclick = function () {
        context.strokeStyle = 'red'
        red.classList.add('colorActive')
        black.classList.remove('colorActive')
        green.classList.remove('colorActive')
        blue.classList.remove('colorActive')
    }

    black.onclick = function () {
        context.strokeStyle = 'black'
        black.classList.add('colorActive')
        red.classList.remove('colorActive')
        green.classList.remove('colorActive')
        blue.classList.remove('colorActive')
    }

    green.onclick = function () {
        context.strokeStyle = 'green'
        green.classList.add('colorActive')
        black.classList.remove('colorActive')
        red.classList.remove('colorActive')
        blue.classList.remove('colorActive')
    }

    blue.onclick = function () {
        context.strokeStyle = 'blue'
        blue.classList.add('colorActive')
        black.classList.remove('colorActive')
        green.classList.remove('colorActive')
        red.classList.remove('colorActive')
    }

    thin.onclick = function () {
        thin.classList.add('lineActive')
        medium.classList.remove('lineActive')
        thick.classList.remove('lineActive')
        lineWidth = 3
    }

    medium.onclick = function () {
        medium.classList.add('lineActive')
        thin.classList.remove('lineActive')
        thick.classList.remove('lineActive')
        lineWidth = 5
    }

    thick.onclick = function () {
        thick.classList.add('lineActive')
        medium.classList.remove('lineActive')
        thin.classList.remove('lineActive')
        lineWidth = 8
    }

    clear.onclick = function () {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    download.onclick = function () {
        var a = document.createElement('a')
        a.download = '我的画'
        a.target = '_blank'
        document.body.appendChild(a)
        var dt = canvas.toDataURL('image/png')
        a.href = dt
        a.click()
    }
}

function listenToUser(context) {
    if (document.documentElement.ontouchstart !== undefined) {
        canvas.ontouchstart = function (event) {
            var x = event.touches[0].clientX
            var y = event.touches[0].clientY
            user = true
            if (eraserCanUse) {
                context.clearRect(x - 7.5, y - 7.5, 15, 15)
            } else {
                lastpoint = {
                    'x': x,
                    'y': y,
                }
            }
        }

        canvas.ontouchmove = function (event) {
            var x = event.touches[0].clientX
            var y = event.touches[0].clientY

            if (!user) {
                return
            }
            if (eraserCanUse) {
                context.clearRect(x -5, y-5, 15, 15)
            } else {
                var newpoint = {
                    x: x,
                    y: y,
                }
                drawCricle(x, y, lineWidth / 2.2)
                drawLine(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y)
                lastpoint = newpoint
            }
        }

        canvas.ontouchend = function () {
            user = false
        }
    } else {
        canvas.onmousedown = function (event) {
            var x = event.clientX
            var y = event.clientY
            user = true
            if (eraserCanUse) {
                context.clearRect(x - 5, y - 5, 15, 15)
            } else {
                lastpoint = {
                    'x': x,
                    'y': y,
                }
            }
        }

        canvas.onmousemove = function (event) {
            var x = event.clientX
            var y = event.clientY

            if (!user) {
                return
            }
            if (eraserCanUse) {
                context.clearRect(x, y, 15, 15)
            } else {
                var newpoint = {
                    x: x,
                    y: y,
                }
                drawCricle(x, y, lineWidth / 2.2)
                drawLine(lastpoint.x, lastpoint.y, newpoint.x, newpoint.y)
                lastpoint = newpoint
            }
        }

        canvas.onmouseup = function () {
            user = false
        }
    }
}

