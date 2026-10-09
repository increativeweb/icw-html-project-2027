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
    if ($('.scroll-blur-text').length) {
        $('.scroll-blur-text').each(function () {
            const $text = $(this);
            const words = $text.text().trim().split(/\s+/);
            $text.html(
                words.map(word => `<span>${word}</span>`).join(' ')
            );
        });        
        $(window).on('scroll resize', revealWords);
        revealWords();
    }
    function revealWords() {
        const viewportHeight = $(window).height();
        const revealPoint = viewportHeight * 0.7;
        $('.scroll-blur-title-text').each(function () {
            const $section = $(this);
            const sectionTop = $section.offset().top;
            const sectionHeight = $section.outerHeight();
            const scrollTop = $(window).scrollTop();
            const start = sectionTop - revealPoint;
            const end = sectionTop + sectionHeight - revealPoint;
            const progress = Math.max(0,Math.min(1, (scrollTop - start) / (end - start)));
            const $words = $section.find('.scroll-blur-text span');
            const totalWords = $words.length;
            $words.each(function (index) {
                const wordProgress = progress * totalWords - index;
                const reveal = Math.max(0,Math.min(1, wordProgress));
                const blur = 1 * (1 - reveal);
                const opacity = 0.5 + (0.5 * reveal);
                $(this).css({
                    filter: `blur(${blur}px)`,
                    opacity: opacity,
                });
            });
        });
    }
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
    root: null,rootMargin: '0px 0px -32% 0px'
});
document.querySelectorAll('section').forEach(section => {io.observe(section);});