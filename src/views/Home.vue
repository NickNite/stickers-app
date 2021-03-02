<template>
  <div class="main">
    <div class="loader" v-if="getState.loading">
      <b-spinner
        variant="success"
        type="grow"
        label="Large Spinner"
        style="width: 3rem; height: 3rem"
      ></b-spinner>
    </div>
    <div v-else class="home">
      <DietsList
        v-bind:allDiets="getState.diets.dietList"
        v-bind:snackBar="getState.snackBar.barList"
        v-bind:redactMode="getState.redactMode"
      />
      <Sticker
        v-bind:dietData="getState.diets.dietData"
        v-bind:barData="getState.snackBar.barData"
        v-bind:getActiveForm="getState.activeForm"
        v-bind:getDishType="getState.dishType"
        v-bind:redactMode="getState.redactMode"
      />
    </div>
    <div class="link"><router-link to="/addInfo">Dodaj nowe</router-link></div>
  </div>
</template>

<script>
import DietsList from "../components/DietsList";
import Sticker from "../components/Sticker";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    DietsList,
    Sticker,
  },
  created() {
    this.getDiet();
    this.getDietData();
    this.getSnackBar();
    this.getSnackBarData();
  },
  methods: {
    ...mapActions(["getDiet", "getDietData", "getSnackBar", "getSnackBarData"]),
  },
  computed: {
    ...mapGetters(["getState"]),
  },
};
</script>
<style scoped lang="scss">
.main {
  padding-bottom: 5px;
}
.loader {
  position: relative;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home {
  display: flex;
  border-bottom: 1px solid rgb(218, 218, 218);
}
.link {
  margin: 20px auto 15px auto;
  a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    padding: 10px 80px;
    background: #029e4b;
    border-radius: 5px;
  }
}
.link a:hover {
  cursor: pointer;
  background: #018d42;
}
</style>
