document.addEventListener('DOMContentLoaded', function() {
    

    

    // Фильтрация участков
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            displayProperties(filter);
        });
    });

    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Отображение модального окна (заглушка)
    window.showPropertyModal = function(id) {
        const property = properties.find(p => p.id === id);
        if (property) {
            alert(`Подробная информация о участке:\n\n${property.title}\nЛокация: ${property.location}\nПлощадь: ${property.area}\nЦена: ${property.price}\n\nСвяжитесь с нами для получения дополнительной информации!`);
        }
    }

    // Обработка формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }

    // Инициализация - показать все участки
    displayProperties();
});




// Карусель фотографий
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  const indicators = document.querySelectorAll('.indicator');
  
  let currentIndex = 0;
  const totalItems = items.length;
  
  // Установка активного слайда
  function setActiveSlide(index) {
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    currentIndex = (index + totalItems) % totalItems;
    items[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
    
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  // Переключение на предыдущий слайд
  prevBtn.addEventListener('click', () => {
    setActiveSlide(currentIndex - 1);
  });
  
  // Переключение на следующий слайд
  nextBtn.addEventListener('click', () => {
    setActiveSlide(currentIndex + 1);
  });
  
  // Переключение по индикаторам
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      setActiveSlide(index);
    });
  });
  
  // Автопрокрутка (опционально)
  let autoSlide = setInterval(() => {
    setActiveSlide(currentIndex + 1);
  }, 5000);
  
  // Пауза при наведении
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
  });
  
  carousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      setActiveSlide(currentIndex + 1);
    }, 5000);
  });
  
  // Инициализация
  setActiveSlide(0);
});



// Модальное окно для проектов домов
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('planModal');
  const modalImg = document.getElementById('modalPlanImage');
  const modalInfo = document.getElementById('modalPlanInfo');
  const zoomBtns = document.querySelectorAll('.zoom-btn');
  const closeModal = document.querySelector('.close-modal');
  
  // Данные о проектах (можно заменить на реальные)
  const plansData = {
    plan1: {
      title: 'План "A"',
      specs: [
        'Площадь: 167 м²',
        'Этажность: 2',
        'Спальни: 1 ',
        'Материал: Кирпич',
        'Срок строительства: 6 месяцев'
      ],
      description: ''
    },
    plan2: {
      title: 'Проект "Александрия"',
      specs: [
        'Площадь: 100,40 м²',
        'Этажность: 2',
        'Спальни: 2',
        'Материал: Газобетон',
        'Срок строительства: 7 месяцев'
      ],
      description: ''
    },
    plan3: {
      title: 'Фасад',
      specs: [
       
        'Этажность: 2',
       
        'Материал: Кирпич',
        'До начала производства работ необходимо выполнить образцы (выкраски) отделки элементов фасада в соответствии с паспортом наружной отделки и согласоватьс представителем авторского надзора'
      ],
      description: ''
    }
   
  };
  
  // Открытие модального окна
  zoomBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const planId = this.getAttribute('data-plan');
      const planCard = this.closest('.plan-card');
      const planImage = planCard.querySelector('.plan-image').src;
      const planTitle = planCard.querySelector('h3').textContent;
      
      modalImg.src = planImage;
      modalImg.alt = planTitle;
      
      // Заполнение информации о проекте
      const planData = plansData[planId];
      let infoHTML = `<h3>${planData.title}</h3>`;
      
      infoHTML += '<ul class="modal-specs">';
      planData.specs.forEach(spec => {
        infoHTML += `<li>${spec}</li>`;
      });
      infoHTML += '</ul>';
      
      infoHTML += `<p class="modal-description">${planData.description}</p>`;
      
      
      modalInfo.innerHTML = infoHTML;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Закрытие модального окна
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Закрытие при клике вне окна
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Кнопки "Подробнее" на карточках
  const detailBtns = document.querySelectorAll('.plan-details-btn');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const planCard = this.closest('.plan-card');
      const zoomBtn = planCard.querySelector('.zoom-btn');
      zoomBtn.click();
    });
  });
});     