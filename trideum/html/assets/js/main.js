/*-----------------------------------------------------------------------------------*/
/* MAIN
/*-----------------------------------------------------------------------------------*/
var $ = jQuery.noConflict();

jQuery(document).ready(function ($) {
    $('[data-bs-toggle="tooltip"]').tooltip();
    if ($('.main-header').length) {
        $('.navbar-toggler').on('click', function () {
            $(".main-header").toggleClass('is-visible');
            $('body').toggleClass('overflow-hidden');
            $(this).toggleClass('is-visible');
            $('.bg-overlay').toggleClass('is-visible');
        });
        $(document).on('click', function (e) {
            if ($(window).width() >= 1200) return;
            if (!$(e.target).closest('.navbar-collapse, .navbar-toggler').length) {
                $('.main-header, .navbar-toggler').removeClass('is-visible');
                $('.main-header, .navbar-toggler').removeClass('is-visible');
                $('body').removeClass('overflow-hidden');
                $('.bg-overlay').removeClass('is-visible');
            }
        });
        if ($('li.menu-item-has-children').length) {
            $('li.menu-item-has-children > a').after('<i class="arrow"></i>');
        }
        $('.menu-item-has-children .arrow').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const $li = $(this).closest('.menu-item-has-children');
            const $submenu = $li.children('.sub-menu');

            $(this).toggleClass('is-active');
            $submenu.stop(true, true).slideToggle(300);
        });
        $(window).on('resize', function () {
            if ($(window).width() >= 1200) {
                $('.main-header, .navbar-toggler, .bg-overlay').removeClass('is-visible');
                $('body').removeClass('overflow-hidden');
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

    const $logoBlock = $('.site-logo-block');
    if ($logoBlock.length) {
        $(window).on('scroll', function () {
            const logoBlockTop = $logoBlock.offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            // Toggle class based on footer visibility
            $logoBlock.toggleClass('is-animate', windowBottom >= logoBlockTop);
        });
    }
});

// icw-anim
function playAnimReveal(section) {
    section.querySelectorAll('.icw-anim').forEach((el, i) => {
        el.classList.remove('animated');
        const delay = i * 150;
        setTimeout(() => { el.classList.add('animated'); }, delay);
    });
}
const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { playAnimReveal(entry.target); observer.unobserve(entry.target); }
    });
}, {
    root: null, rootMargin: '0px 0px -20% 0px'
});
document.querySelectorAll('section').forEach(section => { io.observe(section); });
document.querySelectorAll('footer').forEach(section => { io.observe(section); });

// Disable right-click on IMG, SVG, and Lottie
document.addEventListener('contextmenu', function (e) {

    const target = e.target;

    const imgEl = target.tagName === 'IMG' ? target : null;
    const svgEl = target.closest && target.closest('svg');
    const lottieEl = target.closest && target.closest('lottie-player');

    const el = imgEl || svgEl || lottieEl;

    if (el) {
        e.preventDefault();

        el.classList.add('icw-zigzag-effect');

        setTimeout(() => {
            el.classList.remove('icw-zigzag-effect');
        }, 500); // match animation duration
    }
});