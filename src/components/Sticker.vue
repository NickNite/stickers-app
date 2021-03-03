<template>
  <div class="mainSticker">
    <header class="headerSticker">
      <div class="date">
        <label for="date"><b>Data:</b></label>
        <b-form-select
          id="date"
          v-model="selectedDate"
          :options="dateLength"
          :disabled="redactMode"
        >
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
        <b-form-select
          id="dish"
          v-model="dish"
          :options="dishLength"
          :disabled="getDishType == 'Bar' || redactMode"
        >
          <template #first>
            <b-form-select-option :value="null" disabled
              >--Danie--</b-form-select-option
            >
          </template>
        </b-form-select>
      </div>
    </header>
    <body class="bodySticker">
      <div class="sticker">
        <div id="sticker">
          <div class="headSticker">
            <div class="dishTitle" v-if="getDishType == 'Diet'">
              <h3>
                {{
                  getActiveForm
                    ? dishTitle.toUpperCase()
                    : "Wybierz rodzaj diety"
                }}
              </h3>
              <h6>Posiłek:&#8195;{{ dish ? dish + "/5" : "-/5" }}</h6>
            </div>
            <div class="dishTitle" v-else>
              <h3>SNACK BAR</h3>
              <h6>
                {{ getActiveForm ? getActiveForm : "Wybierz rodzaj baru" }}
              </h6>
            </div>
          </div>
          <!-- Проверяем на тип наклейки(бар или диета) -->
          <div>
            <DietSticker
              v-if="getDishType == 'Diet'"
              v-bind:dietData="getMyDiet()"
              v-bind:redactMode="redactMode"
              v-bind:selectedDate="selectedDate"
              v-bind:dish="dish"
              v-bind:form="form"
              v-bind:getDescrpLength="getDescrpLength"
            />
            <BarSticker
              v-else-if="getDishType == 'Bar'"
              v-bind:redactMode="redactMode"
              v-bind:barData="getMyDiet()"
              v-bind:selectedDate="selectedDate"
              v-bind:form="form"
              v-bind:getDescrpLength="getDescrpLength"
            />
          </div>
          <div class="footerInfo">
            <span>
              Należy spożyć do:
              {{ selectedDate ? setShelfLifeDate : "----" }}
            </span>
            <span>Przechowywać w temperaturze:&nbsp;4-6&#176;C</span>
          </div>
        </div>
        <div class="footerSticker">
          <span class="footerRed">www.dietyodbrokula.pl</span>
          <span class="footerGreen"
            >kontakt@dietyodbrokula.pl, tel.58 727 22 22</span
          >
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
          :disabled="!redactOn"
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
import DietSticker from "./DietSticker";
import BarSticker from "./BarSticker";
import { mapActions } from "vuex";
import _ from "lodash";

