var lockit = function(){

  var 
  $window,
  $thankyou,
  $modalBox;

  var mandrilInstance;
  
  return {

    init: function(){

      $window = $(window);
      
      $modalBox = $('.modal-box');

      mandrilInstance = new mandrill.Mandrill('5Zcfo9PttFcLZ78BLQPFZQ');
      
      $thankyou = $('.thankyou'),

      $window.on('scroll.lazyload, touchmove.lazyload', $.proxy(this.onScroll, this) );

      $window.on('scroll', function(){
       $window
       .trigger('scroll.lazyload')
       .trigger('touchmove.lazyload');
     });

      
      $('.notify-form').on('submit', function(e){ 
        //e.preventDefault(); 
      });

      $('.notify-form button').on('click', $.proxy(this.onNotifySubmit, this));

    },

    onScroll: function(){

      var scrollTop = $window.scrollTop(),
      $sections = $('[class ^=section-]:not(.active)');

      if( ! $sections.length){
        $window.off('scroll.lazyload ,touchmove.lazyload');
      }


      $sections.each(function(){
        if ( scrollTop > $(this).offset().top  - $(this).height() ) { 
          $(this).addClass('active');
        }
      });

    },


    onNotifySubmit: function(e){

      var from = $.trim($(e.currentTarget).parents('form').find(':text').val());
      
      this.submitEmail( from );      

    },

    submitEmail: function(from){

      var to = 'info@projectlockit.co ';
      if(! this.validateEmail(from) ){
        this.invalidEmail();
        return;
      }

      // create a variable for the API call parameters
      var params = {
        message: {
          from_email: from,
          to: [{
            email: to
          }],
          subject: "LockIt User Contact Email",
          text: from + " has Subscribed to LockIT"
        }
      };

      mandrilInstance.messages.send(params, $.proxy(function(res) {

        this.emailSent();

      }, this), $.proxy(function(err) {

        this.invalidEmail();

      }, this));

    },

    validateEmail: function(email) { 
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    invalidEmail: function(){

      if($('.get-email.active').length){
        $('.get-email.active').find('form').addClass('error');
      }else{
        $('.section-notify').find('form').addClass('error');
      }
    },

    emailSent: function(){
      $modalBox.removeClass('active')
      $thankyou.addClass('active');
    } 
  }

}();


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
  var notifyEvent = 'click';
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    notifyEvent = 'touchstart';
  }

  $('#contact-link').on(notifyEvent, function(e){
    e.stopPropagation();
    $modalBox.removeClass('hide').addClass('show');
    $modalBox.find('.get-email').addClass('active');
  })

  $closeBtn.on(notifyEvent, function(e){
    e.stopPropagation();
    $modalBox.removeClass('show').addClass('hide');
    $modalBox.children().removeClass('active');
  });

  lockit.init();


  var $root = $('html, body');
  $('.btn-orderone').click(function() {
    var href = $.attr(this, 'href');
    $root.animate({
      scrollTop: $(href).offset().top
    }, 800, function () {
      window.location.hash = href;
    });
    return false;
  });


});
