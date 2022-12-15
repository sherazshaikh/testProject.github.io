import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import state from "./module-example/state";
import mutations from "./module-example/mutations";
import actions from "./module-example/actions";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function () {
  const Store = createStore({
    modules: {},
    state: {
      token: "",
      user: {},
      loginErrors: "",
      signInLoader: false,
      userAuthenticated: false,
      isLoginClicked: false,
      showDrawer: true,
      userGroup: "",
      userId: "",
      userName: "",
      userMenus: [],
      menu: {},
      menuNamesForId: "",
      displayHome: false,
      userCoreData: {},
      meunStored: false,
      logoutModal: false,
      globalYear: "",
      globalPeriod: "",
      userBackPeriods: {},
      darkMode: false,
      url: null,
      userAccessType: [],
      itemList: [],
      customerList: [],
      screenShotModal: false,
      YearForDDL: [],
      menuObj: {},
      menuIds: {},
      userWiseRights: {},
      changePasswordModal: false,
      userList: [],
    },
    mutations: {
      ...mutations,
    },
    actions: {
      ...actions,
    },
    getters: {
      url(state) {
        return state.url;
      },
      userAuthenticated(state) {
        return state.userAuthenticated;
      },
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
