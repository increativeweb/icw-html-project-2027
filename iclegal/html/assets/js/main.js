/*-----------------------------------------------------------------------------------*/
/* MAIN
/*-----------------------------------------------------------------------------------*/
var $ = jQuery.noConflict();

jQuery(document).ready(function($) {
   $('[data-bs-toggle="tooltip"]').tooltip();

   $('.toggle-sidebar,.bg-overly').on('click', function (e) {
      $('.bg-overly,.toggle-sidebar,body,.main-header').toggleClass('is-visible');
      e.preventDefault();
   });

   if ($('.main-header').length) {
      if (jQuery(this).scrollTop() > 100) {
         $(".main-header").addClass("fixed-header");
      } else {
         $(".main-header").removeClass("fixed-header");
      }

      $(window).scroll(function () {
         if (jQuery(this).scrollTop() > 100) {
            $(".main-header").addClass("fixed-header");
         } else {
            $(".main-header").removeClass("fixed-header");
         }
      });
   }

   if ($('li.menu-item-has-children').length) {
    $("li.menu-item-has-children > a").after('<i class="arrow"></i>');
   }
   $('li.menu-item-has-children .arrow').on('click',function(event){
      event.preventDefault();
      $(this).toggleClass('is-active');
      $(this).parent().find('.sub-menu').first().toggle(300);
      $(this).parent().siblings().find('.sub-menu').hide(200);
      
      //Hide menu when clicked outside
      $(this).parent().find('.sub-menu').parent().mouseleave(function(){ 
         var thisUI = $(this);
         $('html').click(function(){
            thisUI.children(".sub-menu").hide();
            thisUI.children(".arrow").removeClass('is-active');
            $('html').unbind('click');
         });
      });
   });
   
   $(".collapse-item .collapse-title").click(function () {
      if ($(this).closest(".collapse-item").hasClass("is-open")) {
         $(this).closest(".collapse-item").stop(true,true).removeClass("is-open");
         $(this).closest(".collapse-item").find(".collapse-body").stop(true,true).slideUp();
      } else {
         $(".collapse-item").removeClass("is-open");
         $(".collapse-item").find(".collapse-body").stop(true,true).slideUp();
         $(this).closest(".collapse-item").stop(true,true).addClass("is-open");
         $(this).closest(".collapse-item").find(".collapse-body").stop(true,true).slideDown();
      }
      return false;
  });

  /* scroll page to top */
  if ($('.back-to-top').length) {
    $(window).scroll(function() {
       if($(this).scrollTop() > 200) {
          $('.back-to-top').addClass('visible');	
       } else {
          $('.back-to-top').removeClass('visible');
       }
    });
    $('.back-to-top').on('click', function(e){
       e.preventDefault();
       $('body,html').animate({scrollTop:0},50);
    });
 }


// $('a[href*=#]:not([href=#])').on('click', function(e) {
//     e.preventDefault();
//     $('html, body').animate({ 
//         scrollTop: $($(this).attr('href')).offset().top
//     }, 50);
// });

$('a._target-popup').on('click', function(e) {
    e.preventDefault();
    $('.popup-action').trigger( "click" );
});

 if ($('.play-iframe-action').length){
    $('.play-iframe-action').click(function(ev){	
        videourl = $(this).data('videosrc')+"?api=1&autoplay=1&muted=1&rel=0&enablejsapi=1";
        if($(this).data('ext') == 'mp4'){
            video = '<div class="video-wrap ratio ratio-16x9"><video class="embed-responsive-item w-100" controls autoplay playsinline controlsList="nodownload" oncontextmenu="return false;"><source src="'+videourl+'" type="video/mp4"></video></div>';
        } else {
            video = '<div class="video-wrap ratio ratio-16x9"><iframe class="embed-responsive-item play-in_iframe" allow="autoplay" src="'+videourl+'" controls="0" scrolling="no" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe></div>';
        }
        
        $(this).parents('.play-video-block').html(video);
        ev.preventDefault();
    });
}

if ($('.hero-slider').length) {
    $('.hero-slider').slick({
        dots:true,
        arrows: false,
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed:6000,
        lazyLoad:"progressive",
        speed:600,
        accessibility: false,
        fade: true,
        // lazyLoad: 'ondemand',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    });
};
if ($('.testimonial-slider').length) {
    $('.testimonial-slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        slidesToShow: 1,
        infinite: true,
        accessibility: false,
        responsive: [
            {
            breakpoint: 992,
                settings: {
                    arrows: false,
                    dots:true,
                }
            }
        ]
    });
};
if ($('.helper-slider').length) {
    $('.helper-slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        slidesToShow: 2,
        infinite: true,
        accessibility: false,
        responsive: [
            {
            breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '60px',
                    arrows: false,
                    dots:true,
                }
            },
            {
            breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '40px',
                    arrows: false,
                    dots:true,
                }
            }
        ]
    });
};
if ($('.team-slider').length) {
    $('.team-slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        slidesToShow: 5,
        infinite: true,
        accessibility: false,
        lazyLoad: 'ondemand',
        responsive: [
            {
            breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    dots:true,
                    arrows: false,
                }
            },
            {
            breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    dots:true,
                    centerMode: true,
                    centerPadding: '80px',
                    arrows: false,
                }
            },
            {
            breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '60px',
                    arrows: false,
                    dots:true,
                }
            }
        ]
    });
};

if ($(".post-slider").length) {
    $('.post-slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        accessibility: false,
        lazyLoad: 'ondemand',
        centerPadding: '80px',
        dots:true,
        responsive: [
            {
            breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots:true,
                    arrows: false,
                    // variableWidth: true,
                }
            },
            {
            breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
            breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
}

icw_cf7_labels();
});

function icw_cf7_labels() {
    var input = $('.form-group:not(.form-group-fixed) .form-control');
    if (input.length) {
 
       $(".form-group:not(.form-group-fixed) .form-control").each(function(){
          var input_value = $(this).val();
          if(input_value!='') {
              $(this).parents(".form-group").addClass("focused");
          }
        });
 
       input.focus(function () {
          // console.log("__focus");
          $(this).parents('.form-group').addClass('focused').removeClass('has-data');
       });
       input.focusout(function () {
          // console.log("__focusout");
          $(this).parents('.form-group').removeClass('focused');
          if (this.value == "") {
             $(this).parents('.form-group').removeClass('focused');
             $(this).parents('.form-group').removeClass('has-data');
          } else {
             $(this).parents('.form-group').removeClass('focused').addClass('has-data');
          }
       });
    }
 }