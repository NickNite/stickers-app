<template>
  <div class="mainSticker">
    <header>
      <div class="date">
        <label for="date"><b>Data:</b></label>
        <b-form-select id="date" v-model="selectedDate" :options="dateLength" :disabled="redactMode">
          >
          <template #first>
            <b-form-select-option :value="null" disabled
              >--Wybierz datę--</b-form-select-option
            >
          </template>
        </b-form-select>
      </div>
      <div class="dish">
        <label for="dish"><b>Danie:</b></label>
        <b-form-select id="dish" v-model="dish" :options="dishLength" :disabled="getDishType=='Snack Bar' || redactMode">
          <template #first>
            <b-form-select-option :value="null" disabled
              >--Danie--</b-form-select-option
            >
          </template>
        </b-form-select>
      </div>
    </header>
    <body>
      
      <div class="sticker">
        <div  id="sticker">
       <div class="headSticker"> 
         <div>
         <h3>
          {{
            getActiveForm ? getActiveForm.toUpperCase() : "Wybierz rodzaj diety"
          }}
        </h3>
        <h6 v-if="getDishType!=='Snack Bar'"><b>Posiłek:&#8195;</b>{{ dish ? dish + "/5" : "-/5" }}</h6>
         </div>
         <div><img src="@/assets/slim1.png" /></div>
   
       </div>
        <div v-if="!redactMode">
          <p v-if="description">
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
        <div class="footerInfo">
         <span >
          Należy spożyć do:
          {{ selectedDate ? setShelfLifeDate : "----" }}
        </span>
        <span>Przechowywać w temperaturze:&nbsp;4-6&#176;C</span>
        </div>
      </div>
      <div class="footerSticker">
        <span class="footerRed">www.dietyodbrokula.pl</span>
        <span class="footerGreen">kontakt@dietyodbrokula.pl, tel.58 727 22 22</span>
        <span class="footerGreen">Zakopiańska 1, 84-230 Rumia</span>
      </div>
      </div>
      <div class="changeInfo">
        <b-button
          v-if="!redactMode"
          @click="redactModeOn"
          size="sm"
          title="Edytuj danę na naklejcę"
          class="mb-2"
          :disabled="!description"
        >
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
          Edytować
        </b-button>
      </div>
      <div class="print" v-if="!redactMode">
        <b-button
          pill
          block
          @click="printout"
          title="Drukowanie naklejki"
          variant="info"
          >Drukuj</b-button
        >
      </div>
    </body>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { mapActions } from "vuex";
