class FillFunction extends MouseEvents {
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
        let imageData = this.context.getImageData(xPos, yPos, canvas.width, canvas.height);
        console.log(imageData.data[0]);
    }

    onMouseDrag([xPos, yPos]) {

    }

    onMouseUp([xPos, yPos]) {


        //code for Undo/Redo
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }
}

/***************************************************************************
Append the event listener for this function.
****************************************************************************/
$("#fillFunction").click(function() {
    currentFunction = new FillFunction(context, contextDraft);
    console.log("The fillbucket tool was selected.")
});