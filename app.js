document.addEventListener('DOMContentLoaded', function(){
  // Оценка стоимости по площади
  var estimateBtn = document.getElementById('estimate');
  if (estimateBtn){
    estimateBtn.addEventListener('click', function(){
      var area = parseFloat(document.getElementById('area').value);
      var out = document.getElementById('estimateResult');
      if (!area || area <= 0){ out.textContent = 'Введите площадь (сотки)'; return; }
      var price = 60000 + (area * 500);
      out.textContent = 'Ориентировочная стоимость: ? ' + price.toLocaleString('ru-RU') + ' ?';
    });
  }

  // Плавный скролл при клике на якоря
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      var href = anchor.getAttribute('href');
      if (href.length > 1){
        var target = document.querySelector(href);
        if (target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    });
  });

  // Кнопка "Наверх"
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Глобальная функция для onsubmit="return submitForm(event)" — поддерживает несколько форм
  window.submitForm = function(e){
    e.preventDefault();
    var form = e.target;
    var name = (form.querySelector('#name') ? form.querySelector('#name').value : (form.querySelector('#nameTop') ? form.querySelector('#nameTop').value : ''));
    var phone = (form.querySelector('#phone') ? form.querySelector('#phone').value : (form.querySelector('#phoneTop') ? form.querySelector('#phoneTop').value : ''));
    if (!name || !phone){ alert('Пожалуйста, заполните имя и телефон.'); return false; }
    // Заглушка отправки — заменить на реальный запрос на сервер
    alert('Заявка принята. Мы свяжемся с вами в ближайшее время.');
    if (form && typeof form.reset === 'function') form.reset();
    return false;
  };
});
