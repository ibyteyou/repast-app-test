<template lang="pug">
  #app
    app-header
    random-breed#first-breed(v-if="loaded", :data="allBreeds[firstBreedKey]", :name="firstBreedKey")
    #main-breeds
      random-breed(v-if="index" v-for="(breed, name, index) in allBreeds", :data="breed", :key="index", :name="name")
</template>

<script>
  import appHeader from './app-header'
  import randomBreed from './ui/random-breed'
  import { shuffle } from 'lodash-es'

  window.shuffle = shuffle

  export default {
    name: 'App',
    components: {
      appHeader,
      randomBreed
    },
    data: () => ({
      allBreeds: [],
      loaded: false
    }),
    computed: {
      firstBreedKey: ({ allBreeds }) => allBreeds && Object.keys(allBreeds)[0]
    },
    created () {
      this.$http.get('breeds/list/all').then(({ data }) => {
        if (!data || !data.message) {
          this.allBreeds = new Error('failed "breeds/list/all" API lol =/')
          return
        }

        const breedsKeys = Object.keys(data.message)

        // this.allBreeds = shuffle(data.message)
        this.allBreeds = shuffle(breedsKeys).reduce((acc, cur) => {
          return Object.assign(acc, { [cur]: data.message[cur] })
        }, {})
        this.loaded = true
      })
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
    #first-breed
      height: 513px
      margin-bottom: 30px
    #main-breeds
      display: grid
      grid-template-rows: 290px
      grid-template-columns: repeat(3, 1fr)
      grid-row-gap: 10px
      grid-column-gap: 10px
      grid-gap: 30px
</style>
