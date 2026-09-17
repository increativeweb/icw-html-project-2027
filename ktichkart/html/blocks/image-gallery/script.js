const splideImageGallery = (direction = 'ltr') => ({
    perPage: 5,
    autoWidth: true,
    pagination: false,
    arrows: false,
    gap: 20,
    type: 'loop',
    focus: 'center',
    direction: direction,
    autoScroll: {
        // speed: 1
    },
    breakpoints: {
        '767': {
            gap: 10,
        }
    }
});
// Left slider
if (document.querySelector('.image-gallery-splide.is-left')) {
    new Splide('.image-gallery-splide.is-left', splideImageGallery()).mount(window.splide.Extensions);
}

// Right slider
if (document.querySelector('.image-gallery-splide.is-right')) {
    new Splide('.image-gallery-splide.is-right', splideImageGallery('rtl')).mount(window.splide.Extensions);
}