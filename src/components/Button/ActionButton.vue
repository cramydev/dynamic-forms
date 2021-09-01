<template>
  <div id="c-action-button">
    <button :class="currentClass">
      {{ textValue }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, onBeforeMount, ref, PropType } from 'vue'

import { ButtonType } from '../../types'

export default defineComponent({
  props: {
    textValue: {
      type: String as PropType<ButtonType>,
      required: true
    },
    buttonType: {
      type: String,
      required: true
    } 
  },

  setup(props) {
    const { buttonType } = toRefs(props)
    let currentClass = ref('button-primary')

    onBeforeMount(() => {
      if (buttonType.value == 'primary') {
        currentClass.value = 'button-primary'
      } else if (buttonType.value == 'secondary') {
        currentClass.value = 'button-secondary'
      } else if (buttonType.value == 'link') {
        currentClass.value = 'button-link'
      } else if (buttonType.value == 'cancel') {
        currentClass.value = 'button-cancel'
      } else {
        currentClass.value = 'button-primary'
      }
    })

    return {
      currentClass
    }
  },
})
</script>
