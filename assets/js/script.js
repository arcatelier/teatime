window.addEventListener("load", () => {
  const body = document.querySelector(".js-body");
  body.classList.add("is-show");

  /**
   * Heroのアニメーション処理
   */
  const hero = document.querySelector(".js-hero");
  const heroText = document.querySelector(".js-heroText");
  const story = document. querySelector(".js-story");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Hero拡大
    if (scrollY > 50) {
      hero.classList.add("is-expanded");
    } else {
      hero.classList.remove("is-expanded");
    }

    // フェード
    const fadeStart = 200;
    const fadeEnd = 570;

    let opacity = (scrollY - fadeStart) / (fadeEnd - fadeStart);
    opacity = Math.max(0, Math.min(1, opacity));
    hero.style.setProperty("--hero-fade", opacity);
    heroText.style.opacity = 1 - opacity;

    // Heroのフェード後のp-storyセクションの表示
    if (opacity >= 1){
      story.classList.add("is-visible");
    }
  });

  /**
   * ハンバーガーメニューコンテンツボタン制御処理
   */
  function changeButtonText() {
    const openBtn = document.querySelector(".js-menu-open");
    const closeBtn = document.querySelector(".js-menu-close");
    const nav = document.querySelector(".js-menu-content");

    openBtn.addEventListener("click",function(){
      nav.classList.add("is-open");
      body.classList.add("is-bg-fixed");
    });

    closeBtn.addEventListener("click",function(){
      nav.classList.remove("is-open");
      body.classList.remove("is-bg-fixed");
    });
  }

  /**
   * Productsタイトルの1文字ずつ表示
   */
  const productTitles = document.querySelectorAll(".js-productsTitle, .js-sectionTitle");

  productTitles.forEach((title) => {
    const chars = title.querySelectorAll(".js-subTitle, .js-mainTitle");
    chars.forEach((char, index) => {
      char.style.transitionDelay = `${index * 0.1}s`;
    });
  });

  /**
   * Productsタイトルの表示処理
   */
  const productsTitleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        productsTitleObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold:0.2
  });

  productTitles.forEach((title) => {
    productsTitleObserver.observe(title);
  });

  /**
   * Storyコンテンツ、画像のフェードイン
   */
  const storyItems = document.querySelectorAll(".js-storyItem, .js-productsImg, .js-photo");
  const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        // 画面内に入ったら表示
        entry.target.classList.add("is-visible");
      } else {
        // 画面外に出たら非表示に戻す
        entry.target.classList.remove("is-visible");
      }
    });
  }, {
    threshold: 0.2
  });

  storyItems.forEach((item) => {
    storyObserver.observe(item);
  });

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
  const sections = document.querySelectorAll("[data-color]");

  function changeBackgroundColor() {
    const scrollY = window.scrollY;

    // トップにいる時はStoryの背景色
    if (scrollY === 0) {
      document.body.style.backgroundColor = "#F5F3F9"
      return;
    }

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        document.body.style.backgroundColor = section.dataset.color;
      }
    });
  }
  window.addEventListener("scroll", changeBackgroundColor);

  /**
  * Newsコンテンツのスリック実装
  */
  function newsSlider(){
    const slider = $('.p-news__topics');

    slider.slick({
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
            slidesToShow: 1.2,
            slidesToScroll: 1,
            variableWidth: false,
            centerMode: false,
            infinite: false
          }
        }
      ]
    });

    // 矢印のdisabled状態を変更する関数
    function updateArrowState(slick, currentSlide) {

      // 最初のページなら左矢印をdisabled
      if(currentSlide === 0) {
        $('.js-prev').addClass('slick-disabled');
      } else {
        $('.js-prev').removeClass('slick-disabled');
      }

      // 最後のページなら右矢印をdisabled
      if(currentSlide >= slick.slideCount - slick.options.slidesToShow) {
        $('.js-next').addClass('slick-disabled');
      } else {
        $('.js-next').removeClass('slick-disabled');
      }
    }

    // 最初の状態
    updateArrowState(
      slider.slick('getSlick'),
      slider.slick('slickCurrentSlide')
    );

    // スライドが切り替わったとき
    slider.on('afterChange', function(event, slick, currentSlide){
      updateArrowState(slick,currentSlide);
    });

    // 左矢印
    $(document).on('click', '.js-prev', function(){
      slider.slick('slickPrev');
    });

    // 右矢印
    $(document).on('click', '.js-next', function(){
      slider.slick('slickNext');
    });
  }

  changeButtonText();
  photoObserver.observe(photo);
  newsSlider();
});