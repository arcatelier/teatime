$(function () {
  $('.p-news__topics').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    prevArrow: $('.js-prev'),
    nextArrow: $('.js-next'),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});