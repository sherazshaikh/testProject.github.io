<template>
  <div class="textDark text-center q-pa-md flex flex-center">
    <q-card
      class=""
      :class="type"
      style="width: 'fullWidth'; height: 'fullHeight'"
    >
      <div style="font-size: 30vw">404</div>
      <q-card-section>
        <q-img src="../assets/Images/notFound.png" width="100px"></q-img>
      </q-card-section>
      <div style="font-size: 7vw; padding: 20px">Document Not Found...</div>
      <div style="padding: 20px">
        <q-btn @click="backToDashboard" class="buttonDark">
          Back to dashboard
        </q-btn>
      </div>
    </q-card>
  </div>
</template>
<script>
import docNotFoundImg from "../assets/Images/notFound.png";

import { defineComponent } from "vue";
export default defineComponent({
  name: "docNotFound",
  methods: {
    backToDashboard() {
      this.$router.push("/");
    },
  },
});
</script>
<style></style>
