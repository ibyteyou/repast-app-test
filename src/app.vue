<template lang="pug">
  #app
    app-header
    #main-breeds
      random-breed(v-for="(breed, name) in allBreeds", :data="breed", :name="name")
</template>

<script>
  import appHeader from './app-header'
  import randomBreed from './ui/random-breed'

  export default {
    name: 'App',
    components: {
      appHeader,
      randomBreed
    },
    data: () => ({
      allBreeds: []
    }),
    created () {
      this.$http.get('breeds/list/all').then(({ data }) => {
        if (!data || !data.message) {
          this.allBreeds = new Error('failed "breeds/list/all" API lol =/')
          return
        }
        this.allBreeds = data.message
      })
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
