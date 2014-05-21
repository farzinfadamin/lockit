$(document).ready(function(){

	$('.lk-handiphone').addClass('show');
	$('.lk-bnr-details').addClass('show')

	$(window).bind('scroll', function() {
      if ($(window).scrollTop() > 100) {
        $('.lk-header-topbar').addClass('fixed');
       }
       else {
         $('.lk-header-topbar').removeClass('fixed');
       }
    });

})