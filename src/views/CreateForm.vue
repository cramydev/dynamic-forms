<template>
  <div id="p-create-form" class="main-container py-20">
    <Create />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Create from '@/components/Form/Create.vue'

export default defineComponent({
  name: 'create-form',

  components: {
    Create
  },
})
</script>
