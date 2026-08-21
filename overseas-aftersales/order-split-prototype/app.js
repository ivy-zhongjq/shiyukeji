/**
 * 世宇海外售后系统 · 拆单方案一 & 方案二 — 交互逻辑
 * 纯前端 mock，无真实后端
 */

/* ==================== State ==================== */
const state = {
  scheme: 1,
  // Scheme 1 state
  currentTab: 'all',
  expandedOrders: new Set(),
  selectedOrders: new Set(),
  selectedParts: new Set(),
  filteredOrders: [],
  searchValues: {},
  modalParts: [],
  // Scheme 2 state
  s2CurrentPage: 'pending',       // 'orderList' or 'pending'
  s2CurrentTab: 'all',
  s2ExpandedOrders: new Set(),
  s2SelectedOrders: new Set(),
  s2FilteredOrders: [],
  s2SearchValues: {},
  // S2 待开单 page state
  s2pExpandedCustomers: new Set(),
  s2pSelectedParts: new Set(),     // Set of part uids
  s2pSearchValues: {},
};

/* ==================== Helpers ==================== */
function fmt(n) {
  if (n === null || n === undefined || n === '') return '—';
  return typeof n === 'number' ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : n;
}

function statusClass(status) {
  const map = {
    '未提交': 'status-default', '待开单': 'status-warning', '待确认': 'status-processing',
    '待发货': 'status-processing', '部分发货': 'status-processing', '已发货': 'status-success',
    '待入库': 'status-processing', '部分入库': 'status-processing', '已完成': 'status-success', '已关闭': 'status-default',
  };
  return map[status] || 'status-default';
}

function partKey(orderId, partIdx) { return orderId + ':' + partIdx; }

function stockClass(qty) {
  if (qty === 0) return 'stock-zero';
  if (qty < 5) return 'stock-low';
  return 'stock-ok';
}

function refreshIcons() {
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* ==================== Inline SVG icons (for sidebar) ==================== */
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>',
  server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
  message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
  rotate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
};

/* ==================== Sidebar Configs ==================== */
const sidebarConfigs = {
  // Scheme 1 sidebar — matches original screenshots
  1: {
    brand: { name: '世宇科技', sub: '世宇海外售后系统' },
    items: [
      { type: 'single', label: '首页', icon: 'home' },
      { type: 'single', label: '世宇配件库', icon: 'package' },
      {
        type: 'group', label: '销售订单', icon: 'cart', expanded: true,
        children: [
          { label: '服务中心' },
          { label: '订单列表', active: true, nav: 'orderList' },
          { label: '发货单' },
          { label: '故障报修' },
        ]
      },
      { type: 'single', label: '报修单', icon: 'wrench' },
      { type: 'single', label: '返工单', icon: 'rotate' },
      { type: 'single', label: 'AI资料库', icon: 'bot' },
      { type: 'single', label: '机器管理', icon: 'server' },
      { type: 'single', label: '意见反馈', icon: 'message' },
      { type: 'single', label: 'CRM管理', icon: 'users' },
      { type: 'single', label: '用户管理', icon: 'user' },
    ]
  },
  // Scheme 2 sidebar — matches screenshots 1 & 2, adds 待开单
  2: {
    brand: { name: '世宇科技', sub: '世宇海外售后系统' },
    items: [
      { type: 'single', label: '首页', icon: 'home' },
      { type: 'single', label: '世宇配件库', icon: 'package' },
      {
        type: 'group', label: '销售订单', icon: 'cart', expanded: true,
        children: [
          { label: '服务中心' },
          { label: '订单列表', nav: 'orderList' },
          { label: '待开单', nav: 'pending', active: true, badge: '8' },
          { label: '发货单', icon: 'truck' },
        ]
      },
      {
        type: 'group', label: '故障报修', icon: 'wrench', expanded: true,
        children: [
          { label: '报修单' },
          { label: '返工单' },
        ]
      },
      { type: 'single', label: 'AI资料库', icon: 'bot' },
      { type: 'single', label: '机器管理', icon: 'server' },
      { type: 'single', label: '意见反馈', icon: 'message' },
      { type: 'single', label: 'CRM管理', icon: 'users' },
      { type: 'single', label: '用户管理', icon: 'user' },
    ]
  },
};

/* ==================== Render: Sidebar ==================== */
function renderSidebar() {
  const cfg = sidebarConfigs[state.scheme];
  const sidebar = document.getElementById('sidebar');

  let html = `
    <div class="sidebar-brand">
      <div class="brand-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;color:#fff"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      </div>
      <div class="brand-text">
        <span class="brand-name">${cfg.brand.name}</span>
        <span class="brand-sub">${cfg.brand.sub}</span>
      </div>
    </div>
    <nav class="sidebar-nav">`;

  cfg.items.forEach((item, idx) => {
    if (item.type === 'single') {
      html += `
        <div class="nav-item-single" onclick="showToast('${item.label}功能演示中','info')">
          <span class="nav-icon">${ICONS[item.icon] || ''}</span>
          ${item.label}
        </div>`;
    } else if (item.type === 'group') {
      const expandedClass = item.expanded ? 'expanded' : '';
      html += `
        <div class="nav-group ${expandedClass}" data-group-idx="${idx}">
          <div class="nav-group-title" onclick="toggleNavGroup(${idx})">
            <span class="nav-icon">${ICONS[item.icon] || ''}</span>
            ${item.label}
            <span class="nav-arrow">${ICONS.chevron}</span>
          </div>
          <ul class="nav-sub">`;
      item.children.forEach(child => {
        const activeClass = child.active ? 'active' : '';
        const onclick = child.nav ? `navigateTo('${child.nav}')` : `showToast('${child.label}功能演示中','info')`;
        const badge = child.badge ? `<span class="nav-badge">${child.badge}</span>` : '';
        html += `<li><a href="javascript:void(0)" class="${activeClass}" onclick="${onclick}">${child.label}${badge}</a></li>`;
      });
      html += `</ul></div>`;
    }
  });

  html += `</nav>`;
  sidebar.innerHTML = html;
}

