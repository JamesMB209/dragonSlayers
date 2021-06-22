function clear_canvas() {
    context.fillStyle = backgroundColour;
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log("clear function is working")
}

function undo_last() {
    if (index >= 0) {
        console.log("before index", index)
        redo_array.push(restore_array.pop());
        reindex += 1;
        index -= 1;
        if (index < 0) {
            clear_canvas();
        } else {
            context.putImageData(restore_array[index], 0, 0);
        };
        console.log("checking", "Index:", index, "reindex:", reindex, "restore", restore_array, "redo", redo_array)
    }
}

function redo_last() {
    if (reindex > -1) {
        ctx.putImageData(redo_array[reindex], 0, 0);
        restore_array.push(redo_array.pop());
        reindex -= 1;
        index += 1;
    }
}