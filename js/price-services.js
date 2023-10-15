const allCards = document.querySelectorAll('.price-services__cards');
const parantCard = document.querySelector('.price-services__container');
const nextBtn = document.querySelector('.price-services-right');
const prevBtn = document.querySelector('.price-services-left');
const priceServicesCard = document.querySelector('.price-services__cards');
const arrowPriceServicesMobileFill = document.querySelectorAll(
    '.price-services-arrow-mobile'
);

// при нажатии на кнопку на сенсоре будет видна заливка кнопки вперед или назад
arrowPriceServicesMobileFill.forEach((arrow, index) => {
    arrowFillMobile(arrow, index);
});

//tablet buttons
const nextBtnTablet = document.querySelector('.price-services-right-tablet');
const prevBtnTablet = document.querySelector('.price-services-left-tablet');

cardsLength = allCards.length;

let currentSlide = 0;

let cardPriceWidth = 383;
const laptopCardsPriceWidth = 334;
let cardWidthPriceDynamic;

// is needed to start the slider and is used only once before the button is pressed
let isFirstSlideChange = true;

const moveSlide = function () {
    if (window.innerWidth > 980 || window.innerWidth <= 425) {
        allCards.forEach((card, index) => {
            const offset = index - currentSlide;

            card.classList.toggle(
                'slide-active',
                offset === 1 && !isFirstSlideChange
            );
            if (isFirstSlideChange) {
                card.classList.toggle('slide-active', offset === 3);
            }
            if (window.innerWidth <= 1190 && window.innerWidth > 425) {
                // if (card.classList.contains('slide-active')) {
                card.lastElementChild.style.padding = '11px 50px';
            }

            card.style.transition = '1s ease';
        });
        if (isFirstSlideChange) {
            parantCard.style.transform = `translateX(-${cardPriceWidth}px)`;
            currentSlide++;
        } else {
            parantCard.style.transform = `translateX(-${
                currentSlide * cardPriceWidth
            }px)`;
        }
        parantCard.style.transition = ' 1s ease';
    }
    if (window.innerWidth <= 980) {
        parantCard.style.transform = `translateX(-${
            currentSlide * cardWidthPriceDynamic
        }px)`;
        parantCard.style.transition = ' 1s ease';
    }
};

const nextSlide = () => {
    if (isFirstSlideChange) {
        isFirstSlideChange = false; // Switching the variable after the first press
    }

    if (window.innerWidth > 980) {
        currentSlide = (currentSlide + 1) % (cardsLength - 2);
    }

    if (window.innerWidth <= 980 && window.innerWidth > 425) {
        currentSlide = (currentSlide + 1) % (cardsLength - 3);
    }

    if (window.innerWidth <= 425) {
        currentSlide = (currentSlide + 1) % (cardsLength - 2);
    }

    moveSlide();
};

const prevSlide = () => {
    if (isFirstSlideChange) {
        isFirstSlideChange = false; // Switching the variable after the first press
    }

    if (window.innerWidth > 980) {
        currentSlide < 1 ? (currentSlide = cardsLength - 3) : currentSlide--;
    }

    if (window.innerWidth <= 980 && window.innerWidth > 425) {
        currentSlide <= 0 ? (currentSlide = cardsLength - 4) : currentSlide--;
    }

    if (window.innerWidth <= 425) {
        currentSlide <= 0 ? (currentSlide = cardsLength - 3) : currentSlide--;
    }

    moveSlide();
};

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
nextBtnTablet.addEventListener('click', nextSlide);
prevBtnTablet.addEventListener('click', prevSlide);

touchMove(parantCard, nextSlide, prevSlide);

const updateCardPriceWidth = () => {
    let dynamicPriceServiceWidth = window.getComputedStyle(priceServicesCard);

    let dynamicWidthPriceService =
        dynamicPriceServiceWidth.getPropertyValue('width');

    let dynamicMarginRightPriceService =
        dynamicPriceServiceWidth.getPropertyValue('margin-right');

    cardWidthPriceDynamic =
        parseFloat(dynamicWidthPriceService) +
        parseFloat(dynamicMarginRightPriceService);

    if (window.innerWidth > 1190) {
        cardPriceWidth = 383;
        moveSlide();
        isFirstSlideChange = false;
    }

    if (window.innerWidth <= 1190 && window.innerWidth > 980) {
        cardPriceWidth = laptopCardsPriceWidth;
        moveSlide();
        isFirstSlideChange = false;
    }

    if (window.innerWidth <= 980) {
        cardPriceWidth = cardWidthPriceDynamic;

        // prevBtnTablet.style.left;

        moveSlide();
        isFirstSlideChange = false;
    }

    // switching cards by clicking on the card itself (next/prev)
    if (window.innerWidth > 980) {
        allCards.forEach((card, index) => {
            card.addEventListener('click', function (event) {
                if (
                    !event.target.classList.contains(
                        'price-services__cards-button'
                    )
                ) {
                    if (currentSlide === index - 2) {
                        nextSlide();
                    }
                    if (currentSlide === index) {
                        prevSlide();
                    }
                }
            });
        });
    }
};

updateCardPriceWidth();
moveSlide();

window.addEventListener('load', () => {
    updateCardPriceWidth();
    moveSlide();
    isFirstSlideChange = false;
});

window.addEventListener('resize', () => {
    updateCardPriceWidth();
    moveSlide();

    isFirstSlideChange = false;
});
