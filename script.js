
$(document).ready(function() {
var botao = $('.1click');
var dropDown = $('.top10');    

   botao.on('click', function(event){
       dropDown.stop(true,true).slideToggle();
       event.stopPropagation();
   });
});