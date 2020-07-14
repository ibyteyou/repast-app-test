<template lang="pug">
  .random-breed
    img(:src="imgUrl")
    .resize
    .inner
    p.name {{ name }}
    svg.vector-like(width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg")
      path(fill-rule="evenodd" clip-rule="evenodd" d="M13.7579 25.6993L2.62464 14.8743C-0.874882 11.4716 -0.874882 5.9453 2.62464 2.54267C5.87363 -0.61635 10.9956 -0.831789 14.5 1.89636C18.0044 -0.831789 23.1264 -0.61635 26.3754 2.54267C29.8749 5.9453 29.8749 11.4716 26.3754 14.8743L15.2421 25.6993C14.8297 26.1003 14.1703 26.1003 13.7579 25.6993ZM4.10909 4.04943C1.45989 6.62528 1.45989 10.7919 4.10909 13.3678L14.5002 23.4712L24.8914 13.3678C27.5406 10.7919 27.5406 6.62528 24.8914 4.04943C22.2294 1.46119 17.9043 1.46119 15.2423 4.04943C14.8299 4.45042 14.1706 4.45042 13.7581 4.04943C11.0962 1.46119 6.77104 1.46119 4.10909 4.04943Z" fill="white")
</template>

<script>
  export default {
    data: () => ({
      imgUrl: null
    }),
    props: ['data', 'name'],
    created () {
      this.$http.get(`${this.$apiUrl}/breed/${this.name}/images/random`).then(({ data }) => {
        this.imgUrl = data.message
      })
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
      top: 75%
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
