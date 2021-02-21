<template>
  <div class="dietsList">
         <b-form-group
    class="radio"
      v-slot="{ ariaDescribedby }"
    >
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
    <b-list-group>
      <b-list-group-item
        class="diet"
        v-for="(diet, i) of dietsList"
        :key="{ diet } + i"
        button
        variant="light"
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
  props: ["allDiets","snackBar"],
  data: () => ({
    dietsList: [],
    active: "",
    dishType:"",
    dishList:['Diety', 'Snack Bar']
  }),
  created() {
    this.dietsList = this.setDiets;
    console.log('test1')
  },
  beforeUpdate() {
    if(!this.dishType){
    console.log('test2')
this.dietsList = this.setDiets;
    }
  },
  computed: {
    setDiets() {
      let dietsList = [];
      if(this.dishType ==="Diety"){
        for (let diet in this.allDiets) {
        for (let calories of this.allDiets[diet]) {
          dietsList.push(diet + " " + calories);
        }
      }
      }
      if(this.dishType==="Snack Bar"){
 for (let diet in this.snackBar) {
        for (let calories of this.snackBar[diet]) {
          dietsList.push(diet + " " + calories);
        }
      }
      }
     return dietsList;
    },
  },
  methods: {
    ...mapActions(["setActiveForm"]),
    activeDiet() {
      this.active = event.target.innerHTML;
      this.setActiveForm(this.active);
    },
  },
};
</script>

<style scoped lang="scss">
.dietsList {
  margin-left: -1px;
  width: 250px;
  border-right: 1px solid rgb(218, 218, 218);
  max-height: 685px;
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
.active {
  background: lightgray;
}
.radio{
  margin-top: 15px;
}
</style>
