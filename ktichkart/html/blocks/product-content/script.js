// Primary slider.
var primarySlider = new Splide('.productMainSlider', {
    type: 'fade',
    pagination: true,
    arrows: false,
    cover: true,
    classes: {
        pagination: 'splide__pagination',
    },
});

// Thumbnails slider.
var thumbnailSlider = new Splide('.productThumbnailSlider', {
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

// sync the thumbnails slider as a target of primary slider.
primarySlider.sync(thumbnailSlider).mount();