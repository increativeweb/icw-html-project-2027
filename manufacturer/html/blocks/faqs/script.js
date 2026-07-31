if ($('.collapse-item').length) {
        $(document).on("click", ".collapse-item .collapse-title", function () {
            var $this = $(this).closest(".collapse-item");
            
            if ($this.hasClass("is-open")) {
                $this.removeClass("is-open");
                $this.find(".collapse-body").stop(true, true).slideUp(300); // Slide up with a smooth animation (300ms)
            } else {
                $(".collapse-item").removeClass("is-open");
                $(".collapse-item").find(".collapse-body").stop(true, true).slideUp(300); // Slide up other items smoothly
                $this.addClass("is-open");
                $this.find(".collapse-body").stop(true, true).slideDown(300); // Slide down with a smooth animation (300ms)
                
                // var collapsetop = $this.find(".collapse-title");
                // $('html, body').animate({
                //     scrollTop: collapsetop.offset().top - 115
                // }, 300); // Smooth scroll to the item
            }
            return false;
        });
    }