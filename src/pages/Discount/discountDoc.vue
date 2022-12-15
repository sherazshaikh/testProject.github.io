/* eslint-disable */
<template>
  <div class="q-pa-md flex flex-center" v-if="isLoaded">
    <q-circular-progress
      indeterminate
      rounded
      size="50px"
      class="q-ma-md loaderLight"
    />
  </div>

  <div v-else class="q-pa-sm">
    <div v-if="isDoc">
      <div
        class="row q-gutter-md"
        style="display: flex; justify-content: flex-end"
      >
        <q-badge
          round
          style="width: 100px; justify-content: center; padding: 10px"
          :label="docStatus"
          :class="statusColor"
        />
      </div>

      <!-- Discount Document Detailes  -->
      <q-expansion-item
        label="Discount Document"
        header-class="backgroundColor headingFont "
        class="q-mt-sm backgroundColor headingFont"
        expand-separator
        dense
        default-opened
      >
        <q-card-section>
          <div class="row col-xs-12">
            <span class="labelKey col-xs-6 col-xs-6">Document Type : </span>
            <span class="labelData col-xs-6 col-xs-6">{{
              discountObj.docTypeDesc
            }}</span>
          </div>
          <div class="row col-xs-12">
            <span class="labelKey col-xs-6">Document No : </span>
            <span class="labelData col-xs-6">{{ discountObj.somDocNo }}</span>
          </div>
          <div class="row col-xs-12">
            <span class="labelKey col-xs-6">Year : </span>
            <span class="labelData col-xs-6">{{ discountObj.somYear }}</span>
          </div>
          <div class="row col-xs-12">
            <span class="labelKey col-xs-6">Period : </span>
            <span class="labelData col-xs-6">{{ discountObj.somPeriod }}</span>
          </div>
          <div class="row col-xs-12">
            <span class="labelKey col-xs-6">Date : </span>
            <span class="labelData col-xs-6">{{ discountObj.somDate }}</span>
          </div>
          <div class="row col-xs-12">
            <span class="labelKey col-xs-6">Discount Type : </span>
            <span class="labelData col-xs-6">{{
              discountObj.discountdesc
            }}</span>
          </div>
        </q-card-section>
        <!-- Document  information -->
        <q-card class="shadow-1 greyBlackBgColor backgroundColor"> </q-card>
      </q-expansion-item>

      <!-- Customer  information -->
      <q-expansion-item
        label="Customer Information"
        header-class="backgroundColor headingFont "
        class="q-mt-sm backgroundColor headingFont"
        expand-separator
        dense
      >
        <q-card class="shadow-1 greyBlackBgColor backgroundColor">
          <q-card-section>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6 col-xs-6">Customer Code : </span>
              <span class="labelData col-xs-6 col-xs-6">{{
                discountObj.cstCode
              }}</span>
            </div>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6">Customer Name : </span>
              <span class="labelData col-xs-6">{{ discountObj.cstName }}</span>
            </div>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6">Personnel Code : </span>
              <span class="labelData col-xs-6">{{
                discountObj.prsnlCode
              }}</span>
            </div>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6">Personnel Name : </span>
              <span class="labelData col-xs-6">{{
                discountObj.prsnlname
              }}</span>
            </div>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6">Price Title : </span>
              <span class="labelData col-xs-6">{{
                discountObj.pricedesc
              }}</span>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Parent Doc  information -->
      <q-expansion-item
        label="Parent Document"
        header-class="backgroundColor headingFont "
        class="backgroundColor headingFont q-mt-sm"
        expand-separator
        dense
      >
        <q-card class="shadow-1 greyBlackBgColor backgroundColor">
          <q-card-section>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6 col-xs-6">Document Code : </span>
              <span class="labelData col-xs-6 col-xs-6">{{
                discountObj.somParentrefdoccode
              }}</span>
            </div>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6">Document No : </span>
              <span class="labelData col-xs-6">{{
                discountObj.somParentrefdocno
              }}</span>
            </div>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6">Document Type : </span>
              <span class="labelData col-xs-6">{{
                discountObj.parendDocTypeDesc
              }}</span>
            </div>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6">Year : </span>
              <span class="labelData col-xs-6">{{
                discountObj.somParentrefyear
              }}</span>
            </div>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6">Period : </span>
              <span class="labelData col-xs-6">{{
                discountObj.somParentrefper
              }}</span>
            </div>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6">S.O Date : </span>
              <span class="labelData col-xs-6">{{
                discountObj.parentDate
              }}</span>
            </div>
            <div class="row col-xs-12">
              <span class="labelKey col-xs-6">Warehouse : </span>
              <span class="labelData col-xs-6">{{
                discountObj.locCode + "-" + discountObj.warehouseDesc
              }}</span>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Customer info closes -->
      <div class="col-md-12 col-sm-12 col-xs-12">
        <q-btn
          no-caps
          dense
          style="width: 150px; margin: 10px"
          class="q-mx-xs buttonDark"
        >
          <span class="regularFontSize">View Discount Details</span>
        </q-btn>
        <q-btn
          no-caps
          dense
          style="width: 150px; margin: 10px"
          class="q-mx-xs buttonDark"
        >
          <span class="regularFontSize">View Quotation</span>
        </q-btn>
      </div>

      <!-- Child Items  Table  -->
      <q-card class="my-card backgroundColor q-px-xs q-mx-xs q-py-sm q-mt-sm">
        <!-- lineNarration -->
        <q-card-section>
          <div class="row">
            <div class="rowFooter row col-xs-12">
              <span class="labelKey col-xs-6"> Total Amount </span>
              <span class="col-xs-5">
                <q-badge
                  outline
                  align="middle"
                  class="text-bold bdgText footerLabel"
                  fullWidth
                >
                  {{ formatter(discountObj.sacSomAmount) }}
                </q-badge>
              </span>
            </div>
            <div class="rowFooter row col-xs-12">
              <span class="labelKey col-xs-6"> Policy Discount </span>
              <span class="col-xs-5">
                <q-badge
                  outline
                  align="middle"
                  class="text-bold bdgText footerLabel"
                >
                  {{ formatter(discountObj.totalPolicyAmt) }}
                </q-badge>
              </span>
            </div>

            <div class="rowFooter row col-xs-12">
              <span class="labelKey col-xs-6"> Branch Discount </span>
              <span class="col-xs-5">
                <q-badge
                  outline
                  align="middle"
                  class="text-bold bdgText footerLabel"
                >
                  {{ formatter(branchDiscount) }}
                </q-badge>
              </span>
            </div>
            <div class="rowFooter row col-xs-12">
              <span class="labelKey col-xs-6"> Management Discount </span>
              <span class="col-xs-5">
                <q-badge
                  outline
                  align="middle"
                  class="text-bold bdgText footerLabel"
                  >{{ formatter(managementDiscount) }}
                </q-badge>
              </span>
            </div>
            <div class="rowFooter row col-xs-12">
              <span class="labelKey col-xs-6"> Price Adjustment </span>
              <span class="col-xs-5">
                <q-badge
                  outline
                  align="middle"
                  class="text-bold bdgText footerLabel"
                >
                  {{ formatter(paDiscount) }}
                </q-badge>
              </span>
            </div>
            <div class="rowFooter row col-xs-12">
              <span class="labelKey col-xs-6"> Total Discount </span>
              <span class="col-xs-5">
                <q-badge
                  outline
                  align="middle"
                  class="text-bold bdgText footerLabel"
                >
                  {{ formatter(totalDiscount) }}
                </q-badge>
              </span>
            </div>
          </div>
        </q-card-section>

        <!-- <template>
          <span class="q-ml-sm"> Net Amount </span>
          <span class="q-ml-xs q-my-sm">
            <q-badge outline align="middle" color="primary" class="text-bold">
              {{ formatter(netAmount) }}
            </q-badge>
          </span>
        </template> -->

        <!-- priceAdjustmentTotal -->

        <!-- ManagmentDisc: 0,
      BranchDiscount: 0, -->
      </q-card>

      <div style="padding: 2%">
        <q-fab
          label="Work Flow"
          class="buttonLight"
          label-class="regularFontSize"
          hide-icon
          direction="right"
          padding="xs md"
          square
          :disable="accessType === 'readOnly' && !workFlow()"
          v-if="accessType === 'readOnly' && !allAccessTypes?.ConfirmDocument"
        >
          <q-fab-action
            class="popupBtnBgColor regularFontSize"
            color="positive"
            icon="check"
            padding="none md"
            label="Approve"
            style="padding: 7px !important"
            @click="callApprovalHandler('approve')"
            :disable="isApprovalProccesDone"
          />

          <q-fab-action
            class="popupBtnBgColor regularFontSize"
            color="negative"
            icon="close"
            padding="none md"
            label="Reject"
            style="padding: 7px !important"
            @click="callApprovalHandler('reject')"
            :disable="isApprovalProccesDone"
          />
        </q-fab>

        <q-space />
        <!-- </template> -->
        <!-- </div> -->

        <notify-show
          :isShow="isShow"
          :message="message"
          :type="type"
        ></notify-show>
      </div>
    </div>
    <div v-else>
      <doc-not-found></doc-not-found>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import notifyShow from "../../components/notifyShow.vue";
