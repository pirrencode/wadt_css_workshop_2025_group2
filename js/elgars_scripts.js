
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

		(function () {
			var ids = ['csspreprocessor', 'sass', 'howtousesass', 'howtosass'];
			ids.forEach(function (id) {
				var $heading = $('#' + id);
				if (!$heading.length) return;

				var $content = $();
				var $el = $heading.next();
				while ($el.length && !$el.is('h1,h2,h3,h4,h5,h6')) {
					if ($el.is('p,ul,ol,pre')) $content = $content.add($el);
					$el = $el.next();
				}

				if (!$content.length) return;

				var $card = $('<div class="flip-card" tabindex="0" role="button" aria-pressed="false"></div>');
				var $inner = $('<div class="flip-card-inner"></div>');
				var $front = $('<div class="flip-card-front"></div>');
				var $back = $('<div class="flip-card-back"></div>');

				$front.append($heading.clone().addClass('front-heading'));

				$content.each(function () { $back.append($(this).clone()); });

				$inner.append($front).append($back);
				$card.append($inner);

				$content.first().before($card);
				$heading.remove();
				$content.remove();

				function toggleFlip($c) {
					var isFlipped = $c.hasClass('is-flipped');
					var $inner = $c.find('.flip-card-inner');
					
					if (!isFlipped) {
						var $backSide = $c.find('.flip-card-back');
						var backHeight = $backSide[0].scrollHeight;
						
					$c.css('height', $c.height() + 'px'); 
					
					$c.animate({ height: backHeight + 'px' }, 400, 'swing', function() {
						$c.toggleClass('is-flipped', true);
						$inner.toggleClass('is-flipped', true);
						$c.attr('aria-pressed', 'true');
					});
				} else {
					var $frontSide = $c.find('.flip-card-front');
					var frontHeight = $frontSide[0].scrollHeight;
					
					$c.toggleClass('is-flipped', false);
					$inner.toggleClass('is-flipped', false);
					$c.attr('aria-pressed', 'false');
					
					$c.css('height', $c.height() + 'px');
					
					$c.animate({ height: frontHeight + 'px' }, 400, 'swing', function() {
						$c.css('height', 'auto');
					});
				}
				}
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

