document.addEventListener("DOMContentLoaded", function () {
    // Получаем данные о товаре из localStorage
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));

    if (productData) {
        // Заполняем информацию о товаре на странице
        document.getElementById('product-title').textContent = productData.title;
        document.getElementById('product-price').textContent = `Цена: ${productData.price}`;
        document.getElementById('product-image').src = productData.image;
    } else {
        // Если данных нет, показываем сообщение
        alert("Товар не выбран.");
    }

    // Функция для расчета общей стоимости
    function updateTotalPrice() {
        const quantity = document.getElementById('quantity').value;
        const price = parseFloat(productData.price);
        const total = (quantity * price).toFixed(2);
        document.getElementById('total-price').textContent = `${total} ₺`;
    }

    // Обработчик изменения количества
    document.getElementById('quantity').addEventListener('input', function () {
        updateTotalPrice();
    });

    // Функция для отправки данных в Telegram
    function sendToTelegram(message) {
        const BOT_TOKEN = '7798347449:AAE089GDKzyR8w8CWUXfst8en7mMAz1HE1I'; // Замените на ваш токен
        const CHAT_ID = '7121369968';  // Замените на ваш chat_id
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const data = {
            chat_id: CHAT_ID,
            text: message,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Сообщение отправлено', data);
        })
        .catch(error => {
            console.error('Ошибка при отправке сообщения:', error);
        });
    }

    // Получение IP-адреса клиента
    function getClientIP() {
        return fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => data.ip)
            .catch(error => {
                console.error('Ошибка получения IP-адреса:', error);
                return 'Не удалось получить IP';
            });
    }

    // Обработчик отправки формы
    const form = document.getElementById('orderForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const quantity = document.getElementById('quantity').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const totalPrice = document.getElementById('total-price').textContent;

        // Получаем IP-адрес клиента
        getClientIP().then(clientIP => {
            // Формируем сообщение для отправки в Telegram
            const message = `Новый заказ:\nТовар: ${productData.title}\nКоличество: ${quantity}\nЦена: ${totalPrice}\nАдрес для доставки: ${address}\nНомер телефона: ${phone}\nIP-адрес клиента: ${clientIP}`;

            // Отправка данных в Telegram
            sendToTelegram(message);

            // Выводим сообщение пользователю
            alert('Ваш заказ принят! Мы свяжемся с вами для уточнения данных.');
        });
    });

    // Изначальная установка общей цены
    updateTotalPrice();
});
