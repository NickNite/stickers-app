<template>
  <div class="hello">
    <header>
      <div class="date">
        <label for="date"><b>Data:</b></label>
        <b-form-select id="date" v-model="selectedDate" :options="dateLength">
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
        <b-form-select id="dish" v-model="dish" :options="dishLength">
          >
          <template #first>
            <b-form-select-option :value="null" disabled
              >--Danie--</b-form-select-option
            >
          </template>
        </b-form-select>
      </div>
    </header>
    <body>
      <div class="sticker" id="sticker">
        <h3>
          {{
            getActiveForm ? getActiveForm.toUpperCase() : "Wybierz rodzaj diety"
          }}
        </h3>
        <h6><b>Posiłek:&#8195;</b>{{ dish ? dish + "/5" : "-/5" }}</h6>
        <div v-if="!redactMode">
          <p v-if="description">
            {{ description }}
          </p>
          <p v-else>Wybierz danie i datę</p>
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
        <h6 class="shelfLife">
          Należy spożyć do:
          {{ selectedDate ? setShelfLifeDate : "----" }}
        </h6>
      </div>
      <div class="changeInfo">
        <b-button
          v-if="!redactMode"
          @click="redactModeOn"
          size="sm"
          title="Edytuj danę na naklejcę"
          class="mb-2"
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
  props: ["dishData", "getActiveForm"],
  created() {
    for (let date in this.dishData) {
      this.dateLength.push(date);
    }
  },
  beforeUpdate() {
    //Отображаем количество блюд по определнной дате
    if (this.dishData[this.selectedDate].length != this.dishLength.length) {
      this.dishLength = [];
      for (let i = 1; i < this.dishData[this.selectedDate].length; i++) {
        if (this.dishData[this.selectedDate][i] != null) {
          this.dishLength.push(i);
        }
      }
    } else {
      for (let i = 1; i < this.dishData[this.selectedDate].length; i++) {
        if (this.dishData[this.selectedDate][i] != null) {
          this.dishLength.push(i);
        }
      }
    }

    //Выводим тип диеты(слим,спорт)
    this.form = this.getActiveForm.split(" ")[0];

    //Отображаем данные из БД если нету режима редактирования
    if (!this.redactMode) {
      this.description = this.dishData[this.selectedDate][this.dish][
        this.form
      ].description;
      this.contains = this.dishData[this.selectedDate][this.dish][
        this.form
      ].contains;
      this.allergens = this.dishData[this.selectedDate][this.dish][
        this.form
      ].allergens;
    }
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
    ...mapActions(["setDishInfo"]),
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
      var newWindow = window.open();
      let stylesMain = ".print{width:200px; height:200px; font-family:	Arial}";
      let stylesIdSpan = " #span{display:flex; flex-direction: column;}";
      let styleh3 = "h3{font-weight: 400; margin:10px}";
      let styleh6 = "h6{margin:10px font-size:8px}";
      let styleP = "p{font-size:10px; margin:10px; padding:10px}";
      let styleSpan = "span{font-size:8px; margin:0px 10px 5px 10px}";
      let styleShelfLife =
        ".shelfLife{font-size:8px; position:relative; top:20px; left:50px}";
      newWindow.document.write(
        `<style>${
          stylesMain +
          stylesIdSpan +
          styleh3 +
          styleh6 +
          styleP +
          styleSpan +
          styleShelfLife
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

<style scoped lang="scss">
//Проверить еще раз функционал, собрать и задеплоить на firebase
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
  }
  .contains {
    display: flex;
    flex-direction: column;
    margin: 10px 20px;
    font-size: 14px;
  }
  .shelfLife {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
img:hover {
  cursor: pointer;
  opacity: 0.7;
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
</style>
