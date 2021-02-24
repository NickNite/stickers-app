<template>
  <div class="newInfo">
      <b-form-group
    class="radio"
      v-slot="{ ariaDescribedby }"
      
    >
      <b-form-radio-group
        id="btn-radios-2"
        v-model="dishType"
        :options="dishList"
        :aria-describedby="ariaDescribedby"
        button-variant="outline-primary"
        size="lg"
        name="radio-btn-outline"
        
        buttons
      ></b-form-radio-group>
    </b-form-group>
    
    <form @submit.prevent="addDiets">
      <header>
        <div class="date">
          <label for="date"><b>Data:</b></label>
          <input
            type="date"
            :min="maxMinDate[1]"
            :max="maxMinDate[0]"
            id="date"
            v-model="$v.newDiets.date.$model"
          />
        </div>
         <h4>{{dishType}}</h4>
        <div>
          <label for="dish"><b>Danie:</b></label>
          <select id="dish" v-model="$v.newDiets.dish.$model" :disabled="this.dishType =='Snack Bar'">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </header>
      <body class="body">
        <div class="description">
          <label for="description"><b>Opis:</b></label>
          <b-form-textarea
            :state="$v.newDiets.description.required"
            id="description"
            v-model.trim="$v.newDiets.description.$model"
            placeholder="Wpish opis danią..."
            rows="4"
            max-rows="4"
          ></b-form-textarea>
        </div>
        <div class="contains">
          <label for="contains"><b>Zawiera:</b></label>
          <b-form-textarea
            :state="$v.newDiets.contains.required"
            id="contains"
            v-model.trim="$v.newDiets.contains.$model"
            placeholder="Wpish co zawiera danią..."
            rows="3"
            max-rows="3"
          ></b-form-textarea>
        </div>
        <div class="allergens">
          <label for="allergens"><b>Alergeny:</b></label>
          <b-form-textarea
            :state="$v.newDiets.allergens.required"
            id="allergens"
            v-model.trim="$v.newDiets.allergens.$model"
            placeholder="Wpish jakie ma alergeny..."
            rows="3"
            max-rows="3"
          ></b-form-textarea>
        </div>
      </body>
      <div class="eat">
       <b-form-group>
      <template #label>
        <b>Wybierz sposób użycia:</b><br>
        <b-form-checkbox
          v-model="allSelected"
          aria-describedby="howToUse"
          aria-controls="howToUse"
          @change="toggleAll"
        >
          {{ allSelected ?   'Wybranę wszystkie' : 'Odznaczyć wszystkie:' }}
        </b-form-checkbox>
      </template>

      <template v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="howToUse"
          v-model="newDiets.eat"
          :options="howToUse"
          :aria-describedby="ariaDescribedby"
          name="howToUse"
          class="ml-2"
          aria-label="howToUse"
          inline
        ></b-form-checkbox-group>
        </template>
      </b-form-group>
      </div>
      <footer>
          <b-form-checkbox
           v-for="(diet,i) in getDietForm" :key="{ diet } + i"
            :id="diet"
            :value="diet"
            v-model="$v.newDiets.dietsTitle.$model"
            >{{diet}}</b-form-checkbox
          >
      </footer>
      <b-button
        class="buttonSend"
        type="submit"
        pill
        block
        @click="$bvToast.show('toast')"
        title="Dodajesz nowe danie"
        variant="info"
        >Dodaj</b-button
      >
    </form>
    <b-toast
      v-if="submitStatus == 'ERROR'"
      id="toast"
      class="myToast"
      title="Wystąpil bląd!!!"
      variant="danger"
      static
      append-toast
      >Coś poszło nie tak, sprobój jeszcze raz!!!
    </b-toast>
    <b-toast
      v-if="submitStatus == 'SUCCESS'"
      id="toast"
      class="myToast"
      title="Udało się!"
      variant="success"
      static
      append-toast
      >Nowa dieta była dodana!!!
    </b-toast>
  </div>
</template>

