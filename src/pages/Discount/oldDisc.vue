<template>
  <div v-if="userHaveRight">
    <div v-if="showDisplay" class="q-pa-sm">
      <!-- Customer And SO Select  And Workflow Button -->
      <div class="row q-gutter-md">
        <div class="">
          <q-btn
            @click="getAllCustomers"
            color="teal"
            no-caps
            dense
            style="width: 90px"
            class="q-mx-xs"
            :disable="accessType !== 'CREATE' ? true : false"
          >
            <q-spinner-puff
              v-if="customerList.length === 0 && accessType === 'CREATE'"
            />
            <span class="regularFontSize" v-else>Customer List</span>
          </q-btn>
        </div>
        <div class="">
          <q-btn
            no-caps
            dense
            style="width: 100px"
            class="q-mx-xs lightBlueBgColor text-white"
            @click="SOListHandler"
            :disable="
              !customerDetail.custCode ||
              accessType !== 'CREATE' ||
              isSoListLoaded
                ? true
                : false
            "
          >
            <q-spinner-puff v-if="isSoListLoaded" />
            <span v-else class="regularFontSize">Select S.O. Doc</span>
          </q-btn>
        </div>
        <div>
          <q-fab
            label="Work Flow"
            class="lightBlueBgColor text-white"
            label-class="regularFontSize"
            hide-icon
            direction="right"
            padding="xs md"
            square
            color="blue"
            :disable="accessType === 'readOnly' && !workFlow()"
            v-if="accessType === 'readOnly' && allAccessTypes.ConfirmDocument"
          >
            <q-fab-action
              class="popupBtnBgColor regularFontSize"
              color="positive"
              icon="check"
              padding="none sm"
              label="Approve"
              @click="callApprovalHandler('approve')"
              :disable="isApprovalProccesDone"
              style="padding: 2px 0 !important"
            />

            <q-fab-action
              class="popupBtnBgColor regularFontSize"
              color="negative"
              icon="close"
              padding="none sm"
              label="Reject"
              @click="callApprovalHandler('reject')"
              :disable="isApprovalProccesDone"
              style="padding: 2px 0 !important"
            />
          </q-fab>

          <q-space />
          <!-- </template> -->
          <!-- </div> -->
        </div>

        <template v-if="accessType === 'readOnly'">
          <div
            style="
              display: flex;
              flex: 1;
              justify-content: flex-end;
              align-items: center;
            "
            class=""
          >
            <q-badge
              round
              style="width: 100px; justify-content: center; padding: 10px"
              :style="`background:${badgeStatusUpdate().badgeColor}`"
              :color="badgeStatusUpdate().badgeColor"
              :label="badgeStatusUpdate().badgeLabel"
            />
          </div>
        </template>
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
        <!-- Document  information -->
        <q-card class="shadow-1 greyBlackBgColor backgroundColor">
          <q-card-section>
            <div class="row">
              <div class="col-md-3 col-sm-3 col-xs-12">
                <!-- <q-select :dark="$store.state.darkMode" class="
                    q-mx-md
                    greyBlackBgColor
                    regularFontSize
                    color__blackOnDisabled
                  " popup-content-class="regularFontSize" label="Document Type" outlined dense options-dense
                    v-model="formData.docTypeDescription" behavior="menu" use-input fill-input hide-selected
                    :options="documentTypeOptionList" hide-hint @change="inputHandler" hide-bottom-space :disable="
                      accessType !== 'CREATE' || updateDiscSuccesfull
                        ? true
                        : false
                    ">
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select> -->

                <custom-select
                  model="docTypeDescription"
                  :value="formData.docTypeDescription"
                  :options="documentTypeOptionList"
                  @change="inputHandler"
                  label="Document Type"
                  :disable="
                    accessType !== 'CREATE' || updateDiscSuccesfull
                      ? true
                      : false
                  "
                />
              </div>
              <div class="col-md-3 col-sm-3 col-xs-12">
                <!-- <custom-input
                    style="fontweight: 30px"
                    model="docNo"
                    :value="formData.docNo"
                    label="Document No."
                    ref="docNoInput"
                    :disable="true"
                  /> -->
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="formData.docNo"
                  label="Document No"
                  :disable="true"
                />
              </div>

              <div class="col-md-3 col-sm-3 col-xs-12">
                <custom-input
                  :value="formData.year"
                  :disable="true"
                  model="year"
                  label="Year"
                />
              </div>

              <div class="col-md-3 col-sm-3 col-xs-12">
                <custom-input
                  :value="formData.month"
                  :disable="true"
                  model="month"
                  label="Period"
                />
              </div>
            </div>

            <div class="row q-mt-sm">
              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  outlined
                  dense
                  type="date"
                  v-model="formData.date"
                  label="Date"
                  :disable="true"
                />
              </div>
              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-select
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  popup-content-class="regularFontSize"
                  label="Discount Type"
                  outlined
                  dense
                  options-dense
                  v-model="formData.discTypeDescription"
                  behavior="menu"
                  use-input
                  fill-input
                  hide-selected
                  :options="discountTypeOptions"
                  hide-hint
                  @input="getSOListByDiscountType"
                  hide-bottom-space
                  :disable="
                    accessType !== 'CREATE' || updateDiscSuccesfull
                      ? true
                      : false
                  "
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Customer  information -->
      <q-expansion-item
        label="Customer Information"
        header-class="backgroundColor headingFont "
        class="q-mt-sm backgroundColor headingFont"
        expand-separator
        dense
        default-opened
      >
        <q-card class="shadow-1 greyBlackBgColor backgroundColor">
          <q-card-section>
            <div class="row">
              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="customerDetail.custName"
                  label="Customer Name"
                  :disable="true"
                />
              </div>

              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="customerDetail.custCode"
                  label="Customer Code"
                  :disable="true"
                />
              </div>
              <!-- </div>
              <div class="row q-mt-sm"> -->
              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="customerDetail.prsnlName"
                  label="Personnel Name"
                  :disable="true"
                />
              </div>

              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="customerDetail.prsnlCode"
                  label="Personnel Code"
                  :disable="true"
                />
              </div>
              <div class="col-md-3 col-sm-3 col-xs-12 q-mt-sm">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="customerDetail.pricTitle"
                  label="Price Title"
                  :disable="true"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <!-- Customer info closes -->
      <div class="col-md-3 col-sm-3 col-xs-12">
        <q-btn
          no-caps
          dense
          style="width: 100px; margin: 10px"
          class="q-mx-xs lightBlueBgColor text-white"
          @click="nevigateToQtsDoc"
          :disable="sqtDocDetail.sqtDocno ? false : true"
        >
          <span class="regularFontSize">View Quotation</span>
        </q-btn>
      </div>
      <!-- Parent Doc  information -->
      <q-expansion-item
        label="Parent Document"
        header-class="backgroundColor headingFont "
        class="backgroundColor headingFont"
        expand-separator
        dense
      >
        <q-card class="shadow-1 greyBlackBgColor backgroundColor">
          <q-card-section class="q-pt-none">
            <div class="row q-mt-sm">
              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="formData.docsDocCode"
                  label="Document Code"
                  :disable="true"
                />
              </div>
              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="formData.somDocNo"
                  label="Document No."
                  :disable="true"
                />
              </div>
              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="formData.docTypeDesc"
                  label="Document Type"
                  :disable="true"
                />
              </div>

              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="formData.warehouseDesc"
                  label="Warehouse"
                  :disable="true"
                />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="formData.somYear"
                  label="Year"
                  :disable="true"
                />
              </div>
              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  hide-hint
                  hide-bottom-space
                  dense
                  outlined
                  v-model="formData.somPeriod"
                  label="Period"
                  :disable="true"
                />
              </div>
              <div class="col-md-3 col-sm-3 col-xs-12">
                <q-input
                  :dark="$store.state.darkMode"
                  class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                  outlined
                  dense
                  label="Parent Doc Date"
                  type="date"
                  v-model="formData.somCreatedWhen"
                  :disable="true"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- <parent-document
          :warehouse="formData.warehouseDesc"
          :date="formData.somCreatedWhen"
          :docNumber="formData.somDocNo"
          :docCode="formData.docsDocCode"
          :docType="formData.docTypeDesc"
          :period="formData.somPeriod"
          :year="formData.somYear"
        ></parent-document> -->

      <!-- Discount Fields And Radio Buttons -->
      <q-card class="my-card backgroundColor q-px-xs q-mx-xs q-mt-sm">
        <q-card-section class="q-pa-sm">
          <div class="row q-mt-sm">
            <div class="">
              <div style="display: block">
                <q-radio
                  :dark="$store.state.darkMode"
                  color="primary"
                  keep-color
                  dense
                  size="sm"
                  label="Item Wise"
                  class="regularFontSize"
                  value="itemWise"
                  val="itemWise"
                  v-model="itemRadio"
                  :disable="accessType === 'readOnly' ? true : false"
                />
              </div>
              <div style="display: block">
                <q-radio
                  :dark="$store.state.darkMode"
                  color="primary"
                  keep-color
                  dense
                  size="sm"
                  label="Total"
                  class="regularFontSize"
                  value="total"
                  val="total"
                  v-model="itemRadio"
                  :disable="accessType === 'readOnly' ? true : false"
                />
              </div>
            </div>

            <div class="">
              <q-select
                :dark="$store.state.darkMode"
                class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                popup-content-class="regularFontSize"
                label="Select item"
                outlined
                dense
                options-dense
                v-model="discountItem"
                behavior="menu"
                use-input
                fill-input
                hide-selected
                :options="discountItemWise"
                hide-hint
                hide-bottom-space
                :disable="
                  itemRadio === 'total' || accessType === 'readOnly'
                    ? true
                    : false
                "
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-md-2 col-sm-2"></div>
            <div class="col-md-2 col-sm-2 col-xs-4 q-ml-md">
              <div style="display: block">
                <q-radio
                  :dark="$store.state.darkMode"
                  color="primary"
                  keep-color
                  dense
                  size="sm"
                  label="Discount In %"
                  class="regularFontSize"
                  value="discountInPercentage"
                  val="discountInPercentage"
                  v-model="amountRadio"
                  :disable="accessType === 'readOnly' ? true : false"
                  @input="amountTypeHanlder"
                />
              </div>
              <div style="display: block">
                <q-radio
                  :dark="$store.state.darkMode"
                  color="primary"
                  keep-color
                  dense
                  size="sm"
                  val="discountinAmount"
                  label="Discount In Amount"
                  class="regularFontSize"
                  value="discountinAmount"
                  v-model="amountRadio"
                  :disable="accessType === 'readOnly' ? true : false"
                  @input="amountTypeHanlder"
                />
              </div>
            </div>

            <div class="col-md-3 col-sm-3 col-xs-12">
              <q-input
                :dark="$store.state.darkMode"
                class="q-mx-md greyBlackBgColor regularFontSize color__blackOnDisabled"
                outlined
                dense
                :label="` ${
                  amountRadio === 'discountInPercentage'
                    ? ' Discount Percentage %'
                    : 'Discount Amount'
                }`"
                v-model="formData.discount"
                @change="discountHandler"
                hide-hint
                hide-bottom-space
                :disable="accessType === 'readOnly' ? true : false"
              />
            </div>

            <q-btn
              :disable="
                isUpdateBTN || formData.isSubmitted || tableData.length === 0
              "
              @click="updateDiscount"
              class="lightBlueBgColor"
              no-caps
              v-if="accessType !== 'readOnly'"
            >
              <span class="q-mr-xs regularFontSize text-white">Update</span>
              <q-icon size="14px" name="fa fa-download text-white" />
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

      <!-- Child Items  Table  -->
      <q-card class="my-card backgroundColor q-px-xs q-mx-xs q-py-sm q-mt-sm">
        <q-card-section class="q-pa-sm">
          <q-table
            :columns="tableColumns"
            :data="tableData"
            row-key="uniqueId"
            no-results-label="The filter didn't uncover any results"
            class="my-sticky-header-table my-sticky-column-table scroll-class"
            card-class="backgroundColor"
            :hide-pagination="false"
            flat
            :dark="$store.state.darkMode"
            dense
            :rows-per-page-options="[0]"
            separator="cell"
            table-class="scroll-class"
            bordered
            v-if="updateTable"
            :area-disable="accessType === 'readOnly' ? true : false"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn
                  dense
                  round
                  flat
                  class="lightBlueColor"
                  @click="clearItemDiscount(props.row)"
                  size="xs"
                  :disable="
                    accessType === 'CREATE' ||
                    accessType === 'update' ||
                    !props.row.lineDiscPolicyTag === 1
                      ? false
                      : true
                  "
                  title="Clear Discount"
                >
                  <!-- <i class="fas fa-minus-circle"></i> -->
                  <q-icon name="fas fa-minus-circle" class="lightBlueColor" />
                </q-btn>
              </q-td>
            </template>

            <template v-slot:body-cell-lineNarration="props">
              <q-td :props="props" style="width: 180px !important">
                <q-input
                  v-model="props.row.lineNarration"
                  class="no-padding no-margin super_small_input"
                  style="minwidth: 180px"
                  :dark="$store.state.darkMode"
                  dense
                  outlined
                  :disable="accessType === 'readOnly'"
                />
              </q-td>
            </template>

            <template v-slot:body-cell-PriceAdjAmnt="props">
              <q-td :props="props">
                {{ formatter(props.row.PriceAdjAmnt) }}
              </q-td>
            </template>
            <template v-slot:body-cell-sellingPrice="props">
              <q-td :props="props">
                {{ formatter(props.row.sellingPrice) }}
              </q-td>
            </template>
          </q-table>
        </q-card-section>
        <!-- lineNarration -->

        <span class="q-ml-sm"> Total Amount </span>
        <span class="q-ml-xs q-my-sm">
          <q-badge outline align="middle" color="primary" class="text-bold">
            {{ formatter(formData.sacSomAmount) }}
          </q-badge>
        </span>
        <template>
          <span class="q-ml-sm"> Policy Discount </span>
          <span class="q-ml-xs q-my-sm">
            <q-badge outline align="middle" color="primary" class="text-bold">
              {{ formatter(policyDiscount) }}
            </q-badge>
          </span>
        </template>
        <template>
          <span class="q-ml-sm"> Branch Discount </span>
          <span class="q-ml-xs q-my-sm">
            <q-badge outline align="middle" color="primary" class="text-bold">
              {{ formatter(BranchDiscount) }}
            </q-badge>
          </span>
        </template>
        <template>
          <span class="q-ml-sm"> Management Discount </span>
          <span class="q-ml-xs q-my-sm">
            <q-badge outline align="middle" color="primary" class="text-bold">
              {{ formatter(ManagmentDisc) }}
            </q-badge>
          </span>
        </template>

        <template>
          <span class="q-ml-sm"> Price Adjust </span>
          <span class="q-ml-xs q-my-sm">
            <q-badge outline align="middle" color="primary" class="text-bold">
              {{ formatter(priceAdjustmentTotal) }}
            </q-badge>
          </span>
        </template>

        <template>
          <span class="q-ml-sm"> Total Discount </span>
          <span class="q-ml-xs q-my-sm">
            <q-badge outline align="middle" color="primary" class="text-bold">
              {{ formatter(totalDiscount) }}
            </q-badge>
          </span>
        </template>
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

      <!-- Save And Submit Button -->
      <div class="row q-px-xs q-mx-xs q-my-md">
        <q-space />
        <template v-if="accessType !== 'update'">
          <q-btn
            @click="saveHandler('Save')"
            class="lightBlueBgColor q-ml-sm"
            no-caps
            v-if="accessType !== 'readOnly'"
            :disable="laoders.saveBtn"
          >
            <q-spinner-puff v-if="laoders.saveLoader" />
            <div v-else>
              <span class="q-mr-xs regularFontSize text-white">Save</span>
              <q-icon size="14px" name="far fa-save text-white" />
            </div>
          </q-btn>

          <q-btn
            @click="saveHandler('SaveAndSubmit')"
            class="lightBlueBgColor q-ml-sm"
            no-caps
            v-if="accessType !== 'readOnly'"
            :disable="laoders.saveAndSubmit"
          >
            <q-spinner-puff v-if="laoders.submitLoader" />
            <div v-else>
              <span class="q-mr-xs regularFontSize text-white"
                >Save & Submit</span
              >
              <q-icon size="14px" name="far fa-save text-white" />
            </div>
          </q-btn>

          <q-btn
            @click="submitDoc"
            class="lightBlueBgColor q-ml-sm"
            no-caps
            v-if="
              getCurrentScreenMode() === 'readOnly' &&
              formData.workFlowStatus === 0 &&
              !formData.isCancelled
            "
            :disable="isSubmitOnly"
          >
            <q-spinner-puff v-if="isSubmitOnly" />
            <div v-else>
              <span class="q-mr-xs regularFontSize text-white">Submit</span>
              <q-icon size="14px" name="far fa-save text-white" />
            </div>
          </q-btn>
        </template>
        <template else>
          <!-- updateDoc -->
          <q-btn
            class="lightBlueBgColor text-white q-mr-sm"
            no-caps
            @click="updateDoc"
            v-if="accessType === 'update'"
            :disable="isDocUpdate"
          >
            <q-spinner-puff v-if="updateBtnLoader" />
            <div v-else>
              <span class="q-mr-xs regularFontSize">Update</span>
              <q-icon size="14px" name="fas fa-save" />
            </div>
          </q-btn>
          <!-- update -->
          <q-btn
            class="lightBlueBgColor text-white q=ml-sm"
            no-caps
            @click="updateDoc('Approve')"
            v-if="accessType === 'update'"
            :disable="isDocUpdateApprove"
          >
            <q-spinner-puff v-if="updateAndApproveBtnLoader" />
            <div v-else>
              <span class="q-mr-xs regularFontSize">Update & Approve</span>
              <q-icon color="indigoLight" size="14px" name="fas fa-check" />
            </div>
          </q-btn>
        </template>

        <q-btn
          class="lightBlueBgColor text-white"
          no-caps
          @click="generateReport"
          v-if="
            accessType === 'readOnly' &&
            allAccessTypes.Print &&
            formData.workFlowStatus >= 1
          "
        >
          <span class="q-mr-xs regularFontSize">Print</span>
          <q-icon size="14px" name="fas fa-print" />
        </q-btn>
      </div>

      <!-- Customer List Modal -->
      <customer-list-dialog
        :customerList="customerList"
        :customerModal="showCustomerList"
        component="Discount"
        @submit="getCustomerFromDialog"
      />

      <!-- SO List Modal -->
      <discount-so-list-dialog
        :custSoList="customerSOList"
        :SOModal="showSolistModal"
        @submit="getCustSoList"
      />
    </div>
    <initial-loader v-else />
  </div>
  <access-not-allowed v-else />
</template>

<script>
import customerListDialogVue from "../components/customerListDialog.vue";
import documentTypes from "../../mixins/documentTypes";
import { getAllCustomer } from "../../service";
import DiscountSoListDialog from "../components/discountSoListDialog.vue";
// import parentDocument from "../components/parentDocument.vue";
import userPriviliges from "../../mixins/userPriviliges";

import Axios from "axios";
// import cstGroupListVue from "../customer/cstGroupList.vue";
export default {
  mixins: [userPriviliges, documentTypes],

  components: {
    "customer-list-dialog": customerListDialogVue,
    "discount-so-list-dialog": DiscountSoListDialog,
    // "parent-document": parentDocument,
  },

  async mounted() {
    this.isLoading = true;
    this.showDisplay = true;

    const { key } = this.$route.params;
    let paramData = key.split("_");

    console.log("Params ", paramData[paramData.length - 2]);

    this.accessType = paramData[paramData.length - 1];
    this.chechUserPriviliges(this.$route.query.id);

    var currentDate = this.$moment(
      new Date(this.$store.state.documentDate)
    ).format("YYYY-MM-DD");
    this.formData.date = currentDate;

    if (this.accessType.trim("") === "CREATE") {
      this.amountTypeHanlder();
      this.customerList = await getAllCustomer();
      this.getMainData();
      // this.getDiscountTypeList();
      // this.amountTypeHanlder();
      // this.itemRadioHandler();
      this.getDocumentTypes();
      this.$store.state.userCoreData.tbluserdiscountTypes.map((data) => {
        if (data.isManagement !== null) {
          this.discountTypeOptions.push(
            `${data.discountType}-${data.discountdesc}`
          );
          // return `${data.discountType}-${data.discountdesc}`;
        }
      });
      this.showDisplay = true;
    } else if (this.accessType.trim("") === "update") {
      this.getMainData();
      this.getDocumentByDetaile(paramData);
      this.getVerificationPolicy();
    } else {
      this.getMainData();
      this.getDocumentByDetaile(paramData);
      this.getVerificationPolicy();
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
    //this.$store.state.userPeriodNameList;
  },
  data() {
    return {
      tableColumns: [],
      tableData: [],
      accessType: "",
      docStatus: "Open",
      badgeColor: "headerTextColor",
      updateDiscSuccesfull: false,
      customerList: [],
      customerSOList: [],
      discountItemWise: [],
      discountItem: "",
      selectedDiscountItems: [],
      nonPoicyDiscountItems: [],
      discountLimitPercentage: 0,
      currentRow: {},
      updateBtnLoader: false,
      updateAndApproveBtnLoader: false,
      isDocUpdate: false,
      isUpdateBTN: false,
      isSubmitBTN: false,
      fieldsError: false,
      showDisplay: false,
      showCustomerList: false,
      showSolistModal: false,
      isSoListLoaded: false,
      isSubmitOnly: false,
      isLoading: false,
      modal: false,
      docIsApproved: "",
      updateTable: true,
      isApprovalProccesDone: false,
      isApprovalRequest: false,
      isDocUpdateApprove: false,
      laoders: {
        saveBtn: false,
        saveAndSubmit: false,
        saveLoader: false,
        submitLoader: false,
      },
      docTypeOptions: [],
      discountTypeOptions: [],
      SOPostData: {},
      verifyLevel: 0,
      verifyRules: [],
      totalDiscount: 0,
      ManagmentDisc: 0,
      BranchDiscount: 0,
      policyDiscount: 0,
      branchDiscAmountLimite: 0,
      allOverSODiscLimite: 0,
      itemDiscountLimitPer: 0,
      priceAdjustmentTotal: 0,
      netAmount: 0,
      isItemDiscountLimitPer: false,
      formData: {
        docTypeDescription: "",
        docCode: "DIS",
        docType: "",
        docNo: "00000",
        year: this.$store.state.userYear,
        month: this.getCurrentPeriod(),
        date: "",
        disTypeCode: "",
        somYear: "",
        somPeriod: "",
        somDocNo: "",
        docsDocCode: "",
        docTypeDesc: "",
        warehouseDesc: "",
        somCreatedWhen: "",
        discount: "",
        doctypCode: "",
        discTypeDescription: "",
        isSubmitted: false,
        sacSomAmount: "",
        isDiscountApproved: 0,
        isManagementDiscount: null,
      },

      sqtDocDetail: {},

      itemRadio: "itemWise",
      amountRadio: "discountinAmount",

      customerDetail: {
        custName: "",
        custCode: "",
        prsnlName: "",
        prsnlCode: "",
        pricTitle: "",
        cstg_Code: "",
      },
    };
  },
  methods: {
    callInitialFunctions() {},
    nevigateToQtsDoc() {
      let data = this.sqtDocDetail;
      this.$router
        .push({
          name: "Quotation",
          params: {
            key: `${data.sqtDocno}_${data.sqtPeriod}_${data.sqtDocType}_${data.sqtdocCode}_${data.sqtYear}_readOnly`,
          },
          query: {
            id: 64,
          },
        })
        .catch(() => {});
    },
    formatter(amount) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
      return formatter.format(amount).replace(/\$/g, "");
    },

    generateReport() {
      const { menuId } = this.$store.state.menu;
      this.$router.push({
        name: "report",
        params: {
          key: `${this.formData.docNo}_${this.formData.docType}_${this.formData.docCode}_${this.formData.year}_${this.formData.month}_${this.reportId}`,
        },
        query: {
          id: menuId,
        },
      });
    },

    isDiscountLimiteAcceed() {
      let totalBranchDisc = 0;
      let totalPolicyDisc = 0;
      let totalManagementDisc = 0;
      let totalPriceAdjDisc = 0;
      let netSaleOrderAmnt = 0;
      let totalAmount = 0;

      this.tableData.map((data) => {
        let chechNmbr = 0;

        data.BranchDisc = data.BranchDisc ? data.BranchDisc : 0;
        chechNmbr = Number(data.BranchDisc);
        console.log("brch2", chechNmbr);

        if (isNaN(chechNmbr)) {
          totalBranchDisc =
            totalBranchDisc + Number(data.BranchDisc.replace(/[^0-9.-]+/g, ""));
        } else {
          totalBranchDisc = totalBranchDisc + Number(data.BranchDisc);
        }

        totalBranchDisc = Number(totalBranchDisc.toFixed(2));

        if (data.policyAmount && isNaN(Number(data.policyAmount))) {
          totalPolicyDisc += Number(
            data.policyAmount.replace(/[^0-9.-]+/g, "")
          );
        } else {
          totalPolicyDisc +=
            Number(data.policyAmount) > 0 ? Number(data.policyAmount) : 0;
        }

        if (data.MngmtDisc && isNaN(Number(data.MngmtDisc))) {
          totalManagementDisc += Number(
            data.MngmtDisc.replace(/[^0-9.-]+/g, "")
          );
        } else {
          totalManagementDisc +=
            Number(data.MngmtDisc) > 0 ? Number(data.MngmtDisc) : 0;
        }

        if (data.PriceAdjAmnt && isNaN(Number(data.PriceAdjAmnt))) {
          totalPriceAdjDisc += Number(
            data.PriceAdjAmnt.replace(/[^0-9.-]+/g, "")
          );
        } else {
          totalPriceAdjDisc +=
            Number(data.PriceAdjAmnt) > 0 ? Number(data.PriceAdjAmnt) : 0;
        }

        if (data.amount && isNaN(Number(data.amount))) {
          totalAmount += Number(data.amount.replace(/[^0-9.-]+/g, ""));
        } else {
          totalAmount += Number(data.amount) > 0 ? Number(data.amount) : 0;
        }
      });

      netSaleOrderAmnt = totalAmount;
      netSaleOrderAmnt -= totalPriceAdjDisc;
      netSaleOrderAmnt -= totalManagementDisc;
      netSaleOrderAmnt -= totalPolicyDisc;

      let CalculateLimit = (
        (netSaleOrderAmnt / 100) *
        this.discountLimitPercentage
      ).toFixed(2);
      CalculateLimit = Number(CalculateLimit);

      totalBranchDisc = Math.round(totalBranchDisc);
      CalculateLimit = Math.round(CalculateLimit);

      if (Number(totalBranchDisc) > CalculateLimit) {
        return true;
      } else {
        return false;
      }
    },

    // DISCOUNT  LIMIT  CALCULATION AND VALIDATION
    isItemLimiteExceed(percentage) {
      let limitAcceedItems = [];

      this.tableData.map((itm) => {
        if (percentage > this.itemDiscountLimitPer) {
          limitAcceedItems.push(itm);
        }
      });

      if (limitAcceedItems.length > 0) {
        this.negativeNotification("Discount Limit Exceed Item Wise");
        this.isItemDiscountLimitPer = true;

        return this.isItemDiscountLimitPer;
      } else {
        this.isItemDiscountLimitPer = false;
        return this.isItemDiscountLimitPer;
      }
    },

    // UPDATE DISCOUNT DOCUMENT
    async updateDoc(actionType) {
      let discTypeCode = this.formData.discTypeDescription.split("-")[0];

      if (discTypeCode === "000001" && this.isDiscountLimiteAcceed()) {
        this.negativeNotification(
          `Discount value exceeding from per SO discount limit`
        );
        return;
      }

      if (this.isItemDiscountLimitPer) {
        this.negativeNotification(`Discount Limit Exceed Item Wise`);

        return;
      }

      this.isDocUpdate = true;
      this.isDocUpdateApprove = true;

      let { formData, tableData, customerDetail } = this;
      if (actionType === "Approve") {
        this.updateAndApproveBtnLoader = true;
      } else {
        this.updateBtnLoader = true;
      }
      let getTotalDiscAmt = 0;

      let childData = tableData.map((data) => {
        //get discount amount by discount type
        console.log(
          "🚀 ~ file: discountDoc.vue ~ line 817 ~ childData ~ data.BranchDisc",
          data.BranchDisc
        );
        data.BranchDisc = data.BranchDisc ? data.BranchDisc : (0).toString();
        if (formData.isManagementDiscount === 1) {
          getTotalDiscAmt =
            getTotalDiscAmt + Number(data.MngmtDisc?.replace(/[^0-9.-]+/g, ""));
        } else {
          getTotalDiscAmt =
            getTotalDiscAmt + Number(data.BranchDisc.replace(/[^0-9.-]+/g, ""));
        }
        return {
          year: formData.year,
          period: formData.month,
          docTypeCode: formData.docType,
          docCode: formData.docCode,
          docNo: formData.docNo,
          seqNo: data.sodSeqNo,
          itemCode: data.itemCode,
          isManagementDiscount: formData.isManagementDiscount,
          discountAmount:
            formData.isManagementDiscount === 1
              ? data.MngmtDisc
              : data.BranchDisc,
          discountPerc:
            formData.isManagementDiscount === 1
              ? data.MngmtPerc
              : data.BranchPerc,
          SodNarration: data.lineNarration,
        };
      });

      let currentHostUrl = window.location.origin;

      console.log("this.verifyLevel", this.verifyLevel);

      const postData = {
        year: formData.year,
        period: formData.month,
        docTypeCode: formData.docType,
        docCode: formData.docCode,
        docNo: formData.docNo,
        somDiscountamt: getTotalDiscAmt,
        isUpdateApprove: actionType === "Approve" ? true : false,
        workflowInstances: formData.workFlowInstance,
        discountDetails: childData,
        cstgNo: customerDetail.cstg_Code,
        cstCode: customerDetail.custCode,
        cstName: customerDetail.custName,
        disTypeCode: formData.disTypeCode,
        correlationId: formData.correlationId,
        isApproved: 1,
        workFlowStatus: formData.workFlowStatus,
        approvalLevel: this.verifyLevel < 2 ? 0 : 1,
        baseUrl: currentHostUrl,
        fileName: "discountDoc/record",
        isReadOnly: "readOnly",
        currentID: this.$store.state.menu.menuId,
      };

      try {
        const response = await Axios.post(
          `${this.url}/Discount/updateDiscountDoc`,
          postData
        );
        if (response.data.success) {
          this.positiveNotification(`${response.data.message}`);
          this.accessType = "readOnly";
        } else {
          this.negativeNotification(`${response.data.message}`);
        }
      } catch (err) {
        this.$store.dispatch("triggerUnauthorizedError", err);
        const newError = err.response || err;
        console.error(newError);
      }

      this.isDocUpdate = false;
      this.isDocUpdateApprove = false;
      this.updateAndApproveBtnLoader = false;
      this.updateBtnLoader = false;
    },

    checkDiscTypeOnUpdate() {
      // let discTypeCode = this.formData.discTypeDescription.split("-")[0];
      console.log(
        "🚀 ~ file: discountDoc.vue ~ line 1020 ~ checkDiscTypeOnUpdate ~ discTypeCode",
        this.formData.disTypeCode
      );
      if (this.formData.disTypeCode === "000001") {
        console.log("Branch Dicount");
      } else if (this.formData.disTypeCode === "000002") {
        console.log("Mang Dicount");
      }
    },

    async getCustDiscLimit() {
      // Discount/getCustomergrouplimit
      try {
        const response = await Axios.get(
          `${this.url}/Discount/getCustomergrouplimit?cstgCode=${this.customerDetail.cstg_Code}`
        );
        if (response.data.success) {
          this.discountLimitPercentage = response.data.data.so_Disclimitper;
          this.itemDiscountLimitPer = response.data.data.itemDiscountLimitPer;
        } else {
          this.negativeNotification(`${response.data.message}`);
        }
      } catch (err) {
        this.$store.dispatch("triggerUnauthorizedError", err);
        const newError = err.response || err;
        console.error(newError);
      }
    },

    // call submit api after user  only save  document
    async submitDoc() {
      let { customerDetail, formData } = this;
      //
      if (this.formData.workFlowStatus === 0) {
        let currentHostUrl = window.location.origin;
        // waiting for api

        const postData = {
          CstCode: customerDetail.custCode,
          cstgno: customerDetail.cstg_Code,
          SomYear: formData.somYear,
          SomPeriod: formData.somPeriod,
          totaldisdoc: formData.discount,
          DocsDocCode: formData.docCode,
          DoctypCode: formData.docType,
          SomDocNo: formData.docNo,
          SacSomAmount: formData.sacSomAmount,
          DisTypeCode: formData.disTypeCode,
          baseUrl: currentHostUrl,
          fileName: "discountDoc/record",
          isReadOnly: "readOnly",
          currentID: this.$store.state.menu.menuId,
          cstName: customerDetail.custName,
        };
        console.log("Post", postData);
        this.isSubmitOnly = true;
        try {
          const response = await Axios.post(
            `${this.url}/Discount/SubmitWorkFlow`,
            postData
          );
          if (response.data.success) {
            this.positiveNotification(`${response.data.message}`);
            this.formData.workFlowStatus = response.data.data.workFlowStatus;
          } else {
            this.negativeNotification(`${response.data.message}`);
          }
        } catch (err) {
          this.$store.dispatch("triggerUnauthorizedError", err);
          const newError = err.response || err;
          console.error(newError);
        }
        this.isSubmitOnly = false;
      } else {
        this.negativeNotification(
          `You Don't have Rights To Submit This Document`
        );
      }
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
    // WORK FLOW STATUS BADGE
    badgeStatusUpdate() {
      let badgeColor;
      let badgeLabel;
      if (this.formData.isCancelled) {
        badgeColor = "#707B7C";
        badgeLabel = "Cancelled";
        return {
          badgeLabel,
          badgeColor,
        };
      }

      //isDiscountApproved
      if (this.formData.workFlowStatus === 0) {
        badgeColor = "#707B7C ";
        badgeLabel = "Open";
      } else if (this.formData.workFlowStatus === 3) {
        badgeColor = "warning";
        badgeLabel = "Pending";
      } else if (
        this.formData.workFlowStatus === 2 &&
        this.formData.isDiscountApproved === 1
      ) {
        badgeColor = "positive";
        badgeLabel = "Approved";
      } else if (
        this.formData.workFlowStatus === 2 &&
        this.formData.isDiscountApproved === 0
      ) {
        badgeColor = "negative";
        badgeLabel = "Rejected";
      }

      return {
        badgeColor: badgeColor,
        badgeLabel: badgeLabel,
      };
    },

    // WORK FLOW BUTTON ENABLED / DISABLED ON WORK FLOW STATUS
    workFlow() {
      console.log(
        "Approvel Levwel ",
        this.verifyLevel,
        this.formData.approvalLevel,
        this.setVerifyLevel(this.formData.approvalLevel)
      );
      this.verifyLevel = this.setVerifyLevel(this.formData.approvalLevel);
      if (this.formData.isCancelled) {
        this.isApprovalRequest = false;
        return this.isApprovalRequest;
      }

      if (this.formData.workFlowStatus === 0) {
        this.isApprovalRequest = false;
      } else if (this.formData.workFlowStatus === 1) {
        this.isApprovalRequest = true;
      } else if (this.formData.workFlowStatus === 2) {
        this.isApprovalRequest = false;
      } else if (
        (this.formData.workFlowStatus === 3 && this.verifyLevel === 0) ||
        (this.verifyLevel === 1 && this.formData.approvalLevel === 1)
      ) {
        this.isApprovalRequest = false;
      } else if (
        this.formData.workFlowStatus === 3 &&
        this.verifyLevel === 2 &&
        this.formData.approvalLevel === 1
      ) {
        this.isApprovalRequest = true;
      } else if (
        this.formData.workFlowStatus === 3 &&
        this.verifyLevel === 1 &&
        this.formData.approvalLevel === 0
      ) {
        this.isApprovalRequest = true;
      } else if (
        this.formData.workFlowStatus === 3 &&
        this.verifyLevel === 3 &&
        this.formData.approvalLevel === 3
      ) {
        this.isApprovalRequest = true;
      } else if (
        this.formData.workFlowStatus === 3 &&
        this.verifyLevel === 4 &&
        this.formData.approvalLevel === 4
      ) {
        this.isApprovalRequest = true;
      }

      return this.isApprovalRequest;
    },

    // GET USER  PERIOD FROM SERVER
    getCurrentPeriod() {
      let period =
        this.$store.state.userPeriodNameList[this.$store.state.userPeriod - 1];
      return Number(period.split("-")[1]);
    },

    // CLEAR ITEM DISCOUNT ROW WISE
    clearItemDiscount(row) {
      // let totalBranchDisc = 0;
      let discTypeCode = this.formData.discTypeDescription.split("-")[0];
      this.updateTable = false;
      this.tableData.map((data) => {
        if (data.itemCode === row.itemCode) {
          if (discTypeCode === "000001") {
            data.BranchPerc = 0;
            data.BranchDisc = 0;
          } else if (discTypeCode === "000002") {
            data.MngmtPerc = 0;
            data.MngmtDisc = 0;
          }
        }
        return data;
      });

      this.isDiscountLimiteAcceed();
      this.callTotalDiscountAmount();
      this.updateTable = true;
    },

    // ADD DISCOUNT IN ITEMS
    updateDiscount() {
      this.selectedDiscountItems = [];
      this.updateTable = false;

      let discType = this.formData.discTypeDescription.split("-")[0];

      let isBrnchDisc = 0;
      let isMngDisc = 0;
      let netSaleOrderAmnt = 0;

      if (this.accessType === "CREATE") {
        this.SOPostData.soRows.map((data) => {
          isBrnchDisc = isBrnchDisc + data.discountAmount;
        });

        netSaleOrderAmnt = Number(
          (
            this.SOPostData.sacSomAmount - this.SOPostData.discountAmount
          ).toFixed(2)
        );
      } else if (this.accessType === "update") {
        this.nonPoicyDiscountItems.map((data) => {
          if (discType === "000001") {
            isMngDisc = isMngDisc + data.managementDiscountAmt;
          } else {
            isBrnchDisc = isBrnchDisc + data.branchDiscountAmt;
          }
        });

        netSaleOrderAmnt = Number(
          (
            this.SOPostData.sacSomAmount - this.SOPostData.totalPolicyAmt
          ).toFixed(2)
        );
      }

      netSaleOrderAmnt =
        discType === "000001"
          ? netSaleOrderAmnt - isBrnchDisc - isMngDisc
          : netSaleOrderAmnt;

      console.log(
        "(this.discountLimitPercentage ",
        this.discountLimitPercentage
      );

      let CalculateLimit = (
        (this.discountLimitPercentage / 100) *
        netSaleOrderAmnt
      ).toFixed(2);

      this.branchDiscAmountLimite = CalculateLimit;
      console.log("CalculateLimit ", CalculateLimit);

      var number = Number(this.formData.discount);
      let isAmountExceed = false;

      if (
        this.itemRadio === "total" &&
        this.amountRadio === "discountinAmount"
      ) {
        if (number > Number(CalculateLimit)) {
          isAmountExceed = true;
        } else {
          isAmountExceed = false;
        }
      } else {
        let CalculateLimitbyPerc = ((netSaleOrderAmnt / 100) * number).toFixed(
          2
        );

        if (
          this.itemRadio === "total" &&
          Number(CalculateLimitbyPerc) > Number(CalculateLimit)
        ) {
          isAmountExceed = true;
        } else {
          isAmountExceed = false;
        }
      }

      if (discType === "000001" && isAmountExceed) {
        //discussion
        this.updateTable = true;
        this.negativeNotification(
          `Discount value exceeding from per SO discount limit`
        );
        return;
      }
      if (
        this.formData.docTypeDescription === "" ||
        this.formData.docTypeDescription === null ||
        this.formData.docTypeDescription === undefined
      ) {
        this.negativeNotification("Please Select Document  Type");
        this.updateTable = true;
      } else if (
        this.formData.discTypeDescription === "" ||
        this.formData.discTypeDescription === null ||
        this.formData.discTypeDescription === undefined
      ) {
        this.negativeNotification("Please Select Discount Type");
        this.updateTable = true;
      } else if (
        number === "" ||
        number === null ||
        number === undefined ||
        number === 0
      ) {
        this.negativeNotification("Please Add Discount Amount");
        this.updateTable = true;
      } else {
        if (
          this.discountItem !== "" &&
          this.discountItem !== null &&
          this.discountItemWise.length > 0
        ) {
          if (this.amountRadio === "discountinAmount") {
            this.calculateDiscAmount("discountinAmount", number);
          } else {
            this.calculateDiscAmount("discountInPerc", number);
          }
        } else {
          this.negativeNotification("Please Select Item");
        }
      }

      this.updateTable = true;
    },

    // updateDiscountAmount() {

    //   let itemAmount = 0;
    //   let totalAmount = 0;
    //   let branchDiscAmount = 0;
    //   let mangDiscAmount = 0;
    //   let policyDiscAMount = 0;

    //   let discountType = this.formData.discTypeDescription.split("-")[0];
    //   let isBranchDics = discountType === "000001" ? true : false
    //   let selectedItemCode = this.discountItem?.split("-")[0]
    //   let AMOUNT = 0;

    //   if(this.amountRadio === "discountinAmount"){
    //     AMOUNT = Number(this.formData.discount);
    //   }else {
    //     AMOUNT = Number(this.formData.discount);
    //     AMOUNT = (totalAmount / 100) * AMOUNT
    //   }

    //   this.tableData.map(i => {
    //     i.amount = i.amount ? this.formatToNumber(i.amount) : String(0)
    //     totalAmount += i.amount
    //   })

    //   this.tableData.map((itm) => {

    //     //converting curruncy format to intiger
    //     itm.BranchDisc = itm.BranchDisc ? this.formatToNumber(itm.BranchDisc) : String(0)
    //     itm.MngmtDisc = itm.MngmtDisc ? this.formatToNumber(itm.MngmtDisc) : String(0)
    //     itm.policyAmount = itm.policyAmount ? this.formatToNumber(itm.policyAmount) : String(0)
    //     itm.amount = itm.amount ? this.formatToNumber(itm.amount) : String(0)

    //     if (this.itemRadio === 'total') {

    //       if (discountType === "000001") {
    //         itemAmount = (itm.amount - itm.policyAmount) - itm.MngmtDisc
    //         itm.BranchDisc = ((itemAmount / totalAmount) * AMOUNT).toFixed(2)

    //       } else if (discountType === "000002") {
    //         itemAmount = (itm.amount - itm.policyAmount) - itm.BranchDisc
    //         itm.MngmtDisc = ((itemAmount / totalAmount) * AMOUNT).toFixed(2)
    //       }

    //     } else {
    //       if (itm.itemCode === selectedItemCode) {
    //         itemAmount = itm.amount
    //       }
    //     }
    //   })
    // },

    // DISCOUNT AMOUNT CALCULATION
    calculateDiscAmount(discType, discAmount) {
      let discTypeCode = this.formData.discTypeDescription.split("-")[0];
      let selectedItemCode;

      let isBrnchDisc = 0;
      // let isMngDisc = 0;

      let totalAmount = 0;

      // Calculate Total Items  Amount form itmes
      this.tableData.map((accumulator) => {
        let amount = accumulator.amount.replace(/[^0-9.-]+/g, "");
        totalAmount = Number(totalAmount) + Number(amount);
      });

      //  Policy discount minus from items total amount
      if (this.policyDiscount > 0) {
        totalAmount = totalAmount - this.policyDiscount;
      }

      // if user select all to add discount
      if (this.itemRadio.trim("") === "total") {
        selectedItemCode = null;

        // if user select item wise discount
      } else if (this.itemRadio.trim("") === "itemWise") {
        // user select Single item
        selectedItemCode = this.discountItem?.split("-")[0];
      }

      // ------calculate amount if user given discount in Amount---------//
      if (discType === "discountinAmount") {
        // ------if user add discount in single item ------//
        if (selectedItemCode) {
          this.tableData.map((data) => {
            // filter user selected item from table
            if (selectedItemCode.trim("") === data.itemCode) {
              let itemTotalAmount = Number(
                data.amount.replace(/[^0-9.-]+/g, "")
              );

              // get branch discount amount  if user add managment type discount
              if (data.BranchDisc) {
                isBrnchDisc = Number(
                  data.BranchDisc?.replace(/[^0-9.-]+/g, "")
                );
              }
              // minus branch discount from total amount and  apply managment discount on net amount
              if (!isNaN(isBrnchDisc)) {
                itemTotalAmount =
                  discTypeCode === "000002"
                    ? Number(itemTotalAmount) - Number(isBrnchDisc)
                    : itemTotalAmount;
              }
              // minus policy discount from total amount
              if (data.policyAmount) {
                itemTotalAmount =
                  itemTotalAmount -
                  Number(data.policyAmount.replace(/[^0-9.-]+/g, ""));
              }

              if (data.PriceAdjAmnt > 0) {
                itemTotalAmount = itemTotalAmount - data.PriceAdjAmnt;
              }

              // if branch type  Discount selwecteed
              if (discTypeCode === "000001") {
                let perc = Number(
                  ((discAmount / itemTotalAmount) * 100).toFixed(2)
                );
                if (!this.isItemLimiteExceed(perc)) {
                  data.BranchDisc = this.formatToCurrency(discAmount);
                  data.BranchPerc = perc;
                }
              } else {
                // if manager type discount selectd
                data.MngmtPerc = Number(
                  ((discAmount / itemTotalAmount) * 100).toFixed(2)
                );
                data.MngmtDisc = this.formatToCurrency(discAmount);
                // this.isItemLimiteExceed(data.MngmtPerc)
              }
            }
          });

          //------ if user add discount in total amount ----//
        } else {
          // ------user select discount in Percentage----//
          this.tableData.map((data) => {
            let itemTotalAmount = Number(data.amount.replace(/[^0-9.-]+/g, ""));

            // minus policy discount in total amount
            if (data.policyAmount) {
              itemTotalAmount =
                itemTotalAmount -
                Number(data.policyAmount.replace(/[^0-9.-]+/g, ""));
            }

            // minus branch discount from total amount and  apply managment discount on net amunt
            if (data.BranchDisc) {
              isBrnchDisc = Number(data.BranchDisc?.replace(/[^0-9.-]+/g, ""));
            }
            if (data.PriceAdjAmnt > 0) {
              itemTotalAmount = itemTotalAmount - data.PriceAdjAmnt;
            }
            if (!isNaN(isBrnchDisc)) {
              itemTotalAmount =
                discTypeCode === "000002"
                  ? Number(itemTotalAmount) - Number(isBrnchDisc)
                  : itemTotalAmount;
            }

            // get  prorate  amount from total amount
            let afterDivededRatio = Number(itemTotalAmount / totalAmount);
            let afterDiscAmount = (afterDivededRatio * discAmount).toFixed(2);

            console.log("Debug_1", {
              Ratio: afterDivededRatio,
              ProRateAmount: afterDiscAmount,
            });

            // if branch type  Discount selwecteed
            if (discTypeCode === "000001") {
              let perc = Number(
                ((afterDiscAmount / itemTotalAmount) * 100).toFixed(2)
              );
              if (!this.isItemLimiteExceed(perc)) {
                data.BranchDisc = this.formatToCurrency(
                  Number(afterDiscAmount)
                );
                data.BranchPerc = perc;
              }
            } else {
              data.MngmtPerc = Number(
                ((afterDiscAmount / itemTotalAmount) * 100).toFixed(2)
              );
              data.MngmtDisc = this.formatToCurrency(Number(afterDiscAmount));
            }
          });
        }

        //--------- if user select discount in percentege -------//
      } else {
        //----user add discount in single item ----//
        if (selectedItemCode) {
          this.tableData.map((data) => {
            if (selectedItemCode.trim("") === data.itemCode) {
              let itemTotalAmount = Number(
                data.amount.replace(/[^0-9.-]+/g, "")
              );

              // minus policy discount from total amount
              if (data.policyAmount) {
                itemTotalAmount =
                  itemTotalAmount -
                  Number(data.policyAmount.replace(/[^0-9.-]+/g, ""));
              }

              // minus branch discount from total amount and  apply managment discount on net amunt
              if (data.BranchDisc) {
                isBrnchDisc = Number(
                  data.BranchDisc?.replace(/[^0-9.-]+/g, "")
                );
              }
              if (data.PriceAdjAmnt > 0) {
                itemTotalAmount = itemTotalAmount - data.PriceAdjAmnt;
              }
              if (!isNaN(isBrnchDisc)) {
                itemTotalAmount =
                  discTypeCode === "000002"
                    ? Number(itemTotalAmount) - Number(isBrnchDisc)
                    : itemTotalAmount;
              }

              // if discount add as branch type
              if (discTypeCode === "000001") {
                let perc = Number(discAmount.toFixed(2));
                if (!this.isItemLimiteExceed(perc)) {
                  data.BranchDisc = this.formatToCurrency(
                    (itemTotalAmount / 100) * discAmount
                  );

                  data.BranchPerc = perc;
                }
              } else {
                data.MngmtDisc = this.formatToCurrency(
                  (itemTotalAmount / 100) * discAmount
                );
                data.MngmtPerc = Number(discAmount.toFixed(2));
                // this.isItemLimiteExceed(data.MngmtPerc)
              }
            }
          });

          //------ if user add discount in total amount ----//
        } else {
          this.tableData.map((data) => {
            let itemTotalAmount = Number(data.amount.replace(/[^0-9.-]+/g, ""));

            if (data.policyAmount) {
              // minus policy amount from total amount
              itemTotalAmount =
                itemTotalAmount -
                Number(data.policyAmount.replace(/[^0-9.-]+/g, ""));
            }
            if (data.PriceAdjAmnt > 0) {
              itemTotalAmount = itemTotalAmount - data.PriceAdjAmnt;
            }

            if (data.BranchDisc) {
              isBrnchDisc = Number(data.BranchDisc?.replace(/[^0-9.-]+/g, ""));
            }

            if (!isNaN(isBrnchDisc)) {
              // minus branch discount from total amount and  apply managment discount on net amunt
              itemTotalAmount =
                discTypeCode === "000002"
                  ? Number(itemTotalAmount) - Number(isBrnchDisc)
                  : itemTotalAmount;
            }

            if (discTypeCode === "000001") {
              let perc = Number(discAmount.toFixed(2));
              if (!this.isItemLimiteExceed(perc)) {
                data.BranchDisc = this.formatToCurrency(
                  Number((itemTotalAmount / 100) * discAmount)
                );
                data.BranchPerc = perc;
              }
              //
            } else {
              data.MngmtDisc = this.formatToCurrency(
                Number((itemTotalAmount / 100) * discAmount)
              );
              data.MngmtPerc = Number(discAmount.toFixed(2));
              // this.isItemLimiteExceed(data.MngmtPerc)
            }
          });
        }
      }
      // total discount amount and branch

      if (!this.isItemLimiteExceed()) {
        this.callTotalDiscountAmount();
      }
      //
    },

    // CALCULATE  TOTAL DISCOUNT AMOUNT
    callTotalDiscountAmount() {
      let totalBranchDiscount = 0;
      let totalMngmtDiscount = 0;
      let totalPolicyDiscount = 0;
      this.priceAdjustmentTotal = 0;
      this.netAmount = 0;
      let totalAmount = 0;

      this.tableData.map((data) => {
        let amountBr = data.BranchDisc ? Number(data.BranchDisc) : 0;
        let amountMr = data.MngmtDisc ? Number(data.MngmtDisc) : 0;
        let amountPol = data.policyAmount ? Number(data.policyAmount) : 0;
        let amount = data.amount ? Number(data.amount) : 0;
        let totalADjstAmnt = Number(data.priceAdjustmentAmt);
        console.log(" data.priceAdjustmentAmt", data.priceAdjustmentAmt);
        if (isNaN(amountBr)) {
          amountBr = data.BranchDisc
            ? Number(data.BranchDisc.replace(/[^0-9.-]+/g, ""))
            : 0;
        }
        if (isNaN(amountMr)) {
          amountMr = data.MngmtDisc
            ? Number(data.MngmtDisc.replace(/[^0-9.-]+/g, ""))
            : 0;
        }
        if (isNaN(amountPol)) {
          amountPol = data.policyAmount
            ? Number(data.policyAmount.replace(/[^0-9.-]+/g, ""))
            : 0;
        }
        if (isNaN(amount)) {
          amount = data.amount
            ? Number(data.amount.replace(/[^0-9.-]+/g, ""))
            : 0;
        }
        // if (isNaN(totalADjstAmnt)) {
        //   totalADjstAmnt = data.priceAdjustmentAmt
        //     ? Number(data.priceAdjustmentAmt.replace(/[^0-9.-]+/g, ""))
        //     : 0;
        // }

        totalBranchDiscount = totalBranchDiscount + Number(amountBr);
        totalMngmtDiscount = totalMngmtDiscount + Number(amountMr);
        totalPolicyDiscount = totalPolicyDiscount + Number(amountPol);
        totalAmount += amount;
        this.priceAdjustmentTotal += Number(totalADjstAmnt);
      });
      this.ManagmentDisc = totalMngmtDiscount;
      this.BranchDiscount = totalBranchDiscount;
      this.policyDiscount = totalPolicyDiscount;
      this.totalDiscount =
        totalBranchDiscount +
        totalMngmtDiscount +
        (totalPolicyDiscount + this.priceAdjustmentTotal);
      console.log(
        " callTotalDiscountAmount ~ this.priceAdjustmentTotal",
        this.priceAdjustmentTotal
      );

      this.netAmount = totalAmount - this.totalDiscount;
    },

    // OPEN CUSTOMER SO LIST DIALOG
    SOListHandler() {
      if (
        this.formData.discTypeDescription !== "" &&
        this.formData.discTypeDescription !== null &&
        this.formData.discTypeDescription !== undefined
      ) {
        this.showSolistModal = !this.showSolistModal;
      } else {
        this.negativeNotification("Please Select Discount Type  ");
      }
    },

    // CALCULATE PRORATE AMOUNT
    getProRateAmoun(totalAmount, itemAmount, discount) {
      let afterDivededRatio = itemAmount / totalAmount;
      let afterDiscAmount = (afterDivededRatio * discount).toFixed(2);
      return Number(afterDiscAmount);
    },

    // GET USER VERIFY LEVEL
    async getVerificationPolicy() {
      try {
        const response = await Axios.get(
          `${this.url}/SaleOrder/GetSOVerifyPolicy?DocCode=${this.formData.docCode}`
        );

        if (response.data.data && response.data.data.length > 0) {
          response.data.data.map((rule) => {
            if (rule.docCode === "DIS") {
              this.verifyRules.push(rule);
              this.verifyLevel = rule.verifyLevel;
            }
          });
        }
      } catch (err) {
        this.$store.dispatch("triggerUnauthorizedError", err);
        const newError = err.response || err;
        console.error(newError);
      }
    },

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

    // DOCUMENT APROVAL AND REJECTION HANDLING
    async callApprovalHandler(action) {
      let currentHostUrl = window.location.origin;
      let approvedBy;
      let isDocumentApproved = false;
      const { currentRow } = this;

      console.log(
        "Approval Level ",
        this.setVerifyLevel(currentRow.approvalLevel),
        currentRow.approvalLevel
      );

      this.verifyLevel = this.setVerifyLevel(currentRow.approvalLevel);
      if (!this.verifyLevel) {
        this.negativeNotification(
          ` You Have Don't Rights To Approve This Document `
        );
        return;
      }

      if (this.verifyLevel === 0 && currentRow.approvalLevel === 0) {
        approvedBy = 0;
        isDocumentApproved = true;
      } else if (this.verifyLevel === 1 && currentRow.approvalLevel === 0) {
        approvedBy = 0;
        isDocumentApproved = true;
      } else if (
        this.verifyLevel === 0 ||
        (this.verifyLevel === 1 && currentRow.approvalLevel === 1)
      ) {
        approvedBy = 0;
        isDocumentApproved = false;
      } else if (this.verifyLevel === 2 && currentRow.approvalLevel === 1) {
        approvedBy = 1;
        isDocumentApproved = true;
      } else if (this.verifyLevel === 2 && currentRow.approvalLevel === 0) {
        approvedBy = 1;
        isDocumentApproved = false;
      } else if (this.verifyLevel === 3 && currentRow.approvalLevel === 3) {
        approvedBy = 3;
        isDocumentApproved = true;
      } else if (this.verifyLevel === 4 && currentRow.approvalLevel === 4) {
        approvedBy = 4;
        isDocumentApproved = true;
      }
      if (isDocumentApproved) {
        const postData = {
          WorkflowInstanceId: currentRow.workFlowInstance,
          CorrelationId: currentRow.correlationId,
          ApprovalLevel: approvedBy,
          IsApproved: action === "approve" ? 1 : 0,
          WorkflowStatus: 0,
          SomDocNo: currentRow.somDocNo,
          DocsDocCode: currentRow.docsDocCode,
          DoctypCode: currentRow.doctypCode,
          SomYear: currentRow.somYear,
          SomPeriod: currentRow.somPeriod,
          Cstgno: currentRow.cstgno,
          Totaldiscount: currentRow.somDiscountamt,
          baseUrl: currentHostUrl,
          fileName: "discountDoc/record",
          isReadOnly: "readOnly",
          currentID: this.$store.state.menu.menuId,
          cstcode: currentRow.cstCode,
          cstname: currentRow.cstName,
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
                  key: `${currentRow.somDocNo}_${currentRow.somPeriod}_${currentRow.doctypCode}_${currentRow.docsDocCode}_${currentRow.somYear}_readOnly`,
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
          `You Dont Hava  Rights To Approved This Document ${currentRow.docNumber} `
        );
      }
    },

    // GET DOCUMENT DETAILES IN READ ONLY MODE
    async getDocumentByDetaile(detaile) {
      this.updateTable = false;
      try {
        const response = await Axios.get(
          `${this.url}/Discount/GetDiscountDocumentbyCodeAsync?docNo=${detaile[0]}&period=${detaile[1]}&docTypeCode=${detaile[2]}&docCode=${detaile[3]}&year=${detaile[4]}`
        );
        console.log(
          "🚀 ~ file: discountDoc.vue ~ line 1273 ~ getDocumentByDetaile ~ response",
          response
        );

        if (response.data.data && response.data.data.length > 0) {
          let documentDetail = response.data.data[0];
          this.currentRow = response.data.data[0];

          if (
            this.accessType === "update" &&
            documentDetail.workFlowStatus === 2
          ) {
            this.$tabs.close();
            return;
          }

          this.formData = {
            discTypeDescription:
              documentDetail.disTypeCode + "-" + documentDetail.discountdesc,
            docTypeDescription: documentDetail.docTypeDesc,
            docCode: documentDetail.docsDocCode,
            docType: documentDetail.doctypCode,
            docNo: documentDetail.somDocNo,
            year: documentDetail.somYear,
            month: documentDetail.somPeriod,
            date: this.getDocDate(documentDetail.somCreatedWhen),
            disTypeCode: documentDetail.disTypeCode,
            somYear: documentDetail.somYear,
            somPeriod: documentDetail.somPeriod,
            somDocNo: documentDetail.somParentrefdocno,
            docsDocCode: documentDetail.somParentrefdoccode,
            docTypeDesc: documentDetail.parendDocTypeDesc,
            warehouseDesc: documentDetail.warehouseDesc,
            somCreatedWhen: this.getDocDate(documentDetail.parentDate),
            // isSubmitted:
            // this.accessType === "readOnly" &&
            //   documentDetail.workFlowStatus === 0 ||
            //   documentDetail.workFlowStatus === null ||
            //   documentDetail.workFlowStatus === undefined
            //     ? false
            //     : true,
            doctypCode: "",
            sacSomAmount: documentDetail.sacSomAmount,
            discount: documentDetail.somDiscountamt,
            workFlowStatus: documentDetail.workFlowStatus,
            approvalLevel: documentDetail.approvalLevel,
            isDiscountApproved: documentDetail.isDiscountApproved,
            isCancelled: documentDetail.isCancelled,
            isManagementDiscount: documentDetail.isManagementDiscount,
            workFlowInstance: documentDetail.workFlowInstance,
            correlationId: documentDetail.correlationId,
          };
          this.sqtDocDetail = {
            sqtDocType: documentDetail.sqtDocType,
            sqtDocno: documentDetail.sqtDocno,
            sqtPeriod: documentDetail.sqtPeriod,
            sqtYear: documentDetail.sqtYear,
            sqtdocCode: documentDetail.sqtdocCode,
          };
          this.customerDetail = {
            custName: documentDetail.cstName,
            custCode: documentDetail.cstCode,
            prsnlName: documentDetail.prsnlname,
            prsnlCode: documentDetail.prsnlCode,
            pricTitle: documentDetail.pricedesc,
            cstg_Code: documentDetail.cstgno,
          };

          this.nonPoicyDiscountItems = documentDetail.discountSaleOrders;
          this.SOPostData = documentDetail;
          this.tableData = documentDetail.discountSaleOrders.map((data) => {
            this.discountItemWise.push(
              `${data.itmItemCode} - ${data.itmItemDesc}`
            );
            //priceAdjustmentPer
            return {
              PriceAdjAmnt: data.priceAdjustmentAmt,
              priceAdjAPerc: Number(data.priceAdjustmentPer.toFixed(2)),
              itemCode: data.itmItemCode,
              itemDetailDescription: data.itmItemDesc,
              soQuantity: data.sodQty,
              stockTypeDesc: data.sktDesc,
              batchNo: data.sodBatchNo,
              sellingPrice: Number(data.sodRate.toFixed(2)),
              sodSeqNo: data.sodSeqNo,
              amount: this.formatToCurrency(data.sodRate * data.sodQty),
              BranchDisc: data.branchDiscountAmt
                ? this.formatToCurrency(data.branchDiscountAmt)
                : 0,
              BranchPerc: data.branchDiscountAmtPer
                ? Number(data.branchDiscountAmtPer.toFixed(2))
                : 0,
              MngmtDisc: data.managementDiscountAmt
                ? this.formatToCurrency(data.managementDiscountAmt)
                : 0,
              MngmtPerc: data.managementDiscountAmtPer
                ? Number(data.managementDiscountAmtPer.toFixed(2))
                : 0,
              policyAmount: data.sodDiscountAmt
                ? this.formatToCurrency(data.sodDiscountAmt)
                : 0,
              policyPerc: data.sodDiscountAmtPer
                ? Number(data.sodDiscountAmtPer.toFixed(2))
                : 0,
              discPolicyTag: data.sodDiscpolicyTag === 1 ? "Yes" : "No",
              lineNarration: data.sodNarration,
              priceAdjustmentAmt: data.priceAdjustmentAmt,
            };
          });
        }
        console.log("this form Data", this.formData);
        console.log("this customerDetail", this.customerDetail);
        console.log("this this.sqtDocDetail", this.sqtDocDetail);
        this.workFlow();
        this.callTotalDiscountAmount();
        this.checkDiscTypeOnUpdate();
        if (this.accessType.trim("") === "update") {
          this.getCustDiscLimit();
        }
        this.badgeStatusUpdate();
        this.showDisplay = true;
        this.updateTable = true;
      } catch (err) {
        this.showDisplay = true;
        this.updateTable = true;
        this.$store.dispatch("triggerUnauthorizedError", err);
        const newError = err.response || err;
        console.error(newError);
      }
    },

    // DOCUMENT DATE FORMATING
    getDocDate(data) {
      var currentDate = this.$moment(new Date(data)).format("YYYY-MM-DD");
      return currentDate;
    },

    // HANDLING DISCOUNT DOCUMENT ON SAVE
    async saveHandler(saveType) {
      let discTypeCode = this.formData.discTypeDescription.split("-")[0];

      let currentDiscount = Number(this.BranchDiscount.toFixed(2));
      console.log(
        "🚀 ~ file: discountDoc.vue ~ line 1789 ~ saveHandler ~ discountAmountLimit",
        this.BranchDiscount,
        currentDiscount
      );

      if (discTypeCode === "000001" && this.isDiscountLimiteAcceed()) {
        this.negativeNotification(
          `Discount value exceeding from per SO discount limit`
        );
        this.laoders = {
          saveAndSubmit: false,
          saveBtn: false,
          saveLoader: false,
          submitLoader: false,
        };
        return;
      }

      console.log("this.isItemLimiteExceed()", this.isItemDiscountLimitPer);

      if (discTypeCode === "000001" && this.isItemDiscountLimitPer) {
        this.negativeNotification(`Discount Limit Exceed Item Wise`);
        this.laoders = {
          saveAndSubmit: false,
          saveBtn: false,
          saveLoader: false,
          submitLoader: false,
        };
        return;
      }
      let { SOPostData, formData, customerDetail } = this;
      this.fieldsError = true;

      let currentHostUrl = window.location.origin;

      let childData = this.tableData;

      formData.custCode = customerDetail.custCode;

      // important condition check user filled up all field with parent data and customer
      for (let key in formData) {
        if (
          key === "docTypeDescription" ||
          key === "discTypeDescription" ||
          key === "somDocNo" ||
          key === "custCode"
        ) {
          if (
            formData[key] === "" ||
            formData[key] === null ||
            formData[key] === undefined
          ) {
            this.fieldsError = true;
          } else {
            this.fieldsError = false;
          }
        }
      }

      //discTypeDescription
      // if user filled up all field then run this condition
      if (!this.fieldsError) {
        let totalDiscountAmount = 0;
        let totalPolicyAmount = 0;

        childData = childData.map((data) => {
          // sum of policy discount added items
          if (data.lineDiscPolicyTag === 1) {
            totalPolicyAmount = totalPolicyAmount + data.discountAmount;
          }
          // sum of user given discount in this form
          if (discTypeCode === "000001" && data.BranchDisc) {
            let amountDisc = Number(data.BranchDisc?.replace(/[^0-9.-]+/g, ""));
            totalDiscountAmount = Number(
              (totalDiscountAmount + amountDisc).toFixed(2)
            );
          } else {
            totalDiscountAmount = totalDiscountAmount + 0;
          }
          if (discTypeCode === "000002" && data.MngmtDisc) {
            let amountDisc = Number(data.MngmtDisc?.replace(/[^0-9.-]+/g, ""));
            totalDiscountAmount = Number(
              (totalDiscountAmount + amountDisc).toFixed(2)
            );
          } else {
            totalDiscountAmount = totalDiscountAmount + 0;
          }
          //map documment all  item  data for posting
          return {
            DisTypeCode: discTypeCode,
            isManagementDiscount: discTypeCode === "000001" ? 0 : 1,
            policytag: data.lineDiscPolicyTag ? data.lineDiscPolicyTag : 0,
            MngmtDisc: data.MngmtDisc,
            BranchDisc: data.BranchDisc,
            SomCoCode: SOPostData.coCode,
            SomBrCode: SOPostData.brCode,
            SomSiteCode: SOPostData.siteCode,
            SomYear: formData.year,
            SomPeriod: formData.month,
            DocsDocCode: formData.docCode,
            DoctypCode:
              this.documentTypeObject[this.formData.docTypeDescription],
            SomDocNo: null,
            SodSeqNo: null,
            ItmItemCode: data.itemCode,
            SodSellingQty: data.boxQty,
            SodSellingUnitCode: data.sellUnitCode,
            SodStoringUnitCode: data.storeUnitCode,
            SodConversion: data.conversion,
            SodQty: data.soQuantity,
            SodQtyRemain: data.remainingQuantity,
            SodRate: data.sellingPrice,
            SodBonusQty: null,
            SodDiscountAmt:
              discTypeCode === "000001" ? data.BranchDisc : data.MngmtDisc,
            SodDiscountAmtPer:
              discTypeCode === "000001" ? data.BranchPerc : data.MngmtPerc,
            SodBatchNo: data.batchNo,
            SodNarration: data.lineNarration,
            SodCreatedBy: data.createdBy,
            SodModifiedBy: data.modifiedBy,
            SodCreatedWhen: data.createdWhen,
            SodModifiedWhen: data.modifiedWhen,
            SodMrp: null,
            SodDeliveryDate: null,
            SodInclRate: null,
            SodSalestaxper: null,
            SodSalestax: null,
            SodRateBefConv: data.rateBeforeConv,
            DtrTag: null,
            DtrPacketno: null,
            SodFtaxper: null,
            SodFtaxamt: null,
            PlmCode: null,
            SodRateBconFc: null,
            SodRateFc: null,
            PolmCodeD: data.lineDiscPolicyCode,
            IncmCode: null,
            SodBonuspacks: null,
            SodBonusqtyRemain: null,
            SodExtraQty: null,
            SodCharges1: data.deliveryCharges,
            SodCharges2: data.packingCharges,
            SodCharges3: data.installationCharges,
            SodDiscountamtRcvrd: data.discountAmtRcvrd,
            SodDiscountperRcvrd: data.discountPerc,
            PrsnlCodeD: data.personnelCode,
            DeptCodeD: data.departmentCode,
            SodCharges4: data.charges4,
            SodCharges5: data.charges5,
            SodConversion3: data.conversion3,
            SodQty3: data.quantity3,
            SodSedPer: null,
            SodSedAmt: null,
            InvdCcId1: null,
            InvdCcId2: null,
            InvdCcId3: null,
            InvdCcId4: null,
            SodCharges1Qty: null,
            SodCharges1Rate: null,
            SodNarration2: null,
            SodTechInfo1: data.itemDetailDescription,
            SodTechInfo2: null,
            SodTechInfo3: null,
            SodTechInfo4: null,
            SodTechInfo5: null,
            SodTechInfo6: null,
            SodParentrefseqno: data.parentRefSeqNo,
            SodFedPer: null,
            SodFedAmt: null,
            SodBarcode: null,
            SodMfgDate: null,
            SodExpiryDate: null,
            SodQcRevalidDate: null,
            WrntCode: null,
            SodStaxPerExcise: null,
            SodCharges1Pu: data.deliveryChgPerUnit,
            SodCharges2Pu: data.packingChgPerUnit,
            SodCharges3Pu: data.installationChgPerUnit,
            SodCharges4Pu: data.charges4PerUnit,
            SodCharges5Pu: data.charges5PerUnit,
            SodDiscpolicyTag: data.lineDiscPolicyTag,
            IsDiscountApproved: null,
            AppBr: null,
            AppDt: null,
            SktCode: data.stockType,
          };
        });

        // map so and discount form  data for posting
        const postData = {
          totalpolicyamt: totalPolicyAmount,
          totaldisdoc: totalDiscountAmount,
          CstCode: SOPostData.customerCode,
          LocCode: SOPostData.inventoryWarehouse,
          DocsDocCode: formData.docCode,
          SomDate: formData.date,
          SomDocNo: formData.docNo,
          DoctypCode: this.documentTypeObject[this.formData.docTypeDescription],
          SomNarration: SOPostData.narration,
          SomPeriod: formData.month,
          PrctCode: SOPostData.priceTitle,
          SomRefNo1: SOPostData.reference1,
          SomRefDate1: SOPostData.reference1Date,
          SomRefNo2: SOPostData.reference2,
          SomRefNo3: SOPostData.reference3,
          SomRefDate3: SOPostData.reference3Date,
          SomYear: formData.year,
          SomVerified: SOPostData.verifyStatus?.split("-")[1],
          SomVerifiedby: SOPostData.verifiedBy,
          SomVerifiedwhen: SOPostData.somVerifiedwhen,
          IsClosed: SOPostData.isClosed,
          SomCoCode: SOPostData.coCode,
          SomBrCode: SOPostData.brCode,
          SomSiteCode: SOPostData.siteCode,
          SomCreatedBy: SOPostData.createdBy,
          PrsnlCode: SOPostData.personnelCode,
          SomCanceltag: SOPostData.isCancelled,
          SomCancelby: SOPostData.cancelledBy,
          SomCancelwhen: SOPostData.concelledWhen,
          SltCode: SOPostData.saleTypeCode,
          SomFcrate: SOPostData.fcRate,
          CurCode: SOPostData.currencyCode,
          DvnCode: SOPostData.division,
          SomTotalcharges1: SOPostData.deliveryCharges,
          SomTotalcharges2: SOPostData.packingCharges,
          SomTotalcharges3: SOPostData.installationCharges,
          SomTotalcharges4: SOPostData.totalChages4,
          SomTotalcharges5: SOPostData.totalCharges5,
          TrmnlCode: SOPostData.transporterCode,
          SomParentrefyear: formData.somYear,
          SomParentrefper: formData.somPeriod,
          SomParentrefdoccode: formData.docsDocCode,
          SomParentrefdoctype: formData.doctypCode,
          SomParentrefdocno: formData.somDocNo,
          PricelistDiffTag: SOPostData.priceListDifferent,
          CstName: SOPostData.customerName,
          CstAdd1: SOPostData.custAddress1,
          CstAdd2: SOPostData.custAddress2,
          CstAdd3: SOPostData.custAddress2,
          CstPhone: SOPostData.custPhone,
          CstGstno: SOPostData.custGSTNo,
          CstNtno: SOPostData.custNTN,
          SomDiscountamt: SOPostData.discountAmount,
          SomCommitDate: SOPostData.committedWhen,
          SomChgDistrTag: SOPostData.chargesDistributeTag,
          SomDiscDistrTag: SOPostData.discountDistributeTag,
          SacDelwarehouse: SOPostData.deliveryWarehouse,
          InvenWHDesc: SOPostData.invenWHDesc,
          DelWHDesc: SOPostData.delWHDesc,
          DocTypeDesc: SOPostData.parendDocTypeDesc,
          TransportDesc: SOPostData.transportDesc,
          PriceCodeDesc: SOPostData.priceCodeDesc,
          SalePersonName: SOPostData.salePersonName,
          DisTypeCode: formData.discTypeDescription?.split("-")[0],
          discountSaleOrders: childData,
          PolmCode: null,
          cstgno: this.customerDetail.cstg_Code,
          cstname: this.customerDetail.custName,
          sacSomAmount: SOPostData.sacSomAmount,
          isSubmitted: false,
          isManagementDiscount: discTypeCode === "000001" ? 0 : 1,
          // url data
          baseUrl: currentHostUrl,
          fileName: "discountDoc/record",
          isReadOnly: "readOnly",
          currentID: this.$store.state.menu.menuId,
        };

        //if user click save and submit button
        if (saveType === "SaveAndSubmit") {
          this.laoders.saveAndSubmit = true;
          this.laoders.submitLoader = true;
          postData.isSubmitted = true;
          this.laoders.saveBtn = true;
        } else {
          // if user  click only save button
          this.laoders.saveBtn = true;
          this.laoders.saveLoader = true;
          this.laoders.saveAndSubmit = true;
          postData.isSubmitted = false;
        }
        if (totalDiscountAmount > 0) {
          try {
            const response = await Axios.post(
              `${this.url}/Discount/createDiscountDocument`,
              postData
            );
            let { data } = response.data;

            if (response.data.success) {
              this.positiveNotification(`${response.data.message}`);
              this.formData.docNo = data.somDocNo ? data.somDocNo : "000000";
              this.formData.workFlowStatus = data.workFlowStatus;
              this.getCurrentScreenMode();
              this.badgeStatusUpdate();
              this.accessType = "readOnly";
            } else if (
              !response.data.success &&
              data.somDocNo !== "" &&
              data.somDocNo !== null &&
              data.somDocNo !== undefined
            ) {
              this.negativeNotification(`${response.data.message}`);
              this.formData.docNo = data.somDocNo ? data.somDocNo : "000000";
              this.formData.workFlowStatus = data.workFlowStatus;
              this.badgeStatusUpdate();
              this.accessType = "readOnly";
            } else {
              this.negativeNotification(`${response.data.message}`);
            }
            this.laoders.submitLoader = false;
            this.laoders.saveLoader = false;
            this.laoders.saveAndSubmit = false;
            this.laoders.saveBtn = false;
          } catch (err) {
            this.$store.dispatch("triggerUnauthorizedError", err);
            const newError = err.response || err;
            console.error(newError);
          }
        } else {
          if (this.nonPoicyDiscountItems.length === 0) {
            this.negativeNotification("Please Select Item");
          } else {
            this.negativeNotification("Please Add Discount Amount ");
          }
        }

        this.laoders = {
          saveAndSubmit: false,
          saveBtn: false,
          saveLoader: false,
          submitLoader: false,
        };
      } else {
        this.negativeNotification("Please  Fill Up Required Fields ");
        this.laoders.submitLoader = false;
        this.laoders.saveLoader = false;
        this.laoders.saveAndSubmit = false;
        this.laoders.saveBtn = false;
      }

      this.fieldsError = false;
    },

    inputHandler(model, value) {
      this.formData[model] = value;
      // if(model === "discTypeDescription"){
      //   formData.discTypeDescription.split("-")[0]
      // }
    },

    //, GET SELECTED  CUSTOMER FROM DIALOG
    getCustomerFromDialog(customer) {
      this.customerDetail.custName = customer.cst_Name;
      this.customerDetail.custCode = customer.cst_Code;
      this.customerDetail.prsnlName = customer.prsnl_Name;
      this.customerDetail.prsnlCode = customer.prsnl_code;
      this.customerDetail.pricTitle = customer.cstg_Desc;
      this.customerDetail.cstg_Code = customer.cstg_Code;
      this.formData.discTypeDescription = "";

      this.clearDataONChange();
      this.getCustDiscLimit();

      console.log("d9ai9dka0idjiajd0i");
    },

    clearDataONChange() {
      this.formData.sacSomAmount = 0;
      this.totalDiscount = 0;
      this.policyDiscount = 0;
      this.BranchDiscount = 0;
      this.ManagmentDisc = 0;
      this.tableData = [];
      this.customerSOList = [];
    },

    // CALL SO LIST API ON N DISCOUNT TYPE SELECTION
    getSOListByDiscountType() {
      let discountTypeCode = this.formData.discTypeDescription.split("-")[0];
      // this.tableData = [];
      // this.ManagmentDisc = 0;
      // this.BranchDiscount = 0;
      this.getCustomerSO(this.customerDetail.custCode, discountTypeCode);
    },

    // GET SELECTED SO FROM SO LIST DIALOG
    getCustSoList(Doc) {
      this.updateDiscSuccesfull = false;

      this.formData.somYear = Doc.somYear;
      this.formData.somPeriod = Doc.somPeriod;
      this.formData.somDocNo = Doc.somDocNo;
      this.formData.docsDocCode = Doc.docsDocCode;
      this.formData.docTypeDesc = Doc.docTypeDesc;
      this.formData.warehouseDesc = Doc.warehouseDesc;
      this.formData.doctypCode = Doc.doctypCode;

      var currentDate = this.$moment(Doc.somCreatedWhen).format("YYYY-MM-DD");
      this.formData.somCreatedWhen = currentDate;

      this.getSODetaile(
        Doc.somYear,
        Doc.somPeriod,
        Doc.docsDocCode,
        Doc.doctypCode,
        Doc.somDocNo
      );
    },

    // AMOUNT CONVERT TO CURRENCY FORMAT
    formatToCurrency(amount) {
      console.log("AMMMMMM", amount);
      return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },

    //  GET SO DETAILES WITH ITEMS FROM API
    async getSODetaile(docYear, docPeriod, docCode, typeCode, docNo) {
      this.tableData = [];
      try {
        const response = await Axios.get(
          `${this.url}/Discount/GetSaleOrderDocumentDetail?year=${docYear}&period=${docPeriod}&docCode=${docCode}&docTypeCode=${typeCode}&docNo=${docNo}`
        );

        if (response.data.success) {
          this.SOPostData = response.data.data;
          this.priceAdjustmentTotal = response.data.data.priceAdjustmentTotal;
          this.formData.sacSomAmount = response.data.data.sacSomAmount;
          this.sqtDocDetail = {
            sqtDocType: response.data.data.sqtDocType,
            sqtDocno: response.data.data.sqtDocno,
            sqtPeriod: response.data.data.sqtPeriod,
            sqtYear: response.data.data.sqtYear,
            sqtdocCode: response.data.data.sqtdocCode,
          };
          response.data.data.soRows.map((data) => {
            if (data.isManagementDiscount === 0) {
              data.BranchPerc = this.formatToCurrency(
                Number(data.discountPerc)
              );
              data.BranchDisc = this.formatToCurrency(
                Number(data.discountAmount)
              );

              data.policyAmount = 0;
              data.policyPerc = 0;
              data.MngmtPerc = 0;
              data.MngmtDisc = 0;
            } else if (data.isManagementDiscount === 1) {
              data.MngmtPerc = this.formatToCurrency(Number(data.discountPerc));
              data.MngmtDisc = this.formatToCurrency(data.discountAmount);
              data.BranchPerc = 0;
              data.BranchDisc = 0;
              data.policyAmount = 0;
              data.policyPerc = 0;
            } else {
              data.MngmtPerc = 0;
              data.MngmtDisc = 0;
              data.BranchPerc = 0;
              data.BranchDisc = 0;
              data.policyAmount = 0;
              data.policyPerc = 0;
            }

            if (
              data.lineDiscPolicyTag === 1 ||
              !isNaN(Number(data.policyDis)) ||
              Number(data.policyDis) > 0
            ) {
              data.policyAmount = this.formatToCurrency(Number(data.policyDis));
              data.policyPerc = this.formatToCurrency(
                Number(data.policyDisPer)
              );
            }
            // let isDiscExistinAmount = Number(data.discountAmount) > 0 ? Number(data.discountAmount) : 0
            data.amount = this.formatToCurrency(
              data.sellingPrice * data.soQuantity
            );
            data.PriceAdjAmnt = data.priceAdjustmentAmt;
            data.priceAdjAPerc = data.priceAdjustmentPer;
            data.sellingPrice = Number(data.sellingPrice);
            data.discPolicyTag =
              data.lineDiscPolicyTag === 1 || Number(data.policyDis) > 0
                ? "Yes"
                : "No";
            console.log("DATAS", data);
            this.tableData.push(data);
          });
          this.callTotalDiscountAmount();

          this.discounSelectHandler();
          this.itemRadio = "itemWise";
        }
      } catch (err) {
        this.$store.dispatch("triggerUnauthorizedError", err);
        const newError = err.response || err;
        console.error(newError);
      }
    },

    // GET CUSTOMERS LIST FROM API
    getAllCustomers() {
      this.isLoading = true;

      if (this.customerList && this.customerList.length > 0) {
        this.showCustomerList = !this.showCustomerList;
      }
      this.isLoading = false;
    },

    // SO LIST API
    async getCustomerSO(custCode, discTypeCode) {
      this.isLoading = true;
      this.clearDataONChange();
      this.isSoListLoaded = true;
      try {
        const response = await Axios.get(
          `${this.url}/Discount/GetSOListForCustomer?cstCode=${custCode}&distypecode=${discTypeCode}`
        );

        if (response.data.data && response.data.data.length > 0) {
          this.customerSOList = response.data.data;
        }
      } catch (err) {
        this.$store.dispatch("triggerUnauthorizedError", err);
        const newError = err.response || err;
        console.error(newError);
      }
      this.isSoListLoaded = false;
    },

    discounSelectHandler() {
      this.discountItemWise = [];
      this.nonPoicyDiscountItems = [];
      this.discountItem = "";

      this.tableData.map((data) => {
        //lineDiscPolicyTag
        // if (data.lineDiscPolicyTag !== 1) {
        this.nonPoicyDiscountItems.push(data);
        this.discountItemWise.push(
          `${data.itemCode} - ${data.itemDetailDescription}`
        );
        // }
      });

      if (this.itemRadio === "total") {
        this.discountItem = "";
      }
    },

    itemRadioHandler() {
      if (this.itemRadio === "total") {
        this.discountItem = `${this.nonPoicyDiscountItems.length} items Selected`;
      } else {
        this.discountItem = null;
      }
    },

    amountTypeHanlder() {
      if (this.amountRadio === "discountInPercentage") {
        this.formData.discount = 0;
      } else if (this.amountRadio === "discountinAmount") {
        this.formData.discount = 0.0;
      }
    },

    discountHandler() {
      // if (
      //   this.discountItem === "" ||
      //   this.discountItem === undefined ||
      //   this.discountItem === null
      // ) {
      //   this.negativeNotification("Please Select Item ");
      //   return;
      // }

      var amount = Number(this.formData.discount);
      let isDiscountAmountExistFromTotalAmount = false;
      if (this.nonPoicyDiscountItems.length === 0) {
        this.negativeNotification("Please Select Item");
        return;
      }
      if (this.amountRadio === "discountInPercentage") {
        if (amount > 100) {
          this.negativeNotification("Percentage Above 100% Not Allowed");
          isDiscountAmountExistFromTotalAmount = true;
        }
      } else {
        if (this.itemRadio === "total") {
          let totalAmount = 0;
          this.nonPoicyDiscountItems.map((accumulator) => {
            // if (accumulator.lineDiscPolicyTag !== 1) {
            if (accumulator.amount && isNaN(accumulator.amount)) {
              let amount = accumulator.amount.replace(/[^0-9.-]+/g, "");
              totalAmount = Number(totalAmount) + Number(amount);
            } else {
              let amount = accumulator.amount;
              totalAmount = Number(totalAmount) + Number(amount);
            }
            // }
          });

          if (amount > totalAmount) {
            isDiscountAmountExistFromTotalAmount = true;
          } else {
            isDiscountAmountExistFromTotalAmount = false;
          }
        } else {
          // else running for item wise discount
          let selectedItemCode = this.discountItem.split("-")[0];
          if (selectedItemCode) {
            this.nonPoicyDiscountItems.map((accumulator) => {
              // if (accumulator.lineDiscPolicyTag !== 1) {
              if (selectedItemCode.trim("") === accumulator.itemCode) {
                if (
                  Number(amount) >
                    accumulator.amount.replace(/[^0-9.-]+/g, "") &&
                  this.discountItem
                ) {
                  isDiscountAmountExistFromTotalAmount = true;
                } else {
                  isDiscountAmountExistFromTotalAmount = false;
                }
                // }
              }
            });
          }
        }
      }

      if (!isDiscountAmountExistFromTotalAmount) {
        if (isNaN(amount)) {
          this.isUpdateBTN = true;
          this.laoders = {
            saveAndSubmit: true,
            saveBtn: true,
          };
          this.negativeNotification("Please Add Valid Amount ");
          // this.formData.discount = "0.00";
        } else {
          this.laoders = {
            saveAndSubmit: false,
            saveBtn: false,
          };
          this.isUpdateBTN = false;
        }
      } else {
        this.isUpdateBTN = true;
        this.laoders = {
          saveAndSubmit: true,
          saveBtn: true,
        };
        if (this.amountRadio === "discountInPercentage") return;
        if (this.itemRadio === "total") {
          this.negativeNotification(
            `Discount Amount Exceeded From Total Amount `
          );
        } else {
          let itemCOde = this.discountItem.split("-")[0];
          this.negativeNotification(
            `Discount Amount Exceeded From Total Amount in Item ${itemCOde} `
          );
        }
      }
    },

    async getMainData() {
      this.tableColumns = [
        {
          name: "action",
          field: "action",
          label: "Action",
          sortable: false,
          align: "center",
        },
        {
          name: "itemCode",
          field: "itemCode",
          label: "Item Code",
          sortable: false,
          align: "left",
          border: "2px solid black",
        },
        {
          name: "itemDetailDescription",
          field: "itemDetailDescription",
          label: "Item Description",
          sortable: false,
          align: "left",
        },
        {
          name: "soQuantity",
          field: "soQuantity",
          label: "Quantity",
          sortable: false,
          align: "center",
        },

        {
          name: "stockTypeDesc",
          field: "stockTypeDesc",
          label: "Stock Type",
          sortable: false,
          align: "left",
        },
        {
          name: "batchNo",
          field: "batchNo",
          label: "Batch No",
          sortable: false,
          align: "left",
        },

        {
          name: "sellingPrice",
          field: "sellingPrice",
          label: "Rate",
          sortable: false,
          align: "center",
        },
        {
          name: "amount",
          field: "amount",
          label: "Amount",
          sortable: false,
          align: "right",
        },

        {
          name: "discPolicyTag",
          field: "discPolicyTag",
          label: "Policy Disc Tag",
          sortable: false,
          align: "center",
        },

        {
          name: "policyAmount",
          field: "policyAmount",
          label: "Policy Disc Amnt",
          sortable: false,
          align: "center",
        },
        {
          name: "policyPerc",
          field: "policyPerc",
          label: "Policy Disc (%)",
          sortable: false,
          align: "center",
        },
        {
          name: "BranchDisc",
          field: "BranchDisc",
          label: "Branch Disc Amnt",
          sortable: false,
          align: "center",
        },
        {
          name: "BranchPerc",
          field: "BranchPerc",
          label: "Branch Disc (%)",
          sortable: false,
          align: "center",
        },
        {
          name: "MngmtDisc",
          field: "MngmtDisc",
          label: "Management Disc Amnt",
          sortable: false,
          align: "center",
        },
        {
          name: "MngmtPerc",
          field: "MngmtPerc",
          label: "Management Disc (%)",
          sortable: false,
          align: "center",
        },
        {
          name: "PriceAdjAmnt",
          field: "PriceAdjAmnt",
          label: "Price Adjust Amount",
          sortable: false,
          align: "center",
        },
        {
          name: "priceAdjAPerc",
          field: "priceAdjAPerc",
          label: "Price Adjust (%)",
          sortable: false,
          align: "center",
        },
        {
          name: "lineNarration",
          field: "lineNarration",
          label: "Remarks",
          sortable: false,
          align: "left",
        },
      ];
    },

    formatToNumber(amount) {
      if (amount != null) {
        let amnt = Number(amount);
        if (!isNaN(amnt)) {
          return amnt;
        } else {
          return Number(amount.replace(/[^0-9.-]+/g, ""));
        }
      }
    },
  },
  watch: {
    itemRadio: function () {
      this.itemRadioHandler();
    },
  },
  computed: {
    url() {
      return this.$store.getters.url;
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/quasar.variables.scss";

.q-table .q-table__bottom,
.q-table thead,
.q-table tr,
.q-table th,
.q-table td {
  border-color: $backgroundColor !important;

  .super_small_input.q-field {
    &--dense,
    .q-field__inner {
      .q-field__control,
      .q-field__marginal {
        height: 20px !important;
      }

      .q-field__bottom.row.items-start.q-field__bottom--animated {
        height: 0px !important;
        padding: none !important;
        margin: none !important;
        line-height: 0px !important;
        min-height: 0px;
        max-height: 0px;
        display: none;
      }
    }
  }

  .selectBox.q-field--dense {
    .q-field__control-container,
    .q-field__native {
      padding-top: 0px !important;
    }

    .q-field__control {
      height: 36px !important;
      min-height: 36px !important;
    }

    .q-field__marginal {
      height: 36px !important;
    }

    .q-field__label {
      top: 6px !important;
    }
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
