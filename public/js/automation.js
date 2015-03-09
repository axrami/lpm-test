$(document).ready(function() {
  $('#fullpage').fullpage({
    slidesNavigation: false,
    loopHotizontal: false,
    loopBottom: true,
    loopTop: true
  });

  var testName = undefined;

  var bindBtns = function() {
  	$('#iOS-platform').bind('click' , function() {
  		$.fn.fullpage.moveSlideRight();
  	});
  	$('#back-btn-wrapper').bind('click' , function() {
  		$.fn.fullpage.moveSlideLeft();
  	});
    $('#sdk-run-test').bind('click' , function() {
      runTest();
    })

    var buttons = document.getElementsByClassName("test-sel");
    var buttonsCount = buttons.length;
    for (var i = 0; i<= buttonsCount; i += 1) {
      $(buttons[i]).bind('click', function() {
        var test = this.id;
        testSelction(test);
      });
    }
  };

  var testSelction = function(test) {
    if (test == undefined){} else {
      $('#selection-wrper')
        .empty()
        .append('<h2>'+ test + ' selected</h2>');
      testName = test;
    }
  };

  var runTest = function() {
    if (testName == undefined) {
      alert('provide test...')
    } else {
      $.get('http://localhost:4567/rake/iOS');
      // $.get('http://mysterious-garden-8974.herokuapp.com/rake/iOS');
    }
  }

  var init = function() {
  	bindBtns();
  };

  init();
});