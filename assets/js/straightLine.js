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
        this.context.lineWidth = lineWidth;
        this.context.globalAlpha = transparency;
        this.contextDraft.strokeStyle = colorStroke;
        this.contextDraft.fillStyle = colorFill;
        this.contextDraft.lineWidth = lineWidth;
        this.contextDraft.globalAlpha = transparency;

        //fix the starting point for previewing on draft
        this.startingX = xPos;
        this.startingY = yPos;
    }

    onMouseDrag([xPos, yPos]) {

        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.startingX, this.startingY);
        this.contextDraft.lineTo(xPos, yPos);
        this.contextDraft.stroke();

    }

    onMouseUp([xPos, yPos]) {

        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.context.beginPath();
        this.context.moveTo(this.startingX, this.startingY);
        this.context.lineTo(xPos, yPos);
        this.context.stroke();
        dragging = false;

        // saving image for redo undo function
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }

}

$("#straightLineFunction").click(function() {

    currentFunction = new StraightLineFunction(context, contextDraft);
    polygonactive = false;
});