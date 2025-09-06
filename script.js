// Плавная прокрутка для якорных ссылок - исправленная версия
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
                // Восстанавливаем прокрутку перед скроллом
                document.body.style.overflow = '';
                
                // Небольшая задержка для закрытия меню перед скроллом
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }, 100);
            } else {
                // Прокрутка к элементу
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
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

// Мобильное меню - исправленная версия
document.getElementById('hamburger').addEventListener('click', function(e) {
    e.stopPropagation(); // Предотвращаем всплытие события
    
    const navList = document.querySelector('#navbar ul');
    const navbar = document.getElementById('navbar');
    
    navList.classList.toggle('active');
    
    if (navList.classList.contains('active')) {
        this.innerHTML = '<i class="fas fa-times"></i>';
        navbar.style.background = 'white';
        // Блокируем прокрутку фона при открытом меню
        document.body.style.overflow = 'hidden';
    } else {
        this.innerHTML = '<i class="fas fa-bars"></i>';
        if (window.scrollY < 50) {
            navbar.style.background = 'transparent';
        }
        // Восстанавливаем прокрутку
        document.body.style.overflow = '';
    }
});

// Закрытие меню при клике на ссылку в мобильном меню - исправленная версия
document.querySelectorAll('#navbar ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        const navList = document.querySelector('#navbar ul');
        const hamburger = document.getElementById('hamburger');
        const navbar = document.getElementById('navbar');
        
        if (navList.classList.contains('active')) {
            // Не закрываем меню сразу - даем плавной прокрутке обработать клик
            setTimeout(() => {
                navList.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                if (window.scrollY < 50) {
                    navbar.style.background = 'transparent';
                }
                // Восстанавливаем прокрутку
                document.body.style.overflow = '';
            }, 300); // Задержка для завершения анимации скролла
        }
    });
});

// Закрытие меню при клике вне его - исправленная версия
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
        // Восстанавливаем прокрутку
        document.body.style.overflow = '';
    }
});

// Обработчики для кнопок WhatsApp
document.querySelectorAll('.fa-whatsapp, .whatsapp-btn').forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        showPhoneModal();
    });
});

// Функция для показа модального окна
function showPhoneModal() {
    document.getElementById('phoneModal').style.display = 'block';
}

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

// Обработчик для кнопки закрытия
document.querySelector('.close-modal').addEventListener('click', closePhoneModal);

// Кнопка "Наверх"
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});


// Инициализация SimpleLightbox для галереи
document.addEventListener('DOMContentLoaded', function() {
    new SimpleLightbox('.gallery-grid a', {
        captions: true,
        captionSelector: 'self',
        captionType: 'attr',
        captionsData: 'title',
        captionPosition: 'bottom',
        animationSpeed: 250,
        fadeSpeed: 300,
        disableScroll: false,
        alertError: false
    });
});