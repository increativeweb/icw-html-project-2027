// Multiple Img Splide Slider 
if ($('.testimonials-splide').length) {
    $('.testimonials-splide').each(function () {
        const $slider = $(this);
        const slideLength = $slider.find('.splide__slide').length;
        const testimonialsSplide = new Splide(this, {
            type: 'fade',
            rewind: true,
            arrows: false,
            pagination: slideLength > 1,
            drag: slideLength > 1,
            autoplay: slideLength > 1,
            interval: 5000,
            speed: 1000,
            pauseOnHover: true,
            pauseOnFocus: false,
            updateOnMove: true,
            perPage: 1,
            perMove: 1,
            classes: {
                pagination: 'splide__pagination',
            },
        });
        testimonialsSplide.on('mounted resize', function () {
            if (slideLength <= 1) {
                testimonialsSplide.options = {
                    ...testimonialsSplide.options,
                    drag: false,
                    arrows: false,
                    pagination: false,
                    autoplay: false,
                };
                $slider.addClass('slider-disabled');
            } else {
                testimonialsSplide.options = {
                    ...testimonialsSplide.options,
                    drag: true,
                    pagination: true,
                    autoplay: true,
                };
                $slider.removeClass('slider-disabled');
            }
            testimonialsSplide.refresh();
        });
        testimonialsSplide.mount();
    });
}