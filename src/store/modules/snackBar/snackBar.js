import axios from "axios";
const hostName = "http://localhost:5000";

export default {
  state: {
    barList: [
      {
        barTitle: "Baton",
        barColories: ["1-M", "2-M"]
      },
      {
        barTitle: "Deser",
        barColories: ["M", "XL"]
      },
      {
        barTitle: "Kanapka",
        barColories: [""]
      },
      {
        barTitle: "Zupa",
        barColories: ["M", "XL"]
      }
    ],
    barData: [
      {
        date: "2021-03-01",
        description: "Bułka ardeńska z sałatką warzywną",
        contains: "orzechy, orzeszki ziemne",
        composition:
          "bułka(mąkka przenna), cieciorka, papryka, groszek, sałatka rzymśka",
        barTitle: "Kanapka",
        nutValue: 205,
        energyValue: 393.7,
        fats: 9.8,
        carbohydrates: 60.2,
        protein: 12.2
      },
      {
        date: "2021-03-01",
        description: "Sernik Królewski",
        contains: "orzechy i orzeszki ziemne",
        composition:
          "ser twarogowy(mleko), mąka przenna, tłuszcz roślinny(serwatka z mleka), cukier, jaja, kakao, śmietana(mleko), proczek do pieczenia(mąka przenna), chia",
        barTitle: "Deser M",
        nutValue: "100",
        energyValue: "291,4",
        fats: "11,6",
        carbohydrates: "38,2",
        protein: "8,6"
      },
      {
        date: "2021-03-02",
        description: "Zupa",
        contains: "orzechy, orzeszki ziemne",
        composition: "papryka, groszek, sałatka rzymśka",
        barTitle: "Zupa XL",
        nutValue: 150,
        energyValue: 321.7,
        fats: 5.8,
        carbohydrates: 44.2,
        protein: 8.2
      }
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
      return axios.put(`${hostName}/api/snackbardata/${payload.id}`, payload);
    },
    addNewSnackBar({ state }, payload) {
      let stop = state.barData.find(elem => {
        return elem.date == payload.date && elem.barTitle == payload.barTitle;
      });
      if (stop) {
        console.log("ERROR: Juz jest takie danie", payload);
      } else {
        axios.post(`${hostName}/api/snackbardata`, payload);
      }
    }
  }
};
