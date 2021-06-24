function clear_canvas() {
    // alert("are you sure?")
    // location.reload();
    context.fillStyle = backgroundColour;
    context.clearRect(0, 0, canvas.width, canvas.height);
    reindex = -1;
    index = -1;
    restore_array = [];
    redo_array = [];
    // console.log("clear function is working")
    // console.log("restore array", restore_array)
    // console.log("redo array", redo_array)
    // console.log("reindex", reindex)
    // console.log("index", index)
}

function undo_last() {
    if (index >= 0) {
        // console.log("before index", index)
        redo_array.push(restore_array.pop());
        reindex += 1;
        index -= 1;
        if (index < 0) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            context.putImageData(restore_array[index], 0, 0);
        };
        // console.log("checking", "Index:", index, "reindex:", reindex, "restore", restore_array, "redo", redo_array)
    }
}

function redo_last() {
    if (reindex > -1) {
        context.putImageData(redo_array[reindex], 0, 0);
        restore_array.push(redo_array.pop());
        reindex -= 1;
        index += 1;
    }
}


// Global variables for Polygon
let undocount = 0;
let redocount = 0;