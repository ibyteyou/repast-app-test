<template lang="pug">
  #app
    app-header
    img(alt="Vue logo" src="./assets/logo.png")
</template>

<script>
  import appHeader from './app-header.vue'

  export default {
    name: 'App',
    components: {
      appHeader
    }
  }
</script>

<style lang="sass">
  body
    background: linear-gradient(180deg, #1B1A1F 0%, #111013 99.09%)
  #app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    // color: #2c3e50
    margin-top: 100px
    color: #626262
    a[href]
      color: #626262
      text-decoration: none
</style>
