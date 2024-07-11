$('#open-nav').click(function(){
    $('#leftMenu').animate({width: `250`},1000)
})


$('#leftMenu .fa-xmark').click(function(){
    $('#leftMenu').animate({width: `0`},1000)
})