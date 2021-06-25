var buttons = document.getElementsByTagName('button');
var fireIcon = document.createElement('I');
fireIcon.className = 'fas fa-fire';


for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseover', function (e) {
        console.log('working')
        this.append(fireIcon);
        console.log('append working')
        //this.style.cursor = "url('../images/silverlightswordsmall.png'), auto";
    })
}

var flame = document.getElementById('flame');
var logo = document.getElementById('logo');

logo.addEventListener('mouseover',function(e){
    flame.style.display = "inline-block";
    flame.style.animation = "fadeIn";
    flame.style.animationDuration = '1s';
    console.log('fadein')
})
logo.addEventListener('mouseout',function(e){
   
    flame.style.display = "none";
  
})