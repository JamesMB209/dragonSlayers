class PenFunction extends MouseEvents {
    constructor(context, contextDraft) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
    }

    onMouseDown([xPos, yPos]) {
        // console.log("PenFunction OnMouseDown is working");
        this.context.strokeStyle = colorStroke;
        this.context.fillStyle = colorFill;
        this.context.lineWidth = lineWidth;
        this.context.globalAlpha = transparency;
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
        this.context.beginPath();
        // console.log("beginpath work")
        this.context.moveTo(xPos, yPos);
        // console.log("moveto in mousedown")
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

        // restore the lineCap & LineJoin Value to default
        this.context.lineCap = "butt";
        this.context.lineJoin = "miter";

        // saving image for undo function
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        // console.log("index:", index, "restorearr", restore_array)
    }

    draw([xPos, yPos]) {
        // console.log("draw is running")
        this.context.lineTo(xPos, yPos);
        this.context.stroke();
        // console.log("draw finish")
    }

}

/***************************************************************************
Append the event listener for this function.
****************************************************************************/

$("#penFunction").click(function() {
    console.log("PenFunction was selected")
        // console.log("check", context)
    currentFunction = new PenFunction(context, contextDraft);
    polygonactive = false;
});

/***************************************************************************
This tool has been set as the defualt tool from the below code. 
MOVE THIS CODE TO ANOTHER .JS TO CHANGE THE DEFAULT.
****************************************************************************/

currentFunction = new PenFunction(context, contextDraft);