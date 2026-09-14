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
$(function () {
    const offset = 80;    
    const $sectionLinks = $('.mainMenu a').filter(function () {
        return this.hash && $(this.hash).length;
    });
    const $sections = $sectionLinks.map(function () {
        return $(this.hash)[0];
    });
    // Highlight current section while scrolling
    function setScrollActiveMenu() {
        if (window.location.pathname !== "/") return;
        const scrollPos = $(window).scrollTop() + offset;
        $('.mainMenu li').removeClass('current-menu-item');
        $sections.each(function () {
            const $section = $(this);
            const top = $section.offset().top - offset;
            const bottom = top + $section.outerHeight();
            if (scrollPos >= top && scrollPos < bottom) {
                $sectionLinks.filter(function () { return this.hash === "#" + $section.attr("id"); }).parent().addClass("current-menu-item");
                return false; // Stop after first matching section
            }
        });
    }
    // Smooth scroll
    $sectionLinks.on('click', function (e) {
        const pathname = this.pathname.replace(/\/$/, '');
        const currentPath = window.location.pathname.replace(/\/$/, '');
        if (pathname !== currentPath) return;
        const $target = $(this.hash);
        if (!$target.length) return;
        e.preventDefault();
        $('html, body').animate({ scrollTop: $target.offset().top - offset }, 600);
    });
    // Highlight current page (header & footer)
    function setPageActiveMenu(selector) {
        const currentPage = window.location.pathname.replace(/^\/|\/$/g, '').split('/').pop() || '';
        $(selector + ' a').each(function () {
            let href = $(this).attr('href') || '';
            // Ignore anchor links
            if (href.indexOf('#') !== -1) return;
            href = href.replace(/^\/|\/$/g, '').split('/').pop();
            if (href === currentPage) {
                $(this).closest('li').addClass('current-menu-item');
                $(this).closest('.sub-menu').closest('li').addClass('current-menu-item');
            }
        });
    }
    setPageActiveMenu('.mainMenu');
    setPageActiveMenu('.main-footer .main-menu');
    $(window).on('scroll', setScrollActiveMenu);
    setScrollActiveMenu();
});