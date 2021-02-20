<template>
  <div class="newInfo">
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
        <div>
          <label for="dish"><b>Danie:</b></label>
          <select id="dish" v-model="$v.newDiets.dish.$model">
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
        <b-form-checkbox id="hot" value="ciepło" v-model="newDiets.eat"
          >Ciepło</b-form-checkbox
        >
        <b-form-checkbox id="cold" value="zimno" v-model="newDiets.eat"
          >Zimno</b-form-checkbox
        >
      </div>
      <footer>
        <div class="slim">
          <b-form-checkbox
            id="slim"
            value="slim"
            v-model="$v.newDiets.dietsTitle.$model"
            >Slim</b-form-checkbox
          >
        </div>
        <div class="sport">
          <b-form-checkbox
            id="sport"
            value="sport"
            v-model="newDiets.dietsTitle"
            >Sport</b-form-checkbox
          >
        </div>
        <div class="vege">
          <b-form-checkbox
            id="vege"
            value="vege"
            v-model="$v.newDiets.dietsTitle.$model"
            >Vege</b-form-checkbox
          >
        </div>
        <div class="vege_fish">
          <b-form-checkbox
            id="vege_fish"
            value="vege_fish"
            v-model="$v.newDiets.dietsTitle.$model"
            >Vege+Fish</b-form-checkbox
          >
        </div>
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
  props: [],
  data: () => ({
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
  },
  methods: {
    ...mapActions(["addNewDiets", "getDishDate"]),
    addDiets() {
      let diet = {
        date: this.newDiets.date,
        dish: this.newDiets.dish,
        description: this.newDiets.description,
        contains: this.newDiets.contains,
        allergens: this.newDiets.allergens,
        dietsTitle: this.newDiets.dietsTitle,
        eat: this.newDiets.eat,
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
      }
    },
  },
};
</script>

<style scoped lang="scss">
.newInfo {
  display: flex;
  align-items: center;
  justify-content: center;
}
header {
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin-top: 50px;
  label {
    margin-right: 10px;
  }
}
footer {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  div {
    margin: 5px;
  }
}
.buttonSend {
  margin: 60px auto 10px auto;
  width: 250px;
}
body {
  text-align: left;
  background: white;
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
  position: absolute;
  top: 50px;
  right: 50px;
}
.error {
  border: 1px solid #fc5c65;
}
</style>
