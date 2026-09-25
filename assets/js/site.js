/* Theo Keetile - portfolio
   Navigation, image lightbox and scroll reveals. No dependencies. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- mobile navigation ---------------- */

  var navBtn = document.querySelector('.nav-toggle');
  var navList = document.getElementById('nav-links');

  if (navBtn && navList) {
    navBtn.addEventListener('click', function () {
      var open = navList.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close the menu when a link is chosen
    navList.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navList.classList.remove('open');
        navBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- lightbox ---------------- */

  // every figure image on the site opens enlarged, with its caption
  var figures = document.querySelectorAll(
    '.shots figure, .gallery figure, .figpair figure, .project-figure, .featured-shot'
  );
  if (!figures.length) return initReveals();

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Enlarged image');
  box.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Close">&times;</button>' +
    '<img alt="">' +
    '<p class="lightbox-caption"></p>' +
    '<p class="lightbox-hint">Click anywhere or press Escape to close</p>';
  document.body.appendChild(box);

  var boxImg = box.querySelector('img');
  var boxCap = box.querySelector('.lightbox-caption');
  var closeBtn = box.querySelector('.lightbox-close');
  var lastFocus = null;

  function openBox(img, caption) {
    lastFocus = document.activeElement;
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt || '';
    boxCap.textContent = caption || img.alt || '';
    box.classList.add('open');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  }

  function closeBox() {
    box.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    // clear the source once the fade has finished
    window.setTimeout(function () {
      if (!box.classList.contains('open')) boxImg.removeAttribute('src');
    }, 320);
  }

  Array.prototype.forEach.call(figures, function (fig) {
    var img = fig.querySelector('img');
    if (!img) return;

    var capEl = fig.querySelector('figcaption');
    var caption = capEl ? capEl.textContent.trim() : '';

    // small corner hint so it is clear the image opens
    var hint = document.createElement('span');
    hint.className = 'zoom-hint';
    hint.setAttribute('aria-hidden', 'true');
    hint.textContent = '⤢';
    fig.appendChild(hint);

    // keyboard reachable
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge image' + (caption ? ': ' + caption : ''));

    img.addEventListener('click', function () { openBox(img, caption); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBox(img, caption);
      }
    });
  });

  box.addEventListener('click', closeBox);
  closeBtn.addEventListener('click', function (e) { e.stopPropagation(); closeBox(); });
  boxImg.addEventListener('click', function (e) { e.stopPropagation(); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && box.classList.contains('open')) closeBox();
  });

  initReveals();

  /* ---------------- scroll reveals ---------------- */

  function initReveals() {
    if (reduceMotion) return;

    var targets = [].slice.call(document.querySelectorAll(
      '.section-head, .card, .stat, .project, .gallery figure, ' +
      '.skill-block, .rank-row li, .cert-grid a, .table-wrap, ' +
      '.callout, blockquote.ref, .timeline li, .prose > p'
    ));
    if (!targets.length) return;

    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      // a short stagger between neighbours, capped so nothing waits long
      el.style.transitionDelay = Math.min(i % 6, 5) * 45 + 'ms';
    });

    var pending = targets.slice();

    // A plain position check rather than an observer. Content that never
    // reveals is far worse than a missing animation, and this cannot be
    // outrun by fast scrolling or defeated by observer quirks.
    function sweep() {
      if (!pending.length) return;
      var limit = window.innerHeight * 0.94;
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add('shown');
          return false;
        }
        return true;
      });
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { sweep(); ticking = false; });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', sweep);
    sweep();

    // last resort: whatever is still hidden after five seconds gets shown,
    // so nothing can be stranded invisible
    window.setTimeout(function () {
      pending.forEach(function (el) { el.classList.add('shown'); });
      pending = [];
    }, 5000);
  }
})();
