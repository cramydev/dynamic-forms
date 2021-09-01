<template>
  <div id="c-menu">
    <ul>
      <li class="mr-20"><router-link to="/" class="info font-white" exact>Acerca</router-link></li>
      <li class="mr-20"><router-link to="/formularios" class="info font-white" exact>Formularios</router-link></li>
      <li><router-link to="/crear" class="info font-white" exact>Crear</router-link></li>
    </ul>
  </div>
</template>

<style lang="scss">
#c-menu {
  ul {
    @include alignCenterCenter;
    list-style: none;
  }
}
</style>