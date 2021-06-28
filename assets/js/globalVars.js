/***************************************************************************
 Gobal variables for all JS documents - this JS file must be imported first
****************************************************************************/

// setup the references to the elements
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let canvasDraft = document.getElementById("canvasDraft");
let contextDraft = canvasDraft.getContext("2d");

// Global conditions
let currentFunction;
let dragging = false;
let uploaded = false;


// Canvas tool settings/defaults
let backgroundColour = "#ffffff";
let colorStroke = "#000000";
let colorFill = backgroundColour;
let lineWidth = 3;
let transparency = 1;

// Variables related to the Undo/Redo function.
let restore_array = [];
let index = -1;
let redo_array = [];
let reindex = -1;

//Variables for polygon only
let polygonactive = false;
let logX = [];
let logY = [];
let line = -1;
let linelog = [];
let linelogundo = [];
let undoX = [];
let undoY = [];
let polydone = true;

// Variables for filter function
let originimage = ["0"];
let filterselect = false;



// Setting up the canvas sizes
canvas.width = 1050;
canvas.height = 620;
canvasDraft.width = canvas.width;
canvasDraft.height = canvas.height;


/***************************************************************************
// Functions to set up the interactive page decorations.
****************************************************************************/

// this function adds the number value of the selected line width next to the line span.
$(document).on('input change', '#pen-range', function() {
    $('#range_num').html($(this).val());
})

$(document).on('input change', '#transparency-range', function() {
    $('#tran_num').html($(this).val());
})

context.clearRect(0, 0, canvas.width, canvas.height);