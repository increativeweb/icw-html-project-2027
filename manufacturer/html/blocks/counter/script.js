// Counter
if (jQuery('.counter-block').length) {
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    // Create a new observer
    let observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let $this = jQuery(entry.target);
                var countTo = $this.attr("data-countto");
                var countDuration = parseInt($this.attr("data-duration"));
                
                jQuery({ counter: $this.find('span').text() }).animate({
                    counter: countTo
                }, {
                    duration: countDuration,
                    easing: "linear",
                    step: function () {
                        $this.find('span').text(Math.floor(this.counter));
                    },
                    complete: function () {
                        $this.find('span').text(this.counter);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Target each element with the class .counter
    jQuery('.count-number').each(function () {
        observer.observe(this);    
    });    
}