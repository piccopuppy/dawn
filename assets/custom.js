// Store-specific scripts. Kept out of stock Dawn files so upstream merges stay clean.

// Desktop header menus (Shop, Misc) open on hover. Touch and keyboard keep Dawn's click/Enter toggle.
const hoverMenuQuery = window.matchMedia('(min-width: 990px) and (hover: hover)');

function initHoverMenus(root = document) {
  root.querySelectorAll('.header__inline-menu header-menu').forEach((menu) => {
    const summary = menu.querySelector('summary');
    let closeTimer;

    const open = () => {
      clearTimeout(closeTimer);
      menu.closest('nav').querySelectorAll('header-menu').forEach((other) => other !== menu && other.close());
      menu.mainDetailsToggle.open = true;
      summary.setAttribute('aria-expanded', true);
    };

    menu.addEventListener('mouseenter', () => hoverMenuQuery.matches && open());
    menu.addEventListener('mouseleave', () => {
      if (hoverMenuQuery.matches) closeTimer = setTimeout(() => menu.close(), 200);
    });

    // A mouse click would toggle the hover-opened menu shut. Keyboard clicks (detail 0) keep Dawn's toggle.
    summary.addEventListener('click', (event) => {
      if (!hoverMenuQuery.matches || !event.detail) return;
      event.preventDefault();
      open();
    });
  });
}

initHoverMenus();
document.addEventListener('shopify:section:load', (event) => initHoverMenus(event.target));
