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
        if ($(window).width() <= 992) {
            $('li.menu-item-has-children > a').after('<i class="arrow"></i>');
        }
        $('li.menu-item-has-children').on('click', function () { 
            if ($(window).width() <= 992) return;
            $(this).toggleClass('is-visible');
            $('.bg-overlay').toggleClass('is-visible');
        });
    }
    $('.menu-item-has-children .arrow').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const $li = $(this).closest('.menu-item-has-children');
        const $submenu = $li.children('.sub-menu, .mega-sub-menu').first();
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
});