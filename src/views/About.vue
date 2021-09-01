<template>
  <div id="p-about" class="main-container py-20">
    <div class="mb-50">
      <p class="title mb-20">Acerca del proyecto</p>

      <div v-for="(info, index) in aboutData.info" :key="index">
        <p class="info" :class="index < aboutData.info.length - 1 ? 'mb-15' : 'mb-0'">{{ info }}</p>
      </div>
    </div>

    <p class="title mb-20">Versiones / Actividades</p>

    <div v-for="(version, index) in aboutData.versions" :key="index">
      <p class="info font-bold mb-15">{{ version.title }}</p>
      <div class="pl-20 mb-15" v-for="(activity, subindex) in version.activities" :key="subindex">
        <p class="small-info">✔️ {{ activity }}</p>        
      </div>

      <Divider v-if="index < aboutData.versions.length - 1" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import about from '@/data/about.json'
import Divider from '@/components/Other/Divider.vue'

export default defineComponent({
  components: {
    Divider
  },

  setup() {
    let aboutData = about

    return {
      aboutData
    }
  },
})
</script>
