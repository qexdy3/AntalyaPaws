// Выбираем все карточки товаров
const productCards = document.querySelectorAll('.product-card');

// Функция для проверки видимости элемента
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight && rect.bottom >= 0
    );
}

// Функция для добавления анимации с задержкой
function slideInProducts() {
    productCards.forEach((card, index) => {
        if (isElementInViewport(card)) {
            setTimeout(() => {
                card.classList.add('slide-in');
            }, index * 200); // Задержка 200 мс для каждого элемента
        }
    });
}

// Добавляем слушатель события прокрутки
window.addEventListener('scroll', slideInProducts);

// Запускаем проверку сразу после загрузки страницы
document.addEventListener('DOMContentLoaded', slideInProducts);


// Массив с изображениями для слайдера
const images = [
    'slider/slider1.jpg',
    'slider/slider2.jpg',
    'slider/slider3.jpg'
];

// Устанавливаем начальное изображение
let currentImageIndex = 0;
const header = document.querySelector('.header');

// Функция для смены фона
function changeBackground() {
    header.style.backgroundImage = `url(${images[currentImageIndex]})`;
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

changeBackground()
// Запускаем слайдер каждую секунду
setInterval(changeBackground, 3000); // смена фона каждые 3 секунды