function toggleNavGroup(idx) {
  const cfg = sidebarConfigs[state.scheme];
  cfg.items[idx].expanded = !cfg.items[idx].expanded;
  renderSidebar();
}

/* ==================== Render: Breadcrumb ==================== */
function renderBreadcrumb() {
  const bc = document.getElementById('breadcrumb');
  if (state.scheme === 1) {
    bc.innerHTML = `<span>销售订单</span><span class="sep">${ICONS.chevron}</span><span class="crumb-active">订单列表</span>`;
  } else {
    if (state.s2CurrentPage === 'orderList') {
      bc.innerHTML = `<span>销售订单</span><span class="sep">${ICONS.chevron}</span><span class="crumb-active">订单列表</span>`;
    } else {
      bc.innerHTML = `<span>销售订单</span><span class="sep">${ICONS.chevron}</span><span class="crumb-active">待开单</span>`;
    }
  }
}

/* ==================== Scheme Switching ==================== */
function switchScheme(n) {
  state.scheme = n;
  document.querySelector('[data-scheme="1"]').classList.toggle('active', n === 1);
  document.querySelector('[data-scheme="2"]').classList.toggle('active', n === 2);

  if (n === 1) {
    document.getElementById('scheme1Content').style.display = 'block';
    document.getElementById('scheme2Content').classList.remove('show');
    document.getElementById('schemeDesc').innerHTML = `
      <span class="scheme-tag">方案一</span>
      直接在原销售订单列表进行拆单 — 列表支持展开订单配件明细，勾选配件生成世宇商城订单，增加「待开单」标签查看未生成商城订单的记录
    `;
    renderTabs();
    renderTable();
  } else {
    document.getElementById('scheme1Content').style.display = 'none';
    document.getElementById('scheme2Content').classList.add('show');
    document.getElementById('schemeDesc').innerHTML = `
      <span class="scheme-tag">方案二</span>
      原订单不动，新增「待开单」页面 — 将单据直接拆分，按客户分组展示配件明细，勾选配件生成世宇商城订单
    `;
    s2SwitchPage('pending');
    s2RenderTabs();
    s2RenderTable();
    s2pRenderTable();
  }
  renderSidebar();
  renderBreadcrumb();
  refreshIcons();
}

/* ==================== Page Navigation (Scheme 2) ==================== */
function navigateTo(page) {
  if (page === 'orderList') s2SwitchPage('orderList');
  else if (page === 'pending') s2SwitchPage('pending');
}

function s2SwitchPage(page) {
  state.s2CurrentPage = page;
  document.getElementById('s2PageOrderList').classList.toggle('active', page === 'orderList');
  document.getElementById('s2PagePending').classList.toggle('active', page === 'pending');

  // Update sidebar active states
  const cfg = sidebarConfigs[2];
  cfg.items.forEach(item => {
    if (item.type === 'group' && item.children) {
      item.children.forEach(child => {
        if (child.nav === 'orderList') child.active = (page === 'orderList');
        if (child.nav === 'pending') child.active = (page === 'pending');
      });
    }
  });
  renderSidebar();
  renderBreadcrumb();
  refreshIcons();
}

/* ================================================================ */
/* ============== Scheme 1: Order List (unchanged) ================ */
/* ================================================================ */

const tabStatusMap = {
  all: null, pending: '待开单', pending_ship: '待发货', shipped: '已发货', pending_in: '待入库',
};

function renderTabs() {
  const bar = document.getElementById('tabsBar');
  bar.innerHTML = DB.statusTabs.map(tab => `
    <div class="tab-item ${tab.key === state.currentTab ? 'active' : ''}" onclick="switchTab('${tab.key}')">
      ${tab.label}<span class="tab-count">${tab.count}</span>
    </div>
  `).join('');
}

function switchTab(key) {
  state.currentTab = key;
  renderTabs();
  renderTable();
}

function renderTable() {
  let orders = DB.orders.slice();
  const tabStatus = tabStatusMap[state.currentTab];
  if (tabStatus) {
    if (state.currentTab === 'pending_ship') {
      orders = orders.filter(o => o.orderStatus === '待发货' || o.orderStatus === '部分发货');
    } else if (state.currentTab === 'pending_in') {
      orders = orders.filter(o => o.orderStatus === '待入库' || o.orderStatus === '部分入库');
    } else {
      orders = orders.filter(o => o.orderStatus === tabStatus);
    }
  }
  const f = state.searchValues || {};
  if (f.poNo)     orders = orders.filter(o => o.poNo.includes(f.poNo));
  if (f.customer) orders = orders.filter(o => o.customer.includes(f.customer));
  if (f.product)  orders = orders.filter(o => o.parts.some(p => p.name.toLowerCase().includes(f.product.toLowerCase())));
  if (f.code)     orders = orders.filter(o => o.parts.some(p => p.code.toLowerCase().includes(f.code.toLowerCase())));
  if (f.status)   orders = orders.filter(o => o.orderStatus === f.status);

  state.filteredOrders = orders;
  const tbody = document.getElementById('orderTableBody');
  if (orders.length === 0) {
    tbody.innerHTML = emptyRow(14);
    document.getElementById('pageInfo').textContent = `共 0 条`;
    refreshIcons();
    return;
  }
  document.getElementById('pageInfo').textContent = `共 ${orders.length} 条`;

  tbody.innerHTML = orders.map(order => {
    const isExpanded = state.expandedOrders.has(order.id);
    const isSelected = state.selectedOrders.has(order.id);
    const partsSelected = order.parts.filter((_, pi) => state.selectedParts.has(partKey(order.id, pi))).length;
    const isIndeterminate = partsSelected > 0 && partsSelected < order.parts.length;
    const cbClass = isIndeterminate ? 'cb indeterminate' : (isSelected ? 'cb checked' : 'cb');

    let rows = mainOrderRow(order, isExpanded, isSelected, cbClass);
    if (isExpanded) rows += expandedPartsRow(order);
    return rows;
  }).join('');

  updateSelectAllCheckbox();
  refreshIcons();
}

