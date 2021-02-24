<template>
  <div class="main">
    <div>
      <AddNewInfo  v-bind:allDiets="getState.diets" v-bind:snackBar="getState.snackBar"/>
      <div title="Wrocisz do strony drukowania" class="link">
        <router-link to="/">Wroć do glównej</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddNewInfo from "../components/AddNewInfo";
export default {
  name: "AddInfo",
  components: {
    AddNewInfo,
  },
  computed: {
    ...mapGetters(["getState"])
  },
};
</script>
<style scoped lang="scss">
.link {
  border-top: 1px solid rgb(218, 218, 218);
  margin-top: 20px;
  padding: 20px;
  a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    padding: 10px 60px;
    background: #029e4b;
    border-radius: 5px;
  }
}
.link a:hover {
  cursor: pointer;
  background: #018d42;
}
</style>