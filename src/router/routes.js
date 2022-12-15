import store from "../store";
import home from "../layouts/MainLayout.vue";
import login from "../pages/SignIn/SignIn.vue";

var Store = store();

console.log(
  "this.$store.state.userAuthenticated",
  Store.getters.userAuthenticated
);
const routes = [
  {
    path: "/login",
    component: login,
    // beforeEnter: (to, from, next) => {
    //   if (Store.getters.userAuthenticated === true) {
    //     next({ path: "/dashboard" });
    //   } else next();
    // },
  },
  {
    path: "/",
    component: home,
    // beforeEnter: (to, from, next) => {
    //   if (Store.getters.userAuthenticated === false) {
    //     next({ path: "/login" });
    //   } else next();
    // },
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/discountDoc/record/:key",
        component: () => import("pages/Discount/discountDoc.vue"),
      },
      {
        path: ":catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: "/:catchAll(.*)*",
  //   component: () => import("pages/ErrorNotFound.vue"),
  // },
];

export default routes;
