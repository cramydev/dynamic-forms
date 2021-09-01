<template>
  <div id="c-input-creation">
    <p class="small-info text-left font-bold mb-10">Desde esta sección puedes crear los campos para el formulario.</p>
    <div class="align-left mb-10">
      <ActionButton @click="addInput ? cancelValue() : newValue()" :textValue="addInput ? 'Cancelar' : 'Nuevo campo'" :buttonType="'link'" />
    </div>

    <div v-if="addInput || editInput" class="new-input">
      <select @change="handleInputType">
        <option selected>Selecciona tipo de campo</option>
        <option v-for="(type, index) in inputTypes" :key="index" :value="index">
          {{ type.name }}
        </option>
      </select>

      <Divider v-if="currentInputType > 0" />

      <div class="new-input-data" v-if="currentInputType == 1 || currentInputType == 2 || currentInputType == 3">
        <div class="input-group">
          <label>Pregunta / Indicación</label>
          <input v-model="inputData.label" type="text" @click="clearErrors()"/>
          <span class="error-message small-info text-left">{{ labelError }}</span>
        </div>

        <div class="input-group-checkbox mb-30">
          <input class="mr-10" type="checkbox" v-model="inputData.required" />
          <span class="small-info">Campo obligatorio</span>
        </div>

        <div class="align-center-center">
          <ActionButton v-if="!editInput" @click="createTextInput" :textValue="'Crear campo'" :buttonType="'secondary'" />
          <ActionButton v-else @click="modifyInput" :textValue="'Editar campo'" :buttonType="'secondary'" />
        </div>
      </div>
      <div class="new-input-data" v-if="currentInputType == 4 || currentInputType == 5">
        <div class="input-group">
          <label>Pregunta / Indicación</label>
          <input v-model="inputData.label" type="text" @click="clearErrors()"/>
          <span class="error-message small-info text-left">{{ labelError }}</span>
        </div>

        <div class="input-group-checkbox">
          <input class="mr-10" type="checkbox" v-model="inputData.required" />
          <span class="small-info">Campo obligatorio</span>
        </div>

        <Divider />

        <p class="mb-20 small-info font-bold text-left" v-if="inputData.options.length == 0">Debes agregar las opciones que requieras.</p>                

        <div class="input-group">
          <label>Nombre de la opción</label>
          <input class="mr-10" type="text" v-model="optionName" @click="clearErrors()"/>
          <span class="error-message small-info text-left">{{ labelOptionError }}</span>
        </div>                

        <div class="align-center-center">
          <ActionButton @click="addOption" :textValue="'Agregar opción'" :buttonType="'link'" />
        </div>

        <div v-if="inputData.options.length > 0">
          <Divider />

          <p class="mb-10 small-info text-left"><strong>Opciones agregadas:</strong></p>
          <div class="input-options mb-10" v-for="(option, index) in inputData.options" :key="index">
            <p class="small-info">{{ option }}</p>
            <p class="ml-10 pointer" @click="deleteOption(option)">⛔</p>
          </div>
        </div>

        <Divider />

        <p class="small-info text-center error-message mb-10" v-if="errorMessage">{{ errorMessage }}</p>

        <div class="align-center-center">
          <ActionButton v-if="!editInput" @click="createOptionInput" :textValue="'Crear campo'" :buttonType="'secondary'" />
          <ActionButton v-else @click="modifyInput" :textValue="'Editar campo'" :buttonType="'secondary'" />
        </div>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch, onBeforeMount } from 'vue'
import inputs from '@/data/input-type.json'

import Divider from '@/components/Other/Divider.vue'
import ActionButton from '@/components/Button/ActionButton.vue'

import { InputData } from '../../types'

