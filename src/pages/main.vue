<template lang="pug">
  #main-page
    #main-page-header
      #breeds-select
        label
          | Породы
          svg(width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg")
            path(d="M1.002 4.83102C0.772777 5.05633 0.401136 5.05633 0.171916 4.83102C-0.0573044 4.60572 -0.0573044 4.24043 0.171916 4.01513L4.08496 0.168977C4.31418 -0.0563259 4.68582 -0.0563259 4.91504 0.168977L8.82808 4.01513C9.05731 4.24043 9.05731 4.60572 8.82808 4.83102C8.59886 5.05633 8.22722 5.05633 7.998 4.83102L4.5 1.39282L1.002 4.83102Z" fill="#626262")
        //- select(v-model="groupByBreed")
        //-   option(value="volvo") Volvo
        //-   option(value="saab") Saab
        //-   option(value="opel") Opel
        //-   option(value="audi") Audi
      a#sort-switch(:class="{ actived: sort === 'abc' }", :href="`@sort-by-${sort === 'abc' ? 'rnd' : 'abc'}`" @click.prevent="toggleSort")
        label Сортировка по алфавиту
        svg(width="31" height="16" viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg")
          rect(x="1" y="1" width="29" height="14.5" rx="7.25" stroke="#626262" stroke-linecap="round" stroke-linejoin="round")
          path(fill-rule="evenodd" clip-rule="evenodd" d="M8.83333 13.0833C11.5027 13.0833 13.6667 10.9193 13.6667 8.24996C13.6667 5.58058 11.5027 3.41663 8.83333 3.41663C6.16396 3.41663 4 5.58058 4 8.24996C4 10.9193 6.16396 13.0833 8.83333 13.0833Z" fill="#626262")
    random-breed#first-breed(v-if="loaded", :data="allBreeds[firstBreedKey]", :name="firstBreedKey")
    #grid-breeds
      random-breed(v-if="index" v-for="(name, index) in allBreedsSorted", :data="allBreeds[name]", :key="name", :name="name")
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
      groupByBreed: '',
      loaded: false,
      sort: 'rnd'
    }),
    computed: {
      allBreedsSorted: ({ allBreeds, sort }) => {
        const breedsKeys = Object.keys(allBreeds)
        if (sort === 'abc') {
          return breedsKeys
        }

        // random
        return shuffle(breedsKeys)
      },
      firstBreedKey: ({ allBreedsSorted }) => allBreedsSorted && allBreedsSorted[0]
    },
    methods: {
      load () {
        this.$http.get('breeds/list/all').then(({ data }) => {
          if (!data || !data.message) {
            this.allBreeds = new Error('failed "breeds/list/all" API lol =/')
            return
          }

          const breedsKeys = Object.keys(data.message)

          // this.allBreeds = shuffle(data.message)
          if (this.sort === 'rnd') {
            this.allBreeds = shuffle(breedsKeys).reduce((acc, cur) => {
              return Object.assign(acc, { [cur]: data.message[cur] })
            }, {})
          } else {
            this.allBreeds = data.message
          }
          this.loaded = true
        })
      },
      toggleSort () {
        this.sort = this.sort === 'abc' ? 'rnd' : 'abc'
        this.load()
      }
    },
    created () {
      this.load()
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
    #main-page-header
      display: flex
      justify-content: space-between
      margin-bottom: 30px
    #breeds-select
      border-bottom: .5px dashed
      label
        cursor: pointer
        letter-spacing: .005em
        svg
          position: relative
          bottom: .125em
          margin-left: .5em
    #sort-switch
      label
        cursor: pointer
        padding-right: .5em
      &.actived
        color: #fff
        svg
          rect
            stroke: #fff
          path
            fill: #fff
            transform: translateX(13px)
</style>
