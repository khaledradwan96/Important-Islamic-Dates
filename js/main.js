// ========== Navbar ==========
$('#open-nav').click(function(){
    $('#leftMenu').animate({width: `250`},500)
})

$('#leftMenu .fa-xmark').click(function(){
    $('#leftMenu').animate({width: `0`},500)
})

// ========== Slider Down ==========
$('#sliderDown h3').click(function(){
  $(this).next().slideToggle(500)
  $('.inner').not($(this).next()).slideUp(500)
})