export default {
  name: "Sticker",
  components: {
    DietSticker,
    BarSticker,
  },
  data: () => ({
    selectedDate: null,
    dateLength: [],
    dishLength: [],
    dish: null,
    form: "",
    redactOn: false,
    dishTitle: "",
    titleLength: 0,
    descrpLength: 0,
  }),
  props: ["dietData", "barData", "getActiveForm", "getDishType", "redactMode"],
  beforeUpdate() {
    this.form = this.transformDietForm(this.getActiveForm);
    this.dishTitle = this.transformDishTitle(this.getActiveForm);
    this.dateLength = this.getDate;
    this.dishLength = this.getDishLength;
    this.getMyDiet();
    this.canRedact();
    this.titleLength = this.dishTitle.length;
    this.getDescrpLength();
    this.setTitleSizeInApp();
  },
  watch: {
    dishLength() {
      if (!this.dishLength.includes(this.dish)) {
        this.dish = null;
      }
    },
    descrpLength() {
      this.setDescrpSizeInApp();
    },
  },
  computed: {
    setDescrpSize() {
      //Функция авторегулирование размера шрифта в описании
      let descrpSize = ["", ""];
      if (this.descrpLength <= 20) {
        descrpSize[0] = "20px";
        descrpSize[1] = "19px";
      } else if (this.descrpLength > 20 && this.descrpLength <= 50) {
        descrpSize[0] = "17px";
        descrpSize[1] = "16px";
      } else if (this.descrpLength > 51 && this.descrpLength <= 80) {
        descrpSize[0] = "16px";
        descrpSize[1] = "10px";
      } else if (this.descrpLength > 80) {
        descrpSize[0] = "15px";
        descrpSize[1] = "8px";
      }
      return descrpSize;
    },
    setTitleSize() {
      //Функция авторегулирование размера шрифта в названии
      let titleSize = ["", ""];
      if (this.titleLength <= 15) {
        titleSize[0] = "20px";
        titleSize[1] = "15px";
      } else if (this.titleLength > 15 && this.titleLength <= 19) {
        titleSize[0] = "17px";
        titleSize[1] = "13px";
      } else if (this.titleLength > 19 && this.titleLength <= 33) {
        titleSize[0] = "16px";
        titleSize[1] = "12px";
      } else if (this.titleLength > 33 && this.titleLength <= 42) {
        titleSize[0] = "15px";
        titleSize[1] = "10px";
      } else if (this.titleLength > 42) {
        titleSize[0] = "13px";
        titleSize[1] = "8px";
      }
      return titleSize;
    },
    getDate() {
      //Сортируем данные для получения уникальных дат в БД
      this.getFormList();
      let dateArr = [];
      let duplicatesArr = _.uniqBy(this.getDishList(), "date");
      for (let item of duplicatesArr) {
        dateArr.push(item.date);
      }
      return dateArr;
    },
    getDishLength() {
      //Показываем список номеров диет из выбраной формы диеты
      let dateArr = this.getDishList().filter((i) => {
        return i.date == this.selectedDate;
      });
      let dishLength = [];
      for (let item of dateArr) {
        dishLength.push(item.dish);
      }
      return dishLength;
    },
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
  },
  methods: {
    ...mapActions(["setRedactMode"]),
    setTitleSizeInApp() {
      //Выбираем нужное название (Диета\Бар)
      let title = document.querySelector(".dishTitle");
      let titleChild;
      if (this.getDishType == "Diet") {
        titleChild = title.firstElementChild;
      }
      if (this.getDishType == "Bar") {
        titleChild = title.lastElementChild;
      }

      titleChild.style.fontSize = this.setTitleSize[0];
    },
    setDescrpSizeInApp() {
      //Выбираем описание в диете или баре
      let descrp;
      if (this.getDishType == "Diet") {
        descrp = document.querySelector(".dishDescrp");
      }
      if (this.getDishType == "Bar") {
        descrp = document.querySelector(".dishDescrpBar");
      }

      let p = descrp.firstElementChild;
      p.style.fontSize = this.setDescrpSize[0];
    },
    getDescrpLength(num) {
      this.descrpLength = num;
    },
    canRedact() {
      if (this.getMyDiet()) {
        this.redactOn = true;
      } else {
        this.redactOn = false;
      }
    },
    getDishList() {
      //Фильтруем информацию по форме диеты
      let sortDishArr;
      if (this.dietData && this.getDishType === "Diet") {
        sortDishArr = this.dietData.filter((item) => {
          return item.dietTitle == this.form;
        });
      }
      if (this.barData && this.getDishType === "Bar") {
        sortDishArr = this.barData.filter((item) => {
          return item.dietTitle == this.form;
        });
      }

      return sortDishArr;
    },
    getFormList() {
      //Проверяем есть ли выбранная форма диеты из списка в формах БД для дальнейшего отображения даты
      let formArr;
      if (this.getDishType === "Diet") {
        formArr = _.uniqBy(this.dietData, "dietTitle");
      }
      if (this.getDishType === "Bar") {
        formArr = _.uniqBy(this.barData, "dietTitle");
      }
      let list = [];
      for (let item of formArr) {
        list.push(item.dietTitle);
      }
      let result = list.includes(this.form);
      if (!result) {
        this.selectedDate = null;
      }
    },
    getMyDiet() {
      //Получаем нужный итем из БД для отображения на наклейке
      if (this.getDishType === "Diet") {
        let myDiet = this.dietData.filter((e) => {
          return (
            e.date == this.selectedDate &&
            e.dish == this.dish &&
            e.dietTitle == this.form
          );
        });
        return myDiet[0];
      }
      if (this.getDishType === "Bar") {
        let myBar = this.barData.filter((e) => {
          return e.date == this.selectedDate && e.dietTitle == this.form;
        });
        return myBar[0];
      }
    },
    redactModeOn() {
      this.setRedactMode(true);
    },
    transformDietForm(oldForm) {
      //Делаем из названия диеты, форму диеты для обработки запросов
      let newForm = oldForm.split(" ").slice(0, -1);
      return newForm.join(" ");
    },
    transformDishTitle(form) {
      //Делаем обработку названия из БД для отображения на наклейке
      let arrEnd = form.split(" ").slice(-1);
      let newdishTitle = "";
      if (this.transformDietForm(this.getActiveForm) === "Slim-Bez laktozy") {
        newdishTitle = `Dieta o bardzo niskej zawartości laktozy ${arrEnd}`;
      } else if (
        this.transformDietForm(this.getActiveForm) === "Slim-Bez glutenu"
      ) {
        newdishTitle = `Dieta o bardzo niskej zawartości glutenu ${arrEnd}`;
      } else if (
        this.transformDietForm(this.getActiveForm) ===
        "Slim-Bez laktozy i glutenu"
      ) {
        newdishTitle = `Dieta o bardzo niskej zawartości laktozy i glutenu ${arrEnd}`;
      } else {
        newdishTitle = form;
      }
      return newdishTitle;
    },
    printout() {
      var newWindow = window.open();
      let stylesMain =
        ".print{width:200px; height:200px; font-family:	Arial; margin-top:10px; border: 1px solid black}";
      let stylesIdSpan = " #span{display:flex; flex-direction: column;}";
      let styleh3 = `.dishTitle{font-weight: 400; margin:30px 0px 2px 10px; font-size:${this.setTitleSize[1]} !important; max-width: 130px; text-align: center}`;
      let styleh6 = "h6{margin: 5px 20px; font-size:9px;}";
      let styleP = `p{font-size:${this.setDescrpSize[1]}; margin:10px; word-wrap: break-word; }`;
      let styleColdHeat = ".coldHeat{font-size:7px; margin:0px 2px 5px 10px}";
      let styleSpan = "span{font-size:7px; margin:0px 2px 2px 10px;}";
      let styleValue =
        ".value{font-size:6px; display:flex; flex-direction:column}";
      let styleInfo = ".info{font-size:5.5px; position:relative; top:5px}";
      let styleFooterInfo =
        ".footerInfo{font-size:6px; position:relative; top:10px; left:50px; display:flex; flex-direction:column}";
      newWindow.document.write(
        `<style>${
          stylesMain +
          styleValue +
          styleInfo +
          styleColdHeat +
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
      // newWindow.close();
    },
  },
};
</script>

<style lang="scss">
.headerSticker {
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
.bodySticker {
  background: white;
  text-align: center;
}
#sticker {
  margin-top: 20px;
}
.sticker {
  width: 350px;
  min-height: 350px;
  border: 1px solid rgb(0, 129, 28);
  border-radius: 10px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  background-image: url("../assets/slim1.png");
  background-repeat: no-repeat;
  background-size: 120px 120px;
  background-position: right top;
  h3 {
    margin: 10px 30px;
    font-size: 20px;
    word-wrap: break-word;
    max-width: 190px;
    text-align: center;
  }
  .barTitle {
    font-size: 18px;
  }
  h6 {
    margin: 10px 0px;
    font-size: 14px;
    text-align: center;
  }
  p {
    font-size: 14px;
    margin: 5px 20px;
    word-wrap: break-word;
    width: 180px;
  }
  .contains {
    display: flex;
    flex-direction: column;
    margin: 10px 20px;
    font-size: 14px;
  }
  .headSticker {
    margin-bottom: 0px;
    display: flex;
    justify-content: space-between;
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
.mainSticker h6 {
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
  margin-top: 150px;
  .buttPos {
    margin: 10px;
  }
}
.footerInfo {
  margin: 5px 20px;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
.coldHeat {
  font-size: 10px;
  margin-left: 20px;
}
.footerSticker {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.footerRed {
  color: red;
  font-size: 14px;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
}
.footerGreen {
  color: green;
  font-size: 12px;
  margin: -3px 0 3px 0;
  padding: 0px;
}
</style>
