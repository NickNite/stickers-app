import axios from "axios";
// import hostName from "../../../../src/config";
// import {createObjectDiet} from "../../../utils/objCreators";
const hostName = "http://localhost:5000";

export default {
  state: {
    dietList: [
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
      },
      {
        dietTitle: "Sniadanie, obiad, kolacja",
        dietColories: ["M", "XL"]
      },
      {
        dietTitle: "Keto Wege+Fish",
        dietColories: ["1500", "2000", "3000"]
      },
      {
        dietTitle: "Slim-Bez glutenu",
        dietColories: ["1200", "2000", "3000"]
      },
      {
        dietTitle: "Slim-Bez laktozy i glutenu",
        dietColories: ["1200", "2000", "3000"]
      }
    ],
    dietData: [
      {
        date: "2021-03-01",
        dish: "1",
        description:
          "Placki z jogurtem bananowym sdasd asdasd qwqwe asda xzcz asdas asdas asd",
        contains: "Młeko",
        allergens: "łaktoza",
        dietTitle: "Slim",
        eat: ["ciepło", "zimno"],
        _id: "23454235345"
      },
      {
        date: "2021-03-01",
        dish: "2",
        description: "Ksdqdwqdqwd",
        contains: "qweqw",
        allergens: "łaktovmnmvza",
        dietTitle: "Slim",
        eat: ["ciepło", "zimno"],
        _id: "23425353235"
      },
      {
        date: "2021-03-01",
        dish: "3",
        description: "Wertgryl;dfb d;fogdgdklfjg",
        contains: "asdas",
        allergens: "uioui",
        dietTitle: "Slim",
        eat: ["ciepło", "zimno"],
        _id: "234263534215"
      },
      {
        date: "2021-03-01",
        dish: "4",
        description: "Powesdlfksdnsdvc",
        contains: "Młevbcvbko",
        allergens: "łaktoguiza",
        dietTitle: "Slim",
        eat: ["ciepło", "zimno"],
        _id: "2342354212345"
      },
      {
        date: "2021-03-02",
        dish: "1",
        description: "fksdnsdvc",
        contains: "qqMłevbcvbko",
        allergens: "qqłaktoguiza",
        dietTitle: "Sport",
        eat: ["ciepło", "zimno"],
        _id: "2342354234511211"
      },
      {
        date: "2021-03-02",
        dish: "2",
        description: "Powesdlfksdnsdvc",
        contains: "Młevbcvbko",
        allergens: "łaktoguiza",
        dietTitle: "Sport",
        eat: ["ciepło", "zimno"],
        _id: "23423542341215"
      },
      {
        date: "2021-03-02",
        dish: "3",
        description: "Powesdlfksdnsdvc",
        contains: "Młevbcvbko",
        allergens: "łaktoguiza",
        dietTitle: "Wege",
        eat: ["ciepło", "zimno"],
        _id: "23423542341235"
      },
      {
        date: "2021-03-02",
        dish: "3",
        description:
          "Krajanka jajeczna z pstrągiem wędzonym i musztardą dijon, octowy ogórek z kopierkiem i siemieniem lnianym",
        contains: "Młevbcvbko",
        allergens: "łaktoguiza",
        dietTitle: "Slim-Bez laktozy i glutenu",
        eat: ["ciepło", "zimno"],
        _id: "23423542341235"
      }
    ]
  },
  mutations: {
    changeDiet(state, payload) {
      state.dietList = payload;
    },
    changeDietData(state, payload) {
      state.dietData = payload;
    }
  },
  actions: {
    async getDiet({ commit, rootState }) {
      return await axios.get(`${hostName}/api/diet`).then(res => {
        commit("changeDiet", res.data);
        rootState.loading = false;
      });
    },
    async getDietData({ commit }) {
      return await axios.get(`${hostName}/api/dietdata`).then(res => {
        commit("changeDietData", res.data);
      });
    },

    setDishInfo({ commit }, payload) {
      commit("test", "test");
      return axios.put(`${hostName}/api/dietdata/${payload.id}`, payload);
    },
    addNewDiets({ state }, payload) {
      if (payload.dietTitle.length >= 1) {
        for (let i = 0; i < payload.dietTitle.length; i++) {
          let newPayload = {
            date: payload.date,
            dish: payload.dish,
            description: payload.description,
            contains: payload.contains,
            allergens: payload.allergens,
            dietTitle: payload.dietTitle[i],
            eat: payload.eat
          };
          let stop = state.dietData.find(elem => {
            return (
              elem.date == payload.date &&
              elem.dish == newPayload.dish &&
              elem.dietTitle == newPayload.dietTitle
            );
          });
          if (stop) {
            console.log("ERROR: Juz jest takie danie", newPayload);
          } else {
            axios.post(`${hostName}/api/dietdata`, newPayload);
          }
        }
      } else {
        console.log("ERROR");
      }
    }
  }
};
