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
        // console.log("polydone in mousedown before push", polydone)
        if (polydone == true) {
            logX.push(this.startingX);
            logY.push(this.startingY);
            polydone = false;
        }

        // tracking the last position of X & Y for continue drawing from last point 
        line += 1;

    }
    onMouseDrag([xPos, yPos]) {
        console.log("onMouseDrag is running")
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.contextDraft.beginPath();
        // make the initial point as red for easy capture
        this.contextDraft.strokeStyle = "red";
        this.context.beginPath();
        this.contextDraft.beginPath();

        // check if it is a starting point of drawing
        if (xPos !== logX[0] && yPos !== logY[0]) {
            this.contextDraft.arc(logX[0], logY[0], 10, 0, 2 * Math.PI);
            this.contextDraft.moveTo(logX[line], logY[line]);
            this.contextDraft.lineTo(xPos, yPos);
            this.contextDraft.stroke();
        }
    }

    onMouseUp([xPos, yPos]) {
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.context.beginPath();
        this.context.moveTo(logX[line], logY[line]);

        // check whether close to the start point and closepath for the polygon
        if (xPos !== logX[0] && yPos !== logY[0]) {
            if (Math.abs(xPos - logX[0]) < 30 && Math.abs(yPos - logY[0]) < 30) {
                // console.log("done");
                this.context.lineTo(logX[0], logY[0]);
                this.context.closePath();
                this.context.fill();
                this.context.stroke();

                // restore all default value after finished drawing
                polydone = true;
                linelog.push(line);
                console.log("done linelog", linelog)
                line = -1;
                logX = [];
                logY = [];
                undoX = [];
                undoY = [];

            } else {
                // for continue drawing
                logX.push(xPos);
                logY.push(yPos);
                this.context.lineTo(xPos, yPos);
                this.context.stroke();
            }
        } else {

            // for pointing the start point
            this.context.lineTo(logX[0], logY[0]);
            this.context.closePath();
            this.context.fill();
            this.context.stroke();

            // restore all default value after finished drawing
            polydone = true;
            linelog.push(line);
            line = -1;
            logX = [];
            logY = [];
            undoX = [];
            undoY = [];
        }
        dragging = false;

        // saving image for undo / redo function
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;

    }
}
$("#polygonFunction").click(function() {
    console.log("Polygon Function is working")
    currentFunction = new PolygonFunction(context, contextDraft);
    polygonactive = true;
});