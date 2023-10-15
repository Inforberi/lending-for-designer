const questionsBlock = document.querySelectorAll(
    '.question-img__question-item'
);

const hiddenText = document.querySelectorAll('.text-hidden-button');

const questionText = document.querySelectorAll('.question-img__text');

const btnPlus = document.querySelectorAll('.question-img__question-plus');

const btnCross = document.querySelectorAll('.cross');

const textAreas = document.querySelectorAll('.question-img__text');

// get dynamic height
const questionBlock = document.querySelector('.question-img__question-item');
let getHeightQuestion = window.getComputedStyle(questionBlock);
let getHeightQuestionBlock = parseFloat(
    getHeightQuestion.getPropertyValue('height')
);

const plusHoverRotate = (event, subEvent, rotate) => {
    event.addEventListener('mouseover', () => {
        subEvent.classList.add('questions-fill-plus');
        subEvent.style.webkitTransform = `rotate(${rotate}deg) scale(1.25)`;
        subEvent.style.transform = `rotate(${rotate}deg) scale(1.25)`;
    });
    event.addEventListener('mouseout', () => {
        subEvent.classList.remove('questions-fill-plus');
        subEvent.style.webkitTransform = `rotate(${rotate}deg) scale(1)`;
        subEvent.style.transform = `rotate(${rotate}deg) scale(1)`;
    });
};

// animation flag
let isAnimating = false;

// functions for open/close text under question

const buttonClickedPlus = function (e) {
    if (isAnimating) return; // Если уже идет анимация, не обрабатываем нажатие
    isAnimating = true;
    // find the element we clicked on
    const clickedButton = e.target;

    // find the next sibling to show the text.
    const showText = clickedButton.nextElementSibling;

    const headerTextQuestion = clickedButton.parentNode.firstElementChild;

    if (showText.style.display === 'none' || showText.style.display === '') {
        // make animation

        showText.style.display === 'none'
            ? (showText.style.display = 'block')
            : (showText.style.display = 'none');

        showText.classList.remove('animation-2');
        setTimeout(() => {
            showText.classList.add('animation');
        }, 0);

        // показываем текст и поварачиваем плюс
        clickedButton.style.webkitTransform = 'rotate(45deg)';
        clickedButton.style.transform = 'rotate(45deg)';
        if (window.innerWidth > 980) {
            plusHoverRotate(headerTextQuestion, clickedButton, 45);
        }

        showText.style.display = 'block';

        // при наведении на текст кнопка получает заливку
    } else {
        setTimeout(() => {
            showText.style.display = 'none';
        }, animationDurations[indexAnimation]);
        // Иначе, если текст видим, то скрываем его.
        clickedButton.style.webkitTransform = 'rotate(0deg)';
        clickedButton.style.transform = 'rotate(0deg)';

        if (window.innerWidth > 980) {
            plusHoverRotate(headerTextQuestion, clickedButton, 0);
        }

        // Удаляем класс анимации
        showText.classList.remove('animation');
        showText.classList.add('animation-2');
    }
    setTimeout(() => {
        isAnimating = false; // Снимаем флаг анимации
    }, 1000); // Продолжительность анимации
};

let animationDurations;
// функция чтобы задать время анимации открытия вопроса для каждого размера экрана
const timeQuestionAnimation = () => {
    if (window.innerWidth > 980) {
        animationDurations = [750, 650, 750, 800, 800, 700];
    }

    if (window.innerWidth <= 980 && window.innerWidth > 425) {
        animationDurations = [500, 580, 700, 750, 600, 500];
    }

    if (window.innerWidth <= 425) {
        animationDurations = [550, 600, 850, 1300, 700, 550];
    }
};
// анимация для каждого вопроса

let indexAnimation;

// перебираем каждый вопрос, чтобы получить индек для задания анимации каждому вопросу
questionsBlock.forEach((block, index) => {
    block.addEventListener('click', function (e) {
        indexAnimation = index;
    });
});

btnPlus.forEach((button) => {
    button.addEventListener('click', buttonClickedPlus);

    const buttonPrevSibling = button.previousElementSibling; // текст на который нажимаем

    const buttonTextHidden =
        buttonPrevSibling.nextElementSibling.nextElementSibling;
    if (window.innerWidth > 980) {
        if (
            buttonTextHidden.style.display === 'none' ||
            buttonTextHidden.style.display === ''
        ) {
            plusHoverRotate(buttonPrevSibling, button, 0);
        }
    }
});
//////////////////////////

// Функция для симуляции клика
const simulateClick = (element) => {
    const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
    });
    element.dispatchEvent(event);
};

// Функция для обработки клика на область текста

const handleClickOnText = (e) => {
    const clickedTextArea = e.currentTarget;
    const index = Array.from(textAreas).indexOf(clickedTextArea);

    if (btnPlus[index].style.display === 'none') {
        // Симулируем клик на крестик, если область уже открыта
        simulateClick(btnPlus[index]);
    } else {
        // Симулируем клик на плюсик, если область закрыта
        simulateClick(btnPlus[index]);
    }
};

textAreas.forEach((textArea) => {
    textArea.addEventListener('click', handleClickOnText);
});

window.addEventListener('resize', () => {
    timeQuestionAnimation();
});
window.addEventListener('load', () => {
    timeQuestionAnimation();
});
