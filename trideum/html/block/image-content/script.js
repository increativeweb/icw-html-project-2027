document.addEventListener('DOMContentLoaded', function () {

    const slider = document.querySelector('.split-slider');

    if (slider) {
        new Splide(slider, {
            type: 'fade',
            perPage: 1,
            perMove: 1,
            arrows: false,
            pagination: true,
            autoplay: true,
            interval: 6000,
            speed: 3000,
            rewind: true,
            pauseOnHover: false,
            pauseOnFocus: false
        }).mount();
    }

});