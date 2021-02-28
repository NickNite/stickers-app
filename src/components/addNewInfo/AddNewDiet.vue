<template>
  <div>
    <body class="bodyAdd">
      <div class="description">
        <label for="description"><b>Opis:</b></label>
        <b-form-textarea
          :state="$v.description.required"
          id="description"
          v-model.trim="$v.description.$model"
          placeholder="Wpish opis danią..."
          rows="4"
          max-rows="4"
        ></b-form-textarea>
      </div>
      <div class="contains">
        <label for="contains"><b>Zawiera:</b></label>
        <b-form-textarea
          :state="$v.contains.required"
          id="contains"
          v-model.trim="$v.contains.$model"
          placeholder="Wpish co zawiera danią..."
          rows="3"
          max-rows="3"
        ></b-form-textarea>
      </div>
      <div class="allergens">
        <label for="allergens"><b>Alergeny:</b></label>
        <b-form-textarea
          :state="$v.allergens.required"
          id="allergens"
          v-model.trim="$v.allergens.$model"
          placeholder="Wpish jakie ma alergeny..."
          rows="3"
          max-rows="3"
        ></b-form-textarea>
      </div>
    </body>
    <div class="eat">
      <b-form-group>
        <template #label>
          <b>Wybierz sposób użycia:</b><br />
          <b-form-checkbox
            :key="allergens || 'test'"
            v-model="allSelected"
            aria-describedby="howToUse"
            aria-controls="howToUse"
            @change="toggleAll"
          >
            {{ allSelected ? "Wybranę wszystkie" : "Odznaczyć wszystkie:" }}
          </b-form-checkbox>
        </template>

        <template v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            id="howToUse"
            v-model="$v.eat.$model"
            :options="howToUse"
            :aria-describedby="ariaDescribedby"
            name="howToUse"
            class="ml-2"
            aria-label="howToUse"
            inline
          ></b-form-checkbox-group>
        </template>
      </b-form-group>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  name: "AddNewDiet",
  props: ["onChangeInfo", "submitStatus"],
  data: () => ({
    allSelected: false,
    howToUse: ["ciepło", "zimno"],
    description: "",
    contains: "",
    allergens: "",
    eat: [],
  }),
  beforeUpdate() {
    this.newDiet();
  },
  watch: {
    submitStatus() {
      (this.description = ""),
        (this.contains = ""),
        (this.allergens = ""),
        (this.eat = []);
      this.setSubmitStatus("ERROR");
    },
    eat() {
      this.newDiet();
    },
    selected(newValue) {
      // Handle changes in individual flavour checkboxes
      if (newValue.length === 0) {
        this.allSelected = false;
      } else if (newValue.length === this.flavours.length) {
        this.allSelected = true;
      } else {
        this.allSelected = false;
      }
    },
  },
  validations: {
    description: { required },
    contains: { required },
    allergens: { required },
    eat: { required },
  },

  methods: {
    ...mapActions(["setSubmitStatus"]),
    newDiet() {
      let data = {
        description: this.description,
        contains: this.contains,
        allergens: this.allergens,
        eat: this.eat,
        error: "SUCCESS",
      };
      if (this.$v.$invalid) {
        this.onChangeInfo({ error: "ERROR" });
      } else {
        this.onChangeInfo(data);
      }
    },
    toggleAll(checked) {
      this.eat = checked ? this.howToUse.slice() : [];
    },
  },
};
</script>
<style scoped lang="scss"></style>
