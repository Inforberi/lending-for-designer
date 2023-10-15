'use strict';

const getWidthCards = document.querySelector('.portfolio__cards');
const btnPortfolioRightTablet = document.querySelector(
    '.portfolio__arrow-right-tablet'
);
const btnPortfolioLeftTablet = document.querySelector(
    '.portfolio__arrow-left-tablet'
);

// считаем сколько карточек в портфоли в сайтах
const countHowMuchCardSites = document.querySelector('.slider-sites');
const countHowMuchCardSitesLength =
    countHowMuchCardSites.children[0].children[0].children.length;

//// ссылка на портфоли биханс при наведении увеличивается

const portfolioScale = document.querySelectorAll('.portfolio__sites-container');

const arrowsPortfolio = document.querySelectorAll('.portfolio__arrows-tablets');

const arrowFillMobile = (arrow, index) => {
    arrow.addEventListener('click', () => {
        if (index === 0) {
            arrow.classList.add('arrowLeftTabletPortfolio');

            arrow.style.webkitTransition = '-webkit-transform .5s ease';
            arrow.style.transition = '-webkit-transform .5s ease';
            setTimeout(() => {
                arrow.classList.remove('arrowLeftTabletPortfolio');
                arrow.style.webkitTransition = '';
                arrow.style.transition = '';
            }, 500);
        }
        if (index === 1) {
            arrow.classList.add('arrowRightTabletPortfolio');

            arrow.style.webkitTransition = '-webkit-transform .5s ease';
            arrow.style.transition = '-webkit-transform .5s ease';
            setTimeout(() => {
                arrow.classList.remove('arrowRightTabletPortfolio');
                arrow.style.webkitTransition = '';
                arrow.style.transition = '';
            }, 500);
        }
    });
};

// при нажатии на кнопку на сенсоре будет видна заливка кнопки вперед или назад
arrowsPortfolio.forEach((arrow, index) => {
    arrowFillMobile(arrow, index);
});

const listSlidersPortfolioActiveArrowLeft = [
    'sites_arrow-left-tablet',
    'commercial_arrow-left-tablet',
    'brands_arrow-left-tablet',
    'logo_arrow-left-tablet',
];
const listSlidersPortfolioActiveArrowRight = [
    'sites_arrow-right-tablet',
    'commercial_arrow-right-tablet',
    'brands_arrow-right-tablet',
    'logo_arrow-right-tablet',
];

//touch move
// Обработчики для слайдера sites

let touchStartX = 0;
let touchEndX = 0;
let isTouchMoving = false;

const touchMove = function (cardsNameContainer, functionRight, functionLeft) {
    cardsNameContainer.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
        isTouchMoving = false; // Сбрасываем состояние при начале касания
    });

    cardsNameContainer.addEventListener('touchmove', (event) => {
        touchEndX = event.touches[0].clientX;
        isTouchMoving = true; // Устанавливаем состояние "движение"
    });

    cardsNameContainer.addEventListener('touchend', () => {
        if (isTouchMoving) {
            const touchDiff = touchStartX - touchEndX;
            const sensitivity = 30;

            if (touchDiff > sensitivity) {
                functionRight();
            } else if (touchDiff < -sensitivity) {
                functionLeft();
            }
        }

        // Сбросим значения и состояние
        touchStartX = 0;
        touchEndX = 0;
        isTouchMoving = false;
    });
};

//slider sites

const allSitesCard = document.querySelector('.slider-sites__container');
const btnRightSites = document.querySelector('#sites_arrow-right');
const btnLeftSites = document.querySelector('#sites_arrow-left');

// let currentCards = 0;
const currentCards = {
    sites: 0,
    commercial: 0,
    brands: 0,
    logo: 0,
};
let cardWidth = 595;
const laptopCardsWidth = 490;
let widthCardsTablet;

//move cards site
const moveCardsSites = function () {
    allSitesCard.style.transform = `translateX(${
        -currentCards.sites * cardWidth
    }px)`;
    allSitesCard.style.transition = '1s ease';
};

const moveSitesRight = function () {
    if (window.innerWidth > 980) {
        currentCards.sites >= countHowMuchCardSitesLength - 2
            ? (currentCards.sites = 0)
            : currentCards.sites++;
        moveCardsSites();
    }

    if (window.innerWidth <= 980) {
        currentCards.sites >= countHowMuchCardSitesLength - 1
            ? (currentCards.sites = 0)
            : currentCards.sites++;
        moveCardsSites();
    }
};

const moveSitesLeft = function () {
    if (window.innerWidth > 980) {
        currentCards.sites <= 0
            ? (currentCards.sites = countHowMuchCardSitesLength - 2)
            : currentCards.sites--;
        moveCardsSites();
    }
    if (window.innerWidth <= 980) {
        currentCards.sites <= 0
            ? (currentCards.sites = countHowMuchCardSitesLength - 1)
            : currentCards.sites--;
        moveCardsSites();
    }
};