export default defineComponent({
  props: {
    editInput: {
      type: Boolean,
      required: true,
      default: false
    },
    editInputData: {
      type: Object,
      required: true,
      // default: (() => {})
    },
    inputType: {
      type: Number,
      required: true,
      // default: (() => {})
    }
  },

  components: {
    ActionButton,
    Divider
  },
  

  setup(props){
    const {editInput, editInputData, inputType} = toRefs(props)
    let optionName = ref('')
    let labelError = ref('')
    let labelOptionError = ref('')
    let errorMessage = ref('')
    let inputTypes = ref(inputs.inputTypes)
    let currentInputType = ref(0)
    let addInput = ref(false)

    const editInputWatch = watch(() => props.editInput, (newValue, oldValue) => {
      // console.log('props editInput from watch', {
      //   editInput: props.editInput, 
      //   newValue: newValue, 
      //   oldValue: oldValue
      // })

      if (newValue == true) {
        let input = toRefs(state)

        currentInputType.value = inputType.value

        // console.log('before input from watch', input.inputData)

        input.inputData.value.typeId = editInputData.value.typeId
        input.inputData.value.type = editInputData.value.type
        input.inputData.value.required = editInputData.value.required
        input.inputData.value.nameType = editInputData.value.nameType
        input.inputData.value.label = editInputData.value.label
        input.inputData.value.maxLength = editInputData.value.maxLength
        input.inputData.value.minLength = editInputData.value.minLength
        input.inputData.value.options = editInputData.value.options

        // console.log('after input from watch', input.inputData)
      }
      // checkEditInput()
    })

    const state = reactive({
      // inputTypes: inputs.inputTypes,

      // newInput: [] as InputData,

      inputData: {
        typeId: 0,
        type: '',
        nameType: '',
        label: '',
        required: false,
        maxLength: 0,
        minLength: 0,
        options: [] as string[],
      } as InputData,
    })

    const checkEditInput = onBeforeMount(() => {
      if (editInput.value == true) {
        let input = toRefs(state)

        // console.log('input from before mount', input.inputData)

        currentInputType.value = editInputData.value.typeId

        input.inputData.value.typeId = editInputData.value.typeId
        input.inputData.value.type = editInputData.value.type
        input.inputData.value.required = editInputData.value.required
        input.inputData.value.nameType = editInputData.value.nameType
        input.inputData.value.label = editInputData.value.label
        input.inputData.value.maxLength = editInputData.value.maxLength
        input.inputData.value.minLength = editInputData.value.minLength
        input.inputData.value.options = editInputData.value.options
      }
    })

    return {
      ...toRefs(state),
      // state,
      checkEditInput,
      optionName,
      labelError,
      errorMessage,
      labelOptionError,
      addInput,
      inputTypes,
      currentInputType,
      editInputWatch
    }
  },

  methods: {
    clearErrors(){
      // this.nameError = this.nameError ? '' : ''
      // this.descriptionError = this.descriptionError ? '' : ''
      // this.formError = this.formError ? '' : ''
      this.labelError = this.labelError ? '' : ''
      this.labelOptionError = this.labelOptionError ? '' : ''
    },
    clearValues(){
      this.currentInputType = 0
      this.addInput = false
      // this.editInput = false
      this.inputData.typeId = 0
      this.inputData.type = ''
      this.inputData.required = false
      this.inputData.nameType = ''
      this.inputData.label = ''
      this.inputData.maxLength = 0
      this.inputData.minLength = 0
      this.inputData.options = []
      this.optionName = ''
      // this.errorMessage = ''
    },
    newValue(){
      this.$emit('clearErrors')
      this.addInput = true
    },
    cancelValue(){
      this.addInput = false
      this.$emit('cancelValue')
      this.clearValues()
      // this.editInput = false
    },
    handleInputType(event: any){
      // console.log('event', event)
      if (event.target.value >= 0) {
        this.currentInputType = this.inputTypes[event.target.value].id
        this.inputData.typeId = this.inputTypes[event.target.value].id
        this.inputData.type = this.inputTypes[event.target.value].value
        this.inputData.nameType = this.inputTypes[event.target.value].name
  
        // console.log('currentInputType', this.currentInputType)
      } else {
        this.currentInputType = 0
        this.addInput = false
      }
    },
    createTextInput(){
      if (!this.inputData.label) {
        this.labelError = 'Debes llenar este campo'
      } else {
        this.$emit('newInput', this.inputData)
        
        this.$emit('hideInputCreation')
  
        this.clearValues()
      }
    },
    createOptionInput(){
      if (!this.inputData.label) {
        this.labelError = 'Debes llenar este campo'
      } else if (this.currentInputType == 5 && this.inputData.options.length <= 2) {
        this.errorMessage = 'Para este tipo de campo tienen que haber más de dos opciones.'
      } else if (this.currentInputType == 4 && this.inputData.options.length > 2) {
        this.errorMessage = 'Para este tipo de campo solo se permiten dos opciones.'
      } else {
        this.$emit('newInput', this.inputData)
        this.$emit('hideInputCreation')
  
        this.clearValues()
      }
      
    },
    addOption(){
      if (!this.optionName) {
        this.labelOptionError = 'Debes llenar este campo'
      } else if (this.currentInputType == 4 && this.inputData.options.length >= 2) {
        this.errorMessage = 'Para este tipo de campo solo se permiten dos opciones.'
      } else {
        this.inputData.options.push(this.optionName)
        this.optionName = ''
        this.errorMessage = ''
      }

    },
    deleteOption(option: string){
      // console.log('before this.inputData.options', this.inputData.options)
      // console.log('index', option)
      let optionIndex = this.inputData.options.indexOf(option)

      // console.log('optionIndex', optionIndex)
      this.inputData.options.splice(optionIndex, 1)
      // console.log('after this.inputData.options', this.inputData.options)
    },
    modifyInput(){
      this.$emit('saveModifiedInput', this.inputData)

      this.clearValues()
    },
  }
})
</script>

<style lang="scss">
#c-input-creation {
  .new-input {
    @include alignLeft;
    flex-direction: column;

    .new-input-data {
      @include alignLeft;
      flex-direction: column;

      .input-options {
        @include alignCenterVertical;
        word-break: break-all;
      }
    }

    input[type="text"], select {
      width: 50%;
    }
  }
}

@media (max-width: $screenSize_tablet) {
  #c-input-creation {
    // position: relative;
    width: 100%;

    .new-input-data {
      .input-options {
        word-break: break-all;
      }
    }

    .new-input {
      input[type="text"], select {
        width: 90%;
      }
    }
  }
}
</style>