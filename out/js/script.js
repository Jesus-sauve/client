
$(document).ready(function(){
  $(window).scroll(function() { // check if scroll event happened
    if ($(document).scrollTop() > 50) { // check if user scrolled more than 50 from top of the browser window
      $(".navbar").addClass("scroll"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
    } else {
      $(".navbar").removeClass("scroll"); // if not, change it back to transparent
    }
  });

  $('.monter').click(function() {
		$('body,html').animate({ scrollTop: 0}, 800);
		return false;
	});

	$('.btn-descendre').click(function() {
		var distance_ancre = Math.round($('.presentation').offset().top);
		$('body,html').animate({ scrollTop: distance_ancre}, 800);
		return false;
	});


});
