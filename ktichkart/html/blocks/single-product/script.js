// Single Product Slider
var primarySlider = new Splide('.product-gallery-slider', {
    type: 'fade',
    pagination: true,
    arrows: false,
    cover: true,
    classes: {
        pagination: 'splide__pagination is-light',
    },
});
var thumbnailSlider = new Splide('.product-gallery-thumbnail-slider', {
    type: 'loop',
    rewind: true,
    fixedWidth: 100,
    fixedHeight: 100,
    isNavigation: true,
    gap: 10,
    focus: 'center',
    pagination: false,
    cover: true,
    arrows: false,
    breakpoints: {
        '600': {
            fixedWidth: 70,
            fixedHeight: 70,
        }
    }
}).mount();
primarySlider.sync(thumbnailSlider).mount();

// Number Input
jQuery('.variations_button button').on('click', function (e) {
    e.preventDefault();

    const $input = jQuery(this).parent().find('input[type="number"]');

    if (jQuery(this).hasClass('qty-plus')) {
        $input[0].stepUp();
    } else {
        $input[0].stepDown();
    }
});