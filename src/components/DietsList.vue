<template>
  <div class="dietsList">
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
  props: ["allDiets"],
  data: () => ({
    dietsList: [],
    active: "",
  }),
  created() {
    this.dietsList = this.setDiets;
  },
  computed: {
    setDiets() {
      let dietsList = [];
      for (let diet in this.allDiets) {
        for (let calories of this.allDiets[diet]) {
          dietsList.push(diet + " " + calories);
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
  width: 200px;
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
</style>
