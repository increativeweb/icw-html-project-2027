/*-----------------------------------------------------------------------------------*/
/* MAIN
/*-----------------------------------------------------------------------------------*/
var $ = jQuery.noConflict();

jQuery(document).ready(function ($) {
    $('[data-bs-toggle="tooltip"]').tooltip();
    if ($('.main-header').length) {        
        $('.navbar-toggler').on('click', function () {
            $('.main-header, .navbar-toggler, .bg-overlay').toggleClass('is-visible');
            $('body').toggleClass('overflow-hidden');
        });
        $('.mainMenu > li > a').on('click', function () {
            if ($(window).width() < 767) {
                $('.main-header, .navbar-toggler, .bg-overlay').removeClass('is-visible');
                $('body').removeClass('overflow-hidden');
            }
        });
        $(document).on('click', function (e) {
            if ($(window).width() >= 767) return;
            if (!$(e.target).closest('.navbar-collapse, .navbar-toggler').length) {
                $('.main-header, .navbar-toggler, .bg-overlay').removeClass('is-visible');
                $('body').removeClass('overflow-hidden');
            }
        });
        $(window).on('resize', function () {
            if ($(window).width() >= 767) {
                $('.main-header, .navbar-toggler, .bg-overlay').removeClass('is-visible');
                $('body').removeClass('overflow-hidden');
            }
        });
    }
    if ($('.sticky-action').length) {  
        $(window).on('scroll', function () { 
            var scrollTop = $(this).scrollTop();
            if (scrollTop > 300) { 
                $('.sticky-action').addClass('is-show');
            } else {
                $('.sticky-action').removeClass('is-show');
            }
        });
    }
    if ($('.icw-progress-goto').length > 0) {
        var progressPath = document.querySelector('.icw-progress-goto path');
        var pathLength = progressPath.getTotalLength();

        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }

        updateProgress();
        $(window).scroll(updateProgress);

        var offset = 200;
        var duration = 550;

        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.icw-progress-goto').addClass('active-progress');
            } else {
                jQuery('.icw-progress-goto').removeClass('active-progress');
            }
        });

        jQuery('.icw-progress-goto').on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        });
    }
});

// Menu Active 
jQuery(function ($) {
    const $menuItems = $('.mainMenu > li');
    const scrollOffset = 150;
    function updateActiveMenu() {
        let activeFound = false;
        $menuItems.each(function () {
            const $li = $(this);
            const href = $li.children('a').attr('href');
            if (!href || href === '#' || href.charAt(0) !== '#') {return;}
            const $section = $(href);
            if (!$section.length) {return;}
            const rect = $section[0].getBoundingClientRect();
            const viewportHeight = $(window).height();
            const visibleTop = Math.max(rect.top, 0);
            const visibleBottom = Math.min(rect.bottom, viewportHeight);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visiblePercentage = (visibleHeight / rect.height) * 100;
            if (visiblePercentage >= 50 && !activeFound) {
                $menuItems.removeClass('current-menu-item');
                $li.addClass('current-menu-item');
                activeFound = true;
            }
        });
        if (!activeFound) {
            $menuItems.removeClass('current-menu-item');
        }
    }
    $('.mainMenu > li > a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (!href || href === '#') {return;}
        const $section = $(href);
        if (!$section.length) {return;}
        e.preventDefault();
        $menuItems.removeClass('current-menu-item');
        $(this).parent('li').addClass('current-menu-item');
        $('html, body').stop().animate({
            scrollTop: $section.offset().top - scrollOffset
        }, 600);
    });
    $(window).on('scroll', function () {updateActiveMenu();});
    $(window).on('resize', function () {updateActiveMenu();});
    updateActiveMenu();
});

function playAnimReveal(section) {
    section.querySelectorAll('.icw-anim').forEach((el, i) => {
        el.classList.remove('animated');
        const delay = i * 150;
        setTimeout(() => {el.classList.add('animated');}, delay);
    });
}
const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {playAnimReveal(entry.target);observer.unobserve(entry.target);}
    });
}, {
    root: null,rootMargin: '0px 0px -20% 0px'
});
document.querySelectorAll('section').forEach(section => {io.observe(section);});

const logoSplide = (direction = 'ltr') => ({
    perPage: 7,
    autoWidth: true,
    pagination: false,
    arrows: false,
    gap: 45,
    type: 'loop',
    focus: 'center',
    direction: direction,
    autoScroll: {
        // speed: 1
    },
});
// Left slider
if (document.querySelector('.logo-splide')) {
    new Splide('.logo-splide', logoSplide()).mount(window.splide.Extensions);
}