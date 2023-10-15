const animationOptions = {
    threshold: 0.5, // Порог 50%, когда элемент виден наполовину
};

// Создаем новый экземпляр IntersectionObserver с функцией обратного вызова
const animationObserverWorkSteps = new IntersectionObserver(function (
    entries,
    observer
) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Получаем элемент, который сейчас виден
            const targetElement = entry.target.firstElementChild;

            // Проверяем классы элемента для определения, какую анимацию применить
            if (targetElement.classList.contains('steps-container1')) {
                // Запустите анимацию 1 для элемента
                applyAnimation(targetElement, 'animationStep1');
                // Измените на нужное значение
            }
            if (targetElement.classList.contains('steps-container2')) {
                // Запустите анимацию 2 для элемента
                applyAnimation(targetElement, 'animationStep2');
            }
            // Добавьте другие проверки для разных анимаций
            if (targetElement.classList.contains('steps-container3')) {
                // Запустите анимацию 3 для элемента
                applyAnimation(targetElement, 'animationStep3');
            }

            if (targetElement.classList.contains('steps-container4')) {
                // Запустите анимацию 4 для элемента
                applyAnimation(targetElement, 'animationStep4');
            }
            // Прекращаем наблюдение за текущим элементом
            observer.unobserve(targetElement);
        }
    });
},
animationOptions);

function applyAnimation(element, animationClass) {
    element.classList.add(animationClass);
}

// Выбираем элементы, которые будем наблюдать, используя их общий класс
const elementsToObserve = document.querySelectorAll('.steps');

// Начинаем наблюдение за каждым элементом
elementsToObserve.forEach((element) => {
    animationObserverWorkSteps.observe(element);
});
