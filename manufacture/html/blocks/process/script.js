// Process Splide
if (jQuery('.process-splide').length) {
    var processSplide = new Splide('.process-splide', {
        type: 'slide',        
        arrows: true,
        pagination: false,
        perPage: 4,
        perMove: 1,
        gap: 30,
        omitEnd: true,
        breakpoints: {
            1200: {
                perPage: 3,
                autoWidth: true,
            },
            992: {
                perPage: 2,
                gap: 20,
            },
            767: {
                perPage: 1,
            },
        }
    });
    processSplide.mount();
}