import axios from "axios";
// import hostName from "../../../../src/config";
// import {createObjectDiet} from "../../../utils/objCreators";
const hostName = "http://localhost:5000";

export default {
  state: {
    barList: [
      {
        dietTitle: "Baton",
        dietColories: ["1-M", "2-M"]
      },
      {
        dietTitle: "Deser",
        dietColories: ["M", "XL"]
      },
      {
        dietTitle: "Kanapka",
        dietColories: [""]
      },
      {
        dietTitle: "Zupa",
        dietColories: ["M", "XL"]
      }
    ],
    barData: []
  },
  mutations: {
    changeBar(state, payload) {
      let dietObj = {};
      for (let item of payload) {
        dietObj.item.dietTitle = item.dietColories;
      }
      console.log(payload);
      state.barList = dietObj;
    },
    changeBarData(state, payload, rootState) {
      state.barData.push(payload);
      console.log(payload);
      rootState.loading = false;
    }
  },
  actions: {
    async getSnackBar({ commit }) {
      return await axios.get(`${hostName}/api/snackbar`).then(res => {
        commit("changeBar", res.data);
      });
    },
    async getSnackBarData({ commit }) {
      return await axios.get(`${hostName}/api/snackbar`).then(res => {
        commit("changeDietData", res.data);
      });
    },

    // setBarInfo({ commit }, payload) {
    //   return axios.put(`${hostName}/api/snackbar`, payload)
    // },
    addNewSnackBar(payload) {
      // commit("changeBarData", payload);
      // return axios.post(`${hostName}/api/snackbar`, payload)
      console.log(payload);
    }
  }
};
