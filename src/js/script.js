$(document).ready(function(){
    $('.carousel__inner').slick({        
        speed: 1200,       
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider-arrow-left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/slider-arrow-right.png"></button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {                
                dots: true,
                arrows: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                dots: true,
                arrows: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                dots: true,
                arrows: false
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]       
      });

// Tabs switcher
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

// Link switch in product cards
      function toggleSlide(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
      })
      };
      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      // Modals
      // Кнопки консультация получаем по дата атрибуту data-modal
      $('[data-modal=consultation').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
      });

      // Кнопки купить получаем по классу .button_mini
      // $('.button_mini').on('click', function() {
      //   $('.overlay, #order').fadeIn('slow');
      // });
      
      // Вытаскиваем название товара из карточки и отображаем его в модальном окне заказа
      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        })
      });

      // Валидация форм. Скрипт jquery.validate.min.js
      // $('#consultation-form').validate(); 
      // $('#order form').validate(); 
      // $('#consultation form').validate({
      //   rules: {
      //     name: "required",
      //     phone: "required",
      //     email: {
      //       required: true,
      //       email: true
      //     }
      //   },
      //   messages: {
      //     name: "Введите имя",
      //     phone: "Введите номер телефона",
      //     email: {
      //       required: "Введите ваш email",
      //       email: "Некорректный email адрес"
      //     }
      //   }      
      // }); 
      
// Оптимизированная функция валидации форм
      function valideForms(form) {
        $(form).validate({
          rules: {
            name: "required",
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: "Введите имя",
            phone: "Введите номер телефона",
            email: {
              required: "Введите ваш email",
              email: "Некорректный email адрес"
            }
          }      
        }); 
      };
      valideForms('#consultation-form');
      valideForms('#consultation form');
      valideForms('#order form');

    // Маска ввода номера телефона
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Отправка формы
    $('form').submit(function(e) {
      e.preventDefault();  /* Отменяем стандартное поведение броузера */
      $.ajax({
        type: "POST",                 /* Метод отправки */
        url: "mailer/smart.php",      /* Адрес скрипта */
        data: $(this).serialize()     
      }).done(function() {
        $(this).find("input").val("");    /* Найти все поля input и поставить им значение пусто */
        $('#consultation, #order').fadeOut(); /* Прячем окна с формами */
        $('.overlay, #thanks').fadeIn('slow'); /* Показываем слой затемнения и модальное окно с благодарностью */
        $('form').trigger('reset');       /* Во всех формах сделать сброс значений */
      });
      return false;
    });

    // Кнопка наверх появляется после прокрутки 1600 пикселей
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();    /* Если прокрутили 1600 пх - стрелка появляется */
      } else {
        $('.pageup').fadeOut();   /* Если меньше 1600 - стрелка исчезает */
      }
    });

    // Smooth scroll
      $("a[href^='#']").click(function(){
              const _href = $(this).attr("href");   /* Получаем аттрибут href из ссылки, к-й начинается с # */
              $("html, body").animate({scrollTop: $(_href).offset().top+"px"});   /* Анимация от jquery */
              return false;
      }); 

  });