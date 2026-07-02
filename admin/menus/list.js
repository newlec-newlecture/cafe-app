// ============================================
// 관리자 메뉴 목록 로직
// ============================================

function initMenuList() {
  const tbody = $('#menu-list-body');
  if (!tbody) return;

  // 카테고리 필터
  let currentCategory = 'all';

  // 데이터 로드 (localStorage에 있으면 사용, 없으면 기본 데이터)
  let menus = loadMenus();

  function renderMenus() {
    const filtered = currentCategory === 'all' 
      ? menus 
      : menus.filter(m => m.category === currentCategory);

    tbody.innerHTML = filtered.map(m => `
      <tr>
        <td><strong>${m.name}</strong></td>
        <td>${getCategoryName(m.category)}</td>
        <td>${formatPrice(m.price)}</td>
        <td>${m.description || '-'}</td>
        <td>
          <a href="detail.html?id=${m.id}" class="btn btn-sm btn-outline">상세</a>
          <a href="edit.html?id=${m.id}" class="btn btn-sm btn-primary">수정</a>
          <button class="btn btn-sm btn-danger" onclick="deleteMenu(${m.id})">삭제</button>
        </td>
      </tr>
    `).join('');
  }

  // 탭 클릭 이벤트
  $$('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      renderMenus();
    });
  });

  renderMenus();
}

// ---- 메뉴 데이터 저장/로드 ----
const MENUS_KEY = 'cafe_menus';

function loadMenus() {
  const data = localStorage.getItem(MENUS_KEY);
  if (data) return JSON.parse(data);
  
  // 초기화: 기본 데이터 저장
  localStorage.setItem(MENUS_KEY, JSON.stringify(MENU_ITEMS));
  return [...MENU_ITEMS];
}

function saveMenus(menus) {
  localStorage.setItem(MENUS_KEY, JSON.stringify(menus));
}

function deleteMenu(id) {
  if (!confirm('정말 삭제하시겠습니까?')) return;
  
  let menus = loadMenus();
  menus = menus.filter(m => m.id !== id);
  saveMenus(menus);
  initMenuList();
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', initMenuList);
