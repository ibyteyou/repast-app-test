<template lang="pug">
  .random-breed
    img(:src="_imgUrl")
    .resize
    .inner
    p.name {{ name }}
    svg.vector-like(:class="{ 'liked': liked }" width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg" @click="like")
      template(v-if="liked")
        path(d="M13.7579 25.6993C14.1703 26.1002 14.8297 26.1002 15.2421 25.6993L26.3754 14.8743C29.8749 11.4716 29.8749 5.9453 26.3754 2.54267C23.1264 -0.61635 18.0044 -0.831789 14.5 1.89635C10.9956 -0.831789 5.87363 -0.61635 2.62465 2.54267C-0.874882 5.9453 -0.874882 11.4716 2.62465 14.8743L13.7579 25.6993Z" fill="white")
      template(v-else)
        path(fill-rule="evenodd" clip-rule="evenodd" d="M13.7579 25.6993L2.62464 14.8743C-0.874882 11.4716 -0.874882 5.9453 2.62464 2.54267C5.87363 -0.61635 10.9956 -0.831789 14.5 1.89636C18.0044 -0.831789 23.1264 -0.61635 26.3754 2.54267C29.8749 5.9453 29.8749 11.4716 26.3754 14.8743L15.2421 25.6993C14.8297 26.1003 14.1703 26.1003 13.7579 25.6993ZM4.10909 4.04943C1.45989 6.62528 1.45989 10.7919 4.10909 13.3678L14.5002 23.4712L24.8914 13.3678C27.5406 10.7919 27.5406 6.62528 24.8914 4.04943C22.2294 1.46119 17.9043 1.46119 15.2423 4.04943C14.8299 4.45042 14.1706 4.45042 13.7581 4.04943C11.0962 1.46119 6.77104 1.46119 4.10909 4.04943Z" fill="white")
</template>

<script>
  import { LS_LIKED_BREEDS } from '../consts'

  export default {
    data: () => ({
      imgUrlComputed: null,
      liked: false
    }),
    props: ['data', 'name', 'imgUrl'],
    watch: {
      name (name, oldName) {
        if (oldName && this.imgUrlComputed) {
          this.updateRemoteImgUrlByName()
        }
      }
    },
    computed: {
      _imgUrl: {
        get: ({ data, imgUrl, imgUrlComputed }) => imgUrl || (data && data.imgUrl) || imgUrlComputed || null,
        set (value) {
          this.imgUrlComputed = value
        }
      }
    },
    methods: {
      like () {
        // this.liked = true
        // clearTimeout(this._likeTimeout)
        // this._likeTimeout = setTimeout(() => {
        //   this.liked = false
        // }, 333)

        // if ()

        const likedBreeds = this.$ls.get(LS_LIKED_BREEDS, [])
        const likeAlreadyIndex = likedBreeds.findIndex(lB => lB.name === this.name)
        const isLiked = likeAlreadyIndex === -1
        this.liked = isLiked

        if (isLiked) {
          likedBreeds.push({
            name: this.name,
            imgUrl: this._imgUrl
          })
          this.liked = true
        } else {
          likedBreeds.splice(likeAlreadyIndex, 1)
          this.liked = false
        }
        console.log(likedBreeds)
        // console.log(likedBreeds)
        this.$ls.set(LS_LIKED_BREEDS, likedBreeds)
        this.$emit('like')
      },
      updateRemoteImgUrlByName () {
        this.$http.get(`${this.$apiUrl}/breed/${this.name}/images/random`).then(({ data }) => {
          this._imgUrl = data.message
        })
      }
    },
    created () {
      this.liked = this.$ls.get(LS_LIKED_BREEDS, []).some(lB => lB.name === this.name && lB.imgUrl === this._imgUrl)
      // console.log(this.imgUrl)
      if (!this._imgUrl) {
        this.updateRemoteImgUrlByName() // very strange api /=====/
      }
    // },
    // mounted () {
    //   console.warn(this.imgUrl)
    }
  }
</script>

<style lang="sass">
  .random-breed
    position: relative
    overflow: hidden
    display: grid
    height: 290px
    border-radius: 8px
    z-index: 0
    svg.vector-like
      position: absolute
      top: 25px
      left: 25px
      z-index: 100
    img
      display: block
      min-height: 100%
      width: 100%
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
    p.name
      position: absolute
      bottom: 25px
      right: 25px
      margin: 0
      padding: 0
      font-family: monospace
      font-style: normal
      font-weight: 600
      font-size: 25px
      line-height: 28px
      /* identical to box height, or 112% */
      letter-spacing: 0.01em
      color: #FFFFFF
      text-transform: capitalize
      z-index: 100
    div.resize
      position: relative
      width: 250px
      height: 300px
      resize: both
      overflow: hidden
      z-index: 10
    div.inner
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      box-shadow: inset 0 -50px 85px rgba(0, 0, 0, .8)
      overflow: hidden
      z-index: 9
</style>
