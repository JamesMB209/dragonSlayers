let img = new Image();
let fileName = '';
const uploadFile = document.getElementById('upload-file');

//Upload File
uploadFile.addEventListener('change', function(e) {
    console.log("upload is running")
    polygonactive = false;

    //Get File
    const file = document.getElementById('upload-file').files[0];
    //Init FileReader
    const reader = new FileReader();
    if (file) {
        //set file name
        fileName = file.name;
        // Read data as URL (Ref: https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
        reader.readAsDataURL(file);

        console.log("file", file)
    }
    //Add image to canvas
    reader.addEventListener('load', function() {
        //create img
        img = new Image();
        //Set source of image
        img.src = reader.result;
        //On image load, add to canvas and set uploaded image fit within canvas size
        img.onload = function() {
            context.drawImage(img, 0, 0, img.width, img.height,
                0, 0, canvas.width, canvas.height);
        }
    }, false);

    uploaded = true;

});