class lineFunction extends MouseEvents {
    constructor(context, contextDraft) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
    }

    onMouseDown([xPos, yPos]) {
        console.log("lineFunction OnMouseDown is working");
        this.context.strokeStyle = colorStroke;
        this.context.fillStyle = colorFill;
        this.context.lineWidth = width;
        this.context.beginPath();
        console.log("beginpath work")
        this.context.moveTo(xPos, yPos);
        console.log("moveto in mousedown")
        this.draw([xPos, yPos]);

    }

    onMouseDrag([xPos, yPos]) {
        console.log("onMouseDrag is running")
        this.draw([xPos, yPos]);
    }

    onMouseUp([xPos, yPos]) {
        console.log("onMouseUp is running")
        this.draw([xPos, yPos])
        dragging = false;
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }

    draw([xPos, yPos]) {
        console.log("draw is running")
            // this.context.beginPath();
        this.context.lineTo(xPos, yPos);
        console.log("lineTO is okay")
        this.context.moveTo(xPos, yPos);
        console.log("moveto is okay")
        this.context.closePath();
        console.log("closepath okay")
        this.context.stroke();
        console.log("draw finish")
    }

}

$("#lineFunction").click(function() {
    console.log("lineFunction is working")
    console.log("check", context)
    currentFunction = new lineFunction(context, contextDraft);
});