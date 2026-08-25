window.addEventListener("load", () => {
  const body = document.querySelector(".js-body");
  body.classList.add("is-show");

  /**
   * Heroのアニメーション処理
   */
  const hero = document.querySelector(".p-hero");
  const heroText = document.querySelector(".p-heroText");
  const story = document. querySelector(".p-story");

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
  const productTitles = document.querySelectorAll(".p-products__title, .p-products__sectionTitle");

  productTitles.forEach((title) => {
    const chars = title.querySelectorAll(".c-text--subTitle, .c-text--mainTitle");
    chars.forEach((char, index) => {
      char.style.transitionDelay = `${index * 0.1}s`;
    });
  });


  /**
   * スクロールに応じて画像内容を上下させるパララックス
   */
  function parallaxImage(){
    const images = document.querySelectorAll(".js-parallaxImage");

    images.forEach((image) => {
      const rect = image.getBoundingClientRect();
      const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const move = (scrollPercent - 0.5) * 60;
      image.style.setProperty("--parallax", `${move}px`);
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
  console.log("背景色変更JSが実行された");
  const sections = document.querySelectorAll("[data-color]");
  console.log("対象セクション数:", sections.length);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log("Observer発火:", entry.isIntersecting);
      console.log("色:", entry.target.dataset.color);

      if(entry.isIntersecting) {

        // 背景色変更
        document.body.style.backgroundColor =
          entry.target.dataset.color;

        // Storyを表示
        if (entry.target.classList.contains("p-products")){
          const titles = entry.target.querySelectorAll(".p-products__sectionTitle, .p-products__title");

          titles.forEach((title) => {
            title.classList.add("is-visible");
          });
        }
      }
    });
  }, {
    threshold: 0.2
  });
  sections.forEach(section => observer.observe(section));

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

  parallaxImage();
  changeButtonText();

  $(function () {
    newsSlider();
  });
});