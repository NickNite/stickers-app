<template>
    <div>
        <div v-if="!redactMode" :key="form || 'test'">
          <p v-if="description">
            {{ description }}
          </p>
          <p v-else>Wybierz rodzaj i datę</p>
          <div class="contains" id="span">
            <span><b>Skład:</b>&#8195;{{ composition || "----" }}</span>
            <span><b>Może zawierać:</b>&#8195;<b>{{ contains || "----" }}</b></span>
          </div>
          <div class="value">
<span>Wartość odżywcza na jedną sztukę ({{ nutValue }}&#8195;g)</span>
<span>Wartość energetyczna - {{ energyValue }}&#8195;kcal, Tłuscze -{{fats}}&#8195;g.</span>
<span>Węglowodany -{{carbohydrates}}&#8195;g, Białko -{{protein}}&#8195;g</span>
          </div>
          <p class="info" v-if="form=='Kanapka'">
              * W celu zachowania walorów smakowych sugerujemy odgrewać w piecyku
          </p>
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
              <label for="composition">Skład:</label>
              <b-form-input
                v-model="composition"
                id="composition"
                size="sm"
              ></b-form-input>
            </div>
            <div>
              <label for="contains">Może zawierać:</label>
              <b-form-input
                v-model="contains"
                id="contains"
                size="sm"
              ></b-form-input>
            </div>
            <div>
              <label for="nutValue">Wartość odżywcza na jedną sztukę:</label>
              <b-form-input
                v-model="nutValue"
                id="nutValue"
                size="sm"
              ></b-form-input>
            </div>
            <div>
              <label for="energyValue">Wartość energetyczna:</label>
              <b-form-input
                v-model="energyValue"
                id="energyValue"
                size="sm"
              ></b-form-input>
              <label for="fats">Tłuscze:</label>
              <b-form-input
                v-model="fats"
                id="fats"
                size="sm"
              ></b-form-input>
            </div>
            <div>
              <label for="carbohydrates">Węglowodany:</label>
              <b-form-input
                v-model="carbohydrates"
                id="carbohydrates"
                size="sm"
              ></b-form-input>
              <label for="protein">Białko:</label>
              <b-form-input
                v-model="protein"
                id="protein"
                size="sm"
              ></b-form-input>
            </div>
            <div class="buttForm" :class="redactMode ? 'marginButt' : ''">
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
import {mapActions} from "vuex";
export default {
  name: "BarSticker",
  props:["barData", "redactMode","selectedDate","form"],
  data: () => ({
    description: '',
    contains: '',
    composition: '',
    nutValue: 0,
    energyValue: 0,
    carbohydrates: 0,
    protein: 0,
    fats:0
  }),
 
  beforeUpdate(){
      this.description = this.setDishData.descr;
    this.contains=this.setDishData.cont;
    this.composition=this.setDishData.compos;
    this.nutValue=this.setDishData.nutV;
    this.energyValue=this.setDishData.energyV;
    this.carbohydrates=this.setDishData.carbohyd;
    this.protein=this.setDishData.prot;
    this.fats=this.setDishData.fat;
  },
  computed:{
      setDishData(){
       //Отображаем данные из БД если нету режима редактирования и проходит проверку на присутствие данных
      let descr= '';
      let cont = '';
      let compos='';
      let nutV=0;
      let energyV = 0;
      let carbohyd =0;
      let prot = 0;
      let fat= 0;
      if (!this.redactMode && this.barData[this.selectedDate]  && this.barData[this.selectedDate][
        this.form
      ]) {
      descr = this.barData[this.selectedDate][
        this.form
      ].description;
      cont = this.barData[this.selectedDate][
        this.form
      ].contains;
      compos = this.dietData[this.selectedDate][
        this.form
      ].composition;
       nutV = this.dietData[this.selectedDate][
        this.form
      ].nutValue;
       energyV = this.dietData[this.selectedDate][
        this.form
      ].energyValue;
       carbohyd = this.dietData[this.selectedDate][
        this.form
      ].carbohydrates;
       prot = this.dietData[this.selectedDate][
        this.form
      ].protein;
       fat = this.dietData[this.selectedDate][
        this.form
      ].fats;
    }if(this.redactMode){
    descr= this.description;
    cont = this.contains;
    compos=this.composition;
    nutV=this.nutValue;
    energyV = this.energyValue;
    carbohyd =this.carbohydrates;
    prot = this.protein;
    fat= this.fats;
    }
    return {descr, cont, compos, nutV, energyV, carbohyd, prot, fat};
  },
  },
  methods:{
      ...mapActions(["setDishInfo", "setRedactMode"]),
     
    redactModeOff() {
      this.setRedactMode(false);
    },
       redactData() {
      let dishInfo = {
        date: this.selectedDate,
        dish: this.dish,
        form: this.form,
      };
      let data = {
        description: this.description,
        contains: this.contains,
        allergens: this.allergens,
      };
      this.setDishInfo({ dishInfo, data });
      this.redactMode = false;
  }
},
};
</script>
<style lang="scss" scoped>
.value span{
    font-size: 12px;
}
.info{
    font-size: 12px;
}
.form {
    label{
        font-size: 12px;
        }
    div{
        padding: 0px;
        margin: 2px;
    }
}
.marginButt{
    margin-top: 150px  !important;
}
</style>