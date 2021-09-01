<template>
  <div id="c-header" class="main-container py-20">
    <div class="align-center-between">
      <div class="header-left-side">
        <router-link to="/" class="mr-40" >
          <Logo />
        </router-link>
      
        <Menu class="desktop-element" />
      </div>

      <div class="header-right-side">
        <a class="info font-white desktop-element" href="https://cramydev.netlify.app" target="_blank" rel="noreferrer">Visita mi sitio web 😁</a>
        <img src="../../assets/icons/menu-bars.svg" class="responsive-element pointer" @click="menuHandling" />
      </div>
    </div>

    <div v-if="showMenu" class="responsive-element">
      <Menu class="mt-20" />

      <div class="text-center mt-20">
        <a class="info font-white" href="https://cramydev.netlify.app" target="_blank" rel="noreferrer">Visita mi sitio web 😁</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Logo from '@/components/Logo/Logo.vue'
import Menu from '@/components/Menu/Menu.vue'
import {useRoute} from 'vue-router'

export default defineComponent({
  name: 'Home',

  components: {
    Logo,
    Menu,
  },

  setup() {
    let showMenu = ref(false)
    const route = useRoute()

    watch(() => route.name, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        showMenu.value = false
      }
    })

    return { showMenu, route }
  },


  methods: {
    menuHandling(){
      this.showMenu = !this.showMenu
    }
  }
})
</script>

<style lang="scss">
#c-header {
  // @include alignCenterBetween;

  .header-left-side {
    @include alignCenterVertical;
  }

  .header-right-side {
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>