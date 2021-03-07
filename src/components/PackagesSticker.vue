<template>
  <div class="buttonPack">
    <div class="printPackSticker">
      <span class="spanTitle">{{
        transform(getActiveForm).toUpperCase()
      }}</span>
    </div>

    <b-button
      class="buttPrint"
      @click="printPack"
      title="Drukowanie naklejki na siatki"
      variant="dark"
    >
      <b-icon icon="printer-fill" aria-hidden="true"></b-icon>
      Drukuj na siatki</b-button
    >
  </div>
</template>
<script>
export default {
  name: "PackagesSticker",
  props: ["getActiveForm", "titleLength"],
  beforeUpdate() {
    this.titleSize();
  },
  methods: {
    printPack() {
      const newWindow = window.open();
      let stylesMain =
        ".printPackSticker{text-align:center; font-weight: bold; width:200px; height:100px;  font-family: Arial, sans-serif; margin:50px 10px; border:2px solid black; display:flex; justify-content: center; align-items:center}";
      newWindow.document.write(`<style>${stylesMain}</style>`);
      newWindow.document.write('<div class="printPackSticker">');
      newWindow.document.write(
        document.querySelector(".printPackSticker").innerHTML
      );
      newWindow.document.write("</div>");
      newWindow.print();
      // newWindow.close();
    },
    transform(form) {
      //Делаем обработку названия из БД для отображения на наклейке
      let oldForm = form.split(" ").slice(0, -1);
      let newForm = oldForm.join(" ");
      let arrEnd = form.split(" ").slice(-1);
      let newdishTitle = "";
      if (newForm === "Slim-Bez laktozy") {
        newdishTitle = `Dieta o bardzo niskej zawartości laktozy ${arrEnd}`;
      } else if (newForm === "Slim-Bez glutenu") {
        newdishTitle = `Dieta o bardzo niskej zawartości glutenu ${arrEnd}`;
      } else if (newForm === "Slim-Bez laktozy i glutenu") {
        newdishTitle = `Dieta o bardzo niskej zawartości laktozy i glutenu ${arrEnd}`;
      } else {
        newdishTitle = form;
      }
      return newdishTitle;
    },
    titleSize() {
      let title = document.querySelector(".spanTitle");
      title.style.fontSize = this.setTitleSize;
    },
  },
  computed: {
    setTitleSize() {
      //Функция авторегулирование размера шрифта
      let titleSize = "";
      if (this.titleLength <= 15) {
        titleSize = "30px";
      } else if (this.titleLength > 15 && this.titleLength <= 19) {
        titleSize = "20px";
      } else if (this.titleLength > 20 && this.titleLength <= 33) {
        titleSize = "18px";
      } else if (this.titleLength > 33 && this.titleLength <= 42) {
        titleSize = "15px";
      } else if (this.titleLength > 42) {
        titleSize = "14px";
      }
      return titleSize;
    },
  },
};
</script>
<style scoped>
.buttonPack {
  display: flex;
  flex-direction: column;
}
.printPackSticker {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  border: 2px solid black;
  margin-bottom: 10px;
}
.spanTitle {
  font-weight: bold;
}
</style>
