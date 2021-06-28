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
        this.context.moveTo(xPos, yPos);
        this.draw([xPos, yPos]);

    }

    onMouseDrag([xPos, yPos]) {
        // console.log("onMouseDrag is running")
        this.draw([xPos, yPos]);
    }

    onMouseUp([xPos, yPos]) {
        // console.log("onMouseUp is running")
        this.draw([xPos, yPos])
        dragging = false;

        // restore the default values
        this.context.strokeStyle = "black";
        this.context.lineCap = "butt";
        this.context.lineJoin = "miter";

        // saving image for undo redo function
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        console.log("index:", index, "restorearr", restore_array)
    }

    draw([xPos, yPos]) {
        this.context.lineTo(xPos, yPos);
        this.context.stroke();

    }

}

$("#eraserFunction").click(function() {
    console.log("eraserFunction is working")
    currentFunction = new eraserFunction(context, contextDraft);
    polygonactive = false;
});