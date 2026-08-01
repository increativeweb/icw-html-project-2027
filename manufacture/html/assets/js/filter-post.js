// Releted Blog Slider 
if (jQuery('.related-post-splide').length) {
    var postSplide = new Splide('.related-post-splide', {
        type: 'slide',
        rewind: true,
        arrows: false,
        pagination: true,
        perPage: 4,
        perMove: 1,
        gap: 30,
        omitEnd: true,
        breakpoints: {
            1200: {
                type: 'loop',
                perPage: 2,
                autoWidth: true,
            },
            992: {
                padding: { left: 15, right: 15 }
            },
            767: {
                perPage: 1,
                gap: 20,
            },
        }
    });
    postSplide.on('mounted resize', function () {
        const slideLength = postSplide.length;
        const isDesktop = window.innerWidth > 1200;
        if (isDesktop && slideLength <= 4) {
            postSplide.options = {
                drag: false,
                arrows: false,
                pagination: false,
                autoplay: false,
                gap: 30,
            };
            jQuery('.related-post-splide').addClass('slider-disabled');
        } else {
            postSplide.options = {
                drag: true,
                pagination: true,
            };
            jQuery('.related-post-splide').removeClass('slider-disabled');
        }
    });
    postSplide.mount();
}

(function ($) {
	$doc = $(document);

	$doc.ready(function () {

		// /**
		//  * Retrieve posts
		//  */
		// function get_posts($params) {

		// 	$container = $('#container-async');
		// 	$content = $container.find('.content');
		// 	$status = $container.find('.status');
		// 	$pager = $container.find('.infscr-pager a');

		// 	$status.text('Loading posts ...');

		// 	/**
		// 	 * Reset Pager for infinite scroll
		// 	 */
		// 	if ($params.page === 1 && $pager.length) {
		// 		$pager.removeAttr('disabled').html('More articles');
		// 	}

		// 	if ($pager.length) {
		// 		$method = 'infscr';
		// 	}
		// 	else {
		// 		$method = 'pager';
		// 	}

		// 	/**
		// 	 * Do AJAX
		// 	 */
		// 	// console.log($params);
		// 	$.ajax({
		// 		url: icw.ajax_url,
		// 		data: {
		// 			action: 'do_filter_posts',
		// 			nonce: icw.nonce,
		// 			params: $params,
		// 			pager: $method
		// 		},
		// 		type: 'post',
		// 		dataType: 'json',
		// 		beforeSend: function () {
		// 			$($pager).show();
		// 			$('.q-loader').addClass('show');
		// 			// console.log('q show');
		// 		},
		// 		success: function (data, textStatus, XMLHttpRequest) {
		// 			if (data.status === 200) {

		// 				if (data.method === 'pager' || $params.page === 1) {
		// 					$content.html(data.content);
		// 				}
		// 				/**
		// 				 * Append content for infinite scroll
		// 				 */
		// 				else {
		// 					$content.append(data.content);

		// 					if (data.next !== 0) {
		// 						$pager.attr('href', '#page-' + data.next);
		// 					}
		// 					$pager.text('Load Posts');
		// 				}

		// 				if (data.next == 0) {
		// 					$pager.hide();
		// 				}

		// 				if (!data.loadmore) {
		// 					$pager.attr('disabled', 'disabled').text('You reached the end');
		// 				}
		// 			}
		// 			else if (data.status === 201) {
		// 				// console.log(data.content);
		// 				if (data.method === 'pager') {
		// 					$content.html(data.message);
		// 				} else if (data.next === 0) {
		// 					$content.html(data.content);
		// 					$($pager).hide();
		// 				} else {
		// 					$pager.attr('disabled', 'disabled').text('You reached the end');
		// 				}
		// 			}
		// 			else {
		// 				$status.html(data.message);
		// 			}

		// 			/*console.log(data);
		// 			console.log(textStatus);
		// 			console.log(XMLHttpRequest);*/
		// 		},
		// 		error: function (MLHttpRequest, textStatus, errorThrown) {

		// 			$status.html(textStatus);

		// 			/*console.log(MLHttpRequest);
		// 			console.log(textStatus);
		// 			console.log(errorThrown);*/
		// 		},
		// 		complete: function (data, textStatus) {

		// 			msg = textStatus;
		// 			if (textStatus === 'success') {
		// 				// msg = data.responseJSON.message;
		// 				msg = data.responseJSON.message;
		// 			}
		// 			$status.html(msg);
		// 			if (msg === 'No posts found') {
		// 				$content.html('<div class="text-center pt-50 pb-50 w-100"><div class="alert alert-danger">No posts found</div></div>');
		// 			}
		// 			$('.q-loader').removeClass('show');
		// 			// $('.post-search').removeClass('active');
		// 			// console.log('q remove');


		// 			/*console.log(data);
		// 			console.log(textStatus);*/
		// 		}
		// 	});
		// }

		// /**
		//  * Bind get_posts to tag cloud and navigation
		//  */
		// $(document).on('click', '#container-async a[data-filter], #container-async .pagination a', function (event) {
		// 	if (event.preventDefault) { event.preventDefault(); }

		// 	$this = $(this);

		// 	/**
		// 	 * Set filter active
		// 	 */
		// 	if ($this.data('filter')) {
		// 		$page = 1;
		// 		$pager = $('.infscr-pager a').attr('href', '#page-2');

		// 		/**
		// 		 * If all terms, then deactivate all other
		// 		 */
		// 		if ($this.data('term') === 'all-terms') {
		// 			$this.closest('ul').find('.active').removeClass('active');
		// 			$('#q').val('');
		// 		}
		// 		else {
		// 			$('a[data-term="all-terms"]').parent('li').removeClass('active');
		// 		}

		// 		// Toggle current active
		// 		$this.parent('li').toggleClass('active');

		// 		/**
		// 		 * Get All Active Terms
		// 		 */
		// 		$active = {};
		// 		$terms = $this.closest('ul').find('.active');
		// 		// console.log($terms.length);
		// 		if ($terms.length) {
		// 			$.each($terms, function (index, term) {

		// 				$a = $(term).find('a');
		// 				$tax = $a.data('filter');
		// 				$slug = $a.data('term');

		// 				if ($tax in $active) {
		// 					$active[$tax].push($slug);
		// 				}
		// 				else {
		// 					$active[$tax] = [];
		// 					$active[$tax].push($slug);
		// 				}
		// 			});
		// 		} else {
		// 			$('a[data-term="all-terms"]').trigger('click');
		// 		}
		// 	}
		// 	else {
		// 		/**
		// 		 * Pagination
		// 		 */
		// 		$page = parseInt($this.attr('href').replace(/\D/g, ''));
		// 		$this = $('.nav-filter .active a');
		// 	}

		// 	if ($(this).data('infscr') === 'load') {
		// 		$(this).html('<span class="arrow-icon icw-loading"></span> Load articles');
		// 	}

		// 	$params = {
		// 		'page': $page,
		// 		'terms': $active,
		// 		'qty': $this.closest('#container-async').data('paged'),
		// 		'q': $('#q').val()
		// 	};

		// 	// Run query
		// 	get_posts($params);
		// });


		let typingTimer;
		$("#q").on("keyup", function (event) {
			$('.q-loader').addClass('show');
			// console.log('q change');
			clearTimeout(typingTimer);
			typingTimer = setTimeout(function () {
				$active = {};
				$terms = $('ul.nav-filter').find('.active');

				if ($terms.length) {
					$.each($terms, function (index, term) {

						$a = $(term).find('a');
						$tax = $a.data('filter');
						$slug = $a.data('term');

						if ($tax in $active) {
							$active[$tax].push($slug);
						}
						else {
							$active[$tax] = [];
							$active[$tax].push($slug);
						}
					});
				}

				$params = {
					'page': 1,
					'terms': $active,
					'qty': $this.closest('#container-async').data('paged'),
					'q': $('#q').val()
				};

				$('.q-loader').removeClass('show');
				// Run query
				get_posts($params);
			}, 700);
		});


		// $('.q-search').click(function(event){
		$(".q-search").on("click", function (event) {
			// console.log("q-search event start");
			if (event.preventDefault) { event.preventDefault(); }

			$(this).closest('.post-search').toggleClass('active');
			if ($('.post-search').hasClass('active')) {
				$('.post-search').find('#q').removeAttr('tabindex');
				$('.post-search').find('#q').focus();
			} else {
				$('.post-search').find('#q').val('');
				$('.post-search').find('#q').attr('tabindex', '-1');
				$("#q").trigger('keyup');
			}
		});

		$('#q').on('keyup click', function () {
			const val = $(this).val().trim();

			if (val.length >= 2) {
				$(this).closest('.post-search').addClass('active');
			} else {
				$(this).closest('.post-search').removeClass('active');
			}
		});


		/**
		 * Show all posts on page load
		 */
		$('a[data-term="all-terms"]').trigger('click');
	});
})(jQuery);

