// // import { color } from "html2canvas/dist/types/css/types/color";
// import takeScreenShot from "./handleScreenShot";

export default {
  data() {
    return {
      mixinNotification: null,
    };
  },
  methods: {
    negativeNotification(
      message,
      timeout = 4000,
      textColor = "white",
      type = "negative",
      width = "600px"
    ) {
      this.mixinNotification = this.$q.notify({
        message,
        timeout,
        width,
        "text-color": textColor,
        type,
        progress: true,

        actions: [
          {
            icon: "close",
            color: textColor,
          },
          // {
          //   label: "Report Error",
          //   color: "white",
          //   handler: () => {
          //     takeScreenShot();
          //   },
          // },
        ],
      });
    },

    positiveNotification(
      message,
      timeout = 5000,
      textColor = "white",
      type = "positive"
    ) {
      this.mixinNotification = this.$q.notify({
        message,
        timeout,
        "text-color": textColor,
        progress: true,
        type,
        actions: [
          {
            icon: "close",
            color: textColor,
          },
        ],
      });
    },

    warningNotification(
      message,
      timeout = 4000,
      textColor = "black",
      type = "warning"
    ) {
      this.mixinNotification = this.$q.notify({
        message,
        timeout,
        "text-color": textColor,
        type,
        progress: true,
        actions: [
          {
            icon: "close",
            color: textColor,
          },
        ],
      });
    },
  },
};
