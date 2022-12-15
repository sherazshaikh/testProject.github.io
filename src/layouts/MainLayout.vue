<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="headerToolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Sales PWA </q-toolbar-title>

        <div>{{ userName }}</div>

        <!-- <q-btn @click="logout">logOut</q-btn> -->
        <div class="q-pa-md">
          <q-btn-dropdown class="buttonLight" label="">
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="onItemClick"
                style="border: 0; padding: auto; box-shadow: 0"
              >
                <q-item-section>
                  <q-item-label @click="logout">Logout</q-item-label>
                </q-item-section>
              </q-item>

              <!-- <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item> -->
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="drawerList">
      <q-list>
        <q-item-label header> </q-item-label>

        <!-- <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        /> -->
        <div v-for="items in linksList" v-bind="items" :key="items.menuGroupId">
          <EssentialLink :groupItems="items" />
        </div>
        <!-- <router-link to="'/home'" exact>
          <q-item clickable>
            <q-item-section avatar class="no-padding no-margin">
              <q-icon name="far fa-file" class="iconColor" />
            </q-item-section>
            <q-item-section> Dashboard </q-item-section>
          </q-item>
        </router-link> -->
      </q-list>
    </q-drawer>

    <q-page-container class="pageColor">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  data() {
    return {
      linksList: [
        {
          menuGroupId: 45,
          menuGroupName: "Sales",
          menuItems: [
            // {
            //   allowedAccessTypes: [],
            //   iconClass: null,
            //   isActionItem: false,
            //   isActive: false,
            //   menuId: 14,
            //   menuName: "SignIn",
            //   menuUrl: "/login",
            //   parentMenuId: 45,
            //   sortOrder: null,
            //   subMenuItems: [],
            // },
            {
              allowedAccessTypes: [],
              iconClass: null,
              isActionItem: false,
              isActive: false,
              menuId: 14,
              menuName: "Discount",
              menuUrl: "/discountDoc/record/00000",
              parentMenuId: 45,
              sortOrder: null,
              subMenuItems: [],
            },
          ],
          sortOrder: null,
          iconClass: "",
        },
        // {
        //   menuGroupId: 1,
        //   menuGroupName: "Dashboard",
        //   menuItems: [
        //     {
        //       allowedAccessTypes: [],
        //       iconClass: null,
        //       isActionItem: false,
        //       isActive: false,
        //       menuId: 14,
        //       menuName: "Dashboard",
        //       menuUrl: "/dashboard",
        //       parentMenuId: 45,
        //       sortOrder: null,
        //       subMenuItems: [],
        //     },
        //     {
        //       allowedAccessTypes: [],
        //       iconClass: null,
        //       isActionItem: false,
        //       isActive: false,
        //       menuId: 14,
        //       menuName: "Dashboard",
        //       menuUrl: "/dashboard",
        //       parentMenuId: 45,
        //       sortOrder: null,
        //       subMenuItems: [],
        //     },
        //     {
        //       allowedAccessTypes: [],
        //       iconClass: null,
        //       isActionItem: false,
        //       isActive: false,
        //       menuId: 14,
        //       menuName: "Dashboard",
        //       menuUrl: "/dashboard",
        //       parentMenuId: 45,
        //       sortOrder: null,
        //       subMenuItems: [],
        //     },
        //     {
        //       allowedAccessTypes: [],
        //       iconClass: null,
        //       isActionItem: false,
        //       isActive: false,
        //       menuId: 14,
        //       menuName: "Dashboard",
        //       menuUrl: "/dashboard",
        //       parentMenuId: 45,
        //       sortOrder: null,
        //       subMenuItems: [],
        //     },
        //     {
        //       allowedAccessTypes: [],
        //       iconClass: null,
        //       isActionItem: false,
        //       isActive: false,
        //       menuId: 14,
        //       menuName: "Dashboard",
        //       menuUrl: "/dashboard",
        //       parentMenuId: 45,
        //       sortOrder: null,
        //       subMenuItems: [],
        //     },
        //   ],
        //   sortOrder: null,
        //   iconClass: "",
        // },
        // {
        //   title: "Dashboard",
        //   caption: "quasar.dev",
        //   icon: "school",
        //   link: "/dashboard",
        // },
        // {
        //   title: "Discount",
        //   caption: "",
        //   icon: "code",
        //   link: "/discount",
        // },
        // {
        //   title: "login",
        //   caption: "",
        //   icon: "code",
        //   link: "/login",
        // },
      ],
    };
  },

  mounted() {
    console.log(
      "state.userAuthenticated dashboard",
      this.$store.state.userAuthenticated
    );

    console.log("linksList", this.linksList);

    this.$store.commit("isLoginClicked", false);
    // if (!this.$store.state.userAuthenticated) {
    //   this.logout();
    // }
  },

  methods: {
    logout() {
      this.$store.commit("userLogout");
      console.log("logout");
    },
  },
  computed: {
    getMenus() {
      return this.$store.state.userMenus;
    },
    userName() {
      return this.$store.state.userName;
    },
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      // essentialLinks: ,

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
