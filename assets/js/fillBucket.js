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
        this.imageData.data[pixelPos] = this.bucketFillColor.r;
        this.imageData.data[pixelPos + 1] = this.bucketFillColor.g;
        this.imageData.data[pixelPos + 2] = this.bucketFillColor.b;
        this.imageData.data[pixelPos + 3] = 255;
    }

    hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF") shamelessy stolen.
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }


    onMouseDown([xPos, yPos]) {
        this.xStart = xPos;
        this.yStart = yPos;

        // check the starting color on the location of the click 
        let startingColor = this.context.getImageData(xPos, yPos, 1, 1);
        this.startR = startingColor.data[0];
        this.startG = startingColor.data[1];
        this.startB = startingColor.data[2];

        //set the colour of the fill
        this.bucketFillColor = this.hexToRgb(colorFill);

        //only allow the code the run if the chosen colour is differnt.
        //otherwise it will paint over itself in the while loop.
        if (startingColor.data[0] == this.bucketFillColor.r &&
            startingColor.data[1] == this.bucketFillColor.g &&
            startingColor.data[2] == this.bucketFillColor.b) {
            } else {

            let canvasWidth = canvas.width;
            let canvasHeight = canvas.height;
            this.imageData = this.context.getImageData(0, 0, canvas.width, canvas.height);

            let pixelStack = [
                [this.xStart, this.yStart]
            ];

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
                while (y++ < canvasHeight - 1 && this.matchStartColor(pixelPos)) {
                    this.colorPixel(pixelPos);

                    if (x > 0) {
                        if (this.matchStartColor(pixelPos - 4)) {
                            if (!reachLeft) {
                                pixelStack.push([x - 1, y]);
                                reachLeft = true;
                            }
                        } else if (reachLeft) {
                            reachLeft = false;
                        }
                    }

                    if (x < canvasWidth - 1) {
                        if (this.matchStartColor(pixelPos + 4)) {
                            if (!reachRight) {
                                pixelStack.push([x + 1, y]);
                                reachRight = true;
                            }
                        } else if (reachRight) {
                            reachRight = false;
                        }
                    }
                    pixelPos += canvasWidth * 4;
                }
            }
            this.context.putImageData(this.imageData, 0, 0);
        }
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
    polygonactive = false;
});