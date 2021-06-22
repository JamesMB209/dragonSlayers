class StraightLineFunction extends MouseEvents {
    constructor(context, contextDraft) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
    }

    onMouseDown([xPos, yPos]) {
        console.log("StraightLine OnMouseDown is working");
        this.context.strokeStyle = colorStroke;
        this.context.fillStyle = colorFill;
        this.context.lineWidth = width;
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
        //fix the starting point for previewing on draft
        this.startingX = xPos;
        this.startingY = yPos;
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.startingX, this.startingY);
    }

    onMouseDrag([xPos, yPos]) {
        console.log("onMouseDrag is running")
        this.contextDraft.clear_canvas();
        this.contextDraft.lineTo()
    }

    onMouseUp([xPos, yPos]) {
        console.log("onMouseUp is running")
        this.draw([xPos, yPos])
        dragging = false;
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        console.log("index:", index, "restorearr", restore_array)
    }

    draw([xPos, yPos]) {
        console.log("draw is running")
        this.context.lineTo(xPos, yPos);
        console.log("lineTO is okay")
            // this.context.moveTo(xPos, yPos);
            // console.log("moveto is okay")
            // this.context.closePath();
            // console.log("closepath okay")
        this.context.stroke();
        console.log("draw finish")
    }

}

$("#PenFunction").click(function() {
    console.log("PenFunction is working")
    console.log("check", context)
    currentFunction = new StraightLineFunction(context, contextDraft);
});