var canvasJquery = $('#canvas');
var canvas = canvasJquery[0];
var lines = [];

lines.push({x1: 150, y1:150, x2:300, y2:300});

var mouseDown = false;

var drag1 = false;
var drag2 = false;
var dragCenter = false;

var mouseX = 0;
var mouseY = 0;


var context = canvas.getContext("2d");
context.lineWidth = 4;

drawLines();
var index = 0;
function drawLines(){
    context.clearRect(0,0,canvas.width, canvas.height)
    for(var line in lines){
        context.beginPath();
        context.moveTo(lines[line].x1, lines[line].y1);
        context.lineTo(lines[line].x2, lines[line].y2);
        context.stroke();
        context.closePath();
    }
}

function mouseDownEvent(event){
    mouseDown = true;
    var clickX = event.offsetX;
    var clickY = event.offsetY;

    mouseX = clickX;
    mouseY = clickY;
    index = 0
    for(var line in lines){
        if((clickX < lines[line].x1 + 5  && clickX > lines[line].x1 - 5) && (clickY < lines[line].y1 + 5 && clickY > lines[line].y1 - 5 )){
            drag1 = true;
            $('#action').html("Movendo canto 1");
            break;
        } else if((clickX < lines[line].x2 + 5  && clickX > lines[line].x2 - 5) && (clickY < lines[line].y2 + 5 && clickY > lines[line].y2 - 5 )){
            drag2 = true;
            $('#action').html("Movendo canto 2");
            break;
        } else if((clickX < (lines[line].x1 + lines[line].x2)/2 + 15  && clickX > (lines[line].x1 + lines[line].x2)/2 - 15) && (clickY < (lines[line].y1 + lines[line].y2)/2 + 15 && clickY > (lines[line].y1 + lines[line].y2)/2 - 15 )){
            dragCenter = true;
            $('#action').html("Arrastando reta");
            break;
        }
        index++;
    }
}

function mouseUpEvent(event){
    mouseDown = false;
    drag1 = false;
    drag2 = false;
    dragCenter = false;
    $('#action').html("Nenhuma ação sendo executada");
}


function mouseMoveEvent(event){
    if(mouseDown){
        if(drag1){
            lines[index].x1 = event.offsetX;
            lines[index].y1 = event.offsetY
            drawLines();
        }
        if(drag2){
            lines[index].x2 = event.offsetX;
            lines[index].y2 = event.offsetY;
            drawLines();
        }
        if(dragCenter){
            var diffX = mouseX - event.offsetX;
            var diffY = mouseY - event.offsetY;
            mouseX = event.offsetX;
            mouseY = event.offsetY;

            lines[index].x1 = lines[index].x1 - diffX;
            lines[index].y1 = lines[index].y1 - diffY;
            lines[index].x2 = lines[index].x2 - diffX;
            lines[index].y2 = lines[index].y2 - diffY;
            drawLines();
        }
    }
}

function rightClickEvent(event){
    event.preventDefault();
    var clickX = event.offsetX;
    var clickY = event.offsetY;

    mouseX = clickX;
    mouseY = clickY;
    index = 0
    for(var line in lines){
        for(var i = 0; i<1; i+=0.01){
            var x = lines[line].x1 + (lines[line].x2 - lines[line].x1)*i;
            var y = lines[line].y1 + (lines[line].y2 - lines[line].y1)*i;

            if((clickX < x + 5  && clickX > x - 5) && (clickY < y + 5 && clickY > y - 5 )){
                lines.push({
                    x1: clickX - 2,
                    y1: clickY - 2,
                    x2: lines[line].x2,
                    y2: lines[line].y2
                });
                lines[line].x2 = clickX + 2;
                lines[line].y2 = clickY + 2;
                drawLines();
                return;
            }
        }

        index++;
    }
}

function createPolygon(sides){
    var numberOfSides = sides,
    size = 100,
    canvasWidth = canvas.width,
    canvasHeight = canvas.height,
    Xcenter = canvasWidth/2,
    Ycenter = canvasHeight/2;

    /* inicializa coordenadas */
    var x1 = Xcenter +  size * Math.cos(0),
        y1 = Ycenter +  size *  Math.sin(0),
        x2 = 0,
        y2 = 0;

    for (var i = 1; i <= numberOfSides;i += 1) {
        x2 = Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides);
        y2 = Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides);
        lines.push({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        });
        x1 = x2;
        y1 = y2;
    }

    drawLines();

}

canvas.addEventListener("mousedown", mouseDownEvent);
canvas.addEventListener("mouseup", mouseUpEvent);
canvas.addEventListener("mousemove", mouseMoveEvent, false);
canvas.addEventListener("contextmenu", rightClickEvent);
$("#form-canvas").submit(function(e){
    e.preventDefault();
    createPolygon($("#num").val());
})

$("#button-clean").click(function(e){
    lines = [];
    drawLines();
})
