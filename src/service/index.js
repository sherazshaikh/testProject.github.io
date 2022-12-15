import axios from "axios";
import store from "../store";
// import url from "../store/url";

// get all items from inventory
const url = store.getters.url;
// let { state } = store;
let itemListArray = [];



export const getItemList = async () => {
  // var url = store.getters.url
  if (itemListArray && itemListArray.length > 0) {
    console.log("READY IS ARRAY")
    return itemListArray;
  } else {
    try {
      const res = await axios.get(`${store.getters.url}/Common/GetItemListAsync`);
      // store.commit("setAllITemList", res.data.data);
      itemListArray = res.data.data;
      // console.log(res.data.data)
      return itemListArray;
    } catch (err) {
      // console.log(error.response)
      store.dispatch("triggerUnauthorizedError", err);
      const error = err.response || err;
      console.error(error);
      return [];
    }
  }
};

// getting user rights based on menu
export const getUserPrivileges = async (menuId) => {
  try {
    const res = await axios.post(`${store.getters.url}/GetUserPrivileges?menuId=${menuId}`);
    return res.data.data;
  } catch (err) {
    this.$store.dispatch("triggerUnauthorizedError", err);
    const error = err.response || err;
    console.error(error);
    return null;
  }
};

// get Document List based on year, period and Doc Code
export const getDocumentList = async (
  docCode,
  docYear,
  docPeriod,
  type,
  isPending = false
) => {
  try {
    console.log("docCode", docCode);
    if (docCode === "M.R" || docCode === "STO" || docCode === "STI") {
      const res = await axios.get(
        `${store.getters.url}/SaleOrder/GetListAsync?year=${docYear}&period=${docPeriod}&docCode=${docCode}&Type=${type}&IsPending=${isPending}`
      );
      return res;
    } else if (docCode === "S.O") {
      const res = await axios.get(
        `${store.getters.url}/SaleOrder/GetSOListForSales?year=${docYear}&period=${docPeriod}&docCode=${docCode}&Type=${type}&IsPending=${isPending}`
      );
      return res;
    } else {
      const res = await axios.get(
        `${store.getters.url}/SaleOrder/GetListAsync?year=${docYear}&period=${docPeriod}&docCode=${docCode}&IsPending=${isPending}`
      );
      return res;
    }
  } catch (err) {
    const error = err.response || err;
    console.error(error);
    store.dispatch("triggerUnauthorizedError", error);
    return null;
  }
};

// user allowed warehouses

export const getAllowedWarehousesReq = async () => {
  try {
    console.log("url" , url)

    const res = await axios.get(`${store.getters.url}/Common/GetAllowedWarehouseAsync`);
    return res.data.data;
  } catch (err) {
    store.dispatch("triggerUnauthorizedError", err);
    const error = err.response || err;
    console.error(error);
  }
};

// all warehouses

export const getAllWarehousesReq = async () => {
  try {
    const res = await axios.get(`${store.getters.url}/Common/GetAllWarehouseAsync`);
    return res.data.data;
  } catch (err) {
    store.dispatch("triggerUnauthorizedError", err);
    const error = err.response || err;
    console.error(error);
  }
};

let customerList = [];



export const getAllCustomer = async () => {
  
  if (customerList && customerList.length > 0) {
    return customerList;
  } else {
    try {
      const res = await axios.get(`${store.getters.url}/Common/GetCustomerListAsync`);
      // store.commit("setAllCustomerList", res.data.data);
      customerList = res.data.data;
      return customerList;
    } catch (err) {
      store.dispatch("triggerUnauthorizedError", err);
      const error = err.response || err;
      console.error(error);
    }
  }
};

export function emptyListItems(){
  itemListArray = []
  customerList = []
  console.log("EMPTY")
}
export function emptyCustomerList(){
  customerList = []
  getAllCustomer()

}