//touch move site
touchMove(allSitesCard, moveSitesRight, moveSitesLeft);

//put buttons site right/left
btnRightSites.addEventListener('click', moveSitesRight);
btnLeftSites.addEventListener('click', moveSitesLeft);

//slider commercial

const allCommercialCard = document.querySelector(
    '.slider-commercial__container'
);
//put buttons site right/left
const btnRightCommercial = document.querySelector('#commercial_arrow-right');
const btnLeftCommercial = document.querySelector('#commercial_arrow-left');

//move cards commercial

const moveCommercialCards = function () {
    allCommercialCard.style.transform = `translateX(${
        -currentCards.commercial * cardWidth
    }px)`;
    allCommercialCard.style.transition = '1s ease';
};

const moveCommercialRight = function () {
    currentCards.commercial >= 2
        ? (currentCards.commercial = 0)
        : currentCards.commercial++;
    moveCommercialCards();
};

const moveCommercialLeft = function () {
    currentCards.commercial <= 0
        ? (currentCards.commercial = 2)
        : currentCards.commercial--;
    moveCommercialCards();
};

//touch move commercial
touchMove(allCommercialCard, moveCommercialRight, moveCommercialLeft);

//put buttons Commercial right/left
btnRightCommercial.addEventListener('click', moveCommercialRight);
btnLeftCommercial.addEventListener('click', moveCommercialLeft);

// slider brands

const allBrandCard = document.querySelector('.slider-brands__container');
const btnRightBrand = document.querySelector('#brands_arrow-right');
const btnLeftBrand = document.querySelector('#brands_arrow-left');

//move cards brands

const moveBrandCards = function () {
    allBrandCard.style.transform = `translateX(${
        -currentCards.brands * cardWidth
    }px)`;
    allBrandCard.style.transition = '1s ease';
};

const moveBrandRight = function () {
    currentCards.brands >= 1
        ? (currentCards.brands = 0)
        : currentCards.brands++;
    moveBrandCards();
};

const moveBrandLeft = function () {
    currentCards.brands <= 0
        ? (currentCards.brands = 1)
        : currentCards.brands--;
    moveBrandCards();
};

//touch move brand
touchMove(allBrandCard, moveBrandRight, moveBrandLeft);

//put buttons barnd right/left

// btnRightBrand.addEventListener('click', moveBrandRight);
// btnLeftBrand.addEventListener('click', moveBrandLeft);

//slider Logo

const allLogoCard = document.querySelector('.slider-logo__container');
const btnRightLogo = document.querySelector('#logo_arrow-right');
const btnLeftLogo = document.querySelector('#logo_arrow-left');

//move cards logo

const moveLogoCards = function () {
    allLogoCard.style.transform = `translateX(${
        -currentCards.logo * cardWidth
    }px)`;
    allLogoCard.style.transition = '1s ease';
};

const moveLogoRight = function () {
    currentCards.logo >= 10 ? (currentCards.logo = 0) : currentCards.logo++;
    moveLogoCards();
};

const moveLogoLeft = function () {
    currentCards.logo <= 0 ? (currentCards.logo = 10) : currentCards.logo--;
    moveLogoCards();
};

//touch move logo
touchMove(allLogoCard, moveLogoRight, moveLogoLeft);

//put buttons logo right/left
btnRightLogo.addEventListener('click', moveLogoRight);
btnLeftLogo.addEventListener('click', moveLogoLeft);

// card selection

const allPortfolio = document.querySelectorAll('.portfolio__all-cards');
const selectionTypeOfPortfolio = document.querySelectorAll(
    '.portfolio__list-item-link'
);

selectionTypeOfPortfolio.forEach((type, index) => {
    type.addEventListener('click', function () {
        // remove active class from all elements
        selectionTypeOfPortfolio.forEach((item) => {
            item.classList.remove('portfolio__list-item-link-active');
            // item.style.transition = '0.2s ease';
        });

        // add class a selected element
        type.classList.toggle('portfolio__list-item-link-active');
        type.style.transition = '0.2s ease';

        // remove class active from all cards
        allPortfolio.forEach((slide) => {
            const allSlide = slide.children;
            for (const slideAllCards of allSlide) {
                slideAllCards.classList.remove('slider-portfolio-active');
            }
            slide.style.transition = '1s ease';
        });

        // add class active
        allPortfolio.forEach((type, i) => {
            const activeslide = type.children[index];
            activeslide.classList.add('slider-portfolio-active');
            activeslide.style.transition = '1s ease';
        });
    });
});

const callOfAllFunctions = () => {
    moveCardsSites();
    moveCommercialCards();
    moveBrandCards();
    moveLogoCards();
};

