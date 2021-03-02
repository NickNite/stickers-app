import axios from "axios";
// import hostName from "../../../../src/config";
// import {createObjectDiet} from "../../../utils/objCreators";
const hostName = "http://localhost:5000";

export default {
  state: {
    barList: [
      // {
      //   dietTitle: "Baton",
      //   dietColories: ["1-M", "2-M"]
      // },
      // {
      //   dietTitle: "Deser",
      //   dietColories: ["M", "XL"]
      // },
      // {
      //   dietTitle: "Kanapka",
      //   dietColories: [""]
      // },
      // {
      //   dietTitle: "Zupa",
      //   dietColories: ["M", "XL"]
      // }
    ],
    barData: [
      // {
      //   date: "2021-03-01",
      //   description: "Bułka ardeńska z sałatką warzywną",
      //   contains: "orzechy, orzeszki ziemne",
      //   composition:
      //     "bułka(mąkka przenna), cieciorka, papryka, groszek, sałatka rzymśka",
      //   dietTitle: "Kanapka",
      //   nutValue: 205,
      //   energyValue: 393.7,
      //   fats: 9.8,
      //   carbohydrates: 60.2,
      //   protein: 12.2
      // },
      // {
      //   date: "2021-03-01",
      //   description: "asdasdasdasfas",
      //   contains: "orzechy",
      //   composition: "cieciorka, papryka, groszek, sałatka rzymśka",
      //   dietTitle: "Deser",
      //   nutValue: 125,
      //   energyValue: 203.7,
      //   fats: 1.3,
      //   carbohydrates: 67.2,
      //   protein: 2.2
      // },
      // {
      //   date: "2021-03-02",
      //   description: "Zupa",
      //   contains: "orzechy, orzeszki ziemne",
      //   composition: "papryka, groszek, sałatka rzymśka",
      //   dietTitle: "Zupa",
      //   nutValue: 150,
      //   energyValue: 321.7,
      //   fats: 5.8,
      //   carbohydrates: 44.2,
      //   protein: 8.2
      // }
    ]
  },
  mutations: {
    changeBar(state, payload) {
      state.barList = payload;
    },
    changeBarData(state, payload) {
      state.barData = payload;
    }
  },
  actions: {
    async getSnackBar({ commit, rootState }) {
      return await axios.get(`${hostName}/api/snackbar`).then(res => {
        commit("changeBar", res.data);
        rootState.loading = false;
      });
    },
    async getSnackBarData({ commit }) {
      return await axios.get(`${hostName}/api/snackbardata`).then(res => {
        commit("changeBarData", res.data);
      });
    },

    setBarInfo({ commit }, payload) {
      commit("test", "test");
      return axios.put(`${hostName}/api/snackbardata/${payload._id}`, payload);
    },
    addNewSnackBar({ commit }, payload) {
      commit("changeBarData", payload);
      if (payload.dietTitle.length >= 1) {
        for (let i = 0; i < payload.dietTitle.length; i++) {
          let newPayload = {
            date: payload.date,
            description: payload.description,
            contains: payload.contains,
            composition: payload.composition,
            dietTitle: payload.dietTitle,
            nutValue: payload.nutValue,
            energyValue: payload.energyValue,
            fats: payload.fats,
            carbohydrates: payload.carbohydrates,
            protein: payload.protein
          };
          axios.post(`${hostName}/api/snackbardata`, newPayload);
        }
      } else {
        console.log("ERROR");
      }
    }
  }
};
