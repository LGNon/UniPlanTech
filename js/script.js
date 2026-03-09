$(function () {

  // a태그 눌러도 최상단으로 이동 안하게하기
  $(this).click(function(e){
    e.preventDefault()
  })

  $(window).on('scroll load', function () {

    const header = $('.header')
    const visuLength = $('.visual').length;
    const visuHeight = $('.visual').outerHeight();
    const headerHeight = header.outerHeight()

    let scrollTop = $(window).scrollTop()

    header.addClass('load')

    if (visuLength > 0) {
      if (scrollTop >= visuHeight - headerHeight) {
        header.addClass('down')
      } else {

        header.removeClass('down')
      }
    }



  })

  allMenu()
  visual() //함수의 호출

  function allMenu() {
    const header = $('.header') //active
    const hBtn = $('.btn_all_menu')
    const mBtn = $('.depth1>li>span')

    // mobile btn click event
    mBtn.click(function(){
      if($(this).parent('li').hasClass('On')){
        $(this).parent('li').removeClass('On')
        $(this).siblings('ul.depth2').slideUp()
      }
      else{
        $(this).parent('li').addClass('On').siblings().removeClass('On').find('ul.depth2').slideUp()
        $(this).siblings('ul.depth2').slideDown()
      }
    })

    // window resize
    $(window).on('load resize', function(){
      if(window.innerWidth>1100){
        mBtn.parent('li').removeClass('On')
        mBtn.siblings('ul.depth2').removeAttr('style')
      }
    })

    //desktop  click event
    hBtn.click(function (e) {
      e.preventDefault()
      if (header.hasClass('active') == false) {
        header.addClass('active')
      }
      else {
        header.removeClass('active')
      }
    })
  }

  //0 visual 함수
  function visual() {

    // 1 키워드 정의
    let slider = $('.visual .slider li') // slider   --> On
    let nav = $('.visu_nav li') // visu_nav ---->Active
    let sNum = slider.length //slider의 개수
    let crt = 0

    slFunc(crt) //slider 함수의 호출
    let play = setInterval(visu, 5000)

    //2 slider 초기화 함수
    function slFunc(i) {

      slider.eq(i).addClass('On')
      nav.eq(i).addClass('Active')
    }

    // 3 visu nav click
    nav.click(navFunc)

    // 4 nav function
    function navFunc() {
      let i = $(this).index()

      reset()
      slFunc(i)
    }

    //  6 slider 함수
    function visu() {

      let idx = $('.visual .slider li.On').index()
      console.log(idx);
      idx++;
      if (idx == sNum) {
        idx = 0;
      }

      reset()
      slider.eq(idx).addClass('On')
      nav.eq(idx).addClass('Active')
    }

    // 5 reset function
    function reset() {
      slider.removeClass('On')
      nav.removeClass('Active')
    }

  }

  const ani = $('.ani')

  $.fn.aniMoving = function () { //사용자 정의 메소드

    let elementTop = $(this).offset().top; //선택한 요소의 Y축 좌표값
    let elementBottom = elementTop + $(this).outerHeight(); //Y축 좌표값+현재요소의 높이값  

    let viewportTop = $(window).scrollTop(); //화면의 스크롤값
    let viewportBottom = viewportTop + $(window).height() //스크롤값+화면의 높이값

    return (viewportTop < elementBottom) && (elementTop < viewportBottom)
  }

  $(window).on('load scroll resize', function () {
    ani.each(function () {
      if ($(this).aniMoving()) {
        $(this).addClass('moving')
      }
      else {
        $(this).removeClass('moving')
      }
    })
  })

  // 탭메뉴 함수
  tap()
  function tap(){
    let i = 0
    init(i)
    function init(i)
    {
      $('.sec2_btn_wrap .mainBtn').eq(i).addClass('On')
      $('.mainSec2 .img_box .ping').eq(i).addClass('On')
    }
    function reset(){
      TAP.removeClass('On')
      PING.removeClass('On')
    }
  
    const TAP = $('.sec2_btn_wrap .mainBtn')
    const PING = $('.mainSec2 .img_box .ping')
  
    TAP.click(function(){
        let liIn = $(this).index()
        reset()
        $(this).addClass('On')
        console.log(liIn)
        init(liIn)
    })
  }

  // 슬라이더
  const swiper = new Swiper(".listSlider", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints:{
      768:{
        slidesPerView: 3,
        spaceBetween: -10,
      },
      450:{
        slidesPerView: 1.5,
      }
    },
    slidesPerView: 1,
    loop: true,
    spaceBetween: 0,
    centeredSlides: true
  });

})