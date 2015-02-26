$(document).ready(function() {
  $('#fullpage').fullpage({
    slidesNavigation: false,
    loopHotizontal: false,
    loopBottom: true,
    loopTop: true
  });

  var bindBtns = function() {
  	$('#ecosmart-row').bind('click' , function() {
  		$.fn.fullpage.moveSlideRight();
  	});
  	$('#ecosmart-back').bind('click' , function() {
  		$.fn.fullpage.moveSlideLeft();
  	});
  };

  var init = function() {
  	bindBtns();
  };

  init();
});