function emptyRow(colspan) {
  return `<tr><td colspan="${colspan}" style="text-align:center;padding:48px;color:#8c8c8c;">
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
      <i data-lucide="inbox" style="width:48px;height:48px;color:#d9d9d9"></i>
      <span>暂无数据</span>
    </div></td></tr>`;
}

function mainOrderRow(order, isExpanded, isSelected, cbClass) {
  return `
    <tr class="${isSelected ? 'row-selected' : ''}">
      <td class="checkbox-cell"><div class="${cbClass}" onclick="toggleOrderSelect(${order.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div></td>
      <td>${order.time}</td><td>${order.type}</td><td>${order.poNo}</td><td>${order.serviceCenter}</td><td>${order.customer}</td>
      <td><span class="expand-toggle ${isExpanded ? 'expanded' : ''}" onclick="toggleExpand(${order.id})"><span class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>商品明细 (${order.parts.length})</span></td>
      <td>${order.qty}</td><td>${order.unitPrice ? fmt(order.unitPrice) : '—'}</td><td>${order.subtotal ? fmt(order.subtotal) : '—'}</td>
      <td><span class="status-badge ${statusClass(order.orderStatus)}"><span class="dot"></span>${order.orderStatus}</span></td>
      <td><span class="status-badge ${statusClass(order.customerStatus)}"><span class="dot"></span>${order.customerStatus}</span></td>
      <td>${order.relatedOrder || '—'}</td>
      <td class="ops-cell">${renderOps(order)}</td>
    </tr>`;
}

function expandedPartsRow(order) {
  return `
    <tr class="parts-row show"><td colspan="14"><div class="parts-inner">
      <table><thead><tr>
        <th style="width:36px"></th><th>配件编码</th><th>配件图片</th><th>配件名称</th><th>K3编码</th><th>型号规格</th>
        <th>售价(美元)</th><th>小计(美元)</th><th>采购订单号</th><th>库存</th><th>剩余待发货</th><th>操作</th>
      </tr></thead><tbody>
        ${order.parts.map((part, pi) => {
          const partSelected = state.selectedParts.has(partKey(order.id, pi));
          return `<tr>
            <td style="text-align:center"><div class="cb ${partSelected ? 'checked' : ''}" onclick="togglePartSelect(${order.id}, ${pi})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div></td>
            <td>${part.code}</td>
            <td><div class="part-img-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div></td>
            <td>${part.name}</td><td>${part.k3Code}</td><td>${part.spec}</td>
            <td>${fmt(part.price)}</td><td>${fmt(part.subtotal)}</td><td>${part.poNo}</td><td>${part.stock}</td><td>${part.remaining}</td>
            <td><a class="op-link" onclick="openModalForPart(${order.id}, ${pi})">生成商城订单</a></td>
          </tr>`;
        }).join('')}
      </tbody></table>
    </div></td></tr>`;
}

function renderOps(order) {
  const s = order.orderStatus;
  if (s === '未提交') return opsLinks(['物流单号', '确认提交', '修改', '详情', '删除'], order);
  if (s === '待开单') return `<a class="op-link" onclick="openModalForOrder(${order.id})" style="font-weight:500">生成商城订单</a>` + opsLinks(['修改', '关闭', '详情', '日志'], order, 1);
  if (s === '待确认') return opsLinks(['确认', '关闭', '详情', '日志'], order);
  if (s === '待发货' || s === '部分发货') return opsLinks(['物流单号: 暂无', '详情', '日志'], order);
  if (s === '已发货' || s === '待入库' || s === '部分入库' || s === '已完成') return `<span class="op-group">物流单号: ${'x'.repeat(7)}</span>` + opsLinks(['详情', '日志'], order, 0, true);
  return opsLinks(['详情', '日志'], order);
}

function opsLinks(links, order, startIndex = 0, firstGroup = false) {
  return links.map((label, i) => {
    if (i < startIndex) return '';
    const isDanger = label === '删除';
    const action = label === '确认提交' ? `confirmSubmit(${order.id})`
      : label === '生成商城订单' ? `openModalForOrder(${order.id})`
      : `showToast('${label}功能演示中','info')`;
    return `<span class="op-sep">/</span><a class="op-link ${isDanger ? 'danger' : ''}" onclick="${action}">${label}</a>`;
  }).join('').replace(/^\s*<span class="op-sep">\/<\/span>/, '');
}

/* —— S1 Search / Filter —— */
function handleSearch() {
  state.searchValues = {
    date: val('filterDate'), status: val('filterStatus'), poNo: val('filterPoNo'),
    product: val('filterProduct'), code: val('filterCode'), customer: val('filterCustomer'),
  };
  renderTable(); showToast('搜索完成', 'success');
}
function handleReset() {
  ['filterDate','filterStatus','filterPoNo','filterProduct','filterCode','filterCustomer','filterSupplier']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  state.searchValues = {}; renderTable();
}
function val(id) { const el = document.getElementById(id); return el ? el.value : ''; }

