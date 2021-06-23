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
        this.contextDraft.strokeStyle = colorStroke;
        this.contextDraft.fillStyle = colorFill;
        this.contextDraft.lineWidth = lineWidth;
        //fix the starting point for previewing on draft
        this.startingX = xPos;
        this.startingY = yPos;
        console.log("contextDraft :", this.startingX, this.startingY);
    }

    onMouseDrag([xPos, yPos]) {
        console.log("onMouseDrag is running")
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.startingX, this.startingY);
        this.contextDraft.lineTo(xPos, yPos);
        this.contextDraft.stroke();
        console.log("onmousedrag", this.contextDraft.lineTo(xPos, yPos));
    }

    onMouseUp([xPos, yPos]) {
        console.log("onMouseUp is running");
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.context.beginPath();
        this.context.moveTo(this.startingX, this.startingY);
        this.context.lineTo(xPos, yPos);
        this.context.stroke();
        dragging = false;
        console.log("going to save")
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        console.log("index:", index, "restorearr", restore_array);

    }

}

$("#straightLineFunction").click(function() {
    console.log("Straight Line is working")
    currentFunction = new StraightLineFunction(context, contextDraft);
});