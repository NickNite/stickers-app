import axios from "axios";
// import hostName from "../../../../src/config";
// import {createObjectDiet} from "../../../utils/objCreators";
const hostName = "http://localhost:5000";

export default {
  state: {
    dietsList: [
      {
        dietTitle: "Sport",
        dietColories: [1200, 1500, 2000, 2500, 3000, 3500]
      },
      {
        dietTitle: "Slim",
        dietColories: [1200, 1500, 2000, 2500]
      },
      {
        dietTitle: "Gain",
        dietColories: ["X1", "X2", "X3", "X4", "x5"]
      },
      {
        dietTitle: "Wege",
        dietColories: [1200, 1500, 2000, 2500]
      },
      {
        dietTitle: "Wege+fish",
        dietColories: [1200, 1500, 2000, 2500]
      },
      {
        dietTitle: "Office",
        dietColories: ["Pakiet-M", "Pakiet-XL"]
      }
    ],
    dietData: []
  },
  mutations: {
    changeDiet(state, payload) {
      state.dietList = payload;
    },
    changeDietData(state, payload) {
      state.dietData.push(payload);
      console.log(payload);
      // rootState.loading = false;
    }
  },
  actions: {
    async getDiet({ commit }) {
      return await axios.get(`${hostName}/api/diet`).then(res => {
        commit("changeDiet", res.data);
      });
    },
    async getDietData({ commit }) {
      return await axios.get(`${hostName}/api/dietdata`).then(res => {
        commit("changeDietData", res.data);
      });
    },

    // setDishInfo({ commit }, payload) {
    //   return axios.put(`${hostName}/api/dietdata`, payload)
    // },
    addNewDiets({ commit }, payload) {
      commit('changeDietData', payload)
      // return axios.post(`${hostName}/api/dietdata`, payload);
      console.log(payload);
    }
  }
};
