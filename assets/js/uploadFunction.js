let img = new Image();
let fileName = '';
const uploadFile = document.getElementById('upload-file');

//Upload File
uploadFile.addEventListener('change', function(e) {
    //Get File
    const file = document.getElementById('upload-file').files[0];
    //Init FileReader
    const reader = new FileReader();
    if (file) {
        //set file name
        fileName = file.name;
        // Read data as URL (Ref: https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
        reader.readAsDataURL(file);
    }
    //Add image to canvas
    reader.addEventListener('load', function() {
        //create img
        img = new Image();
        //Set source of image
        img.src = reader.result;
        //On image load, add to canvas
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    }, false);

    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
    console.log("index:", index, "restorearr", restore_array)



});