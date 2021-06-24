class PolygonFunction extends MouseEvents {
    constructor(context, contextDraft, logX, logY, line, undoX, undoY) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
        this.logX = [];
        this.logY = [];
        this.line = -1;
        this.undoX = [];
        this.undoY = [];
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
        if (polygonactive) {
            console.log("working in Polygon TF")
            if (polygonundo) {
                console.log("before undo LogXY", this.logX, this.logY, "line num", this.line)
                this.undoX.push(this.logX.pop());
                this.undoY.push(this.logY.pop());
                this.line -= 1;
                if (this.line == -1) {
                    this.undoX.push(this.logX.pop());
                    this.undoY.push(this.logY.pop());
                }
                polygonundo = false;
                console.log("undo is working : undo X", this.undoX, "undo Y", this.undoY, "line num", this.line)
                console.log("after undo LogXY", this.logX, this.logY)
            } else {
                console.log('NO action for undo')
            }
            if (polygonredo) {
                console.log("before redo UndoXY", this.undoX, this.undoY, "line num", this.line)
                this.logX.push(this.undoX.pop());
                this.logY.push(this.undoY.pop());
                this.line += 1;
                if (this.line == -1) {
                    this.logX.push(this.undoX.pop());
                    this.logY.push(this.undoY.pop());
                }
                polygonredo = false;
                console.log("undo is working : log X", this.logX, "log Y", this.logY, "line num", this.line);
                console.log('after redo UndoXY', this.undoX, this.undoY)
            } else {
                console.log('NO action for redo')
            }
        } else {
            console.log("No action")
        }
        this.startingX = xPos;
        this.startingY = yPos;
        if (this.logX.length == 0 && this.logY.length == 0) {
            this.logX.push(this.startingX);
            this.logY.push(this.startingY);
        }
        console.log("logX in onMouseDown", this.logX)
        console.log("starting", this.startingX, this.startingY);
        this.line += 1;
        console.log("Line numb", this.line)
    }
    onMouseDrag([xPos, yPos]) {
        console.log("onMouseDrag is running")
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.contextDraft.beginPath();
        this.contextDraft.strokeStyle = "red";
        this.context.beginPath();
        this.contextDraft.beginPath();
        console.log("logX", this.logX)
        console.log("logY", this.logY)
        if (xPos !== this.logX[0] && yPos !== this.logY[0]) {
            this.contextDraft.arc(this.logX[0], this.logY[0], 10, 0, 2 * Math.PI);
            this.contextDraft.moveTo(this.logX[this.line], this.logY[this.line]);
            this.contextDraft.lineTo(xPos, yPos);
            console.log("onmousedrag", xPos, yPos);
            this.contextDraft.stroke();
        }
    }
    onMouseUp([xPos, yPos]) {
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.context.beginPath();
        this.context.moveTo(this.logX[this.line], this.logY[this.line]);
        if (xPos !== this.logX[0] && yPos !== this.logY[0]) {
            console.log("line num onMouseUp", this.line)
            console.log("context pos count", Math.abs(xPos - this.logX[0]), Math.abs(yPos - this.logY[0]))
            if (Math.abs(xPos - this.logX[0]) < 30 && Math.abs(yPos - this.logY[0]) < 30) {
                console.log("done");
                this.context.lineTo(this.logX[0], this.logY[0])
                this.context.closePath();
                this.context.fill();
                this.context.stroke();
                this.logX = [];
                this.logY = [];
                this.line = -1;
                console.log("Done check value", this.logX, this.logY, this.line)
            } else {
                console.log("onMouseUp", xPos, yPos);
                this.logX.push(xPos);
                console.log("onMouseUp - logX", this.logX);
                this.logY.push(yPos);
                console.log("onMouseUp - logY", this.logY);
                this.context.lineTo(xPos, yPos);
                console.log("ending onmouseup", xPos, yPos);
                this.context.stroke();
            }
        } else {
            console.log("done")
            this.context.lineTo(this.logX[0], this.logY[0]);
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
            this.logX = [];
            this.logY = [];
            this.line = -1;
            console.log("Done check value", this.logX, this.logY, this.line)
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