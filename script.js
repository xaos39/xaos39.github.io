// Конфигурация Telegram бота
const TELEGRAM_BOT_TOKEN = '7990777742:AAGfKV8pNZOZ7pa6X0behbsYcuvFFI6aypw';
const TELEGRAM_CHAT_ID = '-1002504242503';

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Закрываем мобильное меню, если оно открыто
            const navbar = document.getElementById('navbar');
            const hamburger = document.getElementById('hamburger');
            const navList = document.querySelector('#navbar ul');
            
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                navbar.style.background = 'white';
            }
            
            // Прокрутка к элементу
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Изменение навбара при скролле
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Мобильное меню
document.getElementById('hamburger').addEventListener('click', function() {
    const navList = document.querySelector('#navbar ul');
    const navbar = document.getElementById('navbar');
    
    navList.classList.toggle('active');
    
    if (navList.classList.contains('active')) {
        this.innerHTML = '<i class="fas fa-times"></i>';
        navbar.style.background = 'white';
    } else {
        this.innerHTML = '<i class="fas fa-bars"></i>';
        if (window.scrollY < 50) {
            navbar.style.background = 'transparent';
        }
    }
});

// Закрытие меню при клике вне его
document.addEventListener('click', function(e) {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navList = document.querySelector('#navbar ul');
    
    if (!e.target.closest('#navbar') && navList.classList.contains('active')) {
        navList.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        if (window.scrollY < 50) {
            navbar.style.background = 'transparent';
        }
    }
});

// Маска для телефона
document.getElementById('phoneInput').addEventListener('input', function(e) {
    // Удаляем все нецифровые символы
    let phone = e.target.value.replace(/\D/g, '');
    
    // Ограничиваем длину номера (1 - код страны, 10 цифр номера)
    phone = phone.substring(0, 11);
    
    // Форматируем номер
    let formattedPhone = '+7';
    if (phone.length > 1) {
        formattedPhone += ' (' + phone.substring(1, 4);
    }
    if (phone.length > 4) {
        formattedPhone += ') ' + phone.substring(4, 7);
    }
    if (phone.length > 7) {
        formattedPhone += '-' + phone.substring(7, 9);
    }
    if (phone.length > 9) {
        formattedPhone += '-' + phone.substring(9, 11);
    }
    
    // Устанавливаем отформатированное значение
    e.target.value = formattedPhone;
});

// Добавим обработчик для предотвращения ввода нецифровых символов
document.getElementById('phoneInput').addEventListener('keydown', function(e) {
    // Разрешаем: backspace, delete, tab, escape, enter, стрелки
    if ([46, 8, 9, 27, 13, 110].includes(e.keyCode) || 
        (e.keyCode === 65 && e.ctrlKey === true) || // Ctrl+A
        (e.keyCode >= 35 && e.keyCode <= 39)) { // Home, End, стрелки
        return;
    }
    
    // Запрещаем все, кроме цифр
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


// TELEGRAM
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Предотвращаем стандартную отправку формы
    
    const form = e.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('formMessage');
    const submitButton = form.querySelector('button[type="submit"]');
    const phoneInput = document.getElementById('phoneInput');
    
    // Очищаем предыдущие сообщения
    formMessage.className = 'form-message';
    formMessage.textContent = '';
    
    // Проверяем заполнение полей
    const name = formData.get('name').trim();
    const phone = formData.get('phone').trim();
    const phoneNumber = phone.replace(/\D/g, '');
    
    if (!name) {
        formMessage.textContent = 'Пожалуйста, введите ваше имя';
        formMessage.className = 'form-message error';
        return false; // Возвращаем false для предотвращения отправки
    }
    
    if (!phone || phoneNumber.length !== 11) {
        formMessage.textContent = 'Пожалуйста, введите корректный номер телефона (11 цифр)';
        formMessage.className = 'form-message error';
        phoneInput.focus();
        return false;
    }
    
    // Добавляем индикатор загрузки
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    
    try {
        // Формируем текст сообщения
        const messageText = `📌 <b>Новая заявка с сайта</b>\n\n` +
                         `👤 <b>Имя:</b> ${name}\n` +
                         `📱 <b>Телефон:</b> ${phone}\n` +
                         `✉️ <b>Сообщение:</b> ${formData.get('message') || 'Не указано'}\n\n` +
                         `🕒 <i>${new Date().toLocaleString()}</i>`;
        
        // Отправляем в Telegram
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: messageText,
                parse_mode: 'HTML'
            })
        });
        
        const result = await response.json();
        
        if (response.ok && result.ok) {
            formMessage.textContent = '✅ Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.';
            formMessage.className = 'form-message success';
            form.reset();
        } else {
            throw new Error(result.description || 'Ошибка при отправке');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        formMessage.textContent = '❌ Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.';
        formMessage.className = 'form-message error';
    } finally {
        // Восстанавливаем кнопку
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
    
    return false; // Предотвращаем перезагрузку страницы
});

// Функция для закрытия модального окна
function closePhoneModal() {
    document.getElementById('phoneModal').style.display = 'none';
}

// Функция для копирования номера
function copyPhoneNumber() {
    const phoneNumber = '+79205621808';
    navigator.clipboard.writeText(phoneNumber).then(() => {
        alert('Номер скопирован в буфер обмена!');
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

// Обработчики для кнопок WhatsApp
document.querySelectorAll('.fa-whatsapp').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        showPhoneModal();
    });
});

// Обработчик для кнопки закрытия
document.querySelector('.close-modal').addEventListener('click', closePhoneModal);