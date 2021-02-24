export function createObjectDiet(state, arrKey, diet) { // Проверяем наличие данных, при отсутствии создаем, если есть то добавляем новые данные в старый объект
    let date = diet.date;
    let newForm = diet.dietsTitle;
    if (!state.dietData[date]) {
      state.dietData[date] = [];
      for (let i = 0; i < 1; i++) {
        state.dietData[date][arrKey] = {} // this
        for (let form of newForm) {
          state.dietData[date][arrKey][form] = {
            date: diet.date,
            description: diet.description,
            contains: diet.contains,
            allergens: diet.allergens,
            eat: diet.eat
          };
        }
      }
  
    }
    else {
      for (let i = 0; i < 1; i++) {
        if (!state.dietData[date][arrKey]) {
          state.dietData[date][arrKey] = {}
          for (let form of newForm) {
            state.dietData[date][arrKey][form] = {
              date: diet.date,
              description: diet.description,
              contains: diet.contains,
              allergens: diet.allergens,
              eat: diet.eat
            };
          }
        } else {
          for (let form of newForm) {
            state.dietData[date][arrKey][form] = {
              date: diet.date,
              description: diet.description,
              contains: diet.contains,
              allergens: diet.allergens,
              eat: diet.eat
            };
          }
        }
      }
    };
    console.log(state.dietData);
  };

  export function createObjectBar(state,bar){
let date = bar.date;
let dietsTitle= bar.dietsTitle;
if (!state.barDate[date]) {
    state.barDate[date] = {};
        state.barDate[date][dietsTitle] = {
          date: bar.date,
          description: bar.description,
          contains: bar.contains,
          allergens: bar.allergens,
          eat: bar.eat
        };
      }
      else{
        state.barDate[date][dietsTitle] = {
            date: bar.date,
            description: bar.description,
            contains: bar.contains,
            allergens: bar.allergens,
            eat: bar.eat
          };
      }
      console.log(state.barDate)
    }
  