/* —— S1 Expand / Select —— */
function toggleExpand(orderId) {
  state.expandedOrders.has(orderId) ? state.expandedOrders.delete(orderId) : state.expandedOrders.add(orderId);
  renderTable();
}
function toggleOrderSelect(orderId) {
  const order = DB.orders.find(o => o.id === orderId); if (!order) return;
  if (state.selectedOrders.has(orderId)) {
    state.selectedOrders.delete(orderId);
    order.parts.forEach((_, pi) => state.selectedParts.delete(partKey(orderId, pi)));
  } else {
    state.selectedOrders.add(orderId);
    order.parts.forEach((_, pi) => state.selectedParts.add(partKey(orderId, pi)));
  }
  updateSelectionCount(); renderTable();
}
function togglePartSelect(orderId, partIdx) {
  const key = partKey(orderId, partIdx);
  const order = DB.orders.find(o => o.id === orderId); if (!order) return;
  if (state.selectedParts.has(key)) { state.selectedParts.delete(key); state.selectedOrders.delete(orderId); }
  else { state.selectedParts.add(key);
    if (order.parts.every((_, pi) => state.selectedParts.has(partKey(orderId, pi)))) state.selectedOrders.add(orderId);
  }
  updateSelectionCount(); renderTable();
}
function toggleSelectAll() {
  const visibleOrders = state.filteredOrders;
  const allSelected = visibleOrders.every(o => state.selectedOrders.has(o.id));
  if (allSelected) {
    visibleOrders.forEach(o => { state.selectedOrders.delete(o.id); o.parts.forEach((_, pi) => state.selectedParts.delete(partKey(o.id, pi))); });
  } else {
    visibleOrders.forEach(o => { state.selectedOrders.add(o.id); o.parts.forEach((_, pi) => state.selectedParts.add(partKey(o.id, pi))); });
  }
  updateSelectionCount(); renderTable();
}
function updateSelectAllCheckbox() {
  const cb = document.getElementById('selectAllCb'); if (!cb) return;
  const visibleOrders = state.filteredOrders;
  if (visibleOrders.length === 0) { cb.className = 'cb'; return; }
  const selectedCount = visibleOrders.filter(o => state.selectedOrders.has(o.id)).length;
  cb.className = selectedCount === visibleOrders.length ? 'cb checked' : selectedCount > 0 ? 'cb indeterminate' : 'cb';
}
function updateSelectionCount() {
  const el = document.getElementById('selectedCount');
  if (el) el.textContent = state.selectedParts.size;
}

/* —— S1 Confirm Submit —— */
function confirmSubmit(orderId) {
  const order = DB.orders.find(o => o.id === orderId); if (!order) return;
  order.orderStatus = '待开单'; order.customerStatus = '待确认';
  updateTabCounts(); renderTabs(); renderTable();
  showToast('订单已提交，状态更新为「待开单」', 'success');
}

/* —— Tab Counts —— */
function updateTabCounts() {
  DB.statusTabs[0].count = DB.orders.length;
  DB.statusTabs[1].count = DB.orders.filter(o => o.orderStatus === '待开单').length;
  DB.statusTabs[2].count = DB.orders.filter(o => o.orderStatus === '待发货' || o.orderStatus === '部分发货').length;
  DB.statusTabs[3].count = DB.orders.filter(o => o.orderStatus === '已发货').length;
  DB.statusTabs[4].count = DB.orders.filter(o => o.orderStatus === '待入库' || o.orderStatus === '部分入库').length;
}

/* ================================================================ */
/* ============== Scheme 2: Order List (read-only) =============== */
/* ================================================================ */

function s2RenderTabs() {
  const bar = document.getElementById('s2TabsBar');
  bar.innerHTML = DB.statusTabs.map(tab => `
    <div class="tab-item ${tab.key === state.s2CurrentTab ? 'active' : ''}" onclick="s2SwitchTab('${tab.key}')">
      ${tab.label}<span class="tab-count">${tab.count}</span>
    </div>
  `).join('');
}

function s2SwitchTab(key) {
  state.s2CurrentTab = key;
  s2RenderTabs();
  s2RenderTable();
}

