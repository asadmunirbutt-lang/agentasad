$(document).ready(function () {

  // ── Loading screen ──────────────────────────────────────────────────────────
  setTimeout(function () {
    $('#loading').fadeOut(500);
  }, 600);

  // ── Sticky header ───────────────────────────────────────────────────────────
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 80) {
      $('.header-nav').addClass('scrolled');
    } else {
      $('.header-nav').removeClass('scrolled');
    }
  });

  // ── Owl Carousel initialisation ─────────────────────────────────────────────
  if (typeof $.fn.owlCarousel !== 'undefined') {
    $('.owl-carousel').each(function () {
      var $el = $(this);
      var items  = parseInt($el.data('items'))    || 3;
      var mdItems = parseInt($el.data('md-items')) || items;
      var smItems = parseInt($el.data('sm-items')) || 2;
      var xsItems = parseInt($el.data('xs-items')) || 1;
      var xxItems = parseInt($el.data('xx-items')) || 1;
      var space   = parseInt($el.data('space'))    || 30;
      var autoplay = $el.data('autoplay') !== false;
      var dots     = $el.data('nav-dots') !== false;
      var loop     = $el.data('loop') !== false;

      $el.owlCarousel({
        items: items,
        margin: space,
        loop: loop,
        autoplay: autoplay,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        dots: dots,
        nav: false,
        responsive: {
          0:    { items: xxItems },
          480:  { items: xsItems },
          768:  { items: smItems },
          1024: { items: mdItems },
          1200: { items: items }
        }
      });
    });
  }

  // ── Magnific Popup ──────────────────────────────────────────────────────────
  if (typeof $.fn.magnificPopup !== 'undefined') {
    // Gallery lightbox
    var $galleries = $('.lightbox-gallery');
    $galleries.each(function () {
      $(this).find('.gallery-link').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        gallery: { enabled: true }
      });
    });

    // Inline modals
    $('.px_modal').magnificPopup({
      type: 'inline',
      preloader: false,
      modal: false,
      mainClass: 'mfp-fade'
    });
  }

  // ── Smooth scroll (one-page nav) ────────────────────────────────────────────
  $('a[href^="#"]').not('[href="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      var offset = target.offset().top - 80;
      $('html, body').animate({ scrollTop: offset }, 600, 'swing');
      // Close mobile menu if open
      $('.navbar-collapse').collapse('hide');
    }
  });

  // ── Active nav link on scroll ───────────────────────────────────────────────
  function updateActiveNav() {
    var scrollPos = $(window).scrollTop() + 100;
    $('section[id]').each(function () {
      var id = $(this).attr('id');
      var top = $(this).offset().top;
      var bottom = top + $(this).outerHeight();
      if (scrollPos >= top && scrollPos < bottom) {
        $('.navbar-nav .nav-link').removeClass('active');
        $('.navbar-nav .nav-link[href="#' + id + '"]').addClass('active');
      }
    });
  }
  $(window).on('scroll', updateActiveNav);
  updateActiveNav();

});
