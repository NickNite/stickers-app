<template>
  <div>
    <div class="dishDescrp" v-if="!redactMode">
      <p class="desrcpSticker" v-if="description">
        {{ description }}
      </p>
      <p class="desrcpSticker" v-else>Wybierz danie i datę</p>
      <div class="coldHeat">Spożywać na {{ eat.join("/") }}</div>
      <div class="contains" id="span">
        <span><b>Zawiera:</b>&#8195;{{ contains || "----" }}</span>
        <span><b>Alergeny:</b>&#8195;{{ allergens || "----" }}</span>
      </div>
    </div>
    <div v-else>
      <form @submit.prevent="redactData" class="form">
        <div>
          <label for="description">Opis:</label>
          <b-col sm="10">
            <b-form-textarea
              id="description"
              size="sm"
              v-model="description"
            ></b-form-textarea>
          </b-col>
        </div>
        <div>
          <label for="contains">Zawiera:</label>
          <b-form-input
            v-model="contains"
            id="contains"
            size="sm"
          ></b-form-input>
        </div>
        <div>
          <label for="allergens">Alergeny:</label>
          <b-form-input
            v-model="allergens"
            id="allergens"
            size="sm"
          ></b-form-input>
        </div>
        <div class="buttForm">
          <b-button class="buttPos" type="submit" variant="outline-success">
            <b-icon icon="check-circle" aria-hidden="true"></b-icon>
            &#8195;Zatwierdzić</b-button
          >
          <b-button
            class="buttPos"
            @click="redactModeOff"
            variant="outline-danger"
          >
            <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
            &#8195;Anulować</b-button
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "DietBar",
  props: [
    "dietData",
    "redactMode",
    "selectedDate",
    "dish",
    "form",
    "getDescrpLength",
  ],
  data: () => ({
    description: "",
    contains: "",
    allergens: "",
    eat: [],
  }),

  watch: {
    dietData() {
      this.description = this.setDishData.descr;
      this.contains = this.setDishData.cont;
      this.allergens = this.setDishData.allerg;
      this.eat = this.setDishData.eat;
    },
    description() {
      this.getDescrpLength(this.getDesLength);
    },
  },
  computed: {
    getDesLength() {
      return this.description.length;
    },
    setDishData() {
      //Отображаем данные из БД если нету режима редактирования и проходит проверку на присутствие данных
      let descr = "";
      let cont = "";
      let allerg = "";
      let eat = [];
      if (!this.redactMode) {
        if (
          this.dietData &&
          this.selectedDate &&
          this.selectedDate == this.dietData.date &&
          this.dish &&
          this.dish == this.dietData.dish &&
          this.form
        ) {
          descr = this.dietData.description;
          cont = this.dietData.contains;
          allerg = this.dietData.allergens;
          eat = this.dietData.eat;
        } else {
          descr = "";
          cont = "";
          allerg = "";
          eat = [];
        }
      }

      if (this.redactMode) {
        descr = this.description;
        cont = this.contains;
        allerg = this.allergens;
        eat = this.eat;
      }
      return { descr, cont, allerg, eat };
    },
  },
  methods: {
    ...mapActions(["setDishInfo", "setRedactMode", "getDietData"]),

    redactModeOff() {
      this.setRedactMode(false);
    },
    redactData() {
      let dishInfo = {
        date: this.selectedDate,
        dish: this.dish,
        form: this.form,
        description: this.description,
        contains: this.contains,
        allergens: this.allergens,
        eat: this.eat,
        id: this.dietData._id,
      };
      this.setDishInfo(dishInfo);
      this.setRedactMode(false);
      this.getDietData();
    },
  },
};
</script>
<style></style>
