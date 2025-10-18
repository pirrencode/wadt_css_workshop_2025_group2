
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

		/* ---- Inline flip-cards for specific headings ---- */
		(function () {
			var ids = ['csspreprocessor', 'sass', 'howtousesass', 'howtosass'];
			ids.forEach(function (id) {
				var $heading = $('#' + id);
				if (!$heading.length) return;

				// Collect following paragraphs until next heading of same-or-higher level
				var $content = $();
				var $el = $heading.next();
				while ($el.length && !$el.is('h1,h2,h3,h4,h5,h6')) {
					if ($el.is('p,ul,ol,pre')) $content = $content.add($el);
					$el = $el.next();
				}

				// If there's no paragraph content, skip
				if (!$content.length) return;

				// Build flip card pieces
				var $card = $('<div class="flip-card" tabindex="0" role="button" aria-pressed="false"></div>');
				var $inner = $('<div class="flip-card-inner"></div>');
				var $front = $('<div class="flip-card-front"></div>');
				var $back = $('<div class="flip-card-back"></div>');

				// Move heading into front (clone to preserve original if needed)
				$front.append($heading.clone().addClass('front-heading'));

				// Move content elements into back
				$content.each(function () { $back.append($(this).clone()); });

				$inner.append($front).append($back);
				$card.append($inner);

				// Replace heading and content with card
				$content.first().before($card);
				// remove original content and heading
				$heading.remove();
				$content.remove();

				// Toggle function
				function toggleFlip($c) {
					var is = $c.hasClass('is-flipped');
					$c.toggleClass('is-flipped', !is);
					$c.attr('aria-pressed', String(!is));
					$c.find('.flip-card-inner').toggleClass('is-flipped', !is);
				}
+
				// Click and keyboard handlers
				$card.on('click', function (e) {
					e.preventDefault();
					toggleFlip($card);
				});
				$card.on('keydown', function (e) {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						toggleFlip($card);
					}
				});
			});
		})();
	});
})();

