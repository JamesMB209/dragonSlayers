class TextFunction extends MouseEvents {
    constructor(context, contextDraft) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
        this.inputString = "Text here";
        this.keyPressCount = 0;
        this.contextDraft.font = "20px Arial";
    }

    onMouseDown([xPos, yPos]) {
        //Record the starting position of the first click.
        this.xStart = xPos;
        this.yStart = yPos;
    }

    onMouseDrag([xPos, yPos]) {
        this.offSet = yPos - this.yStart
        this.contextDraft.font = `${this.offSet}px Arial`;
        this.context.font = `${this.offSet}px Arial`;
        this.drawPreview();
    }

    onMouseMove([xPos, yPos]) {
        this.drawInputBox();
    }

    onKeyup(pressedKey) {
        //Proccess the input so the first key clears the text box and then add the charcter, with "Backspace" logic.
        switch (this.keyPressCount) {
            case 0:
                this.inputString = "";
                this.drawInputBox();
                this.keyPressCount++;
            default:
                console.log(pressedKey)
                if (pressedKey == "Backspace") { this.inputString = this.inputString.slice(0, -1) }
                else { this.inputString += pressedKey; }
                this.drawInputBox();
                this.keyPressCount++;
        }
    }

    onMouseUp([xPos, yPos]) {
        // Write the text to the main canvas.
        this.draw()

        // Reset the default values.
        this.contextDraft.font = "20px Arial";
        this.context.font = "20px Arial";
        this.offSet = 0;

        // Code for Undo/Redo.
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }

    draw() {
        this.context.fillStyle = colorStroke;
        this.context.fillText(`${this.inputString}`, this.xStart, this.yStart + this.offSet);
    }

    drawInputBox() {
        //create a sample text box area.
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.strokeRect(xPos + 5, yPos + 5, 80, 30);
        this.contextDraft.fillStyle = "white";
        this.contextDraft.fillRect(xPos + 6, yPos + 6, 80, 30)

        //print the draft text inside the box.
        this.contextDraft.fillStyle = colorStroke;
        this.contextDraft.fillText(`${this.inputString}`, xPos + 8, yPos + 32);
    }

    drawPreview() {
        //print the draft text without the box to help with visualization.
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.fillStyle = colorStroke;
        this.contextDraft.fillText(`${this.inputString}`, this.xStart, this.yStart + this.offSet);
    }
}

/***************************************************************************
Append the event listener for this function.
****************************************************************************/
$("#textFunction").click(function () {
    currentFunction = new TextFunction(context, contextDraft);
    console.log("The text tool was selected.")
});