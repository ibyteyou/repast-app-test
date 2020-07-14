<template lang="pug">
  #main-page
    #main-page-header
      #breeds-select(:class="{ actived: breedsTagsOpened }" @click="breedsTagsOpened = !breedsTagsOpened")
        #breeds-select-trigger
          label
            | Породы
            svg(width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg")
              path(d="M1.002 4.83102C0.772777 5.05633 0.401136 5.05633 0.171916 4.83102C-0.0573044 4.60572 -0.0573044 4.24043 0.171916 4.01513L4.08496 0.168977C4.31418 -0.0563259 4.68582 -0.0563259 4.91504 0.168977L8.82808 4.01513C9.05731 4.24043 9.05731 4.60572 8.82808 4.83102C8.59886 5.05633 8.22722 5.05633 7.998 4.83102L4.5 1.39282L1.002 4.83102Z" fill="#626262")
        #selected-group-by-breed(v-if="routeGroupBreed")
          span.group-tag {{ routeGroupBreed }} #[span.close-icon(@click.stop="toMain") ×]
      a#sort-switch(:class="{ actived: sort === 'abc' }", :href="`@sort-by-${sort === 'abc' ? 'rnd' : 'abc'}`" @click.prevent="toggleSort")
        label Сортировка по алфавиту
        svg(width="31" height="16" viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg")
          rect(x="1" y="1" width="29" height="14.5" rx="7.25" stroke="#626262" stroke-linecap="round" stroke-linejoin="round")
          path(fill-rule="evenodd" clip-rule="evenodd" d="M8.83333 13.0833C11.5027 13.0833 13.6667 10.9193 13.6667 8.24996C13.6667 5.58058 11.5027 3.41663 8.83333 3.41663C6.16396 3.41663 4 5.58058 4 8.24996C4 10.9193 6.16396 13.0833 8.83333 13.0833Z" fill="#626262")
    #main-page-header-groups(v-show="breedsTagsOpened")
      div.reset-line
        a(:class="{ active: !routeGroupBreed }" href="/" @click.prevent="toMain") #[span.group-tag Все пёсели]
      template(v-for="(charChilds, char) in abcBreedGroups")
        span.group-char
          span.cap-char {{ char }}
          | &nbsp;
          //- TODO: nbsp lol, vue-cli takoe sebe
          a(v-for="(breedInGroup, index) in charChilds", :href="`/${breedInGroup}`")
            span.group-tag(:class="{ last: charChilds.length === index + 1 }") {{ breedInGroup }}
    random-breed#first-breed(v-if="loaded", :data="allBreeds[firstBreedKey]", :name="firstBreedKey")
    #grid-breeds
      random-breed(v-if="index" v-for="(name, index) in allBreedsSorted", :data="Array.isArray(allBreeds) ? allBreeds[index] : allBreeds[name]", :key="name", :name="name")
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
      abcBreedGroups: null,
      allBreeds: [],
      breedsTagsOpened: false,
      groupByBreed: '',
      loaded: false,
      sort: 'rnd',
      routeGroupBreed: null
    }),
    watch: {
      '$route.params' (params) {
        if (params.breed) {
          this.routeGroupBreed = params.breed
        } else if (this.routeGroupBreed) {
          this.routeGroupBreed = null
        }
      }
      // routeGroupBreed () {
      //   this.load()
      // }
    },
    computed: {
      allBreedsSorted: ({ allBreeds, sort }) => {
        if (Array.isArray(allBreeds)) {
          return allBreeds.map(aB => aB.name)
        }
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
      toMain () {
        this.$router.push('/')
      },
      load (opts = {}) {
        if (!opts.forceBreadGroups && this.routeGroupBreed) {
          this.$http.get(`breed/${this.routeGroupBreed}/images`).then(({ data }) => {
            this.allBreeds = data.message.reduce((acc, cur, index) => {
              acc.push({
                name: `${this.routeGroupBreed} ${index}`,
                imgUrl: cur
              })
              return acc
            }, [])
            if (!this.abcBreedGroups) {
              this.load({ forceBreadGroups: true })
            }
          })
        } else {
          this.$http.get('breeds/list/all').then(({ data }) => {
            if (!data || !data.message) {
              this.allBreeds = new Error('failed "breeds/list/all" API lol =/')
              return
            }

            const breedsKeys = Object.keys(data.message)

            if (!this.abcBreedGroups) {
              this.abcBreedGroups = breedsKeys.reduce((acc, cur) => {
                const CAPITAL_CHAR = cur[0].toUpperCase()

                if (acc[CAPITAL_CHAR]) {
                  acc[CAPITAL_CHAR].push(cur)
                } else {
                  acc[CAPITAL_CHAR] = [cur]
                }
                return acc
              }, {})
              if (opts.forceBreadGroups) {
                return
              }
            }

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
        }
      },
      toggleSort () {
        this.sort = this.sort === 'abc' ? 'rnd' : 'abc'
        this.load()
      }
    },
    created () {
      this.routeGroupBreed = this.$route.params.breed
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
      #breeds-select-trigger
        display: inline-block
        border-bottom: .5px dashed
      &.actived
        svg
          transform: scaleY(1)
      label
        cursor: pointer
        letter-spacing: .005em
        svg
          position: relative
          bottom: .125em
          margin-left: .5em
          transform: scaleY(-1)
    #selected-group-by-breed
      display: inline-block
      color: #3C59F0
      margin-left: 1em
      span.group-tag
        border-color: #3C59F0 !important
        .close-icon:hover
          color: #fff
    #main-page-header-groups,
    #selected-group-by-breed
      text-align: left
      overflow-wrap: break-word
      div:not(.reset-line)
        display: inline-block
      .reset-line
        a.active
          color: #3C59F0
          span.group-tag
            border-color: #3C59F0
      span
        &.group-char
          font-size: 20px
          line-height: 28px
        &.cap-char
          display: inline-block
          margin-right: .5em
        &.group-tag
          position: relative
          bottom: 3px
          display: inline-block
          cursor: pointer
          font-size: 12px
          line-height: 16px
          border: 1px solid #626262
          border-radius: 20px
          padding: 3px 12px
          margin-right: 1em
          margin-bottom: .5em
          white-space: nowrap
          text-transform: capitalize
          &:first-child
            margin-left: .5em
          &.last
            margin-right: 3em
          .close-icon
            margin-left: .25em
            font-size: 18px
            position: relative
            top: 1px
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
