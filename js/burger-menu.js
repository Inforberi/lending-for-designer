const burgerMenu = document.querySelector('.burger-menu__open');
const burgerMenuContainer = document.querySelector('.burger-menu__container');
const burgerMenuBtn = document.querySelector('.burger-menu');
const burgerMenuCross = document.querySelector('.burger-menu__cross');
const burgerMenuLogo = document.querySelector('.burger-menu__logo');
const burgerMenuNav = document.querySelectorAll('.burger-menu__list-item-link');

const btnShowBurgerMenu = () => {
    burgerMenu.classList.remove('burger-menu-hidden');
};

const btnCloseBurgerMenu = () => {
    // time out for animation
    setTimeout(() => {
        burgerMenu.classList.add('burger-menu-hidden');
        burgerMenuContainer.style.marginRight = '0';
        burgerMenuContainer.style.transition = 'none';
    }, 500);

    // animation of close
    burgerMenuContainer.style.marginRight = '-100%';
    burgerMenuContainer.style.transition = '1.5s ease';
};

// touch on burger menu
burgerMenuBtn.addEventListener('click', btnShowBurgerMenu);

//touch on cross
burgerMenuCross.addEventListener('click', btnCloseBurgerMenu);

//close when touch on header
burgerMenuLogo.addEventListener('click', btnCloseBurgerMenu);

//closing a form when clicking outside it
document.addEventListener('click', function (e) {
    if (!burgerMenu.contains(e.target) && !burgerMenuBtn.contains(e.target))
        btnCloseBurgerMenu();
});

burgerMenuNav.forEach((nav) => {
    nav.addEventListener('click', btnCloseBurgerMenu);
});