const portfolioTypes = [
    {
        type: 'sites',
        buttons: {
            right: btnPortfolioRightTablet,
            left: btnPortfolioLeftTablet,
            classes: {
                forward: 'sites_arrow-right-tablet',
                backward: 'sites_arrow-left-tablet',
            },
            moveForward: moveSitesRight,
            moveBackward: moveSitesLeft,
        },
    },
    {
        type: 'commercial',
        buttons: {
            right: btnPortfolioRightTablet,
            left: btnPortfolioLeftTablet,
            classes: {
                forward: 'commercial_arrow-right-tablet',
                backward: 'commercial_arrow-left-tablet',
            },
            moveForward: moveCommercialRight,
            moveBackward: moveCommercialLeft,
        },
    },
    {
        type: 'brands',
        buttons: {
            right: btnPortfolioRightTablet,
            left: btnPortfolioLeftTablet,
            classes: {
                forward: 'brand_arrow-right-tablet',
                backward: 'brand_arrow-left-tablet',
            },
            moveForward: moveBrandRight,
            moveBackward: moveBrandLeft,
        },
    },
    {
        type: 'logo',
        buttons: {
            right: btnPortfolioRightTablet,
            left: btnPortfolioLeftTablet,
            classes: {
                forward: 'logo_arrow-right-tablet',
                backward: 'logo_arrow-left-tablet',
            },
            moveForward: moveLogoRight,
            moveBackward: moveLogoLeft,
        },
    },
];

const sitesIndexPortfolio = portfolioTypes.findIndex(
    (type) => type.type === 'sites'
);
const sitesIndex = selectionTypeOfPortfolio[sitesIndexPortfolio];
const clickSites = new Event('click');

selectionTypeOfPortfolio.forEach((type, index) => {
    type.addEventListener('click', () => {
        const selectedType = portfolioTypes[index];
        const selectedButtons = selectedType.buttons;
        currentCards.type = 0;

        selectedButtons.right.classList.remove(
            ...listSlidersPortfolioActiveArrowRight
        );
        selectedButtons.left.classList.remove(
            ...listSlidersPortfolioActiveArrowLeft
        );
        selectedButtons.right.classList.add(selectedButtons.classes.forward);
        selectedButtons.left.classList.add(selectedButtons.classes.backward);

        selectedButtons.right.removeEventListener(
            'click',
            selectedButtons.moveForward
        );
        selectedButtons.left.removeEventListener(
            'click',
            selectedButtons.moveBackward
        );
        selectedButtons.right.addEventListener(
            'click',
            selectedButtons.moveForward
        );
        selectedButtons.left.addEventListener(
            'click',
            selectedButtons.moveBackward
        );

        callOfAllFunctions();
    });
});

sitesIndex.dispatchEvent(clickSites);

// callOfAllFunctions();

// change the size of the cards depending on the screen size
const updateCardWidth = () => {
    // находим динамически ширину карточки в версии для планшета
    let dynamicWidthTablet = window.getComputedStyle(getWidthCards);
    let dynamicWidthCards = dynamicWidthTablet.getPropertyValue('width');
    widthCardsTablet = parseFloat(dynamicWidthCards) + 30;

    if (window.innerWidth <= 1190 || window.innerWidth > 980) {
        cardWidth = laptopCardsWidth;
        callOfAllFunctions();
    }
    if (window.innerWidth > 1190) {
        cardWidth = 595;
        callOfAllFunctions();
    }

    if (window.innerWidth <= 980) {
        cardWidth = widthCardsTablet;
        callOfAllFunctions();
    }

    portfolioScale.forEach((scale) => {
        if (window.innerWidth <= 980) {
            scale.addEventListener('mouseover', () => {
                scale.style.webkitTransform = 'scale(1)';
                scale.style.transform = 'scale(1)';
                scale.style.transition = '.5s ease';
                scale.style.webkitTransition = '.5s ease';
            });
            scale.addEventListener('mouseout', () => {
                scale.style.webkitTransform = 'scale(1)';
                scale.style.transform = 'scale(1)';
                scale.style.webkitTransition = '.5s ease';
                scale.style.transition = '.5s ease';
            });
        }
        if (window.innerWidth > 980) {
            scale.addEventListener('mouseover', () => {
                scale.style.webkitTransform = 'scale(1.05)';
                scale.style.transform = 'scale(1.05)';
                scale.style.webkitTransition = '.5s ease';
                scale.style.transition = '.5s ease';
            });
            scale.addEventListener('mouseout', () => {
                scale.style.transform = 'scale(1)';
                scale.style.webkitTransform = 'scale(1)';
                scale.style.webkitTransition = '.5s ease';
                scale.style.transition = '.5s ease';
            });
        }
    });
};
// sitesIndex.dispatchEvent(clickSites);

updateCardWidth();

window.addEventListener('load', updateCardWidth);
window.addEventListener('resize', updateCardWidth);
