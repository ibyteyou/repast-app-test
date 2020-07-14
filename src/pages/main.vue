<template lang="pug">
  #main-page
    random-breed#first-breed(v-if="loaded", :data="allBreeds[firstBreedKey]", :name="firstBreedKey")
    #grid-breeds
      random-breed(v-if="index" v-for="(breed, name, index) in allBreeds", :data="breed", :key="index", :name="name")
</template>

<script>
  import randomBreed from '../ui/random-breed'
  import { shuffle } from 'lodash-es'

  export default {
    name: 'MainPage',
    components: {
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
  #main-page
    #first-breed
      height: 513px
      margin-bottom: 30px
    #grid-breeds
      display: grid
      grid-template-rows: 290px
      grid-template-columns: repeat(3, 1fr)
      grid-row-gap: 10px
      grid-column-gap: 10px
      grid-gap: 30px
</style>
