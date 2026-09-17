const logoSplide = (direction = 'ltr') => ({
    perPage: 7,
    autoWidth: true,
    pagination: false,
    arrows: false,
    gap: 40,
    type: 'loop',
    focus: 'center',
    direction: direction,
    autoScroll: {
        // speed: 1
    },
    breakpoints: {
        '992': {
            gap: 20,
        }
    }
});
// Left slider
if (document.querySelector('.logo-splide')) {
    new Splide('.logo-splide', logoSplide()).mount(window.splide.Extensions);
}