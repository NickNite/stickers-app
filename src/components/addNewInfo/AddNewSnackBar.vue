<template>
  <div>
    <body class="bodyAdd">
      <div class="description">
        <label for="description"><b :key="fats || 'test'">Opis:</b></label>
        <b-form-textarea
          :state="$v.description.required"
          id="description"
          v-model.trim="$v.description.$model"
          placeholder="Wpish opis danią..."
          rows="4"
          max-rows="4"
        ></b-form-textarea>
      </div>
      <div class="composition">
        <label for="composition"><b>Skład:</b></label>
        <b-form-textarea
          :state="$v.composition.required"
          id="composition"
          v-model.trim="$v.composition.$model"
          placeholder="Wpish Skład danią..."
          rows="3"
          max-rows="3"
        ></b-form-textarea>
      </div>
      <div class="contains">
        <label for="contains"><b>Może zawierać:</b></label>
        <b-form-textarea
          :state="$v.contains.required"
          id="contains"
          v-model.trim="$v.contains.$model"
          placeholder="Wpish co może zawiera danią..."
          rows="3"
          max-rows="3"
        ></b-form-textarea>
      </div>
    </body>
    <footer class="footerAddBar">
      <div class="nutValue">
        <label for="nutValue"><b>Wartość odżywcza:</b></label>
        <div class="inputFormat">
          <b-form-input
            id="nutValue"
            v-model.trim="$v.nutValue.$model"
            :state="nutValue > 0"
            step="any"
            type="number"
          ></b-form-input>
          <span>g</span>
        </div>
      </div>
      <div class="energyValue">
        <label for="energyValue"><b>Wartość energetyczna:</b></label>
        <div class="inputFormat">
          <b-form-input
            id="energyValue"
            v-model.trim="$v.energyValue.$model"
            :state="energyValue > 0"
            step="any"
            type="number"
          ></b-form-input>
          <span>kcal</span>
        </div>
      </div>
      <div class="fats">
        <label for="fats"><b>Tłuszcze:</b></label>
        <div class="inputFormat">
          <b-form-input
            id="fats"
            v-model.trim="$v.fats.$model"
            :state="fats > 0"
            step="any"
            type="number"
          ></b-form-input>
          <span>g</span>
        </div>
      </div>
      <div class="carbohydrates">
        <label for="carbohydrates"><b>Węglowodany:</b></label>
        <div class="inputFormat">
          <b-form-input
            id="carbohydrates"
            :state="carbohydrates > 0"
            step="any"
            v-model.trim="$v.carbohydrates.$model"
            type="number"
          ></b-form-input>
          <span>g</span>
        </div>
      </div>
      <div class="protein">
        <label for="protein"><b>Białko:</b></label>
        <div class="inputFormat">
          <b-form-input
            id="protein"
            :state="protein > 0"
            step="any"
            v-model.trim="$v.protein.$model"
            type="number"
          ></b-form-input>
          <span>g</span>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  name: "AddNewSnackBar",
  props: ["onChangeInfo", "submitStatus"],
  data: () => ({
    description: "",
    contains: "",
    composition: "",
    nutValue: "",
    energyValue: "",
    fats: "",
    carbohydrates: "",
    protein: "",
  }),
  validations: {
    description: { required },
    contains: { required },
    composition: { required },
    nutValue: { required },
    energyValue: { required },
    fats: { required },
    carbohydrates: { required },
    protein: { required },
  },
  beforeUpdate() {
    this.newBar();
  },
  watch: {
    submitStatus() {
      (this.description = ""),
        (this.contains = ""),
        (this.composition = ""),
        (this.nutValue = "");
      this.energyValue = "";
      this.fats = "";
      this.carbohydrates = "";
      this.protein = "";
      this.setSubmitStatus("ERROR");
    },
  },
  methods: {
    ...mapActions(["setSubmitStatus"]),
    newBar() {
      let data = {
        description: this.description,
        contains: this.contains,
        composition: this.composition,
        nutValue: this.nutValue,
        energyValue: this.energyValue,
        fats: this.fats,
        carbohydrates: this.carbohydrates,
        protein: this.protein,
        error: "SUCCESS",
      };
      if (this.$v.$invalid) {
        this.onChangeInfo({ error: "ERROR" });
      } else {
        this.onChangeInfo(data);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.footerAddBar {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  label {
    font-size: 14px;
  }
  input {
    width: 100px;
  }
  div {
    margin: 10px;
  }
  .inputFormat {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
