/**
 * Mock Data — 世宇海外售后系统 · 拆单方案一 & 方案二
 * 单一数据源，所有页面从此读取
 */

const DB = {
  /* —— 状态标签页 —— */
  statusTabs: [
    { key: 'all',                label: '全部',       count: 12 },
    { key: 'not_submitted',      label: '待提交',     count: 2  },
    { key: 'pending_approval',   label: '待审批',     count: 1  },
    { key: 'pending_customer',   label: '待客户确认', count: 1  },
    { key: 'pending',            label: '待开单',     count: 3  },
    { key: 'pending_ship',       label: '待发货',     count: 2  },
    { key: 'shipped',            label: '已发货',     count: 1  },
    { key: 'pending_in',         label: '待入库',     count: 1  },
  ],

  /* —— 销售订单列表（含配件明细） —— */
  orders: [
    {
      id: 1, time: '2026-04-23 09:45:03', type: '采购订单',
      poNo: 'CG50553665', serviceCenter: '美国服务中心', customer: 'uicc',
      salesperson: 'Jennifer', mallOrderNo: '', logisticsNo: '', repairNo: 'AS20260423001',
      qty: 10, unitPrice: 1500, subtotal: 4500.00,
      orderStatus: '客户未提交', customerStatus: '未提交',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 150,  subtotal: 1500, poNo: 'CG50555656', stock: 5,  poQty: 10, remaining: 10, partStatus: '客户未提交', logisticsNo: '' },
        { code: 'T170-0601-00', name: 'CPU FAN',   k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 300, subtotal: 3000, poNo: 'CG50555657', stock: 3,  poQty: 10, remaining: 10, partStatus: '客户未提交', logisticsNo: '' },
      ]
    },
    {
      id: 2, time: '2026-04-23 09:45:05', type: '采购订单',
      poNo: 'CG50553662', serviceCenter: '美国服务中心', customer: 'Amy',
      salesperson: 'David', mallOrderNo: '', logisticsNo: '', repairNo: 'AS20260423002',
      qty: 20, unitPrice: null, subtotal: null,
      orderStatus: '待开单', customerStatus: '待确认',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 150,  subtotal: 1500,  poNo: 'CG50555656', stock: 5,  poQty: 10, remaining: 10, partStatus: '待开单', logisticsNo: '' },
        { code: 'T170-0602-00', name: 'Power Supply', k3Code: 'K3-A003', spec: '202.1/23/14.1/22',  price: 85,  subtotal: 1700, poNo: 'CG50555643', stock: 8,  poQty: 10, remaining: 10, partStatus: '待开单', logisticsNo: '' },
      ]
    },
    {
      id: 3, time: '2026-04-23 09:45:03', type: '采购订单',
      poNo: 'CG50553661', serviceCenter: '美国服务中心', customer: '—',
      salesperson: 'Lisa', mallOrderNo: '', logisticsNo: '', repairNo: '',
      qty: 5, unitPrice: 1.50, subtotal: 7.50,
      orderStatus: '待审批', customerStatus: '已确认',
      parts: [
        { code: 'T170-0601-00', name: 'CPU FAN',   k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 1.50, subtotal: 7.50, poNo: 'CG50555645', stock: 12, poQty: 5,  remaining: 5, partStatus: '待审批', logisticsNo: '' },
      ]
    },
    {
      id: 4, time: '2026-04-23 09:45:03', type: '采购订单',
      poNo: 'CG50553660', serviceCenter: '美国服务中心', customer: 'uicc',
      salesperson: 'Jennifer', mallOrderNo: 'SY202604230001', logisticsNo: 'FedEx88776655', repairNo: 'AS20260422008',
      qty: 21, unitPrice: null, subtotal: 150.05,
      orderStatus: '待发货', customerStatus: '已确认',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 3.02, subtotal: 33.22, poNo: 'CG50555656', stock: 5,  poQty: 11, remaining: 11, partStatus: '待发货', logisticsNo: 'FedEx88776655' },
        { code: 'T170-0601-00', name: 'CPU FAN',   k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 6.00, subtotal: 60.00, poNo: 'CG50555657', stock: 3,  poQty: 10, remaining: 10, partStatus: '待发货', logisticsNo: 'FedEx88776655' },
      ]
    },
    {
      id: 5, time: '2026-04-23 09:45:05', type: '采购订单',
      poNo: 'CG50553659', serviceCenter: '美国服务中心', customer: 'Ivy',
      salesperson: 'David', mallOrderNo: 'SY202604220015', logisticsNo: 'DHL12345678', repairNo: 'AS20260420003',
      qty: 50, unitPrice: null, subtotal: null,
      orderStatus: '部分发货', customerStatus: '已确认',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 12.50, subtotal: 375.00, poNo: 'CG50555656', stock: 5,  poQty: 30, remaining: 15, partStatus: '部分发货', logisticsNo: 'DHL12345678' },
        { code: 'T170-0602-00', name: 'Power Supply', k3Code: 'K3-A003', spec: '202.1/23/14.1/22', price: 8.00,  subtotal: 160.00, poNo: 'CG50555643', stock: 8,  poQty: 20, remaining: 5, partStatus: '待发货', logisticsNo: '' },
      ]
    },
    {
      id: 6, time: '2026-04-23 09:45:06', type: '采购订单',
      poNo: 'CG50553657', serviceCenter: '美国服务中心', customer: 'zhang',
      salesperson: 'Lisa', mallOrderNo: 'SY202604200008', logisticsNo: 'UPS99887766', repairNo: 'AS20260418005',
      qty: 10, unitPrice: 1.50, subtotal: 15.00,
      orderStatus: '已发货', customerStatus: '已确认',
      parts: [
        { code: 'T170-0601-00', name: 'CPU FAN', k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 1.50, subtotal: 15.00, poNo: 'CG50555645', stock: 12, poQty: 10, remaining: 0, partStatus: '已发货', logisticsNo: 'UPS99887766' },
      ]
    },
    {
      id: 7, time: '2026-04-23 09:45:03', type: '采购订单',
      poNo: 'CG50553648', serviceCenter: '美国服务中心', customer: 'chenh',
      salesperson: 'Jennifer', mallOrderNo: 'SY202604180003', logisticsNo: 'FedEx11223344', repairNo: 'AS20260415002',
      qty: 1, unitPrice: 2.00, subtotal: 2.00,
      orderStatus: '待入库', customerStatus: '已确认',
      parts: [
        { code: 'W121-0902-00', name: 'Computer', k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 2.00, subtotal: 2.00, poNo: 'CG50555656', stock: 5, poQty: 1, remaining: 0, partStatus: '已发货', logisticsNo: 'FedEx11223344' },
      ]
    },
    {
      id: 8, time: '2026-04-23 09:45:03', type: '采购订单',
      poNo: 'CG50553625', serviceCenter: '美国服务中心', customer: 'Jones',
      salesperson: 'David', mallOrderNo: 'SY202604150011', logisticsNo: 'DHL55667788', repairNo: 'AS20260412001',
      qty: 5, unitPrice: 3.20, subtotal: 16.00,
      orderStatus: '部分入库', customerStatus: '已确认',
      parts: [
        { code: 'T170-0602-00', name: 'Power Supply', k3Code: 'K3-A003', spec: '202.1/23/14.1/22', price: 3.20, subtotal: 16.00, poNo: 'CG50555643', stock: 8, poQty: 5, remaining: 2, partStatus: '部分发货', logisticsNo: 'DHL55667788' },
      ]
    },
    {
      id: 9, time: '2026-04-23 09:45:05', type: '采购订单',
      poNo: 'CG50553624', serviceCenter: '美国服务中心', customer: 'Cindy',
      salesperson: 'Lisa', mallOrderNo: 'SY202604100005', logisticsNo: 'UPS33445566', repairNo: 'AS20260408007',
      qty: 6, unitPrice: 4.10, subtotal: 24.60,
      orderStatus: '已完成', customerStatus: '已确认',
      parts: [
        { code: 'W121-0902-00', name: 'Computer', k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 4.10, subtotal: 24.60, poNo: 'CG50555656', stock: 5, poQty: 6, remaining: 0, partStatus: '已完成', logisticsNo: 'UPS33445566' },
      ]
    },
    {
      id: 10, time: '2026-04-23 09:45:05', type: '采购订单',
      poNo: 'CG50553621', serviceCenter: '美国服务中心', customer: 'Amy',
      salesperson: 'Jennifer', mallOrderNo: '', logisticsNo: '', repairNo: 'AS20260405002',
      qty: 8, unitPrice: 1.80, subtotal: 14.40,
      orderStatus: '已关闭', customerStatus: '已确认',
      parts: [
        { code: 'T170-0601-00', name: 'CPU FAN', k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 1.80, subtotal: 14.40, poNo: 'CG50555645', stock: 12, poQty: 8, remaining: 0, partStatus: '已关闭', logisticsNo: '' },
      ]
    },
    {
      id: 11, time: '2026-04-22 14:20:11', type: '采购订单',
      poNo: 'CG50553670', serviceCenter: '美国服务中心', customer: 'Robert',
      salesperson: 'David', mallOrderNo: '', logisticsNo: '', repairNo: 'AS20260422001',
      qty: 15, unitPrice: 12.00, subtotal: 180.00,
      orderStatus: '待客户确认', customerStatus: '待确认',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 12.00, subtotal: 120.00, poNo: 'CG50555660', stock: 5, poQty: 10, remaining: 10, partStatus: '待客户确认', logisticsNo: '' },
        { code: 'T170-0602-00', name: 'Power Supply', k3Code: 'K3-A003', spec: '202.1/23/14.1/22', price: 12.00, subtotal: 60.00, poNo: 'CG50555661', stock: 8, poQty: 5, remaining: 5, partStatus: '待客户确认', logisticsNo: '' },
      ]
    },
    {
      id: 12, time: '2026-04-22 10:15:33', type: '采购订单',
      poNo: 'CG50553671', serviceCenter: '美国服务中心', customer: 'Maria',
      salesperson: 'Lisa', mallOrderNo: '', logisticsNo: '', repairNo: '',
      qty: 8, unitPrice: 25.00, subtotal: 200.00,
      orderStatus: '待开单', customerStatus: '已确认',
      parts: [
        { code: 'T170-0601-00', name: 'CPU FAN', k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 25.00, subtotal: 200.00, poNo: 'CG50555662', stock: 3, poQty: 8, remaining: 8, partStatus: '待开单', logisticsNo: '' },
      ]
    },
  ],

  /* —— 世宇订单列表（原发货单） —— */
  mallOrders: [
    {
      id: 1, orderType: '配件销售', orderNo: 'SY202604230001', customer: 'uicc', receiver: 'John Smith',
      isWarranty: '否', totalAmount: 93.22, payableAmount: 93.22, paidAmount: 0,
      payStatus: '未支付', orderStatus: '待发货', customerType: '普通用户', invoiceInfo: '不需要',
      oaStatus: '已审批', outboundStatus: '待出库', outboundNo: '',
      shippingInfo: 'FedEx / 到付', salesperson: 'Jennifer',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 3.02, qty: 11, subtotal: 33.22 },
        { code: 'T170-0601-00', name: 'CPU FAN',   k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 6.00, qty: 10, subtotal: 60.00 },
      ],
    },
    {
      id: 2, orderType: '配件销售', orderNo: 'SY202604220015', customer: 'Ivy', receiver: 'Ivy Chen',
      isWarranty: '是', totalAmount: 535.00, payableAmount: 535.00, paidAmount: 535.00,
      payStatus: '已支付', orderStatus: '部分发货', customerType: 'VIP用户', invoiceInfo: '个人',
      oaStatus: '已审批', outboundStatus: '部分出库', outboundNo: 'CK20260422008',
      shippingInfo: 'DHL / 预付', salesperson: 'David',
      parts: [
        { code: 'W121-0902-00', name: 'Computer',  k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 12.50, qty: 30, subtotal: 375.00 },
        { code: 'T170-0602-00', name: 'Power Supply', k3Code: 'K3-A003', spec: '202.1/23/14.1/22', price: 8.00, qty: 20, subtotal: 160.00 },
      ],
    },
    {
      id: 3, orderType: '配件销售', orderNo: 'SY202604200008', customer: 'zhang', receiver: 'Wei Zhang',
      isWarranty: '否', totalAmount: 15.00, payableAmount: 15.00, paidAmount: 15.00,
      payStatus: '已支付', orderStatus: '已发货', customerType: '普通用户', invoiceInfo: '不需要',
      oaStatus: '已审批', outboundStatus: '已出库', outboundNo: 'CK20260420005',
      shippingInfo: 'UPS / 预付', salesperson: 'Lisa',
      parts: [
        { code: 'T170-0601-00', name: 'CPU FAN', k3Code: 'K3-A002', spec: '202.1/23/14.12/1', price: 1.50, qty: 10, subtotal: 15.00 },
      ],
    },
    {
      id: 4, orderType: '配件销售', orderNo: 'SY202604180003', customer: 'chenh', receiver: 'Hao Chen',
      isWarranty: '是', totalAmount: 2.00, payableAmount: 2.00, paidAmount: 2.00,
      payStatus: '已支付', orderStatus: '已发货', customerType: '经销商', invoiceInfo: '公司',
      oaStatus: '已审批', outboundStatus: '已出库', outboundNo: 'CK20260418002',
      shippingInfo: 'FedEx / 到付', salesperson: 'Jennifer',
      parts: [
        { code: 'W121-0902-00', name: 'Computer', k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 2.00, qty: 1, subtotal: 2.00 },
      ],
    },
    {
      id: 5, orderType: '配件销售', orderNo: 'SY202604150011', customer: 'Jones', receiver: 'Mike Jones',
      isWarranty: '否', totalAmount: 16.00, payableAmount: 16.00, paidAmount: 16.00,
      payStatus: '已支付', orderStatus: '部分发货', customerType: '普通用户', invoiceInfo: '不需要',
      oaStatus: '已审批', outboundStatus: '部分出库', outboundNo: 'CK20260415006',
      shippingInfo: 'DHL / 预付', salesperson: 'David',
      parts: [
        { code: 'T170-0602-00', name: 'Power Supply', k3Code: 'K3-A003', spec: '202.1/23/14.1/22', price: 3.20, qty: 5, subtotal: 16.00 },
      ],
    },
    {
      id: 6, orderType: '配件销售', orderNo: 'SY202604100005', customer: 'Cindy', receiver: 'Cindy Liu',
      isWarranty: '否', totalAmount: 24.60, payableAmount: 24.60, paidAmount: 24.60,
      payStatus: '已支付', orderStatus: '已完成', customerType: 'VIP用户', invoiceInfo: '个人',
      oaStatus: '已审批', outboundStatus: '已出库', outboundNo: 'CK20260410003',
      shippingInfo: 'UPS / 预付', salesperson: 'Lisa',
      parts: [
        { code: 'W121-0902-00', name: 'Computer', k3Code: 'K3-A001', spec: '205.4/24/24.0/05', price: 4.10, qty: 6, subtotal: 24.60 },
      ],
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

  /* —— 方案二：待开单页面 — 按客户分组的配件列表 —— */
  s2Customers: [
    {
      customerName: '美国客户名称1',
      serviceCenter: '美国服务中心',
      parts: [
        { uid: 's2-1', code: 'W121-0902-00', nameCn: '直流电机',   nameEn: 'DC motor',      k3Code: '2.34.04.010101', spec: 'XJ-42F2-555 48#',  stock: 1,  poQty: 8,  remaining: 8, price: 19.51, subtotal: 156.08, poNo: 'CG30553656', partStatus: '待开单', logisticsNo: '' },
        { uid: 's2-2', code: 'T170-0601-00', nameCn: '钓钩',       nameEn: 'Fishing hook',  k3Code: '2.34.04.010102', spec: 'XJ-42F2-555 36#',  stock: 63, poQty: 8,  remaining: 8, price: 12.00, subtotal: 96.00,  poNo: 'CG30553657', partStatus: '待开单', logisticsNo: '' },
        { uid: 's2-3', code: 'W121-0902-00', nameCn: '直流电机',   nameEn: 'DC motor',      k3Code: '2.34.04.010103', spec: 'XJ-42F2-555 24#',  stock: 1,  poQty: 12, remaining: 12, price: 19.51, subtotal: 234.12, poNo: 'CG30553658', partStatus: '待开单', logisticsNo: '' },
        { uid: 's2-4', code: 'T170-0602-00', nameCn: '电源模块',   nameEn: 'Power module',  k3Code: '2.34.04.010104', spec: 'XJ-42F2-555 12#',  stock: 5,  poQty: 4,  remaining: 4, price: 0.28,  subtotal: 1.12,   poNo: 'CG30553659', partStatus: '待开单', logisticsNo: '' },
      ]
    },
    {
      customerName: '加拿大名称2',
      serviceCenter: '加拿大服务中心',
      parts: [
        { uid: 's2-5', code: 'T170-0602-00', nameCn: '散热风扇',   nameEn: 'Cooling fan',   k3Code: '2.34.04.010201', spec: 'XJ-42F2-556 48#',  stock: 6,  poQty: 6,  remaining: 5, price: 0.13,  subtotal: 0.65,   poNo: 'CG30553660', partStatus: '待开单', logisticsNo: '' },
        { uid: 's2-6', code: 'W121-0902-00', nameCn: '直流电机',   nameEn: 'DC motor',      k3Code: '2.34.04.010202', spec: 'XJ-42F2-556 36#',  stock: 2,  poQty: 3,  remaining: 3, price: 19.51, subtotal: 58.53,  poNo: 'CG30553661', partStatus: '待开单', logisticsNo: '' },
      ]
    },
    {
      customerName: '墨西哥客户3',
      serviceCenter: '墨西哥服务中心',
      parts: [
        { uid: 's2-7', code: 'T170-0601-00', nameCn: '钓钩',       nameEn: 'Fishing hook',  k3Code: '2.34.04.010301', spec: 'XJ-42F2-557 24#',  stock: 15, poQty: 10, remaining: 10, price: 12.00, subtotal: 120.00, poNo: 'CG30553662', partStatus: '待开单', logisticsNo: '' },
        { uid: 's2-8', code: 'W121-0902-00', nameCn: '直流电机',   nameEn: 'DC motor',      k3Code: '2.34.04.010302', spec: 'XJ-42F2-557 12#',  stock: 0,  poQty: 5,  remaining: 5, price: 19.51, subtotal: 97.55,  poNo: 'CG30553663', partStatus: '待开单', logisticsNo: '' },
      ]
    },
  ],

  /* —— 采购流程步骤 —— */
  workflowSteps: [
    {
      key: 'submit',
      label: '服务中心提交',
      desc: '服务中心未提交，可确认提交',
      icon: 'clipboard-list',
      status: 'done',
    },
    {
      key: 'initiate',
      label: '服务中心发起订单',
      desc: '服务中心发起采购订单',
      icon: 'send',
      status: 'done',
    },
    {
      key: 'approve',
      label: '海外售后审批',
      desc: '可修改单价、订单数量、更换商品',
      icon: 'clipboard-check',
      status: 'active',
    },
    {
      key: 'confirm',
      label: '服务中心确认',
      desc: '查看价格，确认或取消订单',
      icon: 'check-circle',
      status: 'pending',
    },
    {
      key: 'split',
      label: '海外售后拆单',
      desc: '判断是否需拆单，勾选配件生成商城订单',
      icon: 'git-branch',
      status: 'pending',
    },
    {
      key: 'generate',
      label: '生成商城订单',
      desc: '推送世宇商城平台',
      icon: 'shopping-bag',
      status: 'pending',
    },
    {
      key: 'ship',
      label: '发货状态返回',
      desc: '返回发货等状态到对应单据',
      icon: 'truck',
      status: 'pending',
    },
  ],

  /* —— 订单详情数据（详情弹窗使用） —— */
  orderDetail: {
    poNo: 'CG31454921',
    orderTime: '2026-08-21 09:18:48',
    payStatus: '未支付',
    payTime: '-',
    orderStatus: '处理中',
    // 收货信息
    receiver: '欧洲公司',
    contact: 'jingqinzhong',
    phone: '13532744359',
    email: '809762341@qq.com',
    address: 'United States CA 90027 4523 Oakwood Avenue, Los Angeles',
    buyerRemark: 'after-sale purchase order created for after-sale request AS80878856992',
    // 物流信息
    logisticsStatus: '-',
    logisticsCompany: '-',
    logisticsNo: '-',
    shipTime: '-',
    // 供应商信息
    supplier: '世宇科技',
    supplierContact: 'cindy',
    supplierPhone: '18688030720',
    supplierEmail: 'cinty@unis.com',
    // 统计
    productSubtotal: 0,
    estimatedFreight: 0,
    orderTotal: 0,
    amountUsd: 0,
    quantity: 1,
    subtotal: 0,
    // 配件列表
    parts: [
      { code: '2.11.07.170012', nameEn: 'POWER SUPPLY FOR A4-6300', k3Code: '2.11.07.170012', spec: 'LITEON300W', price: 0, qty: 1, subtotal: 0, remark: '' },
    ],
  },
};
