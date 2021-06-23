class circleFunction extends MouseEvents {
    constructor(context, contextDraft) {
        super();
        this.context = context;
        this.contextDraft = contextDraft;
    }

    onMouseDown([xPos, yPos]) {
        console.log("circleFunction OnMouseDown is working");
        this.context.strokeStyle = colorStroke;
        this.contextDraft.strokeStyle = colorStroke;
        this.context.fillStyle = colorFill;
        this.contextDraft.fillStyle = colorFill;
        this.context.lineWidth = lineWidth;
        this.contextDraft.lineWidth = lineWidth;
        //this.contextDraft.beginPath();
       
        //this.contextDraft.moveTo(xPos, yPos);
     
        this.drawStart([xPos,yPos]);
   

    }

    onMouseDrag([xPos, yPos]) {
        console.log("onMouseDrag is running")
        this.draw([xPos, yPos]);
        console.log('draw')
       
    }

    onMouseUp([xPos, yPos]) {
        console.log("onMouseUp is running")
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        console.log('clear')
        var xEnd = xPos;
        var yEnd = yPos;
        var radiusEnd = (((xEnd-xStart)**2)+((yEnd-yStart)**2))**(1/2);
        console.log(radiusEnd)
        this.context.beginPath();
        this.context.arc(xStart, yStart,radiusEnd,0,2*Math.PI);
        this.context.stroke();
        console.log('stick')
        dragging = false;
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index ++;
    }
    drawStart([xPos,yPos]){
        console.log('drawstart');
        globalThis.xStart = xPos;
        globalThis.yStart = yPos;
        this.contextDraft.arc(xStart, yStart,0,0,2*Math.PI); //starting circle with a radius of zero
        
    }
    draw([xPos, yPos]) {
        console.log("draw is running")
        this.contextDraft.clearRect(0, 0, canvas.width, canvas.height);
        this.contextDraft.beginPath();
        var radius = (((xPos-xStart)**2)+((yPos-yStart)**2))**(1/2)
        console.log(radius)
        this.contextDraft.arc(xStart, yStart,radius,0,2*Math.PI); //starting circle with a radius of zero
        console.log("circle resize is okay")
        this.contextDraft.stroke();
        console.log("draw finish")
    }

}

$("#circleFunction").click(function() {
    console.log("circleFunction is working")
    console.log("check", context)
    currentFunction = new circleFunction(context, contextDraft);
});