<script>
//Пропал тоаст после обработки валидатором
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddNewInfo",
  props: ["allDiets","snackBar"],
  data: () => ({
    dishType:"Diety",
    dishList:['Diety', 'Snack Bar'],
    allSelected:false,
    howToUse:['ciepło','zimno'],
    submitStatus: "ERROR",
    variant: null,
    title: null,
    maxMinDate: [],
    newDiets: {
      date: null,
      dish: null,
      description: "",
      contains: "",
      allergens: "",
      dietsTitle: [],
      eat: [],
    },
  }),
  validations: {
    newDiets: {
      date: { required },
      dish: { required },
      description: { required },
      contains: { required },
      allergens: { required },
      dietsTitle: { required },
    },
  },
  created() {
    this.getDishDate();
    this.maxMinDate = this.limitDate;
  },
  computed: {
    limitDate() {
      //Создаем минимальную и максимальную дату для календаря
      let today = new Date();
      let month = "";
      let maxDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        Number(today.getDate() + 6)
      );
      if (String(today.getMonth()).length <= 1) {
        month = "0" + String(today.getMonth() + 1);
      } else {
        month = String(today.getMonth() + 1);
      }
      let day = "";
      if (String(today.getDate()).length <= 1) {
        day = "0" + today.getDate();
      } else {
        day = today.getDate();
      }
      let maxDay = "";
      let maxMonth = "";
      if (String(maxDate.getMonth()).length <= 1) {
        maxMonth = "0" + String(maxDate.getMonth() + 1);
      } else {
        maxMonth = String(maxDate.getMonth() + 1);
      }
      if (String(maxDate.getDate()).length <= 1) {
        maxDay = "0" + maxDate.getDate();
      } else {
        maxDay = maxDate.getDate();
      }
      let max = maxDate.getFullYear() + "-" + maxMonth + "-" + maxDay;
      let min = today.getFullYear() + "-" + month + "-" + day;

      return [max, min];
    },
    getDietForm(){
      let forms =[];
      if(this.dishType =='Diety')
      for(let key in this.allDiets){
        forms.push(key);
      }
      if(this.dishType =='Snack Bar'){
        for(let key in this.snackBar){
          forms.push(key)
        }
      }
return forms;
    },
  },
  watch: {
      selected(newValue) {
        // Handle changes in individual flavour checkboxes
        if (newValue.length === 0) {
          this.allSelected = false
        } else if (newValue.length === this.flavours.length) {
          this.allSelected = true
        } else {
          this.allSelected = false
        }
      }
    },
  methods: {
    ...mapActions(["addNewDiets", "getDishDate"]),
    addDiets() {
      let diet ={};
      if(this.dishType =='Diety'){
        diet = {
        date: this.newDiets.date,
        dish: this.newDiets.dish,
        description: this.newDiets.description,
        contains: this.newDiets.contains,
        allergens: this.newDiets.allergens,
        dietsTitle: this.newDiets.dietsTitle,
        eat: this.newDiets.eat,
      }
      }
      if(this.dishType == 'Snack Bar'){
        this.newDiets.dish = '1';
         diet = {
        date: this.newDiets.date,
        dish: this.dishType,
        description: this.newDiets.description,
        contains: this.newDiets.contains,
        allergens: this.newDiets.allergens,
        dietsTitle: this.newDiets.dietsTitle,
        eat: this.newDiets.eat,
      }
      };
       
      this.$v.$touch();
      if (this.$v.newDiets.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "SUCCESS";
        this.addNewDiets(diet);
        this.newDiets.date = "";
        this.newDiets.dish = "";
        this.newDiets.description = "";
        this.newDiets.contains = "";
        this.newDiets.allergens = "";
        this.newDiets.dietsTitle = [];
        this.newDiets.eat = [];
        this.allSelected=false;
      }
    },
     toggleAll(checked) {
        this.newDiets.eat = checked ? this.howToUse.slice() : []
      },
  },
  
};
</script>

<style scoped lang="scss">
.newInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.radio{
  margin-top: 30px;
}
header {
  min-width: 650px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
  margin-left: -50px;
  label {
    margin-right: 10px;
  }
  h4{
    width: 150px;
    padding: 7px 20px 10px 20px;
    background: rgb(3, 129, 30);
    border-radius: 5px;
    color: #d9f2fc;
  }
}
footer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-top: 1px solid rgb(202, 202, 202);
  border-bottom: 1px solid rgb(202, 202, 202);
  padding: 20px 0px;
  margin-top: 20px;
  div {
    margin: 5px;
  }
}
.buttonSend {
  margin: 20px auto 0px auto;
  width: 250px;
}
body {
  min-width: 650px;
  text-align: left;
  background: white;
  margin: 0px 100px;
  textarea {
    resize: none;
  }
  label {
    margin-right: 10px;
  }
}
.description,
.contains,
.allergens {
  display: flex;
  margin: 20px;
}
.myToast {
  position: fixed;
  top: 50px;
  right: 50px;
}
.error {
  border: 1px solid #fc5c65;
}
#howToUse{
  display: flex;
  justify-content: center;
}

</style>
