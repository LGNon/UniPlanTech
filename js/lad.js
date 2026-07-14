// PDF 모달 열기
function openPdfModal(pdfUrl) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    
    viewer.src = pdfUrl; // iframe에 PDF 경로 주입
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 본문 스크롤 막기
}

// PDF 모달 닫기
function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    
    modal.classList.remove('active');
    viewer.src = ''; // 닫을 때 PDF 로드 해제 (메모리 절약)
    document.body.style.overflow = 'auto'; // 본문 스크롤 복구
}

// 모달 바깥 어두운 배경 클릭 시 닫히는 기능 (선택 사항)
window.onclick = function(event) {
    const modal = document.getElementById('pdfModal');
    if (event.target === modal) {
        closePdfModal();
    }
}