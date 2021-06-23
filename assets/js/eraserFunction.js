class eraserFunction extends MouseEvents {
    constructor(context, contextDraft) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
    }

    onMouseDown([xPos, yPos]) {
        console.log("eraserFunction OnMouseDown is working");
        this.context.strokeStyle = "white";
        this.context.lineWidth = lineWidth;
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
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
        this.context.strokeStyle = "black";
        this.context.lineCap = "butt";
        this.context.lineJoin = "miter";

        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        console.log("index:", index, "restorearr", restore_array)
    }

    draw([xPos, yPos]) {
        console.log("draw is running")
        // this.context.beginPath();
        this.context.lineTo(xPos, yPos);
        console.log("lineTo is okay")
        // this.context.moveTo(xPos, yPos);
        // console.log("moveto is okay")
        // this.context.closePath();
        // console.log("closepath okay")
        this.context.stroke();
        console.log("draw finish")
    }

}

$("#eraserFunction").click(function () {
    console.log("eraserFunction is working")
    console.log("check", context)
    currentFunction = new eraserFunction(context, contextDraft);
});
currentFunction = new eraserFunction(context, contextDraft);