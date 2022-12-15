import axios from "axios";

export default {
  // USER AUTHENTICATION
  authenticatingUser(context, userCredentials) {
    console.log("base url", context.getters.url);
    axios
      .post(`${context.getters.url}/AuthenticateUser`, userCredentials)
      .then((res) => {
        if (res.data.message === "Login Successful") {
          let token = res.data.data.token;

          localStorage.setItem("token", token, res);

          token = `Bearer ${token}`;

          axios.defaults.headers.common["Authorization"] = token;
          axios.defaults.headers["Authorization"] = token;
          axios.defaults.headers["Content-Type"] = "application/json";
          axios.defaults.headers["Cache-Control"] = "no-cache";
          axios.defaults.headers["Pragma"] = "no-cache";
          axios.defaults.headers["Expires"] = "0";

          // context.dispatch("getUserMenus", res.data.data);

          // context.commit("toggleLoader", false);
          context.commit("loginUser", { ...res.data.data, routeToLogin: true });

          // context.dispatch("getItemList")
        } else {
          // context.commit("toggleLoader", false);
          context.commit("generateLoginError", "");
          context.commit("isLoginClicked", false);
        }
      })
      .catch((err) => {
        const error = err.response || err;
        console.error(error);
        // context.commit("toggleLoader", false);
        context.commit("generateLoginError", "error");
        context.commit("isLoginClicked", false);
      });
  },

  // SETTING USER MENUS
  getUserMenus(context, userData) {
    let data = {
      userId: userData.userId,
      userName: userData.userName,
      isAuthenticated: userData.isAuthenticated,
      userGroup: userData.userGroup,
    };

    axios
      .post(
        `${context.getters.url}/getUserMenuDetailsWithAllowedAccessTypes?isForSales=true&isForWMS=false
      `,
        data
      )
      .then((res) => {
        // res.data.data.push(customerGroup); //temprory  menu url push for discountList
        // res.data.data.push(usersetup,quotation); //temprory  menu url push for docType
        // context.commit("setUserMenu", res.data.data);
        // context.dispatch("getYearForDDL");
        // context.dispatch("getUserCoreData");
        // console.log("actionMenu", res);
        // context.commit("setUserAccessType")
      })

      .catch((err) => {
        const error = err.response || err;
        console.log(error);
        context.commit("userLogout");
      });
  },

  // GETTING USER CORE DATA

  getUserCoreData(context) {
    axios
      .get(`${context.getters.url}/Core/GetUserCoreDataAsync`)
      .then((res) => {
        context.commit("setUserCoreData", res.data.data);
        context.dispatch("getUserWiseRights");

        console.log(res.data.data);
      })
      .catch((err) => {
        const error = err.response || err;
        console.error(error);
      });
  },

  getYearForDDL(context) {
    axios
      .get(`${context.getters.url}/Common/getYearForDDL`)
      .then((res) => {
        context.commit("setYearForDDL", res.data.data);
      })
      .catch((err) => {
        const newError = err.response || err;
        console.error(newError);
      });
  },

  getUserWiseRights(context) {
    axios
      .get(`${context.getters.url}/Common/getUserWiseRights`)
      .then((res) => {
        context.commit("setUserWiseRights", res.data.data);
      })
      .catch((err) => {
        const newError = err.response || err;
        console.error(newError);
      });
  },

  // getUserWiseRights(context){
  //   axios
  //   .get(`${context.getters.url}/Common/getUserWiseRights`)
  //   .then(res => {
  //     context.commit("setUserWiseRights", res.data.data);
  //   })
  //   .catch(err => {
  //     const newError = err.response || err;
  //     console.error(newError);
  //   });
  // },

  // check dialog data
  triggerUnauthorizedError(context, err) {
    if (err.response) {
      if (err.response.status === 401) {
        console.log(context.commit("openLogoutDialog"));
      }
    }
  },
};
