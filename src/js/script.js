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
  });

  