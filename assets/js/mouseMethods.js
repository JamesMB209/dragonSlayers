/***************************************************************************
Mouse related events
****************************************************************************/


// loggin the mouse position
function mousePos(e) {
    this.yPos = e.offsetY;
    this.xPos = e.offsetX;
    //Turn this on if you want to see a runnning log of the position.
    // console.log(`x: ${xPos} y: ${yPos}`)
}

$('#canvasDraft').mousedown(function(e) {
    dragging = true;
    // console.log("down");
    mousePos(e);
    currentFunction.onMouseDown([xPos, yPos]);
});

$('#canvasDraft').mousemove(function(e) {
    mousePos(e);
    if (dragging == true) {
        currentFunction.onMouseDrag([xPos, yPos]);
    } else {
        currentFunction.onMouseMove([xPos, yPos]);
    }
})

$('#canvasDraft').mouseup(function(e) {
    dragging = false;
    // console.log("up")
    mousePos(e);
    currentFunction.onMouseUp([xPos, yPos]);
});

$('#canvasDraft').mouseleave(function(e) {
    dragging = false;
    mousePos(e);
    currentFunction.onMouseLeave([xPos, yPos]);
});

$('html').keyup(
    function(e) {
        currentFunction.onKeyup(e.key)
    });

class MouseEvents {
    constructor() {}
    onMouseDown() {}
    onMouseDrag() {}
    onMouseLeave() {}
    onMouseUp() {}
    onMouseMove() {}
    onKeyup() {}
}

$('body').click(function() {
    if (uploaded == true) {
        originimage.push(context.getImageData(0, 0, canvas.width, canvas.height));
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        uploaded = false;
        console.log("body click")
    }
})