class FillFunction extends MouseEvents {
    constructor(context, contextDraft) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
    }

    matchStartColor(pixelPos) {
        let r = this.imageData.data[pixelPos];
        let g = this.imageData.data[pixelPos + 1];
        let b = this.imageData.data[pixelPos + 2];

        // console.log(r);
        // console.log(g);
        // console.log(b);

        return (r == this.startR && g == this.startG && b == this.startB);
    }

    startColor() {
        this.selectedPixel = this.context.getImageData(this.xStart, this.yStart, 1, 1);
        // console.log(this.selectedPixel);

        this.startR = this.selectedPixel.data[0];
        this.startG = this.selectedPixel.data[1];
        this.startB = this.selectedPixel.data[2];

        // console.log(this.startR);
        // console.log(this.startG);
        // console.log(this.startB);
    }

    colorPixel(pixelPos) {
        this.selectedPixel.data[pixelPos] = 25;
        this.selectedPixel.data[pixelPos + 1] = 25;
        this.selectedPixel.data[pixelPos + 2] = 25;
        this.selectedPixel.data[pixelPos + 3] = 255;
    }

    changeColour() { }

    onMouseDown([xPos, yPos]) {
        //Record the starting position of the first click.
        this.xStart = xPos;
        this.yStart = yPos;
        this.startColor();

        this.imageData = this.context.getImageData(0, 0, canvas.width, canvas.height);
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;



        let pixelStack = [[this.xStart, this.yStart]];

        while (pixelStack.length) {
            let newPos, x, y, pixelPos, reachLeft, reachRight;

            newPos = pixelStack.pop();
            x = newPos[0];
            y = newPos[1];

            pixelPos = (y * canvasWidth + x) * 4;
            while (y-- >= 0 && this.matchStartColor(pixelPos)) {
                pixelPos -= canvasWidth * 4;
            }

            pixelPos += canvasWidth * 4;
            ++y;

            reachLeft = false;
            reachRight = false;
            //There is a problem here.
            // http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/ this is the guide im following.
            while (y++ < canvasHeight - 1 && this.matchStartColor(pixelPos)) {
                this.colorPixel(pixelPos);

                if (x > 0) {
                    if (this.matchStartColor(pixelPos - 4)) {
                        if (!reachLeft) {
                            pixelStack.push([x - 1, y]);
                            reachLeft = true;
                        }
                    }
                    else if (reachLeft) {
                        reachLeft = false;
                    }
                }

                if (x < canvasWidth - 1) {
                    if (this.matchStartColor(pixelPos + 4)) {
                        if (!reachRight) {
                            pixelStack.push([x + 1, y]);
                            reachRight = true;
                        }
                    }
                    else if (reachRight) {
                        reachRight = false;
                    }
                }
                pixelPos += canvasWidth * 4;
            }
        }
        this.context.putImageData(this.selectedPixel, 0, 0);
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
$("#fillFunction").click(function () {
    currentFunction = new FillFunction(context, contextDraft);
    console.log("The fillbucket tool was selected.")
});