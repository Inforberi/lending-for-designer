'use strict';

// load images when page will be load
// Подождем, пока весь контент страницы загрузится
window.addEventListener('load', function () {
    // Получаем все изображения с атрибутом data-full-src
    const imagesToReplace = document.querySelectorAll('img[data-src]');

    // Заменяем src на data-src для каждого изображения
    imagesToReplace.forEach(function (image) {
        image.src = image.getAttribute('data-src');
    });
});
