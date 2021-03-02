<template>
  <div>
    <div v-if="!redactMode">
      <p v-if="description">
        {{ description }}
      </p>
      <p v-else>Wybierz rodzaj i datę</p>
      <div class="contains" id="span">
        <span><b>Skład:</b>&#8195;{{ composition || "----" }}</span>
        <span
          ><b>Może zawierać:</b>&#8195;<b>{{ contains || "----" }}</b></span
        >
      </div>
      <div class="value">
        <span>Wartość odżywcza na jedną sztukę ({{ nutValue }}&#8195;g)</span>
        <span
          >Wartość energetyczna - {{ energyValue }}&#8195;kcal, Tłuscze -{{
            fats
          }}&#8195;g.</span
        >
        <span
          >Węglowodany -{{ carbohydrates }}&#8195;g, Białko -{{
            protein
          }}&#8195;g</span
        >
      </div>
      <span class="info" v-if="form == 'Kanapka'">
        * W celu zachowania walorów smakowych sugerujemy odgrewać w piecyku
      </span>
    </div>
    <div v-else>
      <form @submit.prevent="redactData" class="formInput">
        <div class="infoInput">
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
            <label for="composition">Skład:</label>
            <b-col sm="10">
              <b-form-textarea
                id="composition"
                size="sm"
                v-model="composition"
              ></b-form-textarea>
            </b-col>
          </div>
          <div>
            <label for="contains">Może zawierać:</label>
            <b-form-input
              v-model="contains"
              id="contains"
              size="sm"
            ></b-form-input>
          </div>
        </div>
        <div class="valueInput">
          <div>
            <label for="nutValue">Wartość odżywcza na jedną sztukę:</label>
            <b-form-input
              v-model="nutValue"
              id="nutValue"
              size="sm"
              type="number"
              step="any"
            ></b-form-input>
          </div>
          <div>
            <label for="energyValue">Wartość energetyczna:</label>
            <b-form-input
              v-model="energyValue"
              class="inputsValue"
              id="energyValue"
              size="sm"
              type="number"
              step="any"
            ></b-form-input>
            <label for="fats">Tłuscze:</label>
            <b-form-input
              v-model="fats"
              class="inputsValue"
              id="fats"
              size="sm"
              type="number"
              step="any"
            ></b-form-input>
          </div>
          <div>
            <label for="carbohydrates">Węglowodany:</label>
            <b-form-input
              v-model="carbohydrates"
              class="inputsValue"
              id="carbohydrates"
              size="sm"
              type="number"
              step="any"
            ></b-form-input>
            <label for="protein">Białko:</label>
            <b-form-input
              v-model="protein"
              class="inputsValue"
              id="protein"
              type="number"
              step="any"
              size="sm"
            ></b-form-input>
          </div>
        </div>
        <div class="buttForm marginButt">
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
  name: "BarSticker",
  props: ["barData", "redactMode", "selectedDate", "form"],
  data: () => ({
    description: "",
    contains: "",
    composition: "",
    nutValue: 0,
    energyValue: 0,
    carbohydrates: 0,
    protein: 0,
    fats: 0,
  }),

  watch: {
    barData() {
      this.description = this.setDishData.descr;
      this.contains = this.setDishData.cont;
      this.composition = this.setDishData.compos;
      this.nutValue = this.setDishData.nutV;
      this.energyValue = this.setDishData.energyV;
      this.carbohydrates = this.setDishData.carbohyd;
      this.protein = this.setDishData.prot;
      this.fats = this.setDishData.fat;
    },
  },
  computed: {
    setDishData() {
      //Отображаем данные из БД если нету режима редактирования и проходит проверку на присутствие данных
      let descr = "";
      let cont = "";
      let compos = "";
      let nutV = 0;
      let energyV = 0;
      let carbohyd = 0;
      let prot = 0;
      let fat = 0;
      if (!this.redactMode) {
        if (
          this.selectedDate &&
          this.barData.date == this.selectedDate &&
          this.form
        ) {
          descr = this.barData.description;
          cont = this.barData.contains;
          compos = this.barData.composition;
          nutV = this.barData.nutValue;
          energyV = this.barData.energyValue;
          carbohyd = this.barData.carbohydrates;
          prot = this.barData.protein;
          fat = this.barData.fats;
        } else {
          descr = "";
          cont = "";
          compos = "";
          nutV = 0;
          energyV = 0;
          carbohyd = 0;
          prot = 0;
          fat = 0;
        }
      }

      if (this.redactMode) {
        descr = this.description;
        cont = this.contains;
        compos = this.composition;
        nutV = this.nutValue;
        energyV = this.energyValue;
        carbohyd = this.carbohydrates;
        prot = this.protein;
        fat = this.fats;
      }
      return { descr, cont, compos, nutV, energyV, carbohyd, prot, fat };
    },
  },
  methods: {
    ...mapActions(["setBarInfo", "setRedactMode"]),

    redactModeOff() {
      this.setRedactMode(false);
    },
    redactData() {
      let dishInfo = {
        date: this.selectedDate,
        dietTitle: this.form,
        description: this.description,
        contains: this.contains,
        composition: this.composition,
        nutValue: this.nutValue,
        energyValue: this.energyValue,
        carbohydrates: this.carbohydrates,
        protein: this.protein,
        fats: this.fats,
        id: this.barData._id,
      };

      this.setBarInfo(dishInfo);
      this.setRedactMode(false);
    },
  },
};
</script>
<style lang="scss" scoped>
.value span {
  font-size: 11px;
}
.value {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.contains {
  font-size: 12px !important;
}
.info {
  font-size: 10px;
  width: 100%;
  margin-left: 10px;
  margin-top: 20px;
}
.formInput {
  margin: 0px 10px;
  label {
    font-size: 12px;
  }
  div {
    padding: 0px;
    margin: 2px;
  }
}
.marginButt {
  margin-top: 120px !important;
}
.infoInput {
  div {
    display: flex;
  }
  label {
    margin: 0 10px;
  }
}
.valueInput {
  div {
    display: flex;
  }
  input {
    width: 40%;
    margin: 0 10px;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
}
</style>