if (jQuery('.nav-filter').length) {    
    $(document).on('click', '.nav-filter li a', function () {
        const $this = $(this);
        // Small delay for Bootstrap tab update
        setTimeout(function () {
            $this[0].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center' // show on left side
            });
        }, 100);
    });

}

document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("#single-nav-post");
    if (!nav) return;
    const links = [...nav.querySelectorAll(".nav-link")];
    const indicator = nav.querySelector(".toc-indicator");
    const sections = links.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    function moveIndicator(link) {
        if (!indicator || !link) return;
        indicator.style.top = link.offsetTop + "px";
        indicator.style.height = link.offsetHeight + "px";
    }
    function setActive(link) {
        links.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
        moveIndicator(link);
    }
    // Scroll spy
    function updateActive() {
        const trigger = window.innerHeight * 0.2; // 20% from top
        let activeSection = sections[0];
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= trigger) {activeSection = section;}
        });
        const activeLink = links.find(
            link => link.getAttribute("href") === "#" + activeSection.id
        );
        if (activeLink && !activeLink.classList.contains("active")) {
            setActive(activeLink);
        }
    }
    // Click scroll (150px offset)
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;
            const y = target.getBoundingClientRect().top + window.pageYOffset - 120;
            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
            setActive(this);
        });
    });
    window.addEventListener("scroll", updateActive, {
        passive: true
    });
    window.addEventListener("resize", () => {
        const active = nav.querySelector(".nav-link.active");
        if (active) moveIndicator(active);
    });
    // Initial state
    updateActive();
});