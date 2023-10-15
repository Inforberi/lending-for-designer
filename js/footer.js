// Найти кнопку или ссылку, на которую будет сделан клик
const scrollToTopButton = document.querySelector('.scroll-to-top-button');

// Добавить обработчик события клика
scrollToTopButton.addEventListener('click', () => {
    // Плавно прокрутить страницу до верхней точки
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // Добавляем плавность
    });
});
