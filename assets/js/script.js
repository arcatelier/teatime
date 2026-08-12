window.addEventListener("load", () => {
  document.body.classList.add("is-show");

  /**
   * ハンバーガーメニューコンテンツボタン制御処理
   */
  function changeButtonText() {
    const openBtn = document.querySelector(".js-menu-open");
    const closeBtn = document.querySelector(".js-menu-close");
    const nav = document.querySelector(".js-menu-content");

    openBtn.addEventListener("click",function(){
      nav.classList.add("is-open");
    });

    closeBtn.addEventListener("click",function(){
      nav.classList.remove("is-open");
    });
  }

  /**
  * View moreボタンの実行処理
  */
  const moreButtons = document.querySelectorAll('.c-btn--more');

  moreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const text = button.previousElementSibling;

      if (text.classList.contains('is-open')) {
        // 閉じる
        text.style.height = text.scrollHeight + 'px';

        requestAnimationFrame(() => {
          text.style.height = '120px';
        });

        text.classList.remove('is-open');
        button.textContent = 'View more +';

      } else {
        // 開く
        text.style.height = text.offsetHeight + 'px';

        requestAnimationFrame(() => {
          text.style.height = text.scrollHeight + 'px';
        });

        text.classList.add('is-open');
        button.textContent = 'Close -';
      }
    });
  });

  /**
  * 背景色変更の処理実装
  */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("色変更", entry.target.dataset.color);

        document.body.style.backgroundColor = entry.target.dataset.color;
      }
    });
    }, {
      threshold: 0.5
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

  changeButtonText();

  $(function () {
    newsSlider();
  });
});