document.getElementById('downloadFunction').addEventListener('click',function(e){
    var link = document.createElement('a');
    var canvasimage = canvas.toDataURL();
    link.href = canvasimage;
    link.download = 'dragonSlayersCanvas';
    link.click();
})