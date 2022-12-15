<template>
  <q-page
    class="window-height window-width row justify-center items-center signInMain"
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 q-my-md">Home Solutions</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-py-lg signInCard">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                v-model="email"
                type="userId"
                label="User Id"
                class="inputLight"
              />
              <q-input
                square
                filled
                v-model="password"
                type="password"
                label="Password"
                class="inputLight"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <template v-if="getSignInLoader">
              <q-btn
                unelevated
                size="lg"
                class="full-width buttonLight"
                :disabled="true"
              >
                <q-spinner />
              </q-btn>
            </template>
            <q-btn
              unelevated
              size="lg"
              class="full-width buttonLight"
              label="Login"
              v-else
              @click="signin"
            >
            </q-btn>
          </q-card-actions>

          <q-card-section class="text-right q-px-md q-pa-none">
            <p class="text-red-6">{{ errorMsg || getErrorMsg }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
// import axios from "axios";

// import { Loading, QSpinnerBars, QSpinnerOval } from "quasar";
export default {
  mounted() {
    console.log("state.userAuthenticated", this.$store.state.userAuthenticated);

    if (this.$store.state.userAuthenticated) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      url: "http://192.168.0.115:45455/v1",
      email: "",
      password: "",
      errorMsg: "",
      isClicked: false,
    };
  },
  methods: {
    async signin() {
      if (
        this.email !== "" &&
        this.email !== undefined &&
        this.email !== null &&
        this.password !== "" &&
        this.password !== undefined &&
        this.password !== null
      ) {
        this.errorMsg = "";
        this.$store.commit("resetLoginError");
        let postData = {
          userId: this.email,
          pwd: this.password,
        };
        this.$store.commit("isLoginClicked", true);
        this.$store.dispatch("authenticatingUser", postData);
      } else {
        this.errorMsg = "*Invalid Credentials";
      }
    },
  },
  computed: {
    getErrorMsg() {
      return this.$store.state.loginErrors;
    },
    getSignInLoader() {
      return this.$store.state.isLoginClicked;
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
