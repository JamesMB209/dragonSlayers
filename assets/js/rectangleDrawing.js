class RectangleFunction extends MouseEvents {
    constructor(context, contextDraft) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
    }

    onMouseDown([xPos, yPos]) {
        //Record the starting position of the first click.
        this.xStart = xPos;
        this.yStart = yPos;

        //Set colour and style information for both canvas'
        this.context.fillStyle = colorFill;
        this.contextDraft.fillStyle = colorFill;
        this.context.globalAlpha = transparency;
        this.contextDraft.globalAlpha = transparency;
        this.context.strokeStyle = colorStroke;
        this.contextDraft.strokeStyle = colorStroke;
        this.context.lineWidth = lineWidth;
        this.contextDraft.lineWidth = lineWidth;
    }

    onMouseDrag([xPos, yPos]) {
        //Render and clear the rectangle on the draft canvas
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.fillRect(this.xStart, this.yStart, xPos - this.xStart, yPos - this.yStart);
        this.contextDraft.strokeRect(this.xStart, this.yStart, xPos - this.xStart, yPos - this.yStart);
    }

    onMouseUp([xPos, yPos]) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);

        //Render to the canvas.
        this.draw([xPos, yPos]);

        //code for Undo/Redo
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }

    draw([xPos, yPos]) {
        this.context.fillRect(this.xStart, this.yStart, xPos - this.xStart, yPos - this.yStart);
        this.context.strokeRect(this.xStart, this.yStart, xPos - this.xStart, yPos - this.yStart);
    }
}

/***************************************************************************
Append the event listener for this function.
****************************************************************************/
$("#rectangleFunction").click(function() {
    currentFunction = new RectangleFunction(context, contextDraft);
    console.log("The square tool was selected.")
    polygonactive = false;
});