<template lang="pug">
  #favourites-page
    #grid-breeds
      random-breed(v-if="index" v-for="(likedBreed, index) in likedBreeds", :img-url="likedBreed.imgUrl", :key="index", :name="likedBreed.name")
</template>

<script>
  import randomBreed from '../ui/random-breed'
  // import { shuffle } from 'lodash-es'
  import { LS_LIKED_BREEDS } from '../consts'

  export default {
    name: 'FavouritesPage',
    components: {
      randomBreed
    },
    data: () => ({
      likedBreeds: [],
      loaded: false
    }),
    computed: {
      firstBreedKey: ({ allBreeds }) => allBreeds && Object.keys(allBreeds)[0]
    },
    created () {
      const LikedBreeds = this.$ls.get(LS_LIKED_BREEDS)
      this.likedBreeds = LikedBreeds
      // this.$http.get('breeds/list/all').then(({ data }) => {
      //   if (!data || !data.message) {
      //     this.allBreeds = new Error('failed "breeds/list/all" API lol =/')
      //     return
      //   }
      //
      //   const breedsKeys = Object.keys(data.message)
      //
      //   // this.allBreeds = shuffle(data.message)
      //   this.allBreeds = shuffle(breedsKeys).reduce((acc, cur) => {
      //     return Object.assign(acc, { [cur]: data.message[cur] })
      //   }, {})
      //   this.loaded = true
      // })
    }
  }
</script>

<style lang="sass">
  #favourites-page
    #grid-breeds
      display: grid
      grid-template-rows: 290px
      grid-template-columns: repeat(3, 1fr)
      grid-row-gap: 10px
      grid-column-gap: 10px
      grid-gap: 30px
</style>
