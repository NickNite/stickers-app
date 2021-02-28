<template>
    <div>
        <div v-if="!redactMode" :key="form || 'test'">
          <p v-if="description" >
            {{ description }}
          </p>
          <p v-else>Wybierz danie i datę</p>
          <!-- Доделать изменения из базы данных -->
<div class="coldHeat"> 
  Spożywać na cieplo/zimno
</div>
<!-- Доделать изменения из базы данных -->
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
  props:["dietData", "redactMode","selectedDate","dish","form"],
  data: () => ({
    description: "",
    contains: "",
    allergens: "",
    eat: [],
  }),
 
  beforeUpdate(){
      this.description = this.setDishData.descr;
    this.contains=this.setDishData.cont;
    this.allergens=this.setDishData.allerg;
  },
  computed:{
      setDishData(){
       //Отображаем данные из БД если нету режима редактирования и проходит проверку на присутствие данных
      let descr= '';
      let cont = '';
      let allerg='';
      if (!this.redactMode && this.dietData[this.selectedDate] && this.dietData[this.selectedDate][this.dish] && this.dietData[this.selectedDate][this.dish][
        this.form
      ]) {
      descr = this.dietData[this.selectedDate][this.dish][
        this.form
      ].description;
      cont = this.dietData[this.selectedDate][this.dish][
        this.form
      ].contains;
      allerg = this.dietData[this.selectedDate][this.dish][
        this.form
      ].allergens;
    }if(this.redactMode){
      descr=this.description;
      cont = this.contains;
      allerg = this.allergens;
    }
    
    return {descr, cont, allerg};
    }
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
}
</script>
<style scoped>

</style>