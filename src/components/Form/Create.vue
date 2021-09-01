<template>
  <div id="c-create-form">
    <div v-if="!nextStep">
      <div class="first-step box-properties box-shadow p-20">
        <div class="input-group">
          <label>Nombre del formulario</label>
          <input name="name" v-model="newForm.name" type="text" @click="clearErrors()" />
          <span class="error-message small-info text-left">{{ nameError }}</span>
        </div>
        <div class="input-group">
          <label>Descripción</label>
          <textarea type="textarea" name="description" v-model="newForm.description" rows="5" @click="clearErrors()" />
          <span class="error-message small-info text-left">{{ descriptionError }}</span>
        </div>

        <p v-if="formError" class="error-message small-info text-center">{{ formError }}</p>

        <div class="align-center-center mt-20 resp-flex-col">
          <ActionButton class="lg-mr-20 md-mb-10" @click="cancelCreation" :textValue="'Cancelar'" :buttonType="'cancel'" />
          <ActionButton @click="handleSteps" :textValue="'Continuar'" :buttonType="'primary'" />
        </div>
      </div>
    </div>

    <div class="next-step mt-30" v-if="nextStep">
      <div class="form-data-header mb-20">
        <p class="mb-10"><strong>Formulario:</strong> {{ newForm.name }}</p>
        <p><strong>Descripción:</strong> {{ newForm.description }}</p>
      </div>  

      <div class="form-content lg-mx-30">
        <div class="form-data lg-mr-20">
          <div class="form-inputs" v-if="newForm.inputs.length > 0">
            <div v-for="(input, index) in newForm.inputs" :key="index">
              
              <div class="box-properties box-shadow p-20">
                <div class="input-row">
                  <div class="input-data mr-10">
                    <div v-if="input.typeId == 1 || input.typeId == 2 || input.typeId == 3">
                      <p class="small-info mb-10 text-left">{{ input.nameType }} / {{ input.required ? 'Obligatorio' : 'Opcional' }}</p>
                      <p class="text-left"><strong>{{ input.label }}</strong></p>
                    </div>

                    <div v-if="input.typeId == 4 || input.typeId == 5">
                      <p class="small-info mb-10 text-left">{{ input.nameType }} / {{ input.required ? 'Obligatorio' : 'Opcional' }}</p>
                      <p class="mb-5 text-left"><strong>{{ input.label }}</strong></p>
                      <div v-for="(option, subindex) in newForm.inputs[index].options" :key="subindex">
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

                  <div class="input-actions">
                    <p class="mr-10 pointer" @click="handleEditInput(index)">✏️</p>
                    <p class="pointer" @click="handleDeletingInput(index)">⛔</p>
                  </div>
                </div>

                <div class="mt-20 align-center-left resp-flex-col" v-if="currentIndex == index && showQuestion">
                  <p class="small-info resp-text-center font-bold md-mb-10">⚠️ ¿Estás seguro que quieres eliminar este campo?</p>
                  <div class="align-center-center">
                    <ActionButton class="mx-10" @click="deleteInput(index)" :textValue="'Si'" :buttonType="'link'" />
                    <ActionButton @click="cancelDeletingInput()" :textValue="'No'" :buttonType="'link'" />
                  </div>
                </div>
              </div>

              <!-- <Divider v-if="index < newForm.inputs.length - 1"/> -->
              <div class="my-30" v-if="index < newForm.inputs.length - 1"></div>
            </div>
          </div>     

          <div v-else class="box-properties box-shadow p-20">
            <p class="small-info text-center font-bold">Debes agregar campos al formulario</p>
          </div>
        </div>

        <div class="new-input-content box-properties box-shadow p-20">
          <InputCreation 
            :editInput="editInput" 
            :editInputData="inputData" 
            :inputType="currentInputType" 
            @newInput="newInput"
            @saveModifiedInput="saveModifiedInput"
            @cancelValue="cancelValue"
            @clearErrors="clearErrors"
            @hideInputCreation="hideInputCreation"
          />
        </div>
      </div>

      <div class="form-status align-center-center resp-flex-col" v-if="newForm.inputs.length > 0">
        <p class="small-info font-bold">⚠️ ¿Crear formulario como borrador?</p>

        <div class="lg-ml-10 align-center-center md-mt-20">
          <div class="input-group-checkbox mr-10">
            <input class="mr-10" type="radio" name="form-status" v-model="drafStatus" checked/>
            <span class="small-info">Si</span>
          </div>
          <div class="input-group-checkbox">
            <input class="mr-10" type="radio" name="form-status" v-model="drafStatus"/>
            <span class="small-info">No</span>
          </div>
        </div>
      </div>

      <p v-if="formError" class="error-message small-info text-center">{{ formError }}</p>

      <div class="align-center-center mt-30">
        <ActionButton @click="goBack()" :textValue="'Volver'" :buttonType="'cancel'" />
        <ActionButton class="lg-ml-10" v-if="newForm.inputs.length > 0" @click="create" :textValue="'Crear formulario'" :buttonType="'primary'" />
      </div>
    </div>

    <div v-if="nextStep" class="responsive-element floating-button" @click="handleInputCreation">
      <span>+</span>
    </div>

    <div class="responsive-element new-input-creation p-10" v-if="showInputCreation || editInput">
      <div class="creation-header align-left pointer mb-10" @click="hideInputCreation">
        <p class="small-info font-bold">◀️ Cancelar</p>
      </div>

      <div class="creation-content px-10">
        <InputCreation 
          :editInput="editInput" 
          :editInputData="inputData" 
          :inputType="currentInputType" 
          @newInput="newInput"
          @saveModifiedInput="saveModifiedInput"
          @cancelValue="cancelValue"
          @clearErrors="clearErrors"
          @hideInputCreation="hideInputCreation"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'

