<template>
  <div id="p-forms" class="main-container py-20">
    
    <div class="mb-50">
      <p class="title" v-if="!currentForm">Formularios</p>

      <div v-else>
        <div class="pointer mb-15" @click="goBack">
          <p class="small-info font-bold">◀️ Volver</p>
        </div>
        <p class="info mb-10"><strong>Formulario: </strong>{{ currentForm.name }}</p>
        <p class="small-info"><strong>Descripción: </strong>{{ currentForm.description }}</p>
      </div>
    </div>

    <div v-if="!currentForm">
      <div v-if="forms.length == 0" class="box-properties box-shadow p-20">
        <p class="info text-center">No has creado formularios.</p>

        <router-link class="align-center-center mt-20" to="/crear">
          <ActionButton :buttonType="'primary'" :textValue="'Crear formulario'" />
        </router-link>
      </div>

      <div v-else>
        <div class="forms-content" v-for="(form, index) in forms" :key="index">
          <div class="box-properties box-shadow p-20 mb-30 align-center-between resp-flex-col">
            <div class="form-info">
              <p class="info font-bold mb-10">{{ form.name }}</p>
              <p class="small-info mb-10">{{ form.description }}</p>
              <p class="small-info"><strong>Estatus: </strong>{{ form.status }}</p>
            </div>

            <div class="form-button align-center-right pointer md-mt-20" @click="handleForm(index)">
              <p class="small-info font-bold mr-10">Ver más</p>
              <p class="info">▶️</p>
            </div>
          </div>
        </div>

        <p class="small-info text-center">⚠️ Normalmente este tipo de datos se muestra por paginación.</p>
      </div>
    </div>

    <div v-else>
      <div class="form-inputs" v-if="currentForm.inputs.length > 0">
        <div v-for="(input, index) in currentForm.inputs" :key="index">          
          <div class="box-properties box-shadow p-20">
            <div v-if="input.typeId == 1 || input.typeId == 2 || input.typeId == 3">
              <p class="small-info mb-10 text-left">{{ input.nameType }} / {{ input.required ? 'Obligatorio' : 'Opcional' }}</p>
              <p class="text-left"><strong>{{ input.label }}</strong></p>
            </div>

            <div v-if="input.typeId == 4 || input.typeId == 5">
              <p class="small-info mb-10 text-left">{{ input.nameType }} / {{ input.required ? 'Obligatorio' : 'Opcional' }}</p>
              <p class="mb-5 text-left"><strong>{{ input.label }}</strong></p>
              <div v-for="(option, subindex) in currentForm.inputs[index].options" :key="subindex">
                <div class="input-group-checkbox mb-5" v-if="input.typeId == 4">
                  <input class="mr-10" type="radio" :name="option"/>
                  <span class="small-info">{{ option }}</span>
                </div>

                <div class="input-group-checkbox mb-5" v-else>
                  <input class="mr-10" type="checkbox"/>
                  <span class="small-info">{{ option }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="my-30" v-if="index < currentForm.inputs.length - 1"></div>
        </div>
      </div>   
    </div>
  </div>
</template>

<script lang="ts">
import ActionButton from '@/components/Button/ActionButton.vue'
import { defineComponent, onBeforeMount, ref } from 'vue'

export default defineComponent({
  components: { ActionButton },

  setup() {
    let forms = ref([])
    let currentForm = ref(null)

    const checkForms = onBeforeMount(() => {
      let localForms: string | null = window.localStorage.getItem('localForms')
      // let localForms: [] = window.localStorage.getItem('localForms')

      // console.log('localForms', localForms)

      if (localForms) {
        forms.value = JSON.parse(localForms)
      } else {
        forms.value = []
      }

      // console.log('forms.value', forms.value)
    })

    return {
      forms,
      currentForm,
      checkForms
    }
  },

  methods: {
    handleForm(index: number) {
      this.currentForm = this.forms[index]
    },
    goBack(){
      this.currentForm = null
    },
  }
})
</script>

<style lang="scss">
#p-forms {
  .forms-content {
    max-width: 700px;
    margin: 0px auto;

    .form-info {
      width: 100%;
    }

    .form-button {
      width: 40%;
    }
  }
}
</style>