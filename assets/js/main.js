(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split('=')
    new Typed('.typed', {
      strings: typed_strings,
      loop: false,
      typeSpeed: 50,
    });
  }


  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let galeriaContainer = select('.galeria-container');
    if (galeriaContainer) {
      let galeriaIsotope = new Isotope(galeriaContainer, {
        itemSelector: '.galeria-item'
      });

      let galeriaFilters = select('#galeria-flters li', true);

      // Počet fotiek pri každom filtri
      galeriaFilters.forEach(function(li) {
        let filter = li.getAttribute('data-filter');
        let count;
        if (filter === '*') {
          count = galeriaContainer.querySelectorAll('.galeria-item').length;
        } else {
          count = galeriaContainer.querySelectorAll('.galeria-item' + filter).length;
        }
        let span = document.createElement('span');
        span.className = 'galeria-filter-count';
        span.textContent = ' (' + count + ')';
        li.appendChild(span);
      });

      on('click', '#galeria-flters li', function(e) {
        e.preventDefault();
        galeriaFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        galeriaIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        galeriaIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });


  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let archiveContainer = select('.archive-container');
    if (archiveContainer) {
      let archiveIsotope = new Isotope(archiveContainer, {
        itemSelector: '.archive-item'
      });

      let archiveFilters = select('#archive-flters li', true);

      on('click', '#archive-flters li', function(e) {
        e.preventDefault();
        archiveFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        archiveIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        archiveIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });


  /**
   * Initiate galeria lightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()


 /**
  * Shot popup
  */
 document.addEventListener('DOMContentLoaded', function() {
  const ticketButton = document.getElementById('ticketButton');
  const popup = document.getElementById('ticketPopup');
  const overlay = document.getElementById('popupOverlay');
  const closeButton = document.getElementById('closePopupButton');

  if (ticketButton && popup && overlay && closeButton) {
    ticketButton.addEventListener('click', function(e) {
      e.preventDefault();
      popup.style.display = 'block';
      overlay.style.display = 'block';
    });
    closeButton.addEventListener('click', function() {
      popup.style.display = 'none';
      overlay.style.display = 'none';
    });
    overlay.addEventListener('click', function() {
      popup.style.display = 'none';
      overlay.style.display = 'none';
    });
  }

  /**
   * Contact email: copy to clipboard and show toast
   */
  const copyToast = document.getElementById('copy-toast');
  const copyLinks = document.querySelectorAll('.contact-email-copy');
  let copyToastTimeout = null;

  if (copyToast && copyLinks.length) {
    copyLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const email = this.getAttribute('data-email') || this.textContent.trim();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(function() {
            copyToast.classList.add('is-visible');
            if (copyToastTimeout) clearTimeout(copyToastTimeout);
            copyToastTimeout = setTimeout(function() {
              copyToast.classList.remove('is-visible');
              copyToastTimeout = null;
            }, 2500);
          }).catch(function() {
            copyToast.classList.add('is-visible');
            if (copyToastTimeout) clearTimeout(copyToastTimeout);
            copyToastTimeout = setTimeout(function() {
              copyToast.classList.remove('is-visible');
              copyToastTimeout = null;
            }, 2500);
          });
        } else {
          var input = document.createElement('input');
          input.setAttribute('value', email);
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          copyToast.classList.add('is-visible');
          if (copyToastTimeout) clearTimeout(copyToastTimeout);
          copyToastTimeout = setTimeout(function() {
            copyToast.classList.remove('is-visible');
            copyToastTimeout = null;
          }, 2500);
        }
      });
    });
  }
});
