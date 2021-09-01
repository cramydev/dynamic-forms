<template>
  <div id="c-logo">
    <img src="../../assets/images/logo/cramy-modules-logo-white.svg" alt="logo" />
  </div>
</template>

<style lang="scss">
#c-logo {
  // width: 40%;
  width: 200px;
  height: 100%;
  // background: red;
  
  img {
    width: 100%;
    @include alignLeft;
  }
}

@media (max-width: $screenSize_tablet) {
  #c-logo {
    img {
      width: 80%
    }
  }
}
</style>