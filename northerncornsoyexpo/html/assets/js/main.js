/*-----------------------------------------------------------------------------------*/
/* MAIN
/*-----------------------------------------------------------------------------------*/
var $ = jQuery.noConflict();

jQuery(document).ready(function ($) {
    $('[data-bs-toggle="tooltip"]').tooltip();
    if ($('.main-header').length) {
        if (jQuery(this).scrollTop() > 100) {
           $('.main-header').addClass('fixed-header');
        } else {
           $('.main-header').removeClass('fixed-header');
        }  
        $(window).scroll(function () {
            if (jQuery(this).scrollTop() > 100) {
                $('.main-header').addClass('fixed-header');
            } else {
                $('.main-header').removeClass('fixed-header');
            }
        });
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

    // On Scroll Text Blur Animation
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
        const scrollTop = $(window).scrollTop();
        $('.scroll-blur-title-text').each(function () {
            const $section = $(this);
            const sectionTop = $section.offset().top;
            const start = sectionTop - revealPoint;
            const progress = Math.max(0, Math.min(1, (scrollTop - start) / (viewportHeight * 0.5)));
            const $words = $section.find('.scroll-blur-text span');
            const totalWords = $words.length;
            $words.each(function (index) {
                const reveal = Math.max(0,Math.min(1, progress * totalWords - index));
                $(this).css({
                    filter: `blur(${1 * (1 - reveal)}px)`,
                    opacity: 0.5 + (0.5 * reveal)
                });
            });
        });
    }

    if ($('.btn-hover-effect').length) {
    $('.btn-hover-effect').each(function () {
        const btn = this;

        // Add .bg if it doesn't exist
        if (!btn.querySelector('.bg')) {
            $(btn).append('<span class="bg"></span>');
        }

        const bg = btn.querySelector('.bg');

        function handleOrigin(e) {
            const rect = btn.getBoundingClientRect();

            bg.style.left = `${e.clientX - rect.left}px`;
            bg.style.top = `${e.clientY - rect.top}px`;
        }

        btn.addEventListener('mouseenter', handleOrigin);
        btn.addEventListener('mouseleave', handleOrigin);
    });
}
});


// Page Scroll Animation
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

// Play Iframe Video
if ($('.play-iframe').length) {
    $('.play-iframe').on('click', function (ev) {
        ev.preventDefault();
        const $currentBlock = $(this).closest('.media-block');
        // Pause all other MP4 videos without removing them
        $('.media-block video').each(function () {
            if (!$.contains($currentBlock[0], this)) {
                this.pause();
            }
        });
        // Pause all other iframe videos without removing them
        $('.media-block iframe').each(function () {
            if (!$.contains($currentBlock[0], this)) {
                const src = $(this).attr('src');
                if (src && src.includes('youtube.com')) {
                    this.contentWindow.postMessage(
                        JSON.stringify({
                            event: 'command',
                            func: 'pauseVideo',
                            args: ''
                        }), '*'
                    );
                } else if (src && src.includes('vimeo.com')) {
                    this.contentWindow.postMessage(
                        JSON.stringify({method: 'pause'}),
                        '*'
                    );
                }
            }
        });
        const videourl = $(this).data('videosrc');
        const ext = $(this).data('ext');
        let video = '';
        if (ext === 'mp4') {
            video = `<div class="video-wrap"><video class="embed-responsive-item w-100" controls autoplay playsinline controlsList="nodownload" oncontextmenu="return false;"><source src="${videourl}" type="video/mp4"></video></div>`;
        } else {
            const separator = videourl.includes('?') ? '&' : '?';
            video = `<div class="video-wrap"><iframe class="embed-responsive-item play-in_iframe" src="${videourl}${separator}api=1&autoplay=1&muted=1&rel=0&enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
        }

        $currentBlock.html(video);
    });
}