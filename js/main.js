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

  var $modalBox = $('.modal-notify');
  var $closeBtn = $('.modal-box .close');
  $('.btn-notify').on('click', function(){
    $modalBox.addClass('show');
    $modalBox.find('.get-email').addClass('active');
  })

  $closeBtn.on('click', function(){
    $modalBox.removeClass('show');
    $modalBox.children().removeClass('active');
  })

})