import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () => import('@/view/login/login.vue')
},
{
  path: '/',
  name: '_home',
  redirect: '/home',
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true
  },
  children: [{
    path: '/home',
    name: 'home',
    meta: {
      hideInMenu: true,
      title: '首页',
      notCache: true,
      icon: 'md-home'
    },
    component: () => import('@/view/single-page/home')
  }]
},
{
  path: '/argu',
  name: 'argu',
  meta: {
    hideInMenu: true
  },
  component: Main,
  children: [{
    path: 'params/:id',
    name: 'params',
    meta: {
      icon: 'md-flower',
      title: route => `{{ params }}-${route.params.id}`,
      notCache: true,
      beforeCloseName: 'before_close_normal'
    },
    component: () => import('@/view/argu-page/params.vue')
  },
  {
    path: 'query',
    name: 'query',
    meta: {
      icon: 'md-flower',
      title: route => `{{ query }}-${route.query.id}`,
      notCache: true
    },
    component: () => import('@/view/argu-page/query.vue')
  }
  ]
},
{
  path: '/system',
  name: 'system',
  meta: {
    icon: 'ios-stats',
    title: '系统管理'
  },
  component: Main,
  children: [{
    path: '/user',
    name: 'user',
    meta: {
      icon: 'md-flower',
      title: `用户管理`,
      access: ['user'],
      notCache: true
    },
    component: () => import('@/view/system/user/user-index.vue')
  },
  {
    path: '/role',
    name: 'role',
    meta: {
      icon: 'md-flower',
      title: '角色管理',
      access: ['role'],
      notCache: true
    },
    component: () => import('@/view/system/role/role.vue')
  },
  {
    path: '/permission',
    name: 'permission',
    meta: {
      icon: 'md-flower',
      title: `权限管理`,
      access: ['permission'],
      notCache: true
    },
    component: () => import('@/view/system/permission/permission.vue')
  },
  {
    path: '/config',
    name: 'config',
    meta: {
      icon: 'md-flower',
      title: `配置管理`,
      access: ['config'],
      notCache: true
    },
    component: () => import('@/view/system/config/config.vue')
  },
  {
    path: '/labelFormat',
    name: 'labelFormat',
    meta: {
      icon: 'md-flower',
      title: '标签管理',
      access: ['labelFormat'],
      notCache: true
    },
    component: () => import('@/view/uma/labelFormat/labelFormat.vue')
  },
  {
    path: '/deviceManager',
    name: 'deviceManager',
    meta: {
      icon: 'md-flower',
      title: '设备管理',
      // access: ['labelFormat'],
      notCache: true
    },
    component: () => import('@/view/system/deviceManager/device.vue')
  }
  ]
},
{
  path: '/uma',
  name: 'uma',
  meta: {
    icon: 'ios-stats',
    title: '生产管理'
  },
  component: Main,
  children: [{
    path: '/customer',
    name: 'customer',
    meta: {
      icon: 'md-flower',
      title: '客户管理',
      access: ['customer'],
      notCache: true
    },
    component: () => import('@/view/uma/customer/customer.vue')
  },
    // {
    //   path: '/customerContact',
    //   name: '客户联系人',
    //   meta: {
    //     icon: 'md-flower',
    //     title: '客户联系人',
    //     notCache: true
    //   },
    //   component: () => import('@/view/uma/customerContact/customerContact.vue')
    // },
  {
    path: '/deliveryNote',
    name: 'deliveryNote',
    meta: {
      icon: 'md-flower',
      title: '送货单',
      access: ['deliveryNote'],
      notCache: true
    },
    component: () => import('@/view/uma/deliveryNote/deliveryNote.vue')
  },
    // {
    //   path: '/product',
    //   name: 'product',
    //   meta: {
    //     icon: 'md-flower',
    //     title: '产品管理',
    //     // access: ['product'],
    //     notCache: true
    //   },
    //   component: () => import('@/view/uma/product/product.vue')
    // },
  {
    path: '/product',
    name: 'product',
    meta: {
      icon: 'md-flower',
      title: '编号管理',
      access: ['product'],
      notCache: true
    },
    component: () => import('@/view/uma/yjProduct/yjProduct.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      icon: 'md-flower',
      title: '订单',
      access: ['order'],
      notCache: false
    },
    component: () => import('@/view/uma/yjOrder/yjOrder.vue')
  },
  {
    path: '/labelRecord',
    name: 'labelRecord',
    meta: {
      icon: 'md-flower',
      title: '标签记录',
      access: ['labelRecord'],
      notCache: true
    },
    component: () => import('@/view/uma/labelRecord/labelRecord.vue')
  },
  {
    path: '/viewYjStock',
    name: 'viewYjStock',
    meta: {
      icon: 'md-flower',
      title: '库存记录',
      // access: ['viewYjStock'],
      notCache: true
    },
    component: () => import('@/view/uma/viewYjStock/viewYjStock.vue')
  }
  ]
}, {
  path: '/lookboard',
  name: 'LookBoard',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/uma/ViewLookBoard/ViewLookBoardIndex.vue')
},
{
  path: '/401',
  name: 'error_401',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/401.vue')
},
{
  path: '/500',
  name: 'error_500',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/500.vue')
},
{
  path: '*',
  name: 'error_404',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/404.vue')
}
]
