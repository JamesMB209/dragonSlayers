class PolygonFunction extends MouseEvents {
    constructor(context, contextDraft, logX, logY, line, undoX, undoY) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
    }
    onMouseDown([xPos, yPos]) {
        console.log("Triangle OnMouseDown is working");
        this.context.strokeStyle = colorStroke;
        this.context.fillStyle = colorFill;
        this.context.lineWidth = lineWidth;
        this.context.globalAlpha = transparency;
        this.context.lineJoin = "round";
        this.context.lineCap = "round";
        this.contextDraft.strokeStyle = colorStroke;
        this.contextDraft.fillStyle = colorFill;
        this.contextDraft.lineWidth = lineWidth;
        this.contextDraft.globalAlpha = transparency;
        this.contextDraft.lineJoin = "round"
        this.contextDraft.lineCap = "round";
        //fix the starting point for previewing on draft 
        this.startingX = xPos;
        this.startingY = yPos;
        console.log("polydone in mousedown before push", polydone)
        if (polydone == true) {
            logX.push(this.startingX);
            logY.push(this.startingY);
            polydone = false;
        }
        console.log("logX in onMouseDown", logX)
        console.log("starting", this.startingX, this.startingY);
        line += 1;
        console.log("Line numb", line)
    }
    onMouseDrag([xPos, yPos]) {
        console.log("onMouseDrag is running")
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.contextDraft.beginPath();
        this.contextDraft.strokeStyle = "red";
        this.context.beginPath();
        this.contextDraft.beginPath();
        console.log("logX", logX)
        console.log("logY", logY)
        if (xPos !== logX[0] && yPos !== logY[0]) {
            this.contextDraft.arc(logX[0], logY[0], 10, 0, 2 * Math.PI);
            this.contextDraft.moveTo(logX[line], logY[line]);
            this.contextDraft.lineTo(xPos, yPos);
            console.log("onmousedrag", xPos, yPos);
            this.contextDraft.stroke();
        }
    }
    onMouseUp([xPos, yPos]) {
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.context.beginPath();
        this.context.moveTo(logX[line], logY[line]);
        if (xPos !== logX[0] && yPos !== logY[0]) {
            console.log("line num onMouseUp", line)
            console.log("context pos count", Math.abs(xPos - logX[0]), Math.abs(yPos - logY[0]))
            if (Math.abs(xPos - logX[0]) < 30 && Math.abs(yPos - logY[0]) < 30) {
                console.log("done");
                this.context.lineTo(logX[0], logY[0]);
                this.context.closePath();
                this.context.fill();
                this.context.stroke();
                polydone = true;
                linelog.push(line);
                console.log("done linelog", linelog)
                line = -1;
                logX = [];
                logY = [];
                undoX = [];
                undoY = [];

                console.log("Done check value", logX, logY, line)
            } else {
                console.log("onMouseUp", xPos, yPos);
                logX.push(xPos);
                console.log("onMouseUp - logX", logX);
                logY.push(yPos);
                console.log("onMouseUp - logY", logY);
                this.context.lineTo(xPos, yPos);
                console.log("ending onmouseup", xPos, yPos);
                this.context.stroke();
            }
        } else {
            console.log("done")
            this.context.lineTo(logX[0], logY[0]);
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
            polydone = true;
            linelog.push(line);
            console.log("done linelog", linelog)
            line = -1;
            logX = [];
            logY = [];
            undoX = [];
            undoY = [];
            console.log("Done check value", logX, logY, line)
        }
        dragging = false;
        console.log("going to save")
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        console.log("index:", index, "restorearr", restore_array);
    }
}
$("#polygonFunction").click(function() {
    console.log("Polygon Function is working")
    currentFunction = new PolygonFunction(context, contextDraft);
    polygonactive = true;
});