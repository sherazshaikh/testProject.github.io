<template>
  <div>
    <q-expansion-item
      group="somegroup"
      expand-separator
      icon="receipt"
      :label="groupItems.menuGroupName"
    >
      <div v-if="groupItems.menuItems">
        <div
          v-for="item in groupItems.menuItems"
          v-bind="item"
          :key="item.menuId"
        >
          <router-link :to="item.menuUrl" exact class="routerLink">
            <q-space />

            <q-item clickable class="routerItem">
              <q-item-section avatar></q-item-section>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.menuName }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
          </router-link>
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: ["groupItems"],
  mounted() {
    let sum = 0;
    console.log("Group", sum + 1);
  },
});
</script>