export default {
  name: "Sticker",
  data: () => ({
    redactMode: false,
    selectedDate: null,
    dateLength: [],
    dishLength: [],
    dish: null,
    form: "",
    description: "",
    contains: "",
    allergens: "",
  }),
  props: ["dishData", "getActiveForm","getDishType"],
  created() {
    for (let date in this.dishData) {
      this.dateLength.push(date);
    }
  },
  beforeUpdate() {
    //Отображаем количество блюд по определнной дате
    if (this.dishData[this.selectedDate] && this.dishData[this.selectedDate].length != this.dishLength.length) {
      this.dishLength = [];
      for (let i = 1; i < this.dishData[this.selectedDate].length; i++) {
        if (this.dishData[this.selectedDate][i] != null) {
          this.dishLength.push(i);
        }
      }
    } else if(this.dishData[this.selectedDate]) {
      for (let i = 1; i < this.dishData[this.selectedDate].length; i++) {
        if (this.dishData[this.selectedDate][i] != null) {
          this.dishLength.push(i);
        }
      }
    };
   
    this.form = this.transformDietForm(this.getActiveForm);
  
    this.description = this.setDishDate.descr;
    this.contains=this.setDishDate.cont;
    this.allergens=this.setDishDate.allerg;
  },
  computed: {
    //Определяем срок годности товара от выбраной даты
    setShelfLifeDate() {
      let dateArr = "";
      if (this.selectedDate) {
        dateArr = this.selectedDate.split("-");
      }
      let dateCreate = new Date(
        dateArr[0],
        Number(dateArr[1]) - 1,
        Number(dateArr[2]) + 3
      );
      let shelfDay = "";
      let shelfMonth = "";
      let shelfYear = dateCreate.getFullYear();
      if (String(dateCreate.getMonth()).length == 1) {
        shelfMonth = "0" + Number(dateCreate.getMonth() + 1);
      } else {
        shelfMonth = Number(dateCreate.getMonth() + 1);
      }
      if (String(dateCreate.getDate()).length == 1) {
        shelfDay = "0" + dateCreate.getDate();
      } else {
        shelfDay = dateCreate.getDate();
      }
      let shelfLife = shelfDay + "-" + shelfMonth + "-" + shelfYear;
      return shelfLife;
    },
    setDishDate(){
       //Отображаем данные из БД если нету режима редактирования и проходит проверку на присутствие данных
      let descr= '';
      let cont = '';
      let allerg='';
      if (!this.redactMode && this.dishData[this.selectedDate] && this.dishData[this.selectedDate][this.dish] && this.dishData[this.selectedDate][this.dish][
        this.form
      ]) {
      descr = this.dishData[this.selectedDate][this.dish][
        this.form
      ].description;
      cont = this.dishData[this.selectedDate][this.dish][
        this.form
      ].contains;
      allerg = this.dishData[this.selectedDate][this.dish][
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
  methods: {
    ...mapActions(["setDishInfo"]),
    transformDietForm(oldForm){
      //Делаем из названия диеты, форму диеты для обработки запросов
let newForm = oldForm.split(' ').slice(0,-1);
return newForm.join(' ');
    },
    redactModeOn() {
      this.redactMode = true;
    },
    redactModeOff() {
      this.redactMode = false;
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
    },
    printout() {
      let img = document.querySelector('.headSticker img');
      var newWindow = window.open();
      let stylesMain = ".print{width:200px; height:200px; font-family:	Arial; margin-top:20px}";
      let stylesIdSpan = " #span{display:flex; flex-direction: column;}";
      let styleh3 = "h3{font-weight: 400; margin:30px 0px 2px 10px; font-size:15px}";
      let styleh6 = "h6{margin: 5px 20px; font-size:9px;}";
      let styleP = "p{font-size:10px; margin:10px; }";
      let styleColdHeat =".coldHeat{font-size:7px; margin:0px 2px 5px 10px}"
      let styleSpan = "span{font-size:7px; margin:0px 2px 5px 10px}";
      let styleFooterInfo =
        ".footerInfo{font-size:7px; position:relative; top:10px; left:50px; display:flex; flex-direction:column}";
      newWindow.document.write(
        `<style>${
          stylesMain +
          styleColdHeat+
          stylesIdSpan +
          styleh3 +
          styleh6 +
          styleP +
          styleSpan +
          styleFooterInfo
        }</style>`
      );
      newWindow.document.write('<div class="print">');
      newWindow.document.write(document.getElementById("sticker").innerHTML);
      newWindow.document.write("</div>");
      newWindow.print();
      img.src='https://i.ibb.co/dJQLytg/slim2.png';
      newWindow.close();
    },
  },
};
</script>

<style scoped lang="scss">

header {
  display: flex;
  margin: 40px 0px;
  div {
    margin: 0 50px;
  }
  label {
    margin-right: 10px;
    margin-top: 5px;
    font-size: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
  }
}
.date,
.dish {
  display: flex;
  align-items: center;
}
body {
  background: white;
  text-align: center;
}
.sticker {
  width: 300px;
  min-height: 300px;
  border: 1px solid rgb(0, 129, 28);
  border-radius: 10px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  text-align: left;
z-index: 100;
  h3 {
    margin: 10px 30px;
    font-size: 20px;
  }
  h6 {
    margin: 10px 20px;
    font-size: 12px;
  }
  p {
    font-size: 14px;
    margin: 10px 20px;
    word-wrap: break-word;
    width:180px;
  }
  .contains {
    display: flex;
    flex-direction: column;
    margin: 10px 20px;
    font-size: 14px;
  }
  .headSticker{
    margin-bottom: -20px;
    display: flex;
    justify-content: space-between;
      img{
      width: 100px;
      height: 100px;
  }
  }
}

.print {
  width: 200px;
  margin: 50px auto;
}
.print:hover {
  cursor: pointer;
}
h2,
h6 {
  padding: 0;
  margin: 0;
}
textarea {
  resize: none;
}
.form div {
  display: flex;
  padding: 5px 10px;
  label {
    margin-right: 5px;
  }
}
.buttForm {
  position: absolute;
  margin-top: 100px;
  .buttPos {
    margin: 10px;
  }
}
.footerInfo{
  margin:20px;
  font-size: 10px;
     display: flex;
     flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
}
.coldHeat{
  font-size: 10px;
  margin-left: 20px;
}
.footerSticker{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.footerRed{
  color:red;
  font-size: 14px;
  font-weight: bold;
  margin: 0px;
  padding:0px;
  
}
.footerGreen{
  color:green;
  font-size: 12px;
  margin:-3px 0 3px 0;
  padding:0px;
}
</style>
