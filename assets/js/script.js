window.addEventListener("load", () => {
  document.body.classList.add("is-show");


  /**
   * ニュースのスリックの処理
   */
  $('.p-news__topics').slick({
    slidesToShow: 2,
    slidesToScroll: 1
  });
})