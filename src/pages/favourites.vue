<template lang="pug">
  #favourites-page
    #grid-breeds
      random-breed(v-for="(likedBreed, index) in likedBreeds", :img-url="likedBreed.imgUrl", :key="likedBreed.name", :name="likedBreed.name" @like="loadLocalLikes")
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
    methods: {
      loadLocalLikes () {
        this.likedBreeds = this.$ls.get(LS_LIKED_BREEDS)
      }
    },
    created () {
      this.loadLocalLikes()
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
