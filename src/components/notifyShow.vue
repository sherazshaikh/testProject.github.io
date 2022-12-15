<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- <q-btn label="Click me"  @click="persistent = true" /> -->

    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="text-white" :class="type" style="width: 300px">
        <q-card-section>
          <div class="text-h6" v-if="type == 'positive'">Notification</div>
          <div class="text-h6" v-if="type == 'warning'">Warning</div>
          <div class="text-h6" v-if="type == 'negative'">Error</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ this.message }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn class="" flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import { ref } from "vue";

export default {
  props: ["isShow", "message", "type"],
  data() {
    return {
      persistent: this.isShow,
    };
  },
};
</script>

<style>
.negative {
  background-color: #c10015;
  color: white;
}

.positive {
  background-color: #21ba45;
  color: white;
}

.warning {
  background-color: #c4920b;
  color: white;
}
</style>
