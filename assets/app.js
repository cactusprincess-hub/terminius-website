/* App bootstrap with Barba.js transitions */

const TRANSITION_MS = 500;

function setActiveNav(namespace) {
  const links = document.querySelectorAll('.nav a');
  links.forEach((link) => {
    link.classList.toggle('active', link.dataset.ns === namespace);
  });
}

function animateOut(container) {
  return new Promise((resolve) => {
    container.classList.add('page-leave');
    setTimeout(resolve, TRANSITION_MS);
  });
}

function animateIn(container) {
  window.scrollTo(0, 0);
  return new Promise((resolve) => {
    container.classList.add('page-enter');
    setTimeout(() => {
      container.classList.remove('page-enter', 'page-leave');
      resolve();
    }, TRANSITION_MS);
  });
}

function afterEnterHook(data) {
  const ns = data.next.namespace;
  setActiveNav(ns);
}

document.addEventListener('DOMContentLoaded', () => {
  // If Barba is unavailable, degrade gracefully
  if (!window.barba) {
    setActiveNav(document.querySelector('[data-barba="container"]').dataset.barbaNamespace);
    return;
  }

  barba.init({
    transitions: [
      {
        name: 'glitch-fade',
        async leave(data) { await animateOut(data.current.container); },
        async enter(data) { await animateIn(data.next.container); },
      },
    ],
    views: [
      { namespace: 'home', afterEnter: afterEnterHook },
      { namespace: 'play', afterEnter: afterEnterHook },
      { namespace: 'auth', afterEnter: afterEnterHook },
      { namespace: 'team', afterEnter: afterEnterHook },
      { namespace: 'story', afterEnter: afterEnterHook },
      { namespace: 'videos', afterEnter: afterEnterHook },
      { namespace: 'archives', afterEnter: afterEnterHook },
      { namespace: 'cathedral', afterEnter: afterEnterHook },
      { namespace: 'member-zeropoint', afterEnter: afterEnterHook },
      { namespace: 'member-meshweaver', afterEnter: afterEnterHook },
      { namespace: 'member-redcyan', afterEnter: afterEnterHook },
      { namespace: 'member-cathedral', afterEnter: afterEnterHook },
    ],
  });

  // Initial highlight
  const initialNs = document.querySelector('[data-barba="container"]').dataset.barbaNamespace;
  setActiveNav(initialNs);
});

