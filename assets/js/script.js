$(function () {
  $('.p-news__topics').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    draggable: false,
    swipe: true,
    prevArrow: '.js-prev',
    nextArrow: '.js-next',
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

  // 矢印ボタンにクリックイベント処理 //
  $(document).on('click','.js-prev', function(){
    $('.p-news__topics').slick('slickPrev');
  });

  $(document).on('click','.js-next', function(){
    $('.p-news__topics').slick('slickNext');
  });
});