import inputs from '@/data/input-type.json'

// import Divider from '@/components/Other/Divider.vue'
import ActionButton from '@/components/Button/ActionButton.vue'
import InputCreation from '@/components/Form/InputCreation.vue'

import { CreateForm, InputData } from '../../types'

export default defineComponent({
  components: {
    ActionButton,
    // Divider,
    InputCreation
  },

  setup(){    
    let optionName = ref('')
    let formError = ref('')
    let nameError = ref('')
    let descriptionError = ref('')
    let labelError = ref('')
    let labelOptionError = ref('')
    let errorMessage = ref('')
    let drafStatus = ref('Si')
    let currentIndex = ref(0)
    let currentInputType = ref(0)
    let editInputIndex = ref(0)
    let editInput = ref(false)
    let addInput = ref(false)
    let addOptions = ref(false)
    let nextStep = ref(false)
    let showQuestion = ref(false)
    let showInputCreation = ref(false)

    const state = reactive({
      inputTypes: inputs.inputTypes,

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

      newForm: {
        name: '',
        description: '',
        status: '',
        inputs: [] as InputData[]
      } as CreateForm
    })
    
    return { 
      ...toRefs(state),
      optionName,
      formError,
      nameError,
      descriptionError,
      labelError,
      labelOptionError,
      errorMessage,
      currentIndex,
      currentInputType,
      editInputIndex,
      editInput,
      addInput,
      addOptions,
      nextStep,
      showQuestion,
      drafStatus,
      showInputCreation
    }
  },

  methods: {
    clearErrors(){
      this.nameError = this.nameError ? '' : ''
      this.descriptionError = this.descriptionError ? '' : ''
      this.formError = this.formError ? '' : ''
      this.labelError = this.labelError ? '' : ''
      // this.labelOptionError = this.labelOptionError ? '' : ''
    },
    cancelCreation(){
      this.clearErrors()
      this.clearValues()
      this.newForm.inputs = []
      this.newForm.name = ''
      this.newForm.description = ''
      this.newForm.status = ''

      this.$router.push({path: '/formularios'})
    },
    goBack(){
      this.nextStep = false
      this.clearValues()
    },
    clearValues(){
      this.currentInputType = 0
      this.addInput = false
      this.editInput = false
      this.inputData.typeId = 0
      this.inputData.type = ''
      this.inputData.required = false
      this.inputData.nameType = ''
      this.inputData.label = ''
      this.inputData.maxLength = 0
      this.inputData.minLength = 0
      this.inputData.options = []
      this.optionName = ''
      this.errorMessage = ''
    },
    handleInputCreation(){
      this.showInputCreation = true
    },
    hideInputCreation(){
      this.editInput = false
      this.showInputCreation = false
    },
    handleSteps(e: any){
      e.preventDefault();

      if (!this.newForm.name && this.newForm.description) this.nameError = 'Este campo es obligatorio'
      if (!this.newForm.description && this.newForm.name) this.descriptionError = 'Este campo es obligatorio'
      
      if (!this.newForm.name && !this.newForm.description) {
        this.formError = 'Debes completar los campos'
      } else {
        this.nextStep = true
      }
      
    },
    handleEditInput(index: number){
      this.editInput = true
      this.editInputIndex = index
      let currentInput = this.newForm.inputs[index]
      
      this.addInput = true

      this.currentInputType = currentInput.typeId
      this.inputData.typeId = currentInput.typeId
      this.inputData.type = currentInput.type
      this.inputData.required = currentInput.required
      this.inputData.nameType = currentInput.nameType
      this.inputData.label = currentInput.label
      this.inputData.maxLength = currentInput.maxLength
      this.inputData.minLength = currentInput.minLength
      this.inputData.options = currentInput.options
    },
    newInput(data: any){
      // console.log('data from emit', data)

      this.newForm.inputs.push({
        typeId: data.typeId,
        type: data.type,
        nameType: data.nameType,
        required: data.required,
        label: data.label,
        maxLength: data.maxLength,
        minLength: data.minLength,
        options: data.options,
      })
    },
    saveModifiedInput(data: any){
      this.newForm.inputs[this.editInputIndex].typeId = data.typeId
      this.newForm.inputs[this.editInputIndex].type = data.type
      this.newForm.inputs[this.editInputIndex].required = data.required
      this.newForm.inputs[this.editInputIndex].nameType = data.nameType
      this.newForm.inputs[this.editInputIndex].label = data.label
      this.newForm.inputs[this.editInputIndex].maxLength = data.maxLength
      this.newForm.inputs[this.editInputIndex].minLength = data.minLength
      this.newForm.inputs[this.editInputIndex].options = data.options

      this.clearValues()
    },
    handleDeletingInput(index: number){
      this.currentIndex = index
      this.showQuestion = true
    },
    cancelDeletingInput(){
      this.currentIndex = 0
      this.showQuestion = false
    },
    deleteInput(index: number){
      this.newForm.inputs.splice(index, 1)
      this.showQuestion = false
    },
    cancelValue(){
      // this.addInput = false
      this.editInput = false
    },
    create() {
      // console.log('this.drafStatus', this.drafStatus)
      if (this.drafStatus == 'Si') {
        this.newForm.status = 'Borrador'
      } else {
        this.newForm.status = 'Publicado'
      }

      if (this.newForm.inputs.length == 0) {
        this.formError = 'No puedes crear un formulario sin campos'
      } else {
        let localForms: string | null = window.localStorage.getItem('localForms')

        if (localForms) {
          let currentData = JSON.parse(localForms)
          currentData.push(this.newForm)
          window.localStorage.removeItem('localForms')
          window.localStorage.setItem('localForms', JSON.stringify(currentData))
        } else {
          let currentData = []
          currentData.push(this.newForm)
          window.localStorage.setItem('localForms', JSON.stringify(currentData))
        }

        this.$router.push('/formularios')
      }
    }
  }
})
</script>

