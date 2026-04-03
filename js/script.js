$(function () {

  // [수정] 모든 a태그 이동 방지 대신, href="#"인 경우만 방지하도록 변경
  // 이래야 로고(index.html)나 다른 페이지 이동이 정상 작동합니다.
  $(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
  });

  $(window).on('scroll load', function () {
    const header = $('.header'); // common.css에 정의된 클래스 기준
    const visual = $('.visual');
    const visuLength = visual.length;
    const visuHeight = visual.outerHeight();
    const headerHeight = header.outerHeight();

    let scrollTop = $(window).scrollTop();

    header.addClass('load');

    if (visuLength > 0) {
      if (scrollTop >= visuHeight - headerHeight) {
        header.addClass('down');
      } else {
        header.removeClass('down');
      }
    }
  });

  allMenu();
  visual(); 
  tap();

  function allMenu() {
    const header = $('.header');
    const hBtn = $('.btn_all_menu');
    const mBtn = $('.depth1 > li > span');

    // mobile btn click event
    mBtn.click(function(){
      if($(this).parent('li').hasClass('On')){
        $(this).parent('li').removeClass('On');
        $(this).siblings('ul.depth2').slideUp();
      }
      else{
        $(this).parent('li').addClass('On').siblings().removeClass('On').find('ul.depth2').slideUp();
        $(this).siblings('ul.depth2').slideDown();
      }
    });

    // window resize
    $(window).on('load resize', function(){
      if(window.innerWidth > 1100){
        mBtn.parent('li').removeClass('On');
        mBtn.siblings('ul.depth2').removeAttr('style');
      }
    });

    // desktop click event (hamburger)
    hBtn.click(function (e) {
      e.preventDefault();
      header.toggleClass('active');
    });
  }

  function visual() {
    let slider = $('.visual .slider li');
    let nav = $('.visu_nav li');
    let sNum = slider.length;
    if (sNum === 0) return; // 슬라이더가 없으면 함수 종료 (에러 방지)

    let crt = 0;
    slFunc(crt);
    let play = setInterval(visu, 5000);

    function slFunc(i) {
      slider.eq(i).addClass('On');
      nav.eq(i).addClass('Active');
    }

    nav.click(function() {
      let i = $(this).index();
      reset();
      slFunc(i);
    });

    function visu() {
      let idx = $('.visual .slider li.On').index();
      idx++;
      if (idx == sNum) idx = 0;
      reset();
      slider.eq(idx).addClass('On');
      nav.eq(idx).addClass('Active');
    }

    function reset() {
      slider.removeClass('On');
      nav.removeClass('Active');
    }
  }

  // aniMoving 사용자 정의 메소드
  $.fn.aniMoving = function () {
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
    return (viewportTop < elementBottom) && (elementTop < viewportBottom);
  };

  $(window).on('load scroll resize', function () {
    $('.ani').each(function () {
      if ($(this).aniMoving()) {
        $(this).addClass('moving');
      } else {
        $(this).removeClass('moving');
      }
    });
  });

  function tap(){
    const TAP = $('.sec2_btn_wrap .mainBtn');
    const PING = $('.mainSec2 .img_box .ping');
    if (TAP.length === 0) return; // 탭 메뉴가 없으면 종료

    let i = 0;
    init(i);

    function init(i) {
      TAP.eq(i).addClass('On');
      PING.eq(i).addClass('On');
    }
    
    function reset(){
      TAP.removeClass('On');
      PING.removeClass('On');
    }
  
    TAP.click(function(){
      let liIn = $(this).index();
      reset();
      init(liIn);
    });
  }

  // [수정] Swiper 에러 방지 (요소가 있을 때만 실행)
  if ($('.listSlider').length > 0) {
    const swiper = new Swiper(".listSlider", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints:{
        768:{ slidesPerView: 3, spaceBetween: -10 },
        450:{ slidesPerView: 1.5 }
      },
      slidesPerView: 1,
      loop: true,
      spaceBetween: 0,
      centeredSlides: true
    });
  }

});