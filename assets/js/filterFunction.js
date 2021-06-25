$(".fliter").on("click", function() {
    console.log("filter is started")
    var id = $(this).attr("id");

    flitercount += 1;

    if (flitercount == 1) {
        originimage.push(context.getImageData(0, 0, canvas.width, canvas.height))
    }


    console.log(originimage[0])

    var imageData = originimage[0];
    // var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    context.putImageData(imageData, 0, 0);



    for (var j = 0; j < imageData.width; j++) {
        for (var i = 0; i < imageData.height; i++) {
            var pixel = (i * 4) * imageData.width + (j * 4); // start from zero
            // console.log("index", index)

            if (id == "grayscale") {
                var gray = (imageData.data[pixel] + imageData.data[pixel + 1] + imageData.data[pixel + 2]) / 3;
                imageData.data[pixel] = gray; // red channel
                // console.log("red", gray)
                imageData.data[pixel + 1] = gray; //green channel
                // console.log("green", gray)
                imageData.data[pixel + 2] = gray; //blue channel
                // console.log("blue", gray)
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
                imageData.data[pixel] += 10;
                imageData.data[pixel + 1] += 10;
                imageData.data[pixel + 2] += 10;
            } else if (id == "darker") {
                imageData.data[pixel] -= 10;
                imageData.data[pixel + 1] -= 10;
                imageData.data[pixel + 2] -= 10;
            }

        }
    }
    context.putImageData(imageData, 0, 0);
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
    console.log("index:", index, "restorearr", restore_array)

})