function s2RenderTable() {
  let orders = DB.orders.slice();
  const tabStatus = tabStatusMap[state.s2CurrentTab];
  if (tabStatus) {
    if (state.s2CurrentTab === 'pending_ship') {
      orders = orders.filter(o => o.orderStatus === '待发货' || o.orderStatus === '部分发货');
    } else if (state.s2CurrentTab === 'pending_in') {
      orders = orders.filter(o => o.orderStatus === '待入库' || o.orderStatus === '部分入库');
    } else {
      orders = orders.filter(o => o.orderStatus === tabStatus);
    }
  }
  const f = state.s2SearchValues || {};
  if (f.poNo)     orders = orders.filter(o => o.poNo.includes(f.poNo));
  if (f.customer) orders = orders.filter(o => o.customer.includes(f.customer));
  if (f.product)  orders = orders.filter(o => o.parts.some(p => p.name.toLowerCase().includes(f.product.toLowerCase())));
  if (f.status)   orders = orders.filter(o => o.orderStatus === f.status);

  state.s2FilteredOrders = orders;
  const tbody = document.getElementById('s2OrderTableBody');
  if (orders.length === 0) {
    tbody.innerHTML = emptyRow(14);
    document.getElementById('s2PageInfo').textContent = `共 0 条`;
    refreshIcons();
    return;
  }
  document.getElementById('s2PageInfo').textContent = `共 ${orders.length} 条`;

  tbody.innerHTML = orders.map(order => {
    const isExpanded = state.s2ExpandedOrders.has(order.id);
    const isSelected = state.s2SelectedOrders.has(order.id);
    const cbClass = isSelected ? 'cb checked' : 'cb';
    let rows = `
      <tr class="${isSelected ? 'row-selected' : ''}">
        <td class="checkbox-cell"><div class="${cbClass}" onclick="s2ToggleOrderSelect(${order.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div></td>
        <td>${order.time}</td><td>${order.type}</td><td>${order.poNo}</td><td>${order.serviceCenter}</td><td>${order.customer}</td>
        <td><span class="expand-toggle ${isExpanded ? 'expanded' : ''}" onclick="s2ToggleExpand(${order.id})"><span class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>商品明细 (${order.parts.length})</span></td>
        <td>${order.qty}</td><td>${order.unitPrice ? fmt(order.unitPrice) : '—'}</td><td>${order.subtotal ? fmt(order.subtotal) : '—'}</td>
        <td><span class="status-badge ${statusClass(order.orderStatus)}"><span class="dot"></span>${order.orderStatus}</span></td>
        <td><span class="status-badge ${statusClass(order.customerStatus)}"><span class="dot"></span>${order.customerStatus}</span></td>
        <td>${order.relatedOrder || '—'}</td>
        <td class="ops-cell">${s2RenderOps(order)}</td>
      </tr>`;
    if (isExpanded) {
      rows += `<tr class="parts-row show"><td colspan="14"><div class="parts-inner"><table><thead><tr>
        <th style="width:36px"></th><th>配件编码</th><th>配件图片</th><th>配件名称</th><th>K3编码</th><th>型号规格</th>
        <th>售价(美元)</th><th>小计(美元)</th><th>采购订单号</th><th>库存</th><th>剩余待发货</th>
      </tr></thead><tbody>
        ${order.parts.map(part => `<tr>
          <td></td><td>${part.code}</td>
          <td><div class="part-img-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div></td>
          <td>${part.name}</td><td>${part.k3Code}</td><td>${part.spec}</td>
          <td>${fmt(part.price)}</td><td>${fmt(part.subtotal)}</td><td>${part.poNo}</td><td>${part.stock}</td><td>${part.remaining}</td>
        </tr>`).join('')}
      </tbody></table></div></td></tr>`;
    }
    return rows;
  }).join('');

  s2UpdateSelectAllCheckbox();
  refreshIcons();
}

function s2RenderOps(order) {
  // Scheme 2 order list is read-only — no "生成商城订单" action
  const s = order.orderStatus;
  if (s === '未提交') return `<a class="op-link" onclick="showToast('详情功能演示中','info')">详情</a><span class="op-sep">/</span><a class="op-link" onclick="showToast('日志功能演示中','info')">日志</a>`;
  if (s === '待开单') return `<a class="op-link" onclick="showToast('修改功能演示中','info')">修改</a><span class="op-sep">/</span><a class="op-link" onclick="showToast('关闭功能演示中','info')">关闭</a><span class="op-sep">/</span><a class="op-link" onclick="showToast('详情功能演示中','info')">详情</a><span class="op-sep">/</span><a class="op-link" onclick="showToast('日志功能演示中','info')">日志</a>`;
  if (s === '待发货' || s === '部分发货') return `<a class="op-link" onclick="showToast('物流单号: 暂无','info')">物流单号: 暂无</a><span class="op-sep">/</span><a class="op-link" onclick="showToast('详情功能演示中','info')">详情</a><span class="op-sep">/</span><a class="op-link" onclick="showToast('日志功能演示中','info')">日志</a>`;
  return `<a class="op-link" onclick="showToast('详情功能演示中','info')">详情</a><span class="op-sep">/</span><a class="op-link" onclick="showToast('日志功能演示中','info')">日志</a>`;
}

