/* Gobal variables for all JS documents - this JS file must be imported first */

// setup the references to the elements
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// reference to the canvas draft element
let canvasDraft = document.getElementById("canvasDraft");
let contextDraft = canvasDraft.getContext("2d");
let start_background_color = "white";

// current function variable
let currentFunction;
// keep track of whether or not the user is dragging the mouse
let dragging = false;
// keep track of current color stroke
let colorStroke = "#black";
// keep track of curerent color fill
let colorFill = start_background_color;
// keep track of width of line
let width = 3;
// saving the drawing for undo function
let restore_array = [];
// keep tracking for undo function
let index = -1;
/// saving the drawing for redo function
let redo_array = [];
// keep tracking for redo function
let reindex = -1;


// setting up the canvas sizes
canvas.width = window.innerWidth - 60;
canvas.height = 400;
canvasDraft.width = window.innerWidth - 60;
canvasDraft.height = 400;

// loggin the mouse position
function mousePos(e) {
    this.yPos = e.offsetY;
    this.xPos = e.offsetX;
    // console.log(`x: ${xPos} y: ${yPos}`)
    // return [xPos, yPos];
}

$('#canvas').mousedown(function(e) {
    dragging = true;
    console.log("down");
    mousePos(e);
    currentFunction.onMouseDown([xPos, yPos]);

});

$('#canvas').mousemove(function(e) {
    mousePos(e);
    if (dragging == true) {
        currentFunction.onMouseDrag([xPos, yPos]); //changed from onMouseMove
    } else {
        currentFunction.onMouseMove([xPos, yPos])
    }
})

$('#canvas').mouseup(function(e) {
    dragging = false;
    console.log("up")
    mousePos(e);
    currentFunction.onMouseUp([xPos, yPos]);
});

$('#canvas').mouseleave(function(e) {
    dragging = false;
    console.log("leave");
    mousePos(e);
    currentFunction.onMouseLeave([xPos, yPos]);
})


function clear_canvas() {
    context.fillStyle = start_background_color;
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log("clear function is working")
}

function undo_last() {
    if (index >= 0) {
        console.log("before index", index)
        redo_array.push(restore_array.pop());
        reindex += 1;
        index -= 1;
        if (index < 0) {
            clear_canvas();
        } else {
            context.putImageData(restore_array[index], 0, 0);
        };
        console.log("checking", "Index:", index, "reindex:", reindex, "restore", restore_array, "redo", redo_array)
    }
}

function redo_last() {
    if (reindex > -1) {
        ctx.putImageData(redo_array[reindex], 0, 0);
        restore_array.push(redo_array.pop());
        reindex -= 1;
        index += 1;
    }
}

class MouseEvents {
    constructor() {}
    onMouseDown() {}
    onMouseDrag() {}
    onMouseLeave() {}
    onMouseUp() {}
    onMouseMove() {}
}