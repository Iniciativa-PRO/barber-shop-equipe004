let menuHamburger = document.getElementById('jsmenu-hamburger');
let menuEstendido = document.querySelectorAll('.jsanimation');

menuHamburger.addEventListener('click', () => {
    document.getElementById('jsmenu-estendido').classList.toggle('menu-estendido-visible');

    menuHamburger.classList.toggle('menu-hambuger-lines');
});

menuEstendido.forEach((link) => {
    link.addEventListener('mousemove', () => animationLink(link));
    link.addEventListener('mouseout', () => animationLinkRemove(link))
});
function animationLink(link) {
    return link.classList.add('menu-estendido-li-animation');
}
function animationLinkRemove(link) {
    return link.classList.remove('menu-estendido-li-animation');
}


