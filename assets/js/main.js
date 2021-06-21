/* Gobal variables for all JS documents - this JS file must be imported first */

// setup the references to the elements
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// reference to the canvas draft element
let canvasDraft = document.getElementById("canvasDraft");
let contextDraft = canvasDraft.getContext("2d");

// current function variable
let currentFunction;
// keep track of whether or not the user is dragging the mouse
let dragging = false;
// keep track of current color stroke
let colorStroke = "#black";
// keep track of curerent color fill
let colorFill = "#white";
// keep track of width of line
let width = 3;

// setting up the canvas sizes
canvas.width = window.innerWidth - 60;
canvas.height = 400;
canvasDraft.width = window.innerWidth - 60;
canvasDraft.height = 400;

// loggin the mouse position
function mousePos(e) {
    let yPos = e.offsetY;
    let xPos = e.offsetX;
    console.log(`x: ${xPos} y: ${yPos}`)
    return [xPos, yPos];
}

$('#canvas').mousedown(function (e) {
    dragging = true;
    console.log("down");
    currentFunction(mousePos(e)); // not sure if this is a great way to do this
    currentFunction = lineFunctionEnd; // this was werid 
});

$('#canvas').mousemove(function (e) {
    if (dragging == true) {
        mousePos(e);
    }
})

$('#canvas').mouseup(function (e) {
    dragging = false;
    console.log("up")
    currentFunction(mousePos(e));
});

$('#canvas').mouseleave(function (e) {
    dragging = false;
    mousePos(e);
    console.log("leave")
});

$("#lineFunction").click(function () { 
    currentFunction = lineFunctionStart; //we put some werid names here
    console.log("something happened")
});



// this doesnt make sense/
function lineFunctionStart (xPos, yPos) {
    context.beginPath();
    context.moveTo(xPos, yPos)
}

function lineFunctionEnd (xPos, yPos) {
    context.lineTo(xPos, yPos);
    context.stroke();
}