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
    }
    if ($('li.menu-item-has-children').length) {
        $('li.menu-item-has-children').on('click', function (e) { 
            if ($(window).width() <= 992) return;
            e.stopPropagation();
            const $this = $(this);
            const isOpen = $this.hasClass('is-visible');
            $('li.menu-item-has-children').not($this).removeClass('is-visible');
            $this.toggleClass('is-visible', !isOpen);
            $('.bg-overlay').toggleClass('is-visible', $('li.menu-item-has-children.is-visible').length > 0);
        });
    }
    function updateMenuArrows() {
        if ($(window).width() <= 992) {
            $('li.menu-item-has-children > a').each(function () {
                if (!$(this).next('.arrow').length) {
                    $(this).after('<i class="arrow"></i>');
                }
            });
        } else {
            $('li.menu-item-has-children > a').next('.arrow').remove();
        }
    }
    updateMenuArrows();
    $(window).on('resize', function () {
        updateMenuArrows();
        if ($(window).width() >= 992) {
            $('.main-header, .navbar-toggler, .bg-overlay').removeClass('is-visible');
            $('body').removeClass('overflow-hidden');
        }
    });
    $('.menu-item-has-children .arrow').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const $li = $(this).closest('.menu-item-has-children');
        const $submenu = $li.children('.sub-menu');
        $($li).toggleClass('is-active');
        $(this).toggleClass('is-active');
        $submenu.stop(true, true).slideToggle(300);
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.navbar-collapse, .navbar-toggler').length) {
            $('.main-header, .navbar-toggler').removeClass('is-visible');
            $('.main-header, .navbar-toggler').removeClass('is-visible');
            $('body').removeClass('overflow-hidden');
            $('.bg-overlay').removeClass('is-visible');
            $('li.menu-item-has-children').removeClass('is-visible');
        }
    });
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