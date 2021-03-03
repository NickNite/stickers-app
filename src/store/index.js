import Vue from "vue";
import Vuex from "vuex";
import diets from "./modules/diets/diets";
import snackBar from "./modules/snackBar/snackBar";
Vue.config.devtools = true;

Vue.use(Vuex);

//Прокидыват данные о блюдах , сделать эмуляцию базы данных для настройки и обработки информации!!!
export default new Vuex.Store({
  state: {
    redactMode: false,
    loading: false,
    activeForm: "",
    dishType: "Diet",
    submitStatus: ""
  },
  mutations: {
    //тут прописываем логику
    changeDishType(state, typed) {
      state.dishType = typed;
    },
    newActiveForm(state, form) {
      state.activeForm = form;
    },
    changeRedactMode(state, payload) {
      state.redactMode = payload;
    },
    changeSubmitStatus(state, payload) {
      state.submitStatus = payload;
    }
  },
  actions: {
    setActiveForm({ commit }, form) {
      commit("newActiveForm", form);
    },
    setDishType({ commit }, typed) {
      commit("changeDishType", typed);
    },
    setRedactMode({ commit }, payload) {
      commit("changeRedactMode", payload);
    },
    setSubmitStatus({ commit }, payload) {
      commit("changeSubmitStatus", payload);
    }
  },
  modules: {
    diets,
    snackBar
  },
  getters: {
    getState(state) {
      return state;
    }
  }
});
