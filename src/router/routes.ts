export const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("../layout/index.vue"),
    meta: {
      title: "",
      hidden: false,
      icon: "User",
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "House",
        },
      },
    ],
  },
  {
    path: "/screen",
    name: "Screen",
    component: () => import("../views/screen/index.vue"),
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "Monitor",
    },
  },
  {
    path: "/acl",
    name: "Acl",
    component: () => import("../layout/index.vue"),
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        component: () => import("../views/acl/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        component: () => import("../views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "Avatar",
        },
      },
      {
        path: "/acl/permission",
        component: () => import("../views/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "List",
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("../layout/index.vue"),
    name: "Product",
    meta: {
      title: "商品管理",
      hidden: false,
      icon: "Goods",
    },
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        component: () => import("../views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          icon: "ShoppingCart",
          hidden: false,
        },
      },
      {
        path: "/product/attr",
        component: () => import("../views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          title: "属性管理",
          icon: "Management",
          hidden: false,
        },
      },
      {
        path: "/product/spu",
        component: () => import("../views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "Spu",
          icon: "SetUp",
          hidden: false,
        },
      },
      {
        path: "/product/sku",
        component: () => import("../views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "Sku",
          icon: "ScaleToOriginal",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404/index.vue"),
    meta: {
      title: "404",
      hidden: true,
      icon: "CloseBold",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "anyPage",
    meta: {
      title: "任意理由",
      hidden: true,
      icon: "SemiSelect",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
      icon: "Position",
    },
  },
];
