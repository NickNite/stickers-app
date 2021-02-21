import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    loading: true,
    activeForm: '',
    diets: {
      slim: [1200, 1500, 2000, 2500],
      sport: [1200, 1500, 2000, 2500, 3000, 3500],
      wege: [1200, 1500, 2000, 2500],
      'wege+fish': [1200, 1500, 2000, 2500],
      Gain:['X1','X2','X3','X4','X5'], //Cюда добавляем только 3 и 4 блюда из Sport
      Office:['Pakiet M', 'Pakiet XL'],
      'Office-Wege':['Pakiet M','Pakiet XL'],
      'Slim-Bez laktozy':[1200,1500,2000,2500],
      'Slim-Bez glutenu':[1200,1500,2000,2500],
      'Slim-Bez laktozy i glutenu': [1200,1500,2000,2500],
      Keto:[1500,2200,3000],
      'Keto-Wege+Fish':[1500,2200,3000],
      'Keto-Low Carb':[1500,2200,3000],
      'Zdrowy Obiadek':[''],
      'Zdrowy Obiadek WEGE':[''],
      'Zdrowy Obiadek+Deser':[''],
      'Zdrowy Obiadek+Deser WEGE':[''],
      'Zdrowy Obiadek+Zupa':[''],
      'Śniadanie+Obiad+Kolacja':['M','XL'],
      'Śniadanie+Obiad+Kolacja WEGE':['M','XL'],
    },
    snackBar:{
Baton:['1-M','2-M'],
Deser:['M','XL'],
Kanapka:[],
Zupa:['M','XL']
    },
    dishData: {
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
  },
  mutations: {
    //тут прописываем логику
    newActiveForm(state, form) {
      state.activeForm = form;
    },
    createDiets(state, newDiet) {
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
      state.dishData = payload;
      state.loading = false;
    },
    setDishData(state, payload) {
      state.dishData[payload.dishInfo.date][payload.dishInfo.dish][payload.dishInfo.form].description = payload.data.description;
      state.dishData[payload.dishInfo.date][payload.dishInfo.dish][payload.dishInfo.form].contains = payload.data.contains;
      state.dishData[payload.dishInfo.date][payload.dishInfo.dish][payload.dishInfo.form].allergens = payload.data.allergens;
    }
  },
  actions: {
    //а тут вызываем нужную мутацию и производим изменения в стейте
    async getDishDate({ commit }) {
      return await axios.get('https://brokul-stikers-default-rtdb.firebaseio.com/dishDate.json')
        .then(res => {
          commit('getData', res.data);
        })

    },
    addNewDiets({ commit }, newDiet) {
      commit('createDiets', newDiet);
      return axios.put('https://brokul-stikers-default-rtdb.firebaseio.com/dishDate.json', this.state.dishData)
    },
    setActiveForm({ commit }, form) {
      commit('newActiveForm', form)
    },
    setDishInfo({ commit }, payload) {
      commit('setDishData', payload);
      return axios.put('https://brokul-stikers-default-rtdb.firebaseio.com/dishDate.json', this.state.dishData)
    }
  },
  modules: {},
  getters: {
    getState(state) {
      return state;
    },
  }
});
function createObjectDiet(state, arrKey, diet) { // Проверяем наличие данных, при отсутствии создаем, если есть то добавляем новые данные в старый объект
  let date = diet.date;
  let newForm = diet.dietsTitle;
  if (!state.dishData[date]) {
    state.dishData[date] = [];
    for (let i = 0; i < 1; i++) {
      state.dishData[date][arrKey] = {} // this
      for (let form of newForm) {
        state.dishData[date][arrKey][form] = {
          date: diet.date,
          description: diet.description,
          contains: diet.contains,
          allergens: diet.allergens
        };
      }
    }

  }
  else {
    for (let i = 0; i < 1; i++) {
      if (!state.dishData[date][arrKey]) {
        state.dishData[date][arrKey] = {}
        for (let form of newForm) {
          state.dishData[date][arrKey][form] = {
            date: diet.date,
            description: diet.description,
            contains: diet.contains,
            allergens: diet.allergens
          };
        }
      } else {
        for (let form of newForm) {
          state.dishData[date][arrKey][form] = {
            date: diet.date,
            description: diet.description,
            contains: diet.contains,
            allergens: diet.allergens
          };
        }
      }
    }
  };
  console.log(state.dishData);
}
