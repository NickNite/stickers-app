<template>
  <div class="newInfo">
    <b-form-group class="radio" v-slot="{ ariaDescribedby }">
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

    <form @submit.prevent="addInfo">
      <header class="headerAddInfo">
        <div class="date">
          <label for="date"><b>Data:</b></label>
          <input
            type="date"
            :min="maxMinDate[1]"
            :max="maxMinDate[0]"
            id="date"
            v-model="$v.date.$model"
          />
        </div>
        <h4>{{ dishType }}</h4>
        <div>
          <label for="dish"><b>Danie:</b></label>
          <select
            id="dish"
            v-model="$v.dish.$model"
            :disabled="this.dishType == 'Bar'"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </header>
      <AddNewDiet
        v-if="dishType === 'Diet'"
        v-bind:onChangeInfo="onChangeInfo"
        v-bind:submitStatus="submitStatus"
      />
      <AddNewSnackBar
        v-if="dishType === 'Bar'"
        v-bind:onChangeInfo="onChangeInfo"
        v-bind:submitStatus="submitStatus"
      />
      <footer class="footerAddInfo">
        <b-form-checkbox
          v-for="(diet, i) in getDietForm"
          :key="{ diet } + i"
          :id="diet"
          :value="diet"
          v-model="$v.dietTitle.$model"
          >{{ diet }}</b-form-checkbox
        >
      </footer>
      <b-button
        class="buttonSend"
        type="submit"
        pill
        block
        @click="makeToast()"
        title="Dodajesz nowe danie"
        variant="info"
        >Dodaj</b-button
      >
    </form>
  </div>
</template>

<script>
import AddNewDiet from "./addNewInfo/AddNewDiet";
import AddNewSnackBar from "./addNewInfo/AddNewSnackBar";
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  name: "AddNewInfo",
  components: {
    AddNewDiet,
    AddNewSnackBar,
  },
  props: ["allDiets", "snackBar", "submitStatus"],
  data: () => ({
    dishType: "Diet",
    dishList: ["Diet", "Bar"],
    title: null,
    maxMinDate: [],
    date: "",
    dish: "",
    dietTitle: [],
    newInfo: {
      error: "ERROR",
    },
  }),
  validations: {
    date: { required },
    dish: { required },
    dietTitle: { required },
  },
  created() {
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
    getDietForm() {
      let forms = [];
      if (this.dishType === "Diet") {
        for (let diet of this.allDiets) {
          forms.push(diet.dietTitle);
        }
      }
      if (this.dishType === "Bar") {
        for (let bar of this.snackBar) {
          forms.push(bar.dietTitle);
        }
      }
      return forms;
    },
  },
  methods: {
    ...mapActions(["addNewDiets", "addNewSnackBar", "setSubmitStatus"]),
    makeToast(append = false) {
      if (this.newInfo.error == "ERROR") {
        this.$bvToast.toast(`Coś poszło nie tak, sprobój jeszcze raz!!!`, {
          title: "Wystąpil bląd!!!",
          autoHideDelay: 5000,
          appendToast: append,
          variant: "danger",
        });
      }
      if (this.newInfo.error == "SUCCESS") {
        this.$bvToast.toast(`Nowa dieta była dodana!!!`, {
          title: "Udało się!",
          autoHideDelay: 5000,
          appendToast: append,
          variant: "success",
        });
      }
    },
    onChangeInfo(data) {
      if (data.error && data.error == "ERROR") {
        this.newInfo = data;
      } else {
        this.newInfo = data;
      }
    },
    addInfo() {
      if (this.dishType == "Diet") {
        let diet = {
          date: this.date,
          dish: this.dish,
          description: this.newInfo.description,
          contains: this.newInfo.contains,
          allergens: this.newInfo.allergens,
          dietTitle: this.dietTitle,
          eat: this.newInfo.eat,
        };
        this.$v.$touch();
        if (
          this.$v.$invalid ||
          (!this.$v.$invalid && this.newInfo.error == "ERROR") //Обратока формы, что бы не дать отправить пустую, либо не дополненную
        ) {
          this.setSubmitStatus("ERROR");
        } else {
          this.setSubmitStatus("SUCCESS");
          this.addNewDiets(diet);
          this.date = "";
          this.dish = "";
          this.dietTitle = [];
        }
      }
      if (this.dishType == "Bar") {
        this.dish = "1";
        let bar = {
          date: this.date,
          description: this.newInfo.description,
          contains: this.newInfo.contains,
          composition: this.newInfo.composition,
          dietTitle: this.dietTitle,
          nutValue: this.newInfo.nutValue,
          energyValue: this.newInfo.energyValue,
          fats: this.newInfo.fats,
          carbohydrates: this.newInfo.carbohydrates,
          protein: this.newInfo.protein,
        };
        this.$v.$touch();
        if (
          this.$v.$invalid ||
          (!this.$v.$invalid && this.newInfo.error == "ERROR") //Обратока формы, что бы не дать отправить пустую, либо не дополненную
        ) {
          this.setSubmitStatus("ERROR");
        } else {
          this.setSubmitStatus("SUCCESS");
          this.addNewSnackBar(bar);
          this.date = "";
          this.dietTitle = [];
        }
      }
    },
  },
};
</script>

<style lang="scss">
.bodyAdd {
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
.newInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.radio {
  margin-top: 30px;
}
.headerAddInfo {
  min-width: 650px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
  margin-left: -50px;
  label {
    margin-right: 10px;
  }
  h4 {
    width: 150px;
    padding: 7px 20px 10px 20px;
    background: rgb(3, 129, 30);
    border-radius: 5px;
    color: #d9f2fc;
  }
}
.footerAddInfo {
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

.description,
.contains,
.composition,
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
#howToUse {
  display: flex;
  justify-content: center;
}
</style>
