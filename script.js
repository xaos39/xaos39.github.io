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

// Анимация при загрузке страницы
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});