<style lang="scss">
#c-create-form {
  // position: relative;

  .first-step {
    max-width: 500px;
    margin: 20px auto;
  }
  
  .next-step {
    .form-data-header {
      text-align: left
    }

    .form-content {
      @include alignTopLeft;

      .form-data {
        // border: $general_border;
        width: 60%;

        .form-inputs {
          .input-row {
            word-break: normal;
            @include alignCenterBetween;

            .input-data {
              width: 80%;
            }

            .input-actions {
              width: 20%;
              @include alignCenterCenter;
            }
          }
        }
      }
    
      .new-input-content {
        // border: $general_border;
        width: 50%;
        @include alignLeft;
        flex-direction: column;

        .new-input {
          @include alignLeft;
          flex-direction: column;

          .new-input-data {
            @include alignLeft;
            flex-direction: column;

            .input-options {
              @include alignCenterVertical;
            }
          }

          input[type="text"], select {
            width: 50%;
          }
        }
      }
    }

    .form-status {
      max-width: 500px;
      margin: 20px auto;
    }

  }
}

@media (max-width: $screenSize_tablet) {
  #c-create-form {
    // position: relative;

    .next-step {
      .form-content {
        .form-data {
          width: 100%;

          .form-inputs {
            .input-row {
              word-break: break-all;
            }
          }
        }
        
        .new-input-content {
          display: none !important;
        }
      }
    }

    .floating-button {
      position: fixed;
      z-index: 10;
      border-radius: 50%;
      background: $primary_1;
      padding: 10px;
      bottom: 10px;
      right: 5px;
      box-shadow: $box_shadow;

      span {
        font-size: 25px;
        color: white;
        font-weight: 600;
        @include alignCenterCenter;
        width: 20px;
        height: 20px;
      }
    }

    .new-input-creation {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 15;
      min-height: 100vh;
      background: white;
    }
  }
}
</style>