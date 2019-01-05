var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var eraser = document.getElementById('eraser');
var paint = document.getElementById('paint');

var eraserCanUse = false
var user = false

var lastpoint = {
  'x':undefined,
  'y':undefined,
}

autoSetCanvasSize(canvas)
listenToMouse(context)
onlick()

function autoSetCanvasSize(canvas) {
    setCanvasSize()
  
    window.onresize = function() {
      setCanvasSize()
    }
  }

function setCanvasSize() {
var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight

canvas.width = pageWidth
canvas.height = pageHeight
}

function drawLine(x,y,x1,y1) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 5;
  context.moveTo(x,y);
  context.lineTo(x1,y1);
  context.stroke();
}




function onlick() {
    eraser.onclick = function() {
        eraserCanUse = true
        eraser.className='hide'
        paint.className='show'
    }
      
    paint.onclick = function() {
        eraserCanUse = false
        eraser.className = ''
        paint.className = ''
    }
}

function listenToMouse(context) {
    document.onmousedown = function(event) {
        var x = event.clientX
        var y = event.clientY
        user = true
        if (eraserCanUse) {
            context.clearRect(x-5,y-5,10,10)
        } else {
            lastpoint = {
                'x':x,
                'y':y,
                } 
        }
    }
    
    document.onmousemove = function(event) {
        var x = event.clientX
        var y = event.clientY

        if (!user) {return}
        if(eraserCanUse) {
            context.clearRect(x,y,10,10)
        } else {
            var newpoint = {
                x:x,
                y:y,
            }
            drawLine(lastpoint.x,lastpoint.y,newpoint.x,newpoint.y)
            lastpoint = newpoint  
        }
    }
    
    document.onmouseup = function() {
      user = false
    }
}


    


