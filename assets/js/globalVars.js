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

// Variables related to the Undo/Redo function.
let restore_array = [];
let index = -1;
let redo_array = [];
let reindex = -1;

// Setting up the canvas sizes
canvas.width = window.innerWidth - 60;
canvas.height = 400;
canvasDraft.width = window.innerWidth - 60;
canvasDraft.height = 400;


/***************************************************************************
// Functions to set up the interactive page decorations.
****************************************************************************/

// this function adds the number value of the selected line width next to the line span.
$(document).on('input change', '#pen-range', function() {
    $('#range_num').html($(this).val());
})