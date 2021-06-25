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

        return (r == this.startR && g == this.startG && b == this.startB);
    }

    colorPixel(pixelPos) {
        this.imageData.data[pixelPos] = 26;
        this.imageData.data[pixelPos + 1] = 6;
        this.imageData.data[pixelPos + 2] = 45;
        this.imageData.data[pixelPos + 3] = 255;
    }

    onMouseDown([xPos, yPos]) {
        //Record the starting position of the first click.
        this.xStart = xPos;
        this.yStart = yPos;
        

        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        this.imageData = this.context.getImageData(0, 0, canvas.width, canvas.height);
        


        let pixelStack = [[this.xStart, this.yStart]];

        while (pixelStack.length) {
            let newPos, x, y, pixelPos, reachLeft, reachRight;

            newPos = pixelStack.pop();
            x = newPos[0];
            y = newPos[1];

            pixelPos = (y * canvasWidth + x) * 4;
            console.log("start pos", x, y);
            console.log("first absolute pixPos", pixelPos);
            console.log("the result of matchColour", this.matchStartColor(pixelPos))
            while (y-- >= 0 && this.matchStartColor(pixelPos)) {
                pixelPos -= canvasWidth * 4;
            }

            pixelPos += canvasWidth * 4;
            ++y;

            console.log(pixelPos);

            reachLeft = false;
            reachRight = false;
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

                //There is a problem here.
                // http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/ this is the guide im following.
                // if (x < canvasWidth - 1) {
                //     if (this.matchStartColor(pixelPos + 4)) {
                //         if (!reachRight) {
                //             pixelStack.push([x + 1, y]);
                //             reachRight = true;
                //         }
                //     }
                //     else if (reachRight) {
                //         reachRight = false;
                //     }
                // }
                // pixelPos += canvasWidth * 4;
            }
        }
        console.log(this.imageData)
        this.context.putImageData(this.imageData, 0, 0);
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