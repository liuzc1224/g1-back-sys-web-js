import Main from '@/components/main'
import parentView from '@/components/parent-view'


export default [
  {
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
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },

  {
    path: '/operation-center',
    name: 'operation-center',
    meta: {
      icon: 'md-cloud-upload',
      title: '运营中心'
    },
    component: Main,
    children: [
      {
        path: 'message-push',
        name: 'message-push',
        meta: {
          icon: 'ios-document',
          title: '消息中心管理'
        },
        component: () => import('@/view/operation-center/message-push.vue')
      },
      {
        path: 'productConfiguration',
        name: 'productConfiguration',
        meta: {
          icon: 'md-clipboard',
          title: '产品配置'
        },
        component: () => import('@/view/operation-center/productConfiguration.vue')
      },
      {
        path: 'bannerConfiguration',
        name: 'bannerConfiguration',
        meta: {
        icon: 'md-clipboard',
          title: 'banner配置'
        },
        component: () => import('@/view/operation-center/bannerConfiguration.vue')
      },
      {
        path: 'help-center',
        name: 'help-center',
        meta: {
          icon: 'md-clipboard',
          title: '帮助中心管理'
        },
        component: () => import('@/view/operation-center/help-center.vue')
      },
      {
        path: 'feedback-record',
        name: 'feedback-record',
        meta: {
          icon: 'md-clipboard',
          title: '产品反馈记录'
        },
        component: () => import('@/view/operation-center/feedback-record.vue')
      }
    ]
  },
  {
    path: '/data-center-page',
    name: 'data-center-page',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据中心',
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'data-center',
        name: 'data-center',
        meta: {
          icon: 'ios-document',
          title: '数据中心'
        },
        component: () => import('@/view/data-center/data-center.vue')
      }
    ]
  },
  {
    path: '/product-center',
    name: 'product-center',
    meta: {
      icon: 'ios-card',
      title: 'product-center'
    },
    component: Main,
    children: [
      {
        path: 'card-manage',
        name: 'card-manage',
        meta: {
          icon: 'ios-card',
          title: 'card-manage'
        },
        component: () => import('@/view/product-center/card-manage')
      },{
        path: 'card-record-list',
        name: 'card-record-list',
        meta: {
          icon: 'ios-list',
          title: 'card-record-list'
        },
        component: () => import('@/view/product-center/card-record-list')
      },{
        path: 'account-list',
        name: 'account-list',
        meta: {
          icon: 'logo-buffer',
          title: 'account-manage'
        },
        component: () => import('@/view/product-center/account-list')
      },{
        path: 'credit-record',
        name: 'credit-record',
        meta: {
          icon: 'logo-buffer',
          title: 'credit-record'
        },
        component: () => import('@/view/product-center/credit-record')
      }
    ]
  },
  {
    path: '/user-manage',
    name: 'user-manage',
    meta: {
      icon: 'md-cloud-upload',
      title: '用户管理'
    },
    component: Main,
    children: [
      {
        path: '/user-list',
        name: 'user-list',
        meta: {
          icon: 'ios-document',
          title: '用户列表'
        },
        component: () => import('@/view/user-manage/user-list')
      },{
        path: '/user-detail',
        name: 'user-detail',
        meta: {
          icon: 'ios-document',
          title: '用户详情',
          hideInMenu:true
        },
        component: () => import('@/view/user-manage/user-detail')
      },{
        path: '/invite-record',
        name: 'invite-record',
        meta: {
          icon: 'ios-document',
          title: '邀请记录'
        },
        component: () => import('@/view/user-manage/invite-record')
      }
    ]
  },
  {
    path: '/setup',
    name: 'setup',
    meta: {
      icon: 'md-cloud-upload',
      title: '设置'
    },
    component: Main,
    children: [
      {
        path: 'permission',
        name: 'permission',
        meta: {
          icon: 'ios-document',
          title: '管理员权限'
        },
        component: () => import('@/view/setup/permission.vue')
      },
      {
        path: 'role-page',
        name: 'role-page',
        meta: {
          icon: 'ios-document',
          title: '角色设置'
        },
        component: () => import('@/view/setup/role.vue')
      },
      {
        path: 'tree-page',
        name: 'tree-page',
        meta: {
          icon: 'ios-document',
          title: '菜单设置'
        },
        component: () => import('@/view/setup/tree.vue')
      },
      {
        path: 'department-page',
        name: 'department-page',
        meta: {
          icon: 'ios-document',
          title: '菜单设置'
        },
        component: () => import('@/view/setup/department.vue')
      }
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'i18n_page',
        name: 'i18n_page',
        meta: {
          icon: 'md-planet',
          title: 'i18n - {{ i18n_page }}'
        },
        component: () => import('@/view/i18n/i18n-page.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
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

