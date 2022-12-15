// import route from "../../router/index";
// import routes from "../../router/routes";
import { Loading, QSpinnerBars, QSpinnerOval } from "quasar";

// const router = route();

function emptyStore(state) {
  state.userGroup = "";
  state.userId = "";
  state.userName = "";
  state.userMenus = [];
  state.userPeriod = "";
  state.userYear = "";
  state.globalPeriod = "";
  state.globalYear = "";
  state.userCoreData = {};
  state.menuIds = {};
  state.userMenus = [];
  state.userPeriodCodeMonth = {};
  state.userPeriodNameList = [];
  state.userDepartmentList = [];
  state.userDepartmentDescCode = {};
  state.userBackPeriods = {};
  state.documentDate = "";
  state.displayHome = false;
  (state.menu = {}),
    (state.userAccessType = []),
    (state.itemList = []),
    (state.customerList = []),
    (state.YearForDDL = []),
    (state.userWiseRights = {}),
    (state.userList = []);
}
export default {
  setUrl(state, data) {
    state.url = data;
    console.log("url", data);
  },
  setUserWiseRights(state, data) {
    state.userWiseRights = data;
  },

  setYearForDDL(state, data) {
    state.YearForDDL = data;
    // console.log("YearForDDL", state.YearForDDL.length)
  },
  // navigation drawer on right
  showDrawer(state) {
    state.showDrawer = !state.showDrawer;
  },
  // setting user data
  loginUser(state, data) {
    try {
      emptyStore(state);

      state.userAuthenticated = true;
      state.userGroup = data.userGroup;
      state.userId = data.userId;
      state.userName = data.userName;
      state.userPeriod = data.userPeriod;
      state.userYear = data.userYear;
      state.menuIds = {};
      state.documentDate = data.documentDate;

      const PATH = this.$router.options.history.back;
      console.log(PATH);

      if (data.routeToLogin) {
        if (false) {
          console.log("Redirect");
          this.$router
            .push(PATH)
            .then(() => {
              // Loading.show({
              //   spinner: QSpinnerBars,
              //   spinnerColor: "primary",
              //   spinnerSize: 100,
              //   message: "Loading...",
              //   messageColor: "white",
              // });
            })
            .catch((err) => console.log(err));
        } else if (PATH === null) {
          console.log("Redirect");
          this.$router
            .push("/dashboard")
            .then(() => {
              // Loading.show({
              //   spinner: QSpinnerBars,
              //   spinnerColor: "primary",
              //   spinnerSize: 100,
              //   message: "Loading...",
              //   messageColor: "white",
              // });
            })
            .catch((err) => console.log(err));
        } else {
          console.log("NO Redirect");
          this.$router
            .push("/")
            .then(() => {
              // Loading.show({
              //   spinner: QSpinnerBars,
              //   spinnerColor: "primary",
              //   spinnerSize: 100,
              //   message: "Loading...",
              //   messageColor: "white",
              // });
            })
            .catch((err) => console.log(err));
        }
      } else {
        // Loading.show({
        //   spinner: QSpinnerBars,
        //   spinnerColor: "primary",
        //   spinnerSize: 140,
        //   message: "Loading...",
        //   messageColor: "white",
        // });
      }
    } catch (error) {
      console.error(error);
    }
  },

  // userLogout, setting state to empty
  userLogout(state) {
    localStorage.removeItem("token");
    state.showDrawer = true;
    state.signInLoader = false;
    state.logoutModal = false;
    state.userAuthenticated = false;
    emptyStore(state);
    Loading.hide();
    this.$router.push("/login").catch(() => {});
  },

  openLogoutDialog(state) {
    state.logoutModal = true;
  },

  setUserList(state, data) {
    state.userList = data;
  },

  // generating login errors
  generateLoginError(state, type) {
    if (type == "error") {
      state.loginErrors = "*Network Error";
    } else {
      state.loginErrors = "*Invalid Credentials";
    }
  },
  // resetting login errors
  resetLoginError(state) {
    state.loginErrors = "";
  },
  // toggling loader on login button
  // toggleLoader(state, bool) {
  //   state.signInLoader = bool;
  // },
  // login loader on login button
  isLoginClicked(state, bool) {
    state.isLoginClicked = bool;
  },

  setUserAccessType(state, data) {
    if (data?.allowedAccessTypes) {
      const userAccessTypes = data.allowedAccessTypes[0].userAccessTypes.map(
        (data) => {
          return data;
        }
      );
      state.userAccessType = userAccessTypes;
      state.menu = data;
    }
  },

  // setting user menus
  setUserMenu(state, menus) {
    let userAccessTypes = [];
    let userMenus = [];
    try {
      state.userMenus = menus;
      for (let menu of menus) {
        for (let subMenu of menu.menuItems) {
          userMenus.push(subMenu);
          if (subMenu.allowedAccessTypes) {
            subMenu.allowedAccessTypes[0].menuId = subMenu.menuId;
            userAccessTypes.push(subMenu.allowedAccessTypes[0]);
          }
          // if (!subMenu.isActionItem) {
          for (let subSubMenu of userMenus) {
            state.menuIds[subSubMenu.menuName] = subSubMenu.menuId;
          }
          // }
        }
      }

      state.menuStored = true;
    } catch (error) {
      console.error(error);
    }

    const currentRoute = this.$router.options.history.current;
    const currentRoutetMenuId = this.$router.options.history.current;
    const menu = userMenus.find((menu) => {
      // state.menuObj[menu.menuName] = menu.menuId
      if (menu.menuUrl == currentRoute) {
        console.log("url", menu);
        return menu;
      } else if (menu.menuId == currentRoutetMenuId) {
        return menu;
      }
    });
    if (menu?.allowedAccessTypes) {
      state.menu = menu;
      state.userAccessType = menu.allowedAccessTypes[0].userAccessTypes.map(
        (data) => {
          return data;
        }
      );
      // console.log("menuNameasas", menu )
    }
    console.log("id", state.menuIds);
  },

  // setting user core data
  setUserCoreData(state, data) {
    try {
      state.userCoreData = data;

      const {
        userPeriods,
        userDepartments,
        userBackPeriods,
        userAllowedInventory,
        documentDate,
      } = data;
      let userPeriodCode = [];
      let userMonthPeriod = {};
      userPeriods.map((data) => {
        userPeriodCode.push(`${data.clTitle} - ${data.clPeriod}`);
        userMonthPeriod[`${data.clTitle} - ${data.clPeriod}`] = data.clPeriod;
      });
      state.userPeriodNameList = userPeriodCode;
      state.userPeriodCodeMonth = userMonthPeriod;

      state.documentDate = documentDate;

      state.userAllowedInventory = {};
      if (userAllowedInventory && userAllowedInventory.length > 0) {
        state.userAllowedInventory = userAllowedInventory[0];
      }

      state.userDepartmentList = [];
      state.userDepartmentDescCode = {};

      userDepartments.map((data) => {
        state.userDepartmentList.push(
          `${data.departmentDesc} - ${data.departmentCode}`
        );
        state.userDepartmentDescCode[
          `${data.departmentDesc} - ${data.departmentCode}`
        ] = data.departmentCode;
      });

      if (userBackPeriods.length > 0)
        userBackPeriods.map((p) => {
          state.userBackPeriods[`${p.cldYear}-${p.cldPeriod}`] = true;
        });

      if (state.menuStored) {
        Loading.hide();
        state.displayHome = true;
      } else {
        setTimeout(() => {
          Loading.hide();
          state.displayHome = true;
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  },
  setAllITemList(state, data) {
    state.itemList = data;
    console.log(state.itemList);
  },
  setAllCustomerList(state, data) {
    state.customerList = data;
  },
  showSreenShotModal(state, boolean) {
    state.screenShotModal = boolean;
  },
  cirrcularLoader(state, boolean) {
    console.log("boolean", boolean);
    if (boolean) {
      Loading.show(
        {
          //     spinner: QSpinnerOval,
          //     spinnerColor: "primary",
          //     spinnerSize: 80,
          //     message: "Loading...",
          //     messageColor: "white",
          //   });
          // } else {
          //   setTimeout(() => {
          //     Loading.hide();
        },
        3000
      );
    }
  },
  setChangePassState(state, bool) {
    state.changePasswordModal = bool;
  },
};
