class iconFunction extends MouseEvents {
    constructor(context, contextDraft) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
        this.image = document.getElementById('dragon')
    }

    onMouseDown([xPos, yPos]) {
        console.log("iconFunction OnMouseDown is working");
        this.context.strokeStyle = colorStroke;
        this.contextDraft.strokeStyle = colorStroke;
        this.context.fillStyle = colorFill;
        this.contextDraft.fillStyle = colorFill;
        this.context.lineWidth = lineWidth;
        this.contextDraft.lineWidth = lineWidth;
        this.context.globalAlpha = 1;
        this.contextDraft.globalAlpha = 1;
        //this.contextDraft.beginPath();

        //this.contextDraft.moveTo(xPos, yPos);


        this.context.drawImage(this.image, xPos, yPos, 100, 100);
        console.log('stick')
    }

    onMouseMove([xPos, yPos]) {
        console.log("onMouseMove is running")
        this.draw([xPos, yPos]);
        console.log('draw')

    }

    onMouseUp([xPos, yPos]) {
        console.log("onMouseUp is running")
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        dragging = false;
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index++;
    }

    draw([xPos, yPos]) {
        console.log("draw is running")
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.contextDraft.drawImage(this.image, xPos, yPos, 100, 100);


    }

    onMouseLeave() {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    }

}

$("#iconFunction").click(function() {
    console.log("iconFunction is working")
    console.log("check", context)
    currentFunction = new iconFunction(context, contextDraft);
    polygonactive = false;
});