import docNotFound from "../../components/docNotFound.vue";

export default {
  // setup() {
  //   const $q = useQuasar();
  //   return $q;
  // },
  components: {
    "notify-show": notifyShow,
    "doc-not-found": docNotFound,
  },
  mounted() {
    this.isLoaded = true;
    let paramData = this.$router.currentRoute.value.params.key.split("_");
    this.docNo = paramData[0];
    this.period = paramData[1];
    this.docTypeCode = paramData[2];
    this.docCode = paramData[3];
    this.year = paramData[4];
    this.accessType = paramData[paramData.length - 1];
    console.log("paramData", paramData);
    this.verifyDiscRights();
    this.viewDiscount();
    console.log("discount");
    (this.isShow = true), (this.message = "dsdsdsd"), (this.type = "warning");
  },
  data() {
    return {
      isDoc: false,
      accessType: "",
      docNo: "",
      period: "",
      docTypeCode: "",
      docCode: "",
      year: "",
      discountObj: {},
      branchDiscount: 0,
      managementDiscount: 0,
      paDiscount: 0,
      totalDiscount: 0,
      isLoaded: false,
      docStatus: "",
      statusColor: "",
      verifyRules: [],
      verifyLevel: null,
      isApprovalProccesDone: false,
      isApprovalRequest: false,
      mixinNotification: null,
      isShow: false,
      message: "",
      type: "",
    };
  },
  methods: {
    formatter(amount) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
      return formatter.format(amount).replace(/\$/g, "");
    },
    // get current screen mode create / readonly  on call save document
    getCurrentScreenMode() {
      let accessType = "";
      const { key } = this.$route?.params;
      if (key) {
        let paramData = key?.split("_");
        accessType = paramData[paramData?.length - 1];
      }

      return accessType;
    },
    async viewDiscount() {
      console.log("viewDiscount");
      try {
        const response = await axios.get(
          `${this.url}/Discount/GetDiscountDocumentbyCodeAsync?docNo=${this.docNo}&period=${this.period}&docTypeCode=${this.docTypeCode}&docCode=${this.docCode}&year=${this.year}`
        );
        console.log("discount obj", response.data);
        const obj = response.data;
        if (obj.success) {
          this.discountObj = {
            ...obj.data[0],
            somDate: obj.data[0].somDate.split("T")[0],
            parentDate: obj.data[0].parentDate.split("T")[0],
          };
          this.checkDocStatus(
            this.discountObj.workFlowStatus,
            this.discountObj.isDiscountApproved
          );
          this.branchDiscount = 0;
          this.managementDiscount = 0;
          this.paDiscount = 0;

          this.discountObj.discountSaleOrders.map((item) => {
            this.branchDiscount = this.branchDiscount + item.branchDiscountAmt;
            this.managementDiscount =
              this.managementDiscount + item.managementDiscountAmt;

            this.paDiscount = this.paDiscount + item.priceAdjustmentAmt;
          });

          this.totalDiscount =
            this.branchDiscount +
            this.managementDiscount +
            this.paDiscount +
            this.discountObj.totalPolicyAmt;
          console.log("this.discountObj", this.discountObj);
          this.workFlow();
          this.isDoc = true;
        } else {
          console.log("error", obj.messsage);
        }
      } catch (error) {
        console.log("error", error.messsage);
      }
      this.isLoaded = false;
    },
    checkDocStatus(wfStatus, isApproved) {
      console.log("wfStatus", wfStatus, isApproved);
      if (wfStatus == 1) {
        this.docStatus = "Open";
        this.statusColor = "grey";
      } else if (wfStatus == 2) {
        if (isApproved == 1) {
          this.docStatus = "Approved";
          this.statusColor = "green";
        } else if (isApproved == 0) {
          this.docStatus = "Rejected";
          this.statusColor = "red";
        }
      } else if (wfStatus == 3) {
        this.docStatus = "Pending";
        this.statusColor = "yellow";
      }
    },
    //get verify levels
    async verifyDiscRights() {
      try {
        const response = await axios.get(
          `${this.url}/SaleOrder/GetSOVerifyPolicy?DocCode=DIS`
        );
        console.log("response", response);
        if (response.data.data && response.data.data.length > 0) {
          response.data.data.map((rule) => {
            if (rule.docCode === "DIS") {
              this.verifyRules.push(rule);
              this.verifyLevel = rule.verifyLevel;
            }
          });
          console.log("this.verifyLevel", this.verifyLevel);
          console.log("this.verifyRules", this.verifyRules);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    },
    //1
    setVerifyLevel(docLevel) {
      docLevel =
        docLevel === 0
          ? 1
          : docLevel === 1
          ? 2
          : docLevel === 3
          ? 3
          : docLevel === 4
          ? 4
          : null;
      let level = null;
      this.verifyRules.map((rule) => {
        if (rule.verifyLevel === docLevel) {
          level = rule.verifyLevel;
        }
      });
      return level;
    },
    //2
    // DOCUMENT APROVAL AND REJECTION HANDLING
    async callApprovalHandler(action) {
      let currentHostUrl = window.location.origin;
      let approvedBy;
      let isDocumentApproved = false;
      const { discountObj } = this;

      console.log(
        "Approval Level ",
        this.setVerifyLevel(discountObj.approvalLevel),
        discountObj.approvalLevel
      );

      this.verifyLevel = this.setVerifyLevel(discountObj.approvalLevel);
      console.log("verifyLevel 2", this.verifyLevel, discountObj.approvalLevel);
      if (!this.verifyLevel) {
        this.negativeNotification(
          ` You Have Don't Rights To Approve This Document `
        );
        return;
      }

      if (this.verifyLevel === 0 && discountObj.approvalLevel === 0) {
        approvedBy = 0;
        isDocumentApproved = true;
      } else if (this.verifyLevel === 1 && discountObj.approvalLevel === 0) {
        approvedBy = 0;
        isDocumentApproved = true;
      } else if (
        this.verifyLevel === 0 ||
        (this.verifyLevel === 1 && discountObj.approvalLevel === 1)
      ) {
        approvedBy = 0;
        isDocumentApproved = false;
      } else if (this.verifyLevel === 2 && discountObj.approvalLevel === 1) {
        approvedBy = 1;
        isDocumentApproved = true;
      } else if (this.verifyLevel === 2 && discountObj.approvalLevel === 0) {
        approvedBy = 1;
        isDocumentApproved = false;
      } else if (this.verifyLevel === 3 && discountObj.approvalLevel === 3) {
        approvedBy = 3;
        isDocumentApproved = true;
      } else if (this.verifyLevel === 4 && discountObj.approvalLevel === 4) {
        approvedBy = 4;
        isDocumentApproved = true;
      }
      if (isDocumentApproved) {
        const postData = {
          WorkflowInstanceId: discountObj.workFlowInstance,
          CorrelationId: discountObj.correlationId,
          ApprovalLevel: approvedBy,
          IsApproved: action === "approve" ? 1 : 0,
          WorkflowStatus: 0,
          SomDocNo: discountObj.somDocNo,
          DocsDocCode: discountObj.docsDocCode,
          DoctypCode: discountObj.doctypCode,
          SomYear: discountObj.somYear,
          SomPeriod: discountObj.somPeriod,
          Cstgno: discountObj.cstgno,
          Totaldiscount: discountObj.somDiscountamt,
          baseUrl: currentHostUrl,
          fileName: "discountDoc/record",
          isReadOnly: "readOnly",
          currentID: this.$store.state.menu.menuId,
          cstcode: discountObj.cstCode,
          cstname: discountObj.cstName,
        };

        try {
          const response = await Axios.post(
            `${this.url}/Discount/ApprovalDiscountDoc`,
            postData
          );
          console.log(
            "🚀 ~ file: discountDoc.vue ~ line 1295 ~ callApprovalHandler ~ response",
            response
          );
          if (response.data.success) {
            this.positiveNotification(`${response.data.message}`);
            const { menuId } = this.$store.state.menu;
            this.isApprovalProccesDone = true;
            this.$tabs.refresh();
            this.$router
              .push({
                name: "discountDoc",
                params: {
                  key: `${discountObj.somDocNo}_${discountObj.somPeriod}_${discountObj.doctypCode}_${discountObj.docsDocCode}_${discountObj.somYear}_readOnly`,
                },
                query: {
                  id: menuId,
                },
              })
              .catch(() => {});
          } else {
            this.negativeNotification(`${response.data.message}`);
          }
        } catch (err) {
          this.$store.dispatch("triggerUnauthorizedError", err);
          const newError = err.response || err;
          console.error(newError);
        }
      } else {
        this.negativeNotification(
          `You Dont Hava  Rights To Approved This Document ${discountObj.docNumber} `
        );
      }
    },
    //3
    workFlow() {
      console.log(
        "Approvel Levwel ",
        this.verifyLevel,
        this.discountObj.approvalLevel,
        this.setVerifyLevel(this.discountObj.approvalLevel)
      );
      this.verifyLevel = this.setVerifyLevel(this.discountObj.approvalLevel);
      if (this.discountObj.isCancelled) {
        this.isApprovalRequest = false;
        return this.isApprovalRequest;
      }

      if (this.discountObj.workFlowStatus === 0) {
        this.isApprovalRequest = false;
      } else if (this.discountObj.workFlowStatus === 1) {
        this.isApprovalRequest = true;
      } else if (this.discountObj.workFlowStatus === 2) {
        this.isApprovalRequest = false;
      } else if (
        (this.discountObj.workFlowStatus === 3 && this.verifyLevel === 0) ||
        (this.verifyLevel === 1 && this.discountObj.approvalLevel === 1)
      ) {
        this.isApprovalRequest = false;
      } else if (
        this.discountObj.workFlowStatus === 3 &&
        this.verifyLevel === 2 &&
        this.discountObj.approvalLevel === 1
      ) {
        this.isApprovalRequest = true;
      } else if (
        this.discountObj.workFlowStatus === 3 &&
        this.verifyLevel === 1 &&
        this.discountObj.approvalLevel === 0
      ) {
        this.isApprovalRequest = true;
      } else if (
        this.discountObj.workFlowStatus === 3 &&
        this.verifyLevel === 3 &&
        this.discountObj.approvalLevel === 3
      ) {
        this.isApprovalRequest = true;
      } else if (
        this.discountObj.workFlowStatus === 3 &&
        this.verifyLevel === 4 &&
        this.discountObj.approvalLevel === 4
      ) {
        this.isApprovalRequest = true;
      }

      return this.isApprovalRequest;
    },
  },
  computed: {
    url() {
      return this.$store.state.url;
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "../../styles/quasar.variables.scss";

.bdgText {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.rowFooter {
  padding-top: 2px !important;
  font-size: medium;
}
.row {
  padding-top: 2px !important;
}
.labelKey {
  font-size: small;
  font-weight: 500;
}
.labelData {
  font-size: small;
}
.headExpension {
  font-size: medium !important;
  font-weight: 1000 !important;
}
.grey {
  background-color: grey;
  color: white;
}
.yellow {
  background-color: #c4920b;
  color: white;
}
.green {
  background-color: #21ba45;
  color: white;
}
.red {
  background-color: #c10015;
  color: white;
}

// .q-table .q-table__bottom,
// .q-table thead,
// .q-table tr,
// .q-table th,
// .q-table td {
//   border-color: $backgroundColor !important;

//   .super_small_input.q-field {
//     &--dense,
//     .q-field__inner {
//       .q-field__control,
//       .q-field__marginal {
//         height: 20px !important;
//       }

//       .q-field__bottom.row.items-start.q-field__bottom--animated {
//         height: 0px !important;
//         padding: none !important;
//         margin: none !important;
//         line-height: 0px !important;
//         min-height: 0px;
//         max-height: 0px;
//         display: none;
//       }
//     }
//   }

//   .selectBox.q-field--dense {
//     .q-field__control-container,
//     .q-field__native {
//       padding-top: 0px !important;
//     }

//     .q-field__control {
//       height: 36px !important;
//       min-height: 36px !important;
//     }

//     .q-field__marginal {
//       height: 36px !important;
//     }

//     .q-field__label {
//       top: 6px !important;
//     }
//   }

// input[type="number"]::-webkit-outer-spin-button,
// input[type="number"]::-webkit-inner-spin-button {
//   -webkit-appearance: none;
//   margin: 0;
// }

// input[type="number"] {
//   -moz-appearance: textfield;
// }
// }
</style>
