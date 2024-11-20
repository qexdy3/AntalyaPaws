// Получаем все кнопки "Купить"
const buyButtons = document.querySelectorAll('.buy-button');

// Функция для сохранения данных товара в localStorage
function saveProductData(product) {
    // Пример структуры данных, которую сохраняем
    const productData = {
        title: product.querySelector('.product-title').textContent,
        price: product.querySelector('.product-price').textContent,
        image: product.querySelector('.product-image').src
    };

    // Сохраняем данные в localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
}

// Добавляем обработчик на каждую кнопку "Купить"
buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');  // Получаем родительский элемент (карточку товара)
        saveProductData(productCard);  // Сохраняем данные о товаре
        window.location.href = 'order.html';
    });
});
