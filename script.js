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
    const modal = document.getElementById('phoneModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    modal.classList.remove('closing');
}

// Функция для закрытия модального окна
function closePhoneModal() {
    const modal = document.getElementById('phoneModal');
    modal.classList.add('closing');
    
    // Ждем завершения анимации перед скрытием
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    }, 300);
}

// Обработчик для кнопки закрытия
document.querySelector('.close-modal').addEventListener('click', closePhoneModal);

// Функция для копирования номера
function copyPhoneNumber() {
    const phoneNumber = '+79205621808';
    navigator.clipboard.writeText(phoneNumber).then(() => {
        // Показываем красивый toast вместо alert
        showToast('Номер скопирован в буфер обмена!');
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
        showToast('Не удалось скопировать номер', 'error');
    });
}

// Функция для показа уведомлений
function showToast(message, type = 'success') {
    // Создаем элемент toast, если его нет
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = `toast toast-${type} toast-show`;
    
    // Убираем toast через 3 секунды
    setTimeout(() => {
        toast.classList.remove('toast-show');
    }, 3000);
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


// Слайдер для отзывов
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.reviews-slider');
    const slides = document.querySelectorAll('.review-slide');
    const prevArrow = document.querySelector('.slider-arrow-prev');
    const nextArrow = document.querySelector('.slider-arrow-next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    // Если слайдер не существует, выходим из функции
    if (!slider) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Создаем точки-индикаторы
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.slider-dot');
    
    // Функция для перехода к конкретному слайду
    function goToSlide(n) {
        currentSlide = n;
        if (currentSlide >= slideCount) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slideCount - 1;
        
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновляем активную точку
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Обработчики для стрелок
    nextArrow.addEventListener('click', () => goToSlide(currentSlide + 1));
    prevArrow.addEventListener('click', () => goToSlide(currentSlide - 1));
    
    // Автопрокрутка (опционально)
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    startAutoSlide();
    
    // Останавливаем автопрокрутку при наведении на слайдер
    const sliderContainer = document.querySelector('.reviews-slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Останавливаем автопрокрутку при взаимодействии со стрелками или точками
    prevArrow.addEventListener('mouseenter', stopAutoSlide);
    nextArrow.addEventListener('mouseenter', stopAutoSlide);
    dots.forEach(dot => {
        dot.addEventListener('mouseenter', stopAutoSlide);
    });
    
    // Адаптация к изменению размера окна
    window.addEventListener('resize', () => {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
    
    // Добавляем обработчики для свайпа на мобильных устройствах
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, false);
    
    sliderContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, false);
    
    function handleSwipe() {
        const minSwipeDistance = 50; // Минимальная дистанция свайпа
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) < minSwipeDistance) return;
        
        if (swipeDistance > 0) {
            // Свайп вправо - предыдущий слайд
            goToSlide(currentSlide - 1);
        } else {
            // Свайп влево - следующий слайд
            goToSlide(currentSlide + 1);
        }
    }
});

    // Инициализация SimpleLightbox для галереи этапов
document.addEventListener('DOMContentLoaded', function() {
    // Для основной галереи
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
    
    // Для галереи этапов (новая)
    new SimpleLightbox('.stages-gallery .gallery-item a', {
        captions: true,
        captionSelector: 'self',
        captionType: 'attr',
        captionsData: 'title',
        captionPosition: 'bottom',
        animationSpeed: 250,
        fadeSpeed: 300,
        disableScroll: false,
        alertError: false,
        scaleImageToRatio: true,
        overlayOpacity: 0.9
    });
});

        // Закрытие модального окна по клику вне его области
document.addEventListener('click', function(e) {
    const modal = document.getElementById('phoneModal');
    if (e.target === modal) {
        closePhoneModal();
    }
});

// Закрытие по клавише Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePhoneModal();
    }
});

// Предотвращаем закрытие при клике на само модальное окно
document.querySelector('.modal-content').addEventListener('click', function(e) {
    e.stopPropagation();
});