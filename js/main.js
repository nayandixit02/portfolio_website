 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - 70
	    }, 500, function() {
	    	// window.location.hash = href;
	    });
		});

	};

	onePageClick();
	

	var carousel = function() {
		var $homeSlider = $('.home-slider');
		$homeSlider.owlCarousel({
			loop: true,
			autoplay: true,
			margin: 0,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			nav: false,
			autoplayHoverPause: false,
			items: 1,
			mouseDrag: false,
			touchDrag: false,
			pullDrag: false,
			freeDrag: false,
			navText: ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
			responsive: {
				0: { items: 1 },
				600: { items: 1 },
				1000: { items: 1 }
			}
		});

		// Passive touch handling: allow horizontal swiping between slides without blocking vertical page scroll
		var touchStartX = 0;
		var touchStartY = 0;
		$homeSlider.on('touchstart', function(e) {
			var touch = (e.originalEvent.touches && e.originalEvent.touches[0]) || (e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]);
			if (touch) {
				touchStartX = touch.pageX;
				touchStartY = touch.pageY;
			}
		});

		$homeSlider.on('touchend', function(e) {
			var touch = (e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) || (e.originalEvent.touches && e.originalEvent.touches[0]);
			if (touch) {
				var diffX = touch.pageX - touchStartX;
				var diffY = touch.pageY - touchStartY;
				if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
					if (diffX < 0) {
						$homeSlider.trigger('next.owl.carousel');
					} else {
						$homeSlider.trigger('prev.owl.carousel');
					}
				}
			}
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

  // ==========================================
  // Modern Dynamic Effects & Micro-Interactions
  // ==========================================

  // 1. Dynamic Typewriter Effect for Hero
  var roles = [
    "Full-Stack Developer (MERN)",
    "500+ DSA Problem Solver",
    "Knight @ LeetCode (Top 6%)",
    "AI Software Evaluator",
    "B.Tech @ KNIT Sultanpur"
  ];
  var roleIdx = 0;
  var charIdx = 0;
  var isDeleting = false;
  var typingSpeed = 100;

  function typeEffect() {
    var $typed = $('#typed-roles');
    if (!$typed.length) return;

    var currentRole = roles[roleIdx];
    if (isDeleting) {
      $typed.text(currentRole.substring(0, charIdx - 1));
      charIdx--;
      typingSpeed = 50;
    } else {
      $typed.text(currentRole.substring(0, charIdx + 1));
      charIdx++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 2000; // Pause at full text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // 2. Mouse Cursor Ambient Spotlight Glow
  $(document).on('mousemove', function(e) {
    var $glow = $('.ambient-glow');
    if ($glow.length) {
      $glow.css({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
      });
    }
  });

  // 3. Back to Top Button
  var $backToTop = $('.back-to-top');
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 400) {
      $backToTop.addClass('active');
    } else {
      $backToTop.removeClass('active');
    }
  });

  $backToTop.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  // 4. Interactive Topic Chips for Contact Form
  $('.topic-chip').on('click', function() {
    var topic = $(this).data('topic') || $(this).text().trim();
    $('.topic-chip').removeClass('active');
    $(this).addClass('active');
    $('#contact-subject').val(topic).trigger('change');
  });

  // 5. Quick Email Copy to Clipboard
  $('.quick-email-copy-box').on('click', function() {
    var email = $(this).data('email') || 'nayandixit1503@gmail.com';
    navigator.clipboard.writeText(email).then(function() {
      var $toast = $('.copy-toast');
      if (!$toast.length) {
        $toast = $('<div class="copy-toast">Email copied to clipboard! 📋</div>').appendTo('body');
      }
      $toast.addClass('show');
      setTimeout(function() {
        $toast.removeClass('show');
      }, 2500);
    });
  });

  // 6. Message Character Counter
  $('#contact-message').on('input', function() {
    var len = $(this).val().length;
    $('#message-char-count').text(len);
  });

  // 7. Theme Switcher (Dark & Light Mode)
  function initTheme() {
    var storedTheme = localStorage.getItem('portfolio-theme');
    var isLight = storedTheme === 'light' || (!storedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);
    if (isLight) {
      $('html, body').addClass('light-theme');
    } else {
      $('html, body').removeClass('light-theme');
    }
  }
  initTheme();

  function toggleTheme() {
    var isCurrentlyLight = $('html').hasClass('light-theme') || $('body').hasClass('light-theme');
    if (isCurrentlyLight) {
      $('html, body').removeClass('light-theme');
      try { localStorage.setItem('portfolio-theme', 'dark'); } catch(e) {}
    } else {
      $('html, body').addClass('light-theme');
      try { localStorage.setItem('portfolio-theme', 'light'); } catch(e) {}
    }
  }

  $(document).on('click', '#theme-toggle, .theme-toggle-switch', function(e) {
    e.preventDefault();
    toggleTheme();
  });

  // 8. Working Asynchronous Contact Form Submission (Formspree AJAX)
  $('#main-contact-form').on('submit', function(e) {
    e.preventDefault();
    var $form = $(this);
    var $btn = $('#btn-submit-contact');
    var $feedback = $('#form-feedback-container');

    var name = $.trim($form.find('input[name="name"]').val());
    var email = $.trim($form.find('input[name="email"]').val());
    var subject = $.trim($form.find('input[name="subject"]').val());
    var message = $.trim($form.find('textarea[name="message"]').val());

    // Basic Validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !subject || !message) {
      $feedback.html(
        '<div class="feedback-card error-card">' +
          '<div class="feedback-icon">⚠️</div>' +
          '<h4>Please Complete All Fields</h4>' +
          '<p>All fields marked with an asterisk (*) are required to send your message.</p>' +
        '</div>'
      ).slideDown();
      return;
    }

    if (!emailRegex.test(email)) {
      $feedback.html(
        '<div class="feedback-card error-card">' +
          '<div class="feedback-icon">📧</div>' +
          '<h4>Invalid Email Address</h4>' +
          '<p>Please enter a valid email address so I can get back to you.</p>' +
        '</div>'
      ).slideDown();
      return;
    }

    // Submit state
    $btn.prop('disabled', true).html('<span class="btn-spinner"></span> Sending Message... 🚀');
    $feedback.slideUp();

    var formData = new FormData($form[0]);

    fetch($form.attr('action'), {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(function(response) {
      if (response.ok) {
        $feedback.html(
          '<div class="feedback-card success-card">' +
            '<div class="feedback-icon">🎉</div>' +
            '<h4>Message Sent Successfully!</h4>' +
            '<p>Thank you, <strong>' + $('<div>').text(name).html() + '</strong>! Your message regarding <em>"' + $('<div>').text(subject).html() + '"</em> has been received. I\'ll get back to you at <strong>' + $('<div>').text(email).html() + '</strong> within 24 hours.</p>' +
            '<button type="button" class="btn-feedback-action" id="btn-send-another">Send Another Message</button>' +
          '</div>'
        ).slideDown();

        // Reset inputs
        $form[0].reset();
        $('#message-char-count').text('0');
        // Restore default topic chip
        $('.topic-chip').removeClass('active');
        $('.topic-chip').first().addClass('active');
        $('#contact-subject').val($('.topic-chip').first().data('topic'));
      } else {
        return response.json().then(function(data) {
          var errorMsg = (data && data.errors && data.errors.map(function(e) { return e.message; }).join(', ')) || 'Failed to submit form.';
          throw new Error(errorMsg);
        });
      }
    })
    .catch(function(err) {
      $feedback.html(
        '<div class="feedback-card error-card">' +
          '<div class="feedback-icon">⚠️</div>' +
          '<h4>Could Not Send Message</h4>' +
          '<p>' + (err.message || 'There was an issue transmitting your message.') + '<br>You can reach me directly via email at <a href="mailto:nayandixit1503@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message) + '">nayandixit1503@gmail.com</a>.</p>' +
          '<button type="button" class="btn-feedback-action" id="btn-retry-form">Try Again</button>' +
        '</div>'
      ).slideDown();
    })
    .finally(function() {
      $btn.prop('disabled', false).html('<span>Send Message</span> <span class="icon-paper-plane send-icon"></span>');
    });
  });

  // Handler to clear feedback and send another note
  $(document).on('click', '#btn-send-another, #btn-retry-form', function() {
    $('#form-feedback-container').slideUp();
    $('#contact-message').focus();
  });

  // 9. Smooth Scroll & Focus on "Get in Touch" / "Hire Me"
  $('a[href="#contact-section"]').on('click', function() {
    setTimeout(function() {
      $('input[name="name"]').focus();
    }, 700);
  });

})(jQuery);



