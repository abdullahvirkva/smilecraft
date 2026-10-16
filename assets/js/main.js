/* ============================================================
   SMILECRAFT — Dental Studio
   Interactions: navbar, reveal, counters, filters, FAQ,
   testimonial rotator, treatment finder, booking form, to-top
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Navbar scroll state ---------- */
  var nav = document.getElementById('mainNav');
  function onScrollNav() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
    var toTop = document.getElementById('toTop');
    if (toTop) toTop.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Close mobile nav on link click ---------- */
  var navMenu = document.getElementById('navMenu');
  if (navMenu) {
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navMenu.classList.contains('show') && window.bootstrap) {
          window.bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
        }
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Animated counters ---------- */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var dur = 1600, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Generic filter (services / dentists) ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var buttons = group.querySelectorAll('[data-filter]');
    var items = document.querySelectorAll(group.getAttribute('data-filter-group'));
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('on'); });
        btn.classList.add('on');
        var f = btn.getAttribute('data-filter');
        items.forEach(function (item) {
          var cats = (item.getAttribute('data-cat') || '').split(' ');
          item.classList.toggle('filter-hide', f !== 'all' && cats.indexOf(f) === -1);
        });
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      var open = item.classList.contains('open');
      // close siblings in same container
      var container = item.parentElement;
      container.querySelectorAll('.faq-item.open').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Testimonial rotator ---------- */
  var rotator = document.getElementById('testiRotator');
  if (rotator) {
    var slides = JSON.parse(rotator.getAttribute('data-slides') || '[]');
    var dotsBox = document.getElementById('testiDots');
    var quoteEl = rotator.querySelector('.testi-quote');
    var whoEl = rotator.querySelector('.testi-who');
    var idx = 0, timer = null;
    function show(i) {
      idx = (i + slides.length) % slides.length;
      quoteEl.style.opacity = 0;
      setTimeout(function () {
        quoteEl.textContent = '\u201C' + slides[idx].q + '\u201D';
        whoEl.innerHTML = slides[idx].n + '<small>' + slides[idx].t + '</small>';
        quoteEl.style.opacity = 1;
      }, 180);
      dotsBox.querySelectorAll('button').forEach(function (d, di) {
        d.classList.toggle('on', di === idx);
        d.setAttribute('aria-label', 'Show testimonial ' + (di + 1));
      });
    }
    slides.forEach(function (_, di) {
      var b = document.createElement('button');
      b.type = 'button';
      if (di === 0) b.classList.add('on');
      b.addEventListener('click', function () { show(di); restart(); });
      dotsBox.appendChild(b);
    });
    quoteEl.style.transition = 'opacity .18s ease';
    function restart() { clearInterval(timer); timer = setInterval(function () { show(idx + 1); }, 6000); }
    restart();
  }

  /* ---------- Treatment finder ---------- */
  var finder = document.getElementById('finder');
  if (finder) {
    var map = JSON.parse(finder.getAttribute('data-map') || '{}');
    var result = document.getElementById('finderResult');
    var rTitle = result.querySelector('h4');
    var rText = result.querySelector('p');
    var rLink = result.querySelector('a');
    finder.querySelectorAll('[data-symptom]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        finder.querySelectorAll('[data-symptom]').forEach(function (b) { b.classList.remove('on'); });
        btn.classList.add('on');
        var key = btn.getAttribute('data-symptom');
        var entry = map[key];
        if (entry) {
          rTitle.textContent = entry.title;
          rText.textContent = entry.text;
          rLink.textContent = 'Learn about ' + entry.title + ' \u2192';
          result.classList.add('show');
        }
      });
    });
  }

  /* ---------- Booking form validation + success ---------- */
  var form = document.getElementById('bookingForm');
  if (form) {
    // min date = today for the date input
    var dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
      var today = new Date();
      var iso = today.toISOString().split('T')[0];
      dateInput.setAttribute('min', iso);
    }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        var wrap = field.closest('.mb-3') || field.parentElement;
        var bad = false;
        var v = (field.value || '').trim();
        if (!v) bad = true;
        else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) bad = true;
        else if (field.type === 'tel' && v.replace(/\D/g, '').length < 7) bad = true;
        if (wrap) wrap.classList.toggle('was-invalid', bad);
        field.classList.toggle('is-invalid', bad);
        if (bad) valid = false;
      });
      if (!valid) {
        var firstBad = form.querySelector('.is-invalid');
        if (firstBad) firstBad.focus();
        return;
      }
      // success state
      var name = (form.querySelector('#bkName').value || '').trim().split(' ')[0];
      var when = dateInput && dateInput.value ? new Date(dateInput.value + 'T12:00:00') : null;
      var msg = document.getElementById('bookingSuccessMsg');
      if (msg) {
        msg.textContent = name
          ? 'Thanks, ' + name + '! Your request is in \u2014 we\u2019ll confirm your visit shortly.'
          : 'Thanks! Your request is in \u2014 we\u2019ll confirm your visit shortly.';
      }
      var dateLine = document.getElementById('bookingSuccessDate');
      if (dateLine && when) {
        dateLine.textContent = 'Requested date: ' + when.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
      }
      form.style.display = 'none';
      document.getElementById('bookingSuccess').classList.add('show');
      document.getElementById('bookingSuccess').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    // clear error state while typing
    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', function () {
        var wrap = field.closest('.mb-3') || field.parentElement;
        if (wrap) wrap.classList.remove('was-invalid');
        field.classList.remove('is-invalid');
      });
    });
  }

  /* ---------- Newsletter mini-form ---------- */
  var nl = document.getElementById('newsForm');
  if (nl) {
    nl.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var input = nl.querySelector('input[type="email"]');
      var ok = input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      var note = document.getElementById('newsNote');
      if (ok) {
        nl.reset();
        if (note) { note.textContent = 'You\u2019re on the list \u2014 smile tips coming your way.'; note.style.color = 'var(--mint)'; }
      } else if (note) {
        note.textContent = 'Please enter a valid email address.';
        note.style.color = 'var(--coral)';
      }
    });
  }

  /* ---------- Back to top ---------- */
  var toTopBtn = document.getElementById('toTop');
  if (toTopBtn) {
    toTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Highlight today's hours row ---------- */
  var hoursBox = document.getElementById('hoursList');
  if (hoursBox) {
    var day = new Date().getDay(); // 0 = Sunday
    var map = { 0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat' };
    var row = hoursBox.querySelector('[data-day="' + map[day] + '"] .day');
    if (row) {
      var flag = document.createElement('span');
      flag.className = 'today-flag';
      flag.textContent = 'Today';
      row.appendChild(flag);
    }
  }
})();
