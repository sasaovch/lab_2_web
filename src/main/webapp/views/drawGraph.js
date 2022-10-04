var graphCanvas;
var graph;
var graphColor;
var height;
var width;
var dots = [];

export {dots};

function drawLine(graph, startX, startY, endX, endY) {
    graph.moveTo(startX, startY);
    graph.lineTo(endX, endY);
    graph.stroke(); 
}

function fillText(graph, text, coordX, coordY) {
    graph.fillText(text, coordX, coordY);
}

function drawGraph() {
    graph.strokeStyle = graphColor;
    graph.fillStyle = graphColor;
    graph.clearRect(-200, -200, 400, 400);
    graph.globalAlpha = 1;
    graph.beginPath();
    drawLine(graph, -200, 0, 200, 0);
    drawLine(graph, 0, -200, 0, 200);
    
    drawLine(graph, -160, -5, -160, 5);
    drawLine(graph, -80, -5, -80, 5);
    drawLine(graph, 80, -5, 80, 5);
    drawLine(graph, 160, -5, 160, 5);
    
    drawLine(graph, -5, -160, 5, -160);
    drawLine(graph, -5, -80, 5, -80);
    drawLine(graph, -5, 80, 5, 80);
    drawLine(graph, -5, 160, 5, 160);
    
    drawLine(graph, 200, 0, 190, -10);
    drawLine(graph, 200, 0, 190, 10);
    drawLine(graph, 0, -200, 10, -190);
    drawLine(graph, 0, -200, -10, -190);
    
    graph.beginPath();
    graph.font = "14px Arial blod";
    fillText(graph, "x", 180, -10);
    fillText(graph, "y", 10, -180);
    
    fillText(graph, "-R", -160, 20);
    fillText(graph, "-R/2", -80, 20);
    fillText(graph, "R/2", 80, 20);
    fillText(graph, "R", 160, 20);
    
    fillText(graph, "R", -30, -160);
    fillText(graph, "R/2", -30, -80);
    fillText(graph, "-R", -30, 160);
    fillText(graph, "-R/2", -30, 80);

    graph.beginPath();
    graph.globalAlpha = 0.3;
    graph.fillStyle = "blue";
    graph.fillRect(-160, 160, 160, -160); 
    
    graph.arc(0, 0, 160, Math.PI, Math.PI * 3 / 2);
    graph.lineWidth = 0;
    graph.fill();
    graph.stroke();
    
    graph.beginPath();
    graph.moveTo(0, 0);
    graph.lineTo(-160, 0);
    graph.lineTo(0, -160);
    graph.fill();
    
    graph.beginPath();
    graph.moveTo(0, 0);
    graph.lineTo(80, 0);
    graph.lineTo(0, 160);
    graph.fill();

    drawDots();
}

function convertXToCanvasCoordinate(x, r, canvasR) {
    return (x / r * canvasR + width / 2);
}

function convertYToCanvasCoordinate(y, r, canvasR) {
    return (-y / r * canvasR + height / 2);
}

function drawDots() {
    dots.forEach((dot) => {
        const x = convertXToCanvasCoordinate(dot.x, dot.r, rValue)
        const y = convertYToCanvasCoordinate(dot.y, dot.r, rValue)
        ctx.fillStyle = cursorColor;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    })
}

function setOnMouseMove() {
    graphCanvas.onmousemove = (e) => {
        drawGraph();
        graph.fillStyle = graphColor;
        graph.strokeStyle = graphColor;
        graph.beginPath();
        graph.arc(e.offsetX - 200, e.offsetY - 200, 5, 0, Math.PI*2);
        graph.fill();
    }

    graphCanvas.onmouseleave = (e) => {
        drawGraph();
    };
}

function initialilzeGraph(color) {
    graphCanvas = document.getElementById('graph');
    graph = graphCanvas.getContext('2d');
    graph.translate(200, 200);
    graphColor = color;
    height = graphCanvas.height;
    width = graphCanvas.width;
    drawGraph();
    setOnMouseMove();
}

function setColorGraph(color) {
    graphColor = color;
    drawGraph();
}

export {setColorGraph, initialilzeGraph};