function s2ToggleExpand(orderId) {
  state.s2ExpandedOrders.has(orderId) ? state.s2ExpandedOrders.delete(orderId) : state.s2ExpandedOrders.add(orderId);
  s2RenderTable();
}
function s2ToggleOrderSelect(orderId) {
  state.s2SelectedOrders.has(orderId) ? state.s2SelectedOrders.delete(orderId) : state.s2SelectedOrders.add(orderId);
  const el = document.getElementById('s2SelectedCount'); if (el) el.textContent = state.s2SelectedOrders.size;
  s2RenderTable();
}
function s2ToggleSelectAll() {
  const visibleOrders = state.s2FilteredOrders;
  const allSelected = visibleOrders.every(o => state.s2SelectedOrders.has(o.id));
  if (allSelected) visibleOrders.forEach(o => state.s2SelectedOrders.delete(o.id));
  else visibleOrders.forEach(o => state.s2SelectedOrders.add(o.id));
  const el = document.getElementById('s2SelectedCount'); if (el) el.textContent = state.s2SelectedOrders.size;
  s2RenderTable();
}
function s2UpdateSelectAllCheckbox() {
  const cb = document.getElementById('s2SelectAllCb'); if (!cb) return;
  const visibleOrders = state.s2FilteredOrders;
  if (visibleOrders.length === 0) { cb.className = 'cb'; return; }
  const selectedCount = visibleOrders.filter(o => state.s2SelectedOrders.has(o.id)).length;
  cb.className = selectedCount === visibleOrders.length ? 'cb checked' : selectedCount > 0 ? 'cb indeterminate' : 'cb';
}
function s2HandleSearch() {
  state.s2SearchValues = { date: s2val('s2FilterDate'), status: s2val('s2FilterStatus'), poNo: s2val('s2FilterPoNo'), product: s2val('s2FilterProduct'), customer: s2val('s2FilterCustomer') };
  s2RenderTable(); showToast('搜索完成', 'success');
}
function s2HandleReset() {
  ['s2FilterDate','s2FilterStatus','s2FilterPoNo','s2FilterProduct','s2FilterCustomer','s2FilterSalesperson'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  state.s2SearchValues = {}; s2RenderTable();
}
function s2val(id) { const el = document.getElementById(id); return el ? el.value : ''; }

/* ================================================================ */
/* =========== Scheme 2: 待开单 page (customer-grouped) =========== */
/* ================================================================ */

function s2pRenderTable() {
  // Apply filters
  let customers = DB.s2Customers.map(c => ({ ...c, parts: c.parts.slice() }));
  const f = state.s2pSearchValues || {};

  if (f.customer) customers = customers.filter(c => c.customerName.includes(f.customer));
  if (f.poNo)     customers = customers.map(c => ({ ...c, parts: c.parts.filter(p => p.poNo.includes(f.poNo)) })).filter(c => c.parts.length > 0);
  if (f.code)     customers = customers.map(c => ({ ...c, parts: c.parts.filter(p => p.code.toLowerCase().includes(f.code.toLowerCase())) })).filter(c => c.parts.length > 0);
  if (f.name)     customers = customers.map(c => ({ ...c, parts: c.parts.filter(p => p.nameCn.includes(f.name) || p.nameEn.toLowerCase().includes(f.name.toLowerCase())) })).filter(c => c.parts.length > 0);
  if (f.k3)       customers = customers.map(c => ({ ...c, parts: c.parts.filter(p => p.k3Code.includes(f.k3)) })).filter(c => c.parts.length > 0);
  if (f.stock === 'ok')  customers = customers.map(c => ({ ...c, parts: c.parts.filter(p => p.stock >= p.remaining) })).filter(c => c.parts.length > 0);
  if (f.stock === 'low') customers = customers.map(c => ({ ...c, parts: c.parts.filter(p => p.stock < p.remaining) })).filter(c => c.parts.length > 0);

  const tbody = document.getElementById('s2pTableBody');
  const totalParts = customers.reduce((sum, c) => sum + c.parts.length, 0);
  document.getElementById('s2pPageInfo').textContent = `共 ${totalParts} 条`;

  if (customers.length === 0 || totalParts === 0) {
    tbody.innerHTML = emptyRow(15);
    refreshIcons();
    return;
  }

  let html = '';
  customers.forEach((cust, ci) => {
    const groupKey = 'cust-' + ci;
    const isExpanded = state.s2pExpandedCustomers.has(groupKey);
    const allPartsSelected = cust.parts.every(p => state.s2pSelectedParts.has(p.uid));
    const somePartsSelected = cust.parts.some(p => state.s2pSelectedParts.has(p.uid));
    const cbClass = allPartsSelected ? 'cb checked' : somePartsSelected ? 'cb indeterminate' : 'cb';
    const groupTotal = cust.parts.reduce((s, p) => s + p.subtotal, 0);

    // Group header row
    html += `<tr class="customer-group-header">
      <td class="checkbox-cell"><div class="${cbClass}" onclick="s2pToggleCustomerSelect('${groupKey}', ${ci})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div></td>
      <td>${cust.serviceCenter}</td>
      <td colspan="2">
        <span class="group-toggle ${isExpanded ? 'expanded' : ''}" onclick="s2pToggleCustomerExpand('${groupKey}')">
          <span class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          ${cust.customerName}
        </span>
      </td>
      <td colspan="10" style="text-align:right;">
        <span class="group-summary">${cust.parts.length} 个配件 | 合计 $${fmt(groupTotal)}</span>
      </td>
    </tr>`;

    // Part rows
    cust.parts.forEach(part => {
      const partSelected = state.s2pSelectedParts.has(part.uid);
      html += `<tr class="group-child ${isExpanded ? 'show' : ''}">
        <td class="checkbox-cell"><div class="cb ${partSelected ? 'checked' : ''}" onclick="s2pTogglePartSelect('${part.uid}', '${groupKey}', ${ci})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div></td>
        <td>${cust.serviceCenter}</td>
        <td>${cust.customerName}</td>
        <td>${part.poNo}</td>
        <td>${part.code}</td>
        <td><div class="s2-part-thumb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div></td>
        <td>${part.nameCn}</td>
        <td>${part.nameEn}</td>
        <td>${part.k3Code}</td>
        <td>${part.spec}</td>
        <td><span class="${stockClass(part.stock)}">${part.stock}</span></td>
        <td>${part.poQty}</td>
        <td>${part.remaining}</td>
        <td>${fmt(part.price)}</td>
        <td>${fmt(part.subtotal)}</td>
      </tr>`;
    });
  });

  tbody.innerHTML = html;
  s2pUpdateSelectAllCheckbox();
  refreshIcons();
}

function s2pToggleCustomerExpand(groupKey) {
  state.s2pExpandedCustomers.has(groupKey) ? state.s2pExpandedCustomers.delete(groupKey) : state.s2pExpandedCustomers.add(groupKey);
  s2pRenderTable();
}

function s2pToggleCustomerSelect(groupKey, ci) {
  const cust = DB.s2Customers[ci]; if (!cust) return;
  const allSelected = cust.parts.every(p => state.s2pSelectedParts.has(p.uid));
  if (allSelected) {
    cust.parts.forEach(p => state.s2pSelectedParts.delete(p.uid));
    state.s2pExpandedCustomers.delete(groupKey);
  } else {
    cust.parts.forEach(p => state.s2pSelectedParts.add(p.uid));
    state.s2pExpandedCustomers.add(groupKey);
  }
  s2pUpdateCount();
  s2pRenderTable();
}

function s2pTogglePartSelect(uid, groupKey, ci) {
  if (state.s2pSelectedParts.has(uid)) {
    state.s2pSelectedParts.delete(uid);
  } else {
    state.s2pSelectedParts.add(uid);
  }
  s2pUpdateCount();
  s2pRenderTable();
}

function s2pToggleSelectAll() {
  const allParts = DB.s2Customers.flatMap(c => c.parts);
  const allSelected = allParts.every(p => state.s2pSelectedParts.has(p.uid));
  if (allSelected) {
    allParts.forEach(p => state.s2pSelectedParts.delete(p.uid));
    state.s2pExpandedCustomers.clear();
  } else {
    allParts.forEach(p => state.s2pSelectedParts.add(p.uid));
    DB.s2Customers.forEach((_, ci) => state.s2pExpandedCustomers.add('cust-' + ci));
  }
  s2pUpdateCount();
  s2pRenderTable();
}

function s2pUpdateSelectAllCheckbox() {
  const cb = document.getElementById('s2pSelectAllCb'); if (!cb) return;
  const allParts = DB.s2Customers.flatMap(c => c.parts);
  if (allParts.length === 0) { cb.className = 'cb'; return; }
  const selectedCount = allParts.filter(p => state.s2pSelectedParts.has(p.uid)).length;
  cb.className = selectedCount === allParts.length ? 'cb checked' : selectedCount > 0 ? 'cb indeterminate' : 'cb';
}

function s2pUpdateCount() {
  const el = document.getElementById('s2pSelectedCount');
  if (el) el.textContent = state.s2pSelectedParts.size;
}

/* —— S2 待开单 Search —— */
function s2pHandleSearch() {
  state.s2pSearchValues = {
    customer: s2pval('s2pFilterCustomer'), stock: s2pval('s2pFilterStock'), date: s2pval('s2pFilterDate'),
    poNo: s2pval('s2pFilterPoNo'), code: s2pval('s2pFilterCode'), name: s2pval('s2pFilterName'), k3: s2pval('s2pFilterK3'),
  };
  s2pRenderTable(); showToast('搜索完成', 'success');
}
function s2pHandleReset() {
  ['s2pFilterCustomer','s2pFilterStock','s2pFilterDate','s2pFilterPoNo','s2pFilterCode','s2pFilterName','s2pFilterK3']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  state.s2pSearchValues = {}; s2pRenderTable();
}
function s2pval(id) { const el = document.getElementById(id); return el ? el.value : ''; }

/* —— S2 待开单: Generate Mall Order —— */
function s2pGenerateMallOrder() {
  const selectedParts = DB.s2Customers.flatMap(c => c.parts).filter(p => state.s2pSelectedParts.has(p.uid));
  if (selectedParts.length === 0) {
    showToast('请先勾选配件', 'info');
    return;
  }
  // Check: different customers cannot be combined into one mall order
  const selectedCustomers = DB.s2Customers.filter(c => c.parts.some(p => state.s2pSelectedParts.has(p.uid)));
  if (selectedCustomers.length > 1) {
    showToast('非同一客户，不可合并生成商城订单', 'info');
    return;
  }
  const cust = selectedCustomers[0];
  // Build modal parts from selected s2 parts
  state.modalParts = selectedParts.map(p => ({
    code: p.code, name: p.nameEn, k3Code: p.k3Code, spec: p.spec,
    price: p.price, subtotal: p.price, poNo: p.poNo,
    stock: p.stock, poQty: p.poQty, remaining: p.remaining, shipQty: 1,
    _s2Uid: p.uid,
  }));
  openModal(state.modalParts, { name: cust.customerName, serviceCenter: cust.serviceCenter });
}

function s2pBatchOrder() {
  const selectedParts = DB.s2Customers.flatMap(c => c.parts).filter(p => state.s2pSelectedParts.has(p.uid));
  if (selectedParts.length === 0) {
    showToast('请先勾选配件', 'info');
    return;
  }
  const selectedCustomers = DB.s2Customers.filter(c => c.parts.some(p => state.s2pSelectedParts.has(p.uid)));
  if (selectedCustomers.length > 1) {
    showToast('非同一客户，不可合并生成商城订单', 'info');
    return;
  }
  showToast(`已选 ${selectedParts.length} 个配件（客户：${selectedCustomers[0].customerName}），点击「生成商城订单」创建订单`, 'info');
}

/* ================================================================ */
/* ======================= Modal (shared) ========================= */
/* ================================================================ */

function getSelectedPartsForModal() {
  const parts = [];
  DB.orders.forEach(order => {
    order.parts.forEach((part, pi) => {
      if (state.selectedParts.has(partKey(order.id, pi))) {
        parts.push({ ...part, orderId: order.id, orderPoNo: order.poNo, customer: order.customer, shipQty: 1 });
      }
    });
  });
  return parts;
}

function openGenerateModal() {
  let parts = getSelectedPartsForModal();
  if (parts.length === 0) {
    const pendingOrders = state.filteredOrders.filter(o => o.orderStatus === '待开单');
    if (pendingOrders.length === 0) { showToast('请先勾选订单或配件', 'info'); return; }
    parts = [];
    pendingOrders.forEach(order => order.parts.forEach(part => parts.push({ ...part, orderId: order.id, orderPoNo: order.poNo, customer: order.customer, shipQty: 1 })));
    showToast('已自动载入待开单订单的配件', 'info');
  }
  state.modalParts = parts;
  openModal(parts);
}

function openModalForOrder(orderId) {
  const order = DB.orders.find(o => o.id === orderId); if (!order) return;
  state.modalParts = order.parts.map(part => ({ ...part, orderId: order.id, orderPoNo: order.poNo, customer: order.customer, shipQty: 1 }));
  openModal(state.modalParts);
}

function openModalForPart(orderId, partIdx) {
  const order = DB.orders.find(o => o.id === orderId); if (!order || !order.parts[partIdx]) return;
  const part = order.parts[partIdx];
  state.modalParts = [{ ...part, orderId: order.id, orderPoNo: order.poNo, customer: order.customer, shipQty: 1 }];
  openModal(state.modalParts);
}

function openModal(parts, customerOverride) {
  const c = customerOverride ? { ...DB.customerInfo, ...customerOverride } : DB.customerInfo;
  document.getElementById('modalCustomer').value = c.name;
  document.getElementById('modalContact').value = c.contact;
  document.getElementById('modalPhone').value = c.phone;
  document.getElementById('modalEmail').value = c.email;
  document.getElementById('modalAddress').value = c.address;
  renderModalParts();
  document.getElementById('modalOverlay').classList.add('show');
  refreshIcons();
}

function renderModalParts() {
  const tbody = document.getElementById('modalPartsBody');
  if (state.modalParts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="13" style="text-align:center;padding:32px;color:#8c8c8c;">暂无配件数据</td></tr>`;
    updateModalSummary(); return;
  }
  tbody.innerHTML = state.modalParts.map((part, idx) => `
    <tr>
      <td>${part.code}</td>
      <td class="col-img"><div class="part-thumb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div></td>
      <td>${part.name}</td><td>${part.k3Code}</td><td>${part.spec || '—'}</td>
      <td>${fmt(part.price)}</td><td>${fmt(part.price * part.shipQty)}</td><td>${part.poNo}</td>
      <td>${part.stock}</td><td>${part.poQty}</td><td>${part.remaining}</td>
      <td><div class="stepper">
        <button onclick="changeShipQty(${idx}, -1)" ${part.shipQty <= 1 ? 'disabled' : ''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
        <input type="number" min="1" max="${part.remaining}" value="${part.shipQty}" onchange="setShipQty(${idx}, this.value)" id="shipQty-${idx}">
        <button onclick="changeShipQty(${idx}, 1)" ${part.shipQty >= part.remaining ? 'disabled' : ''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
      </div></td>
      <td class="col-action"><a class="op-link danger" onclick="removeModalPart(${idx})">删除</a></td>
    </tr>`).join('');
  updateModalSummary(); refreshIcons();
}

function changeShipQty(idx, delta) {
  const part = state.modalParts[idx]; if (!part) return;
  const newQty = part.shipQty + delta;
  if (newQty < 1 || newQty > part.remaining) return;
  part.shipQty = newQty; renderModalParts();
}
function setShipQty(idx, val) {
  const part = state.modalParts[idx]; if (!part) return;
  let qty = parseInt(val) || 1;
  if (qty < 1) qty = 1; if (qty > part.remaining) qty = part.remaining;
  part.shipQty = qty; renderModalParts();
}
function removeModalPart(idx) { state.modalParts.splice(idx, 1); renderModalParts(); }

function updateModalSummary() {
  const summary = document.getElementById('modalSummary');
  const count = state.modalParts.length;
  const total = state.modalParts.reduce((sum, p) => sum + (p.price * p.shipQty), 0);
  const shipTotal = state.modalParts.reduce((sum, p) => sum + p.shipQty, 0);
  summary.innerHTML = `已选：<span class="sum-num">${count}</span>，合计：<span class="sum-num">$${fmt(total)}</span>。本次交货数：<span class="sum-num">${shipTotal}</span>`;
}

/* —— Generate Mall Order (shared) —— */
function generateMallOrder() {
  if (state.modalParts.length === 0) { showToast('请先添加配件', 'info'); return; }
  // TODO: replace with real API — POST /api/mall-orders { parts: [...] }
  const shipTotal = state.modalParts.reduce((sum, p) => sum + p.shipQty, 0);
  const orderNos = [...new Set(state.modalParts.map(p => p.poNo))].join(', ');
  const mallOrderNo = 'SY' + Date.now().toString().slice(-12);

  // Scheme 1: update affected orders
  if (state.scheme === 1) {
    const affectedIds = new Set(state.modalParts.filter(p => p.orderId).map(p => p.orderId));
    affectedIds.forEach(orderId => {
      const order = DB.orders.find(o => o.id === orderId);
      if (order && order.orderStatus === '待开单') { order.orderStatus = '待发货'; order.relatedOrder = mallOrderNo; }
    });
    state.selectedOrders.clear(); state.selectedParts.clear();
  }

  // Scheme 2: remove processed parts from 待开单 page
  if (state.scheme === 2) {
    state.modalParts.forEach(mp => {
      if (mp._s2Uid) {
        DB.s2Customers.forEach(cust => {
          cust.parts = cust.parts.filter(p => p.uid !== mp._s2Uid);
        });
        state.s2pSelectedParts.delete(mp._s2Uid);
      }
    });
    // Remove empty customers
    DB.s2Customers = DB.s2Customers.filter(c => c.parts.length > 0);
  }

  closeModal();

  if (state.scheme === 1) {
    updateTabCounts(); renderTabs(); renderTable(); updateSelectionCount();
  } else {
    s2pRenderTable(); s2pUpdateCount();
  }

  showToast(`已成功生成世宇商城订单（${mallOrderNo}）！共 ${shipTotal} 件配件，来源订单：${orderNos}`, 'success');
}

/* —— Modal Controls —— */
function closeModal() { document.getElementById('modalOverlay').classList.remove('show'); state.modalParts = []; }
function closeModalOnOverlay(event) { if (event.target === document.getElementById('modalOverlay')) closeModal(); }

/* ==================== Toast ==================== */
let toastTimer = null;
function showToast(msg, type) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  const iconEl = toast.querySelector('.toast-icon');
  msgEl.textContent = msg;
  toast.className = 'toast ' + (type || 'success');
  if (type === 'info') {
    iconEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    toast.classList.remove('success');
  } else {
    iconEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
  }
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  refreshIcons();
}

/* ==================== Init ==================== */
function init() {
  // Expand all customer groups by default
  DB.s2Customers.forEach((_, ci) => state.s2pExpandedCustomers.add('cust-' + ci));

  renderSidebar();
  renderBreadcrumb();
  updateTabCounts();
  renderTabs();
  renderTable();
  s2RenderTabs();
  s2RenderTable();
  s2pRenderTable();
  refreshIcons();
}

document.addEventListener('DOMContentLoaded', init);
