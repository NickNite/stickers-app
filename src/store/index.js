import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import {createObjectDiet, createObjectBar} from '../utils/objCreators';

Vue.use(Vuex);

//Пишем серверную часть и БД
export default new Vuex.Store({
  state: {
    loading: true,
    activeForm: '',
    dishType:'',
    diets: {
      // Sport: [1200, 1500, 2000, 2500, 3000, 3500],
      // Gain:['X1','X2','X3','X4','X5'], //Cюда добавляем только 3 и 4 блюда из Sport
      // Slim: [1200, 1500, 2000, 2500],
      // Wege: [1200, 1500, 2000, 2500],
      // 'Wege+fish': [1200, 1500, 2000, 2500],
      // 'Zdrowy Obiadek':[''],
      // 'Zdrowy Obiadek-Wege':[''],
      // Office:['Pakiet-M', 'Pakiet-XL'],
      // 'Office-Wege':['Pakiet-M','Pakiet-XL'],
      // 'Śniadanie + Obiad+Kolacja':['M','XL'],
      // 'Śniadanie + Obiad+Kolacja Wege':['M','XL'],
      // 'Slim-Bez laktozy':[1200,1500,2000,2500],
      // 'Slim-Bez glutenu':[1200,1500,2000,2500],
      // 'Slim-Bez laktozy i glutenu': [1200,1500,2000,2500],
      // 'Zdrowy Obiadek+Deser':[''],
      // 'Zdrowy Obiadek+Deser Wege':[''],
      // 'Zdrowy Obiadek+Zupa':[''],
      // Keto:[1500,2200,3000],
      // 'Keto-Wege+Fish':[1500,2200,3000],
      // 'Keto-Low Carb':[1500,2200,3000],
    },
    snackBar:{
// Baton:['1-M','2-M'],
// Deser:['M','XL'],
// Kanapka:[],
// Zupa:['M','XL']
    },
    dietData: { //Переименовать в dietData
      // '2021-01-21': {
      //   1: {
      //     'slim': {
      //       date: '2021-01-21',
      //       description: 'Placki z jogurtem bananowym',
      //       contains: 'Mleko',
      //       allergens: 'Laktoza',
      //     },
      //     'sport': {
      //       date: '2021-01-21',
      //       description: 'Placki z jogurtem bananowym',
      //       contains: 'Mleko',
      //       allergens: 'Laktoza',
      //     },
      //     'vege': {
      //       date: '2021-01-21',
      //       description: 'Placki z jogurtem bananowym',
      //       contains: 'Mleko',
      //       allergens: 'Laktoza',
      //     },
      //     'vege+fish': {
      //       date: '2021-01-21',
      //       description: 'Placki z jogurtem bananowym',
      //       contains: 'Mleko',
      //       allergens: 'Laktoza',
      //     },
      //   },
      //   2: {
      //     'slim': {
      //       date: '2021-01-21',
      //       description: 'Salatka warzywna',
      //       contains: 'Witaminy i składniki mineralne',
      //       allergens: 'brak',
      //     },
      //     'sport': {
      //       date: '2021-01-21',
      //       description: 'Salatka warzywna',
      //       contains: 'Witaminy i składniki mineralne',
      //       allergens: 'brak',
      //     },
      //     'vege': {
      //       date: '2021-01-21',
      //       description: 'Salatka warzywna',
      //       contains: 'Witaminy i składniki mineralne',
      //       allergens: 'brak',
      //     },
      //     'vege+fish': {
      //       date: '2021-01-21',
      //       description: 'Salatka warzywna',
      //       contains: 'Witaminy i składniki mineralne',
      //       allergens: 'brak',
      //     },
      //   },
      //   3: {
      //     'slim': {
      //       date: '2021-01-21',
      //       description: 'Ziemniaki z schabem wieprzowym',
      //       contains: 'Białko, Tłuszcz',
      //       allergens: 'brak',
      //     },
      //     'sport': {
      //       date: '2021-01-21',
      //       description: 'Ziemniaki z schabem wieprzowym',
      //       contains: 'Białko, Tłuszcz',
      //       allergens: 'brak',
      //     },
      //     'vege': {
      //       date: '2021-01-21',
      //       description: 'Ziemniaki z warzywami',
      //       contains: 'Białko, Tłuszcz',
      //       allergens: 'brak',
      //     },
      //     'vege+fish': {
      //       date: '2021-01-21',
      //       description: 'Ziemniaki z filetem rybnym',
      //       contains: 'Białko',
      //       allergens: 'brak',
      //     }
      //   },
      //   4: {
      //     'slim': {
      //       date: '2021-01-21',
      //       description: 'Zypa pomidorowa',
      //       contains: 'Cholesterol',
      //       allergens: 'brak',
      //     },
      //     'sport': {
      //       date: '2021-01-21',
      //       description: 'Zypa pomidorowa',
      //       contains: 'Cholesterol',
      //       allergens: 'brak',
      //     },
      //     'vege': {
      //       date: '2021-01-21',
      //       description: 'Zypa pomidorowa',
      //       contains: 'Cholesterol',
      //       allergens: 'brak',
      //     },
      //     'vege+fish': {
      //       date: '2021-01-21',
      //       description: 'Zypa pomidorowa',
      //       contains: 'Cholesterol',
      //       allergens: 'brak',
      //     }
      //   },
      //   5: {
      //     'slim': {
      //       date: '2021-01-21',
      //       description: 'Komosa ryżowa',
      //       contains: 'Węglowodany',
      //       allergens: 'brak',
      //     },
      //     'sport': {
      //       date: '2021-01-21',
      //       description: 'Komosa ryżowa',
      //       contains: 'Węglowodany',
      //       allergens: 'brak',
      //     },
      //     'vege': {
      //       date: '2021-01-21',
      //       description: 'Komosa ryżowa',
      //       contains: 'Węglowodany',
      //       allergens: 'brak',
      //     },
      //     'vege+fish': {
      //       date: '2021-01-21',
      //       description: 'Komosa ryżowa',
      //       contains: 'Węglowodany',
      //       allergens: 'brak',
      //     }
      //   }
      // }
    },
    barDate:{}
  },
  mutations: {
    //тут прописываем логику
    changeDishType(state, typed){
      state.dishType = typed;
    },
    newActiveForm(state, form) {
      state.activeForm = form;
    },
    createDiets(state, newDiet) {
      if(newDiet.dish=='Snack Bar'){
        createObjectBar(state,newDiet)
      }
      if (newDiet.dish == 1) {
        createObjectDiet(state, 1, newDiet)
      }
      if (newDiet.dish == 2) {
        createObjectDiet(state, 2, newDiet)
      }
      if (newDiet.dish == 3) {
        createObjectDiet(state, 3, newDiet)
      }
      if (newDiet.dish == 4) {
        createObjectDiet(state, 4, newDiet)
      }
      if (newDiet.dish == 5) {
        createObjectDiet(state, 5, newDiet)
      }
    },
    getData(state, payload) {
      state.dietData = payload;
      state.loading = false;
    },
    setDishData(state, payload) {
      state.dietData[payload.dishInfo.date][payload.dishInfo.dish][payload.dishInfo.form].description = payload.data.description;
      state.dietData[payload.dishInfo.date][payload.dishInfo.dish][payload.dishInfo.form].contains = payload.data.contains;
      state.dietData[payload.dishInfo.date][payload.dishInfo.dish][payload.dishInfo.form].allergens = payload.data.allergens;
    }
  },
  actions: {
    // async addDiet(){
    //  return await axios.post('/api/diet', {dietTitle:'Sport', dietColories: this.state.diets.Sport})
    //  .then(data=>{
    //    console.log(data.data)
    //  })
    //  .catch(err=>{
    //    console.log(err)
    //  })
    // },
    //а тут вызываем нужную мутацию и производим изменения в стейте
    async getDishDate({ commit }) {
      return await axios.get('https://brokul-stikers-default-rtdb.firebaseio.com/dishDate.json')
        .then(res => {
          commit('getData', res.data);
        })

    },
    addNewDiets({ commit }, newDiet) {
      commit('createDiets', newDiet);
      if(newDiet.dish ==' Snack Bar'){
        return axios.put('https://brokul-stikers-default-rtdb.firebaseio.com/barDate.json', this.state.barDate)       
      }
      else{
        return axios.put('https://brokul-stikers-default-rtdb.firebaseio.com/dishDate.json', this.state.dietData)
      }
      
    },
    setActiveForm({ commit }, form) {
      commit('newActiveForm', form)
    },
    setDishType({commit}, typed){
      commit('changeDishType', typed)
    },
    setDishInfo({ commit }, payload) {
      commit('setDishData', payload);
      return axios.put('https://brokul-stikers-default-rtdb.firebaseio.com/dishDate.json', this.state.dietData)
    }
  },
  modules: {},
  getters: {
    getState(state) {
      return state;
    },
  }
});
