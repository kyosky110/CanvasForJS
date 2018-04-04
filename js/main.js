

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

autoCanvasSize()

var lastPoint
var lineWidth = 5
listenerToUser()

var eraserEnable = false
eraser.onclick = function (event) {
    eraserEnable = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

pen.onclick = function (event) {
    eraserEnable = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

clear.onclick = function (event) {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

save.onclick = function (event) {
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'myCanvas'
    a.target = '_blank'
    a.click()
}

thin.onclick = function (event) {
    lineWidth = 5
    thin.classList.add('active')
    thick.classList.remove('active')
}

thick.onclick = function (event) {
    lineWidth = 10
    thick.classList.add('active')
    thin.classList.remove('active')
}

black.onclick = function (event){
    console.log(event)
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
}

red.onclick = function (event){
    console.log(event)
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
}

green.onclick = function (event){
    console.log(event)
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
}

yellow.onclick = function (event){
    console.log(event)
    context.fillStyle = 'yellow'
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
}

//窗口自适应
function autoCanvasSize() {
    setCanvasSize()

    window.onresize = function (event) {
        setCanvasSize()
    }
}

//设置窗大小
function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}

//画圆
function drawCircle(x, y, radius) {
    context.beginPath()
    // context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

//画线
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    // context.strokeStyle = 'black'
    context.moveTo(x1, y1) // 起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

//设置最后的点
function setLastPoint(x, y) {
    lastPoint = {
        x: x,
        y: y
    }
}

function listenerToUser() {
    var using = false
    if (document.body.ontouchstart === undefined) {
        canvas.onmousedown = function (event) {
            using = true
            var x = event.clientX
            var y = event.clientY
            if (eraserEnable) {
                context.clearRect(x - 7, y, 15, 15)
            } else {
                setLastPoint(x, y)
            }
        }

        canvas.onmousemove = function (event) {
            if (!using) { return }

            var newX = event.clientX
            var newY = event.clientY
            if (eraserEnable) {
                context.clearRect(newX - 7, newY, 15, 15)
            } else {
                var lastX = lastPoint.x
                var lastY = lastPoint.y
                drawLine(newX, newY, lastX, lastY)
                setLastPoint(newX, newY)
            }
        }

        canvas.onmouseup = function (event) {
            using = false
        }
    } else {
        canvas.ontouchstart = function (event) {
            using = true
            var x = event.touches[0].clientX
            var y = event.touches[0].clientY
            if (eraserEnable) {
                context.clearRect(x - 5, y, 10, 10)
            } else {
                setLastPoint(x, y)
            }
        }

        canvas.ontouchmove = function (event) {
            if (!using) { return }

            var newX = event.touches[0].clientX
            var newY = event.touches[0].clientY
            if (eraserEnable) {
                context.clearRect(newX - 5, newY, 10, 10)
            } else {
                var lastX = lastPoint.x
                var lastY = lastPoint.y
                drawLine(newX, newY, lastX, lastY)
                setLastPoint(newX, newY)
            }
        }

        canvas.ontouchend = function (event) {
            using = false
        }
    }


}
