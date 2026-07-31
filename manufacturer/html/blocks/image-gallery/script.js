const splideImageGallery = (direction = 'ltr') => ({
    perPage: 7,
    autoWidth: true,
    pagination: false,
    arrows: false,
    gap: 15,
    type: 'loop',
    focus: 'center',
    direction: direction,
    autoScroll: {
        // speed: 1
    },
});
// Left slider
if (document.querySelector('.image-gallery-splide.is-left')) {
    new Splide('.image-gallery-splide.is-left', splideImageGallery()).mount(window.splide.Extensions);
}

// Right slider
if (document.querySelector('.image-gallery-splide.is-right')) {
    new Splide('.image-gallery-splide.is-right', splideImageGallery('rtl')).mount(window.splide.Extensions);
}