class lineFunction extends MouseEvents {
    constructor(context, contextDraft) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
    }

    onMouseDown(xPos, yPos) {
        console.log("lineFunction OnMouseDown is working");
        this.context.strokeStyle = colorStroke;
        this.context.fillStyle = colorFill;
        this.context.lineWidth = width;
        this.context.beginPath();
        this.context.moveTo(xPos, yPos);
        this.draw(xPos, yPos);
    }

    onMouseDrag(xPos, yPos) {
        console.log("onMouseDrag is running")
        this.draw(xPos, yPos);
    }

    onMouseUp(xPos, yPos) {
        console.log("onMouseUp is running")
        this.draw(xPos, yPos)
        dragging = false;
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }

    draw(xPos, yPos) {
        console.log("draw is running")
        this.context.beginPath();
        this.context.moveTo(xPos, yPos);
        this.context.lineTo(xPos, yPos);
        this.context.closePath();
        this.context.stroke();
        console.log("draw finish")
    }

}

$("#lineFunction").click(function() {
    console.log("lineFunction is working")
    currentFunction = new lineFunction(context, contextDraft);
});