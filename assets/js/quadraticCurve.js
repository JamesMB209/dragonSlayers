class curveFunction extends MouseEvents {
    constructor(context, contextDraft) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
        this.counter = 0;
    }

    onMouseDown([xPos, yPos]) {
        console.log("curveFunction OnMouseDown is working");
        this.context.strokeStyle = colorStroke;
        this.contextDraft.strokeStyle = colorStroke;
        this.context.fillStyle = colorFill;
        this.contextDraft.fillStyle = colorFill;
        this.context.lineWidth = lineWidth;
        this.contextDraft.lineWidth = lineWidth;
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(xPos, yPos);
        if (this.counter % 2 == 0) {
            globalThis.xStartCurve = xPos;
            globalThis.yStartCurve = yPos;
        }
        this.counter++;
        console.log(this.counter)


    }

    onMouseDrag([xPos, yPos]) {
        console.log("onMouseDrag is running")
        this.draw([xPos, yPos]);
        console.log('draw')

    }

    onMouseUp([xPos, yPos]) {
        if (this.counter % 2 != 0) {
            console.log("onMouseUp1 is running")
            globalThis.xEndCurve = xPos;
            globalThis.yEndCurve = yPos;
            dragging = false;
        }
        if (this.counter % 2 == 0) {
            console.log('onMouseUp2 is running')
            this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
            this.context.beginPath();
            this.context.moveTo(xStartCurve, yStartCurve)
            this.context.quadraticCurveTo(xPos, yPos, xEndCurve, yEndCurve);
            this.context.stroke();
            dragging = false
        }
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index++;
    }

    draw([xPos, yPos]) {
        if (this.counter % 2 != 0) {
            console.log("draw1 is running")
            this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(xStartCurve, yStartCurve);
            this.contextDraft.quadraticCurveTo(xStartCurve, yStartCurve, xPos, yPos)
            this.contextDraft.stroke();
        }
        if (this.counter % 2 == 0) {
            console.log('draw2 is running')
            this.context
            this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(xStartCurve, yStartCurve)
            this.contextDraft.quadraticCurveTo(xPos, yPos, xEndCurve, yEndCurve);
            this.contextDraft.stroke();

        }

    }

}

$("#curveFunction").click(function() {
    console.log("curveFunction is working")
    console.log("check", context)
    currentFunction = new curveFunction(context, contextDraft);
    polygonactive = false;
});