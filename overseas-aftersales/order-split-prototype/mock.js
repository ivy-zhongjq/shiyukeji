/**
 * Mock Data — 世宇海外售后系统 · 拆单方案一 & 方案二
 * 单一数据源，所有页面从此读取
 */

const DB = {
  /* —— 状态标签页 —— */
  statusTabs: [
    { key: 'all',          label: '全部',   count: 12 },
    { key: 'pending',      label: '待开单', count: 3  },
    { key: 'pending_ship', label: '待发货', count: 2  },
    { key: 'shipped',      label: '已发货', count: 1  },
    { key: 'pending_in',   label: '待入库', count: 1  },
  ],

  /* —— 销售订单列表（含配件明细） —— */
  orders: [
    {
      id: 1, time: '2026-04-23 09:45:03', type: '采购订单',
      poNo: 'CG50553665', serviceCenter: '美国服务中心', customer: 'uicc',
      qty: 10, unitPrice: 1500, subtotal: 4500.00,
      orderStatus: '未提交', customerStatus: '未提交', relatedOrder: '',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 150,  subtotal: 1500, poNo: 'CG50555656', stock: 5,  poQty: 10, remaining: 10 },
        { code: 'T170-0601-00', name: 'CPU FAN',   k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 300, subtotal: 3000, poNo: 'CG50555657', stock: 3,  poQty: 10, remaining: 10 },
      ]
    },
    {
      id: 2, time: '2026-04-23 09:45:05', type: '采购订单',
      poNo: 'CG50553662', serviceCenter: '美国服务中心', customer: 'Amy',
      qty: 20, unitPrice: null, subtotal: null,
      orderStatus: '待开单', customerStatus: '待确认', relatedOrder: '',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 150,  subtotal: 1500,  poNo: 'CG50555656', stock: 5,  poQty: 10, remaining: 10 },
        { code: 'T170-0602-00', name: 'Power Supply', k3Code: 'K3-A003', spec: '202.1/23/14.1/22',  price: 85,  subtotal: 1700, poNo: 'CG50555643', stock: 8,  poQty: 10, remaining: 10 },
      ]
    },
    {
      id: 3, time: '2026-04-23 09:45:03', type: '采购订单',
      poNo: 'CG50553661', serviceCenter: '美国服务中心', customer: '—',
      qty: 5, unitPrice: 1.50, subtotal: 7.50,
      orderStatus: '待确认', customerStatus: '已确认', relatedOrder: '',
      parts: [
        { code: 'T170-0601-00', name: 'CPU FAN',   k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 1.50, subtotal: 7.50, poNo: 'CG50555645', stock: 12, poQty: 5,  remaining: 5 },
      ]
    },
    {
      id: 4, time: '2026-04-23 09:45:03', type: '采购订单',
      poNo: 'CG50553660', serviceCenter: '美国服务中心', customer: 'uicc',
      qty: 21, unitPrice: null, subtotal: 150.05,
      orderStatus: '待发货', customerStatus: '已确认', relatedOrder: '',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 3.02, subtotal: 33.22, poNo: 'CG50555656', stock: 5,  poQty: 11, remaining: 11 },
        { code: 'T170-0601-00', name: 'CPU FAN',   k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 6.00, subtotal: 60.00, poNo: 'CG50555657', stock: 3,  poQty: 10, remaining: 10 },
      ]
    },
    {
      id: 5, time: '2026-04-23 09:45:05', type: '采购订单',
      poNo: 'CG50553659', serviceCenter: '美国服务中心', customer: 'Ivy',
      qty: 50, unitPrice: null, subtotal: null,
      orderStatus: '部分发货', customerStatus: '已确认', relatedOrder: '',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 12.50, subtotal: 375.00, poNo: 'CG50555656', stock: 5,  poQty: 30, remaining: 15 },
        { code: 'T170-0602-00', name: 'Power Supply', k3Code: 'K3-A003', spec: '202.1/23/14.1/22', price: 8.00,  subtotal: 160.00, poNo: 'CG50555643', stock: 8,  poQty: 20, remaining: 5 },
      ]
    },
    {
      id: 6, time: '2026-04-23 09:45:06', type: '采购订单',
      poNo: 'CG50553657', serviceCenter: '美国服务中心', customer: 'zhang',
      qty: 10, unitPrice: 1.50, subtotal: 15.00,
      orderStatus: '已发货', customerStatus: '已确认', relatedOrder: '20260505154522',
      parts: [
        { code: 'T170-0601-00', name: 'CPU FAN', k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 1.50, subtotal: 15.00, poNo: 'CG50555645', stock: 12, poQty: 10, remaining: 0 },
      ]
    },
    {
      id: 7, time: '2026-04-23 09:45:03', type: '采购订单',
      poNo: 'CG50553648', serviceCenter: '美国服务中心', customer: 'chenh',
      qty: 1, unitPrice: 2.00, subtotal: 2.00,
      orderStatus: '待入库', customerStatus: '已确认', relatedOrder: '20260505154521',
      parts: [
        { code: 'W121-0902-00', name: 'Computer', k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 2.00, subtotal: 2.00, poNo: 'CG50555656', stock: 5, poQty: 1, remaining: 0 },
      ]
    },
    {
      id: 8, time: '2026-04-23 09:45:03', type: '采购订单',
      poNo: 'CG50553625', serviceCenter: '美国服务中心', customer: 'Jones',
      qty: 5, unitPrice: 3.20, subtotal: 16.00,
      orderStatus: '部分入库', customerStatus: '已确认', relatedOrder: '20260505154514',
      parts: [
        { code: 'T170-0602-00', name: 'Power Supply', k3Code: 'K3-A003', spec: '202.1/23/14.1/22', price: 3.20, subtotal: 16.00, poNo: 'CG50555643', stock: 8, poQty: 5, remaining: 2 },
      ]
    },
    {
      id: 9, time: '2026-04-23 09:45:05', type: '采购订单',
      poNo: 'CG50553624', serviceCenter: '美国服务中心', customer: 'Cindy',
      qty: 6, unitPrice: 4.10, subtotal: 24.60,
      orderStatus: '已完成', customerStatus: '已确认', relatedOrder: '20260505154507',
      parts: [
        { code: 'W121-0902-00', name: 'Computer', k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 4.10, subtotal: 24.60, poNo: 'CG50555656', stock: 5, poQty: 6, remaining: 0 },
      ]
    },
    {
      id: 10, time: '2026-04-23 09:45:05', type: '采购订单',
      poNo: 'CG50553621', serviceCenter: '美国服务中心', customer: 'Amy',
      qty: 8, unitPrice: 1.80, subtotal: 14.40,
      orderStatus: '已关闭', customerStatus: '已确认', relatedOrder: '',
      parts: [
        { code: 'T170-0601-00', name: 'CPU FAN', k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 1.80, subtotal: 14.40, poNo: 'CG50555645', stock: 12, poQty: 8, remaining: 0 },
      ]
    },
    {
      id: 11, time: '2026-04-22 14:20:11', type: '采购订单',
      poNo: 'CG50553670', serviceCenter: '美国服务中心', customer: 'Robert',
      qty: 15, unitPrice: 12.00, subtotal: 180.00,
      orderStatus: '待开单', customerStatus: '已确认', relatedOrder: '',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 12.00, subtotal: 120.00, poNo: 'CG50555660', stock: 5, poQty: 10, remaining: 10 },
        { code: 'T170-0602-00', name: 'Power Supply', k3Code: 'K3-A003', spec: '202.1/23/14.1/22', price: 12.00, subtotal: 60.00, poNo: 'CG50555661', stock: 8, poQty: 5, remaining: 5 },
      ]
    },
    {
      id: 12, time: '2026-04-22 10:15:33', type: '采购订单',
      poNo: 'CG50553671', serviceCenter: '美国服务中心', customer: 'Maria',
      qty: 8, unitPrice: 25.00, subtotal: 200.00,
      orderStatus: '待开单', customerStatus: '已确认', relatedOrder: '',
      parts: [
        { code: 'T170-0601-00', name: 'CPU FAN', k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 25.00, subtotal: 200.00, poNo: 'CG50555662', stock: 3, poQty: 8, remaining: 8 },
      ]
    },
  ],

  /* —— 弹窗客户信息 —— */
  customerInfo: {
    name: 'uicc',
    contact: 'John Smith',
    phone: '+1 555-0123',
    email: 'john@uicc.com',
    address: '1234 Commerce Blvd, Los Angeles, CA 90001, USA',
  },

  /* —— 弹窗配件列表（默认展示） —— */
  modalParts: [
    { code: 'W121-0902-00', name: '205.4/24/24.0/05', k3Code: 'K3-A001', spec: '-', price: 19.51, subtotal: 19.51, poNo: 'CG50555656', stock: 1, poQty: 8, remaining: 8, shipQty: 1 },
    { code: 'T170-0601-00', name: '202.1/23/14.12/1',  k3Code: 'K3-A002', spec: '-', price: 0.28,  subtotal: 1.40,  poNo: 'CG50555645', stock: 5, poQty: 4, remaining: 2, shipQty: 1 },
    { code: 'T170-0602-00', name: '202.1/23/14.1/22',  k3Code: 'K3-A003', spec: '-', price: 0.13,  subtotal: 0.65,  poNo: 'CG50555643', stock: 6, poQty: 6, remaining: 5, shipQty: 1 },
  ],

  /* —— 方案二：待开单页面 — 按客户分组的配件列表 —— */
  s2Customers: [
    {
      customerName: '美国客户名称1',
      serviceCenter: '美国服务中心',
      parts: [
        { uid: 's2-1', code: 'W121-0902-00', nameCn: '直流电机',   nameEn: 'DC motor',      k3Code: '2.34.04.010101', spec: 'XJ-42F2-555 48#',  stock: 1,  poQty: 8,  remaining: 8, price: 19.51, subtotal: 156.08, poNo: 'CG30553656' },
        { uid: 's2-2', code: 'T170-0601-00', nameCn: '钓钩',       nameEn: 'Fishing hook',  k3Code: '2.34.04.010102', spec: 'XJ-42F2-555 36#',  stock: 63, poQty: 8,  remaining: 8, price: 12.00, subtotal: 96.00,  poNo: 'CG30553657' },
        { uid: 's2-3', code: 'W121-0902-00', nameCn: '直流电机',   nameEn: 'DC motor',      k3Code: '2.34.04.010103', spec: 'XJ-42F2-555 24#',  stock: 1,  poQty: 12, remaining: 12, price: 19.51, subtotal: 234.12, poNo: 'CG30553658' },
        { uid: 's2-4', code: 'T170-0602-00', nameCn: '电源模块',   nameEn: 'Power module',  k3Code: '2.34.04.010104', spec: 'XJ-42F2-555 12#',  stock: 5,  poQty: 4,  remaining: 4, price: 0.28,  subtotal: 1.12,   poNo: 'CG30553659' },
      ]
    },
    {
      customerName: '加拿大名称2',
      serviceCenter: '加拿大服务中心',
      parts: [
        { uid: 's2-5', code: 'T170-0602-00', nameCn: '散热风扇',   nameEn: 'Cooling fan',   k3Code: '2.34.04.010201', spec: 'XJ-42F2-556 48#',  stock: 6,  poQty: 6,  remaining: 5, price: 0.13,  subtotal: 0.65,   poNo: 'CG30553660' },
        { uid: 's2-6', code: 'W121-0902-00', nameCn: '直流电机',   nameEn: 'DC motor',      k3Code: '2.34.04.010202', spec: 'XJ-42F2-556 36#',  stock: 2,  poQty: 3,  remaining: 3, price: 19.51, subtotal: 58.53,  poNo: 'CG30553661' },
      ]
    },
    {
      customerName: '墨西哥客户3',
      serviceCenter: '墨西哥服务中心',
      parts: [
        { uid: 's2-7', code: 'T170-0601-00', nameCn: '钓钩',       nameEn: 'Fishing hook',  k3Code: '2.34.04.010301', spec: 'XJ-42F2-557 24#',  stock: 15, poQty: 10, remaining: 10, price: 12.00, subtotal: 120.00, poNo: 'CG30553662' },
        { uid: 's2-8', code: 'W121-0902-00', nameCn: '直流电机',   nameEn: 'DC motor',      k3Code: '2.34.04.010302', spec: 'XJ-42F2-557 12#',  stock: 0,  poQty: 5,  remaining: 5, price: 19.51, subtotal: 97.55,  poNo: 'CG30553663' },
      ]
    },
  ],
};
