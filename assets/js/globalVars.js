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

// Canvas tool settings/defaults
let backgroundColour = "white";
let colorStroke = "black";
let colorFill = backgroundColour;
let lineWidth = 3;
let transparency = 1;

// Variables related to the Undo/Redo function.
let restore_array = [];
let index = -1;
let redo_array = [];
let reindex = -1;

// Setting up the canvas sizes
canvas.width = window.innerWidth / 12 * 10;
canvas.height = window.innerHeight;
canvasDraft.width = window.innerWidth / 12 * 10;
canvasDraft.height = window.innerHeight;


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