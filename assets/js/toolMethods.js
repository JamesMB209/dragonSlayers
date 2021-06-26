function clear_canvas() {
    context.fillStyle = backgroundColour;
    context.clearRect(0, 0, canvas.width, canvas.height);
    reindex = -1;
    index = -1;
    restore_array = [];
    redo_array = [];
    originimage = ["0"];
    flitercount = false;
    polygonactive = false;
    logX = [];
    logY = [];
    line = -1;
    linelog = [];
    linelogundo = [];
    undoX = [];
    undoY = [];
    polydone = true;
    console.log("clear function is working")
    console.log("restore array", restore_array)
    console.log("redo array", redo_array)
    console.log("reindex", reindex)
    console.log("index", index)
}

function undo_last() {
    if (index >= 0) {
        console.log("in undo poly", polygonactive)
        if (polygonactive) {
            console.log("in undo poly done?", polydone)
            if (polydone == false) {
                undoX.push(logX.pop());
                undoY.push(logY.pop());
                line -= 1;
                if (line < 0) {
                    line = -1;
                }
                redo_array.push(restore_array.pop());
                reindex += 1;
                index -= 1;
                if (index < 0) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                } else {
                    context.putImageData(restore_array[index], 0, 0);
                };
                console.log("undo is working : log X", logX, "log Y", logY, "line num", line);
            } else if (polydone == true && linelog.length >= 1) {
                console.log("LineLog in undo", linelog)
                console.log("typeof", typeof linelog)
                console.log("Line to undo", Number(linelog[linelog.length - 1]) + 1)
                for (var t = 0; t < Number(linelog[linelog.length - 1]) + 1; t++) {
                    console.log("t is working?")
                    redo_array.push(restore_array.pop());
                    reindex += 1;
                    index -= 1;
                }
                console.log("after line undo rearry & index", restore_array, index);
                if (index < 0) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    linelogundo.push(linelog.pop());
                    console.log("linelogundo", linelogundo)
                } else {
                    context.putImageData(restore_array[index], 0, 0);
                    linelogundo.push(linelog.pop());
                    console.log("linelogundo", linelogundo)
                }
            }
        } else {
            redo_array.push(restore_array.pop());
            reindex += 1;
            index -= 1;
            if (index < 0) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            } else {
                context.putImageData(restore_array[index], 0, 0);
            };
        };
        console.log("checking", "Index:", index, "reindex:", reindex, "restore", restore_array, "redo", redo_array)
    }
}


function redo_last() {
    if (reindex > -1) {
        if (polygonactive) {
            if (polydone == false) {
                logX.push(undoX.pop());
                logY.push(undoY.pop());
                line += 1;
                context.putImageData(redo_array[reindex], 0, 0);
                restore_array.push(redo_array.pop());
                index += 1;
                reindex -= 1;
                if (reindex < 0) {
                    reindex = -1;
                }
            } else if (polydone == true && linelogundo.length >= 1) {
                console.log("before redo process redo info", redo_array, reindex)
                for (var tr = 0; tr < Number(linelogundo[linelogundo.length - 1]) + 1; tr++) {
                    restore_array.push(redo_array.pop());
                    reindex -= 1;
                    index += 1;
                }
                console.log("in redo redo", redo_array, reindex)
                linelog.push(linelogundo.pop());
                context.putImageData(restore_array[index], 0, 0);
            }
        } else {
            context.putImageData(redo_array[reindex], 0, 0);
            restore_array.push(redo_array.pop());
            reindex -= 1;
            index += 1;
        }
        console.log('after redo UndoXY', undoX, undoY)
    }
}