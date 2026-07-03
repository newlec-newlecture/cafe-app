// ============================================
// 관리자 - 메뉴 상세
// ============================================

function initMenuDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  
  if (!id) {
    $('#menu-detail').innerHTML = '<p>메뉴 ID가 유효하지 않습니다.</p>';
    return;
  }

  const menus = loadMenus();
  const menu = menus.find(m => m.id === id);

  if (!menu) {
    $('#menu-detail').innerHTML = '<p>해당 메뉴를 찾을 수 없습니다.</p>';
    return;
  }

  // 수정 버튼 링크 업데이트
  const editBtn = $('#edit-btn');
  if (editBtn) {
    editBtn.href = `edit.html?id=${menu.id}`;
  }

  $('#menu-detail').innerHTML = `
    <h2>${menu.name}</h2>
    <div class="detail-row">
      <span class="detail-label">카테고리</span>
      <span class="detail-value">${getCategoryName(menu.category)}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">가격</span>
      <span class="detail-value">${formatPrice(menu.price)}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">설명</span>
      <span class="detail-value">${menu.description || '-'}</span>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', initMenuDetail);
