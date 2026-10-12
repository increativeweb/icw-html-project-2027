// Multiple Img Splide Slider 
if ($('.multiple-img-splide').length) {
    $('.multiple-img-splide').each(function () {
        const $slider = $(this);
        const slideLength = $slider.find('.splide__slide').length;
        const multiImgSplide = new Splide(this, {
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
                pagination: 'splide__pagination is-light',
            },
        });
        multiImgSplide.on('mounted resize', function () {
            if (slideLength <= 1) {
                multiImgSplide.options = {
                    ...multiImgSplide.options,
                    drag: false,
                    arrows: false,
                    pagination: false,
                    autoplay: false,
                };
                $slider.addClass('slider-disabled');
            } else {
                multiImgSplide.options = {
                    ...multiImgSplide.options,
                    drag: true,
                    pagination: true,
                    autoplay: true,
                };
                $slider.removeClass('slider-disabled');
            }
            multiImgSplide.refresh();
        });
        multiImgSplide.mount();
    });
}