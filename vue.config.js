module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_mixins.scss";
          @import "@/assets/scss/font.scss";
          @import "@/assets/scss/box.scss";
          @import "@/assets/scss/general.scss";
          @import "@/assets/scss/form.scss";
          @import "@/assets/scss/button.scss";
          @import "@/assets/scss/tag.scss";
        `
      }
    }
  },
  devServer: {
    host: 'localhost'
  }
}