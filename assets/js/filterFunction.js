// the saved original image will recover the data for removing the filter effect
function removefilter(originimg) {
    if (filterselect == true) {
        for (var j = 0; j < originimg.width; j++) {
            for (var i = 0; i < originimg.height; i++) {
                var pixel = (i * 4) * originimg.width + (j * 4); // start from zero
                originimg.data[pixel] = originimg.data[pixel]; // red channel
                originimg.data[pixel + 1] = originimg.data[pixel + 1]; //green channel
                originimg.data[pixel + 2] = originimg.data[pixel + 1]; //blue channel
            }
        }
        context.putImageData(originimg, 0, 0);
        filterselect = false;
    }
}


$(".filter").on("click", function() {
    polygonactive = false;
    console.log("filter is started")

    // for selecting which filter to be ran
    var id = $(this).attr("id");

    // for triggering the removefilter function 
    filterselect = true;

    // saving the original image data
    if (uploaded == true) {
        originimage.push(context.getImageData(0, 0, canvas.width, canvas.height));
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        uploaded = false;
    }

    // running the removefilter function with original image data
    removefilter(originimage[1])

    // using current image data for adding effect
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);


    //running every pixel on the canvas
    for (var j = 0; j < imageData.width; j++) {
        for (var i = 0; i < imageData.height; i++) {
            var pixel = (i * 4) * imageData.width + (j * 4); // start from zero


            if (id == "grayscale") {
                var gray = (imageData.data[pixel] + imageData.data[pixel + 1] + imageData.data[pixel + 2]) / 3;
                imageData.data[pixel] = gray; // red channel
                imageData.data[pixel + 1] = gray; //green channel
                imageData.data[pixel + 2] = gray; //blue channel
            } else if (id == "blue") {
                imageData.data[pixel] = 0; //  red channel
                imageData.data[pixel + 1] = 0; // green channel
            } else if (id == "green") {
                imageData.data[pixel] = 0; // red channel
                imageData.data[pixel + 2] = 0; // blue channel
            } else if (id == "red") {
                imageData.data[pixel + 1] = 0; //green channel
                imageData.data[pixel + 2] = 0; // blue channel
            } else if (id == "brighter") {
                imageData.data[pixel] += 10; // red
                imageData.data[pixel + 1] += 10; // green
                imageData.data[pixel + 2] += 10; // blue
            } else if (id == "darker") {
                imageData.data[pixel] -= 10; // red
                imageData.data[pixel + 1] -= 10; // green
                imageData.data[pixel + 2] -= 10; // blue
            }

        }
    }

    //placing the effect on canvas
    context.putImageData(imageData, 0, 0);

    // saving image for undo redo function
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;

})