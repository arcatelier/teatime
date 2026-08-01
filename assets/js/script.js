/**
* View moreボタンの実行処理
*/
const moreButtons = document.querySelectorAll('.c-btn--more');
moreButtons.forEach(button => {
  button.addEventListener('click',() => {
    const text = button.previousElementSibling;

    text.classList.toggle('is-open');

    if(text.classList.contains('is-open')){
      button.textContent = 'Close -';
    } else {
      button.textContent = 'View more +';
    }
  });
});



/**
* Newsコンテンツのスリック実装
*/
function newsSlider() {
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
}

$(function () {
  newsSlider();
});