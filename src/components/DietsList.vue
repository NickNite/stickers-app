<template>
  <div class="dietsList">
    <b-form-group class="radio" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="btn-radios-2"
        v-model="dishType"
        :options="dishList"
        :aria-describedby="ariaDescribedby"
        button-variant="outline-primary"
        size="lg"
        name="radio-btn-outline"
        buttons
      ></b-form-radio-group>
    </b-form-group>
    <h4>{{ dishType }}</h4>
    <b-list-group v-if="!redactMode">
      <b-list-group-item
        class="diet"
        v-for="(diet, i) of dietsList"
        :key="{ diet } + i"
        button
        :class="{ actived: diet == active }"
        @click="activeDiet"
        >{{ diet }}</b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DietsList",
  props: ["allDiets", "snackBar", "redactMode"],
  data: () => ({
    loader: true,
    dietsList: [],
    active: "",
    dishType: "Diet",
    dishList: ["Diet", "Bar"],
  }),
  created() {
    this.dietsList = this.setDiets;
  },
  updated() {
    //Меняем тип продукта(диеты или снек бар)
    this.dietsList = this.setDiets;
    this.changeDishType(this.dishType);
  },
  watch: {
    dishType() {
      this.setActiveForm("");
    },
  },
  computed: {
    setDiets() {
      let dietsList = [];
      if (this.dishType === "Diet") {
        for (let diet of this.allDiets) {
          for (let calories of diet.dietColories) {
            dietsList.push(diet.dietTitle + " " + calories);
          }
        }
      }
      if (this.dishType === "Bar") {
        for (let bar of this.snackBar) {
          for (let calories of bar.dietColories) {
            dietsList.push(bar.dietTitle + " " + calories);
          }
        }
      }
      return dietsList;
    },
  },
  methods: {
    ...mapActions(["setActiveForm", "setDishType"]),
    activeDiet() {
      //Изменяем тип диеты(слим,спорт)
      this.active = event.target.innerHTML;
      this.setActiveForm(this.active);
    },
    changeDishType() {
      //Изменяем тип продукта(диета,бар)
      this.setDishType(this.dishType);
    },
  },
};
</script>

<style scoped lang="scss">
.dietsList {
  margin-left: -1px;
  width: 250px;
  border-right: 1px solid rgb(218, 218, 218);
  height: 700px;
  overflow-y: scroll;
}
ul {
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
li {
  list-style-type: none;
  padding: 5px 10px;
}
span:hover {
  cursor: pointer;
}
.actived {
  background: #dee2e6;
}
.radio {
  margin-top: 15px;
}
</style>
