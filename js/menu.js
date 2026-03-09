$(document).ready(function() {
    // 1. 배경 어두운 효과(Dim) 요소 추가
    if ($('.nav_dim').length === 0) {
        $('body').append('<div class="nav_dim"></div>');
    }

    // 2. 메뉴 열기 (햄버거 버튼 클릭)
    $(document).on('click', '.btn_all_menu', function() {
        $('.nav_full').addClass('on');
        $('.nav_dim').fadeIn(300);
        $('body').css('overflow', 'hidden');
    });

    // 3. 메뉴 닫기 (X 버튼 혹은 배경 클릭 시)
    $(document).on('click', '.btn_close, .nav_dim', function() {
        $('.nav_full').removeClass('on');
        $('.nav_dim').fadeOut(300);
        $('body').css('overflow', 'auto');
    });
});