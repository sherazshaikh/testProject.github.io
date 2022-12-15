<template>
  <div class="main-component">
    <q-layout>
      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default defineComponent({
  name: "App",

  beforeCreate() {
    const token = localStorage.getItem("token");
    console.log("token", token);
    axios.get("/setting.json").then((res) => {
      this.$store.commit("setUrl", res.data.BASE_URL);
    });
  },

  async mounted() {
    // console.log = () => {}; // console.log disabled
    const token = localStorage.getItem("token");
    console.log("token", token);

    if (token) {
      const decodedToken = jwt_decode(token);

      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      console.log("decodedToken", decodedToken);
      console.log("Date ", new Date().getTime() / 1000);
      let expiryDuration = decodedToken.exp - new Date().getTime() / 1000;
      console.log("expiryDuration", expiryDuration);

      if (expiryDuration < 1) {
        this.$store.commit("userLogout");
      } else {
        let data = {
          userId: decodedToken.unique_name,
          userName: decodedToken.given_name,
          userGroup: decodedToken.role,
          isAuthenticated: true,
          userYear: decodedToken.UserYear,
          userPeriod: decodedToken.UserPeriod,
        };
        setTimeout(() => {
          this.$store.commit("loginUser", data);
          // this.$store.dispatch("getUserMenus", data);
        }, 400);
      }
    } else {
      this.$store.commit("userLogout");
    }
  },
});
</script>
