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
            <div>
              <h3 v-if="getDishType == 'Diet'">
                {{
                  getActiveForm
                    ? getActiveForm.toUpperCase()
                    : "Wybierz rodzaj diety"
                }}
              </h3>
              <h3 v-else>SNACK BAR</h3>
              <h6 v-if="getDishType == 'Diet'">
                <b>Posiłek:&#8195;</b>{{ dish ? dish + "/5" : "-/5" }}
              </h6>
              <h6 v-else>
                {{ getActiveForm ? getActiveForm : "Wybierz rodzaj baru" }}
              </h6>
            </div>
          </div>
          <!-- Проверяем на тип наклейки(бар или диета) -->
          <div>
            <DietSticker
              v-if="getDishType == 'Diet'"
              v-bind:dietData="dietData"
              v-bind:redactMode="redactMode"
              v-bind:selectedDate="selectedDate"
              v-bind:dish="dish"
              v-bind:form="form"
            />
            <BarSticker
              v-else-if="getDishType == 'Bar'"
              v-bind:redactMode="redactMode"
              v-bind:barData="barData"
              v-bind:selectedDate="selectedDate"
              v-bind:form="form"
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
          :disabled="!form"
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
  }),
  props: ["dietData", "barData", "getActiveForm", "getDishType", "redactMode"],
  created() {
    for (let date in this.dietData) {
      this.dateLength.push(date);
    }
  },
  beforeUpdate() {
    //Отображаем количество блюд по определнной дате
    if (
      this.dietData[this.selectedDate] &&
      this.dietData[this.selectedDate].length != this.dishLength.length
    ) {
      this.dishLength = [];
      for (let i = 1; i < this.dietData[this.selectedDate].length; i++) {
        if (this.dietData[this.selectedDate][i] != null) {
          this.dishLength.push(i);
        }
      }
    } else if (this.dietData[this.selectedDate]) {
      for (let i = 1; i < this.dietData[this.selectedDate].length; i++) {
        if (this.dietData[this.selectedDate][i] != null) {
          this.dishLength.push(i);
        }
      }
    }

    this.form = this.transformDietForm(this.getActiveForm);
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
  },
  methods: {
    ...mapActions(["setRedactMode"]),
    redactModeOn() {
      this.setRedactMode(true);
    },

    transformDietForm(oldForm) {
      //Делаем из названия диеты, форму диеты для обработки запросов
      let newForm = oldForm.split(" ").slice(0, -1);
      return newForm.join(" ");
    },
    printout() {
      var newWindow = window.open();
      let stylesMain =
        ".print{width:200px; height:200px; font-family:	Arial; margin-top:10px;}";
      let stylesIdSpan = " #span{display:flex; flex-direction: column;}";
      let styleh3 =
        "h3{font-weight: 400; margin:30px 0px 2px 10px; font-size:15px; max-width: 220px;}";
      let styleh6 = "h6{margin: 5px 20px; font-size:9px;}";
      let styleP = "p{font-size:10px; margin:10px; word-wrap: break-word; }";
      let styleColdHeat = ".coldHeat{font-size:7px; margin:0px 2px 5px 10px}";
      let styleSpan = "span{font-size:7px; margin:0px 2px 5px 10px}";
      let styleFooterInfo =
        ".footerInfo{font-size:7px; position:relative; top:10px; left:50px; display:flex; flex-direction:column}";
      newWindow.document.write(
        `<style>${
          stylesMain +
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
      newWindow.close();
    },
  },
};
</script>

<style  lang="scss">
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
    max-width: 220px;
  }
  h6 {
    margin: 10px 50px;
    font-size: 12px;
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
  margin: 20px;
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
