
(function () {
	if (!window.jQuery) {
		console.warn('jQuery not found — animations disabled.');
		return;
	}

	$(function () {
		var $title = $('.title');
		if ($title.length) {
			$title.hide().fadeIn(600, function () {
				$('h2, h3, h4, p, ul, pre').hide().each(function (i) {
					$(this).delay(140 * i).fadeIn(380);
				});
			});
		} else {
			$('h2, h3, h4, p, ul, pre').hide().each(function (i) {
				$(this).delay(120 * i).fadeIn(350);
			});
		}

		$('p')
			.css('cursor', 'pointer')
			.on('click', function () {
				var $el = $(this);
				$el.animate({ opacity: 0.6, marginLeft: '8px' }, 180)
					.animate({ opacity: 1, marginLeft: '0px' }, 220);
			})
			.attr('tabindex', 0)
			.on('keydown', function (e) {
				if (e.key === 'Enter' || e.key === ' ') {
					$(this).trigger('click');
					e.preventDefault();
				}
			});

		var $topBtn =
			$('#scrollTopBtn').length && $('#scrollTopBtn') ||
			$('<button id="scrollTopBtn" aria-label="Scroll to top"><i class="fa-solid fa-arrow-up"></i></button>')
				.css({
					position: 'fixed',
					right: '12px',
					bottom: '12px',
					padding: '8px 12px',
					display: 'none',
					'z-index': 9999,
					cursor: 'pointer',
                    borderRadius: '4px',
                    backgroundColor: '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                    lineHeight: '1.5',
				})
				.appendTo('body');

		$(window).on('scroll', function () {
			if ($(window).scrollTop() > 200) {
				$topBtn.fadeIn(180);
			} else {
				$topBtn.fadeOut(120);
			}
		});

		$topBtn.on('click', function () {
			$('html, body').animate({ scrollTop: 0 }, 420);
		});
	});
})();

