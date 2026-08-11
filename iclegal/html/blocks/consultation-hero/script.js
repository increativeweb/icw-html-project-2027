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
                let $this = $(entry.target);
                var countTo = parseFloat($this.data('countto'));
                var countDuration = parseInt($this.data('duration')) || 2500;

                $({ counter: $this.find('span').text() }).animate({
                    counter: countTo
                }, {
                    duration: countDuration,
                    easing: "linear",
                    step: function () {
                        let value;
                        if (countTo % 1 !== 0) {
                            value = Number(this.counter).toFixed(1);
                        } else {
                            value = Math.floor(Number(this.counter)).toLocaleString('en-US');
                        }
                        $this.find('span').text(value);
                    },
                    complete: function () {
                        let value;
                        if (countTo % 1 !== 0) {
                            value = Number(countTo).toFixed(1);
                        } else {
                            value = Number(countTo).toLocaleString('en-US');
                        }
                        $this.find('span').text(value);
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