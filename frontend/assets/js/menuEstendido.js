let menuHamburger = document.getElementById('jsmenu-hamburger');
let menuEstendido = document.querySelectorAll('.jsanimation');

function menuActive() {
    document.getElementById('jsmenu-estendido').classList.toggle('menu-estendido-visible');
    menuHamburger.classList.toggle('menu-hambuger-lines');
};

menuHamburger.addEventListener('click', menuActive);

menuEstendido.forEach((link) => {
    link.addEventListener('mousemove', () => animationLink(link));
    link.addEventListener('mouseout', () => animationLinkRemove(link));
    link.addEventListener('click', () => menuActive());
});

function animationLink(link) {
    return link.classList.add('menu-estendido-li-animation');
}

function animationLinkRemove(link) {
    return link.classList.remove('menu-estendido-li-animation');
}


