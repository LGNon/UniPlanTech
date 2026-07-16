/**
 * 유니플랜텍 호접란 품종 팝업(모달) 스크립트
 */
document.addEventListener("DOMContentLoaded", function () {
    // 팝업에 들어갈 품종별 이미지 데이터 설정
    // 실제 이미지 파일명과 경로에 맞게 수정해서 사용하세요!
    const varietyData = {
        "variety_card1": {
            title: "유니비바체 (제5731호)",
            fullImg: "img/breedimg1.jpg", // 유니비바체 전체 사진 경로
            certImg: "img/breed1.png"     // 유니비바체 특허증 사진 경로
        },
        "variety_card2": {
            title: "유니웨딩 (제3860호)",
            fullImg: "img/breedimg3.jpg", // 유니웨딩 전체 사진 경로
            certImg: "img/breed3.png"    // 유니웨딩 특허증 사진 경로
        },
        "variety_card3": {
            title: "유니아마빌레 (제8359호)",
            fullImg: "img/breedimg2.jpg", // 유니아마빌레 전체 사진 경로
            certImg: "img/breed2.jpg"    // 유니아마빌레 특허증 사진 경로
        }
    };

    // 모달 DOM 요소 가져오기
    const modal = document.getElementById("varietyModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalFullImg = document.getElementById("modalFullImg");
    const modalCertImg = document.getElementById("modalCertImg");
    const closeBtn = document.querySelector(".modal-close");

    // 모든 품종 카드 요소 선택
    const cards = document.querySelectorAll(".variety_card");

    // 카드 클릭 이벤트 리스너 설정
    cards.forEach(card => {
        card.addEventListener("click", function () {
            // 클릭된 카드가 가지고 있는 클래스들 중 데이터 key값과 맞는 것 탐색
            let selectedKey = null;
            for (let key in varietyData) {
                if (card.classList.contains(key)) {
                    selectedKey = key;
                    break;
                }
            }

            // 매칭되는 데이터가 있다면 팝업창 갱신 및 오픈
            if (selectedKey && varietyData[selectedKey]) {
                const data = varietyData[selectedKey];
                
                modalTitle.textContent = data.title;
                modalFullImg.src = data.fullImg;
                modalCertImg.src = data.certImg;

                // 팝업 열기 (CSS 애니메이션 적용을 위해 클래스 추가)
                modal.classList.add("active");
                document.body.style.overflow = "hidden"; // 뒷배경 스크롤 방지
            }
        });
    });

    // 닫기 버튼 클릭 시 팝업 닫기
    closeBtn.addEventListener("click", closeModal);

    // 팝업 바깥 어두운 배경 클릭 시 팝업 닫기
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC 키 누를 시 팝업 닫기
    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // 팝업 닫기 공통 함수
    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // 스크롤 원상복구
    }
});