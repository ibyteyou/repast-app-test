<template lang="pug">
  #app
    app-header
    router-view
</template>

<script>
  import appHeader from './app-header'

  export default {
    name: 'App',
    components: {
      appHeader
    }
  }
</script>

<style lang="sass">
  body
    padding: 0
    margin: 0
    background: linear-gradient(180deg, #1B1A1F 0%, #111013 99.09%)
    *
      box-sizing: border-box
  #app
    width: 100vw
    padding: 30px 60px
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    // color: #2c3e50
    margin-top: 100px
    color: #626262
    // margin: 30px 60px
    // max-width: 100vw
    a[href]
      color: #626262
      text-decoration: none
</style>
