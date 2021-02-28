
Получение наклейки
<div v-if="!redactMode">
          <p v-if="description">
            {{ description }}
          </p>
          <p v-else>Wybierz danie i datę</p>
          <!-- Доделать изменения из базы данных -->
<div class="coldHeat"> 
  Spożywać na cieplo/zimno
</div>
<!-- Доделать изменения из базы данных -->
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

        ---------------------------------------------




        СОздание диет
        <body class="body">
        <div class="description">
          <label for="description"><b>Opis:</b></label>
          <b-form-textarea
            :state="$v.newDiets.description.required"
            id="description"
            v-model.trim="$v.newDiets.description.$model"
            placeholder="Wpish opis danią..."
            rows="4"
            max-rows="4"
          ></b-form-textarea>
        </div>
        <div class="contains">
          <label for="contains"><b>Zawiera:</b></label>
          <b-form-textarea
            :state="$v.newDiets.contains.required"
            id="contains"
            v-model.trim="$v.newDiets.contains.$model"
            placeholder="Wpish co zawiera danią..."
            rows="3"
            max-rows="3"
          ></b-form-textarea>
        </div>
        <div class="allergens">
          <label for="allergens"><b>Alergeny:</b></label>
          <b-form-textarea
            :state="$v.newDiets.allergens.required"
            id="allergens"
            v-model.trim="$v.newDiets.allergens.$model"
            placeholder="Wpish jakie ma alergeny..."
            rows="3"
            max-rows="3"
          ></b-form-textarea>
        </div>
      </body>
      <div class="eat">
       <b-form-group>
      <template #label>
        <b>Wybierz sposób użycia:</b><br>
        <b-form-checkbox
          v-model="allSelected"
          aria-describedby="howToUse"
          aria-controls="howToUse"
          @change="toggleAll"
        >
          {{ allSelected ?   'Wybranę wszystkie' : 'Odznaczyć wszystkie:' }}
        </b-form-checkbox>
      </template>

      <template v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="howToUse"
          v-model="newDiets.eat"
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