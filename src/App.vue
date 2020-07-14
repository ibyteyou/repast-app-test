<template lang="pug">
  #app
    #app-header
      router-link.main-link(to="/") ПЁСЕЛЬ
      router-link.favourites-link(to="./favourites")
        | Избранные пёсели
        svg(width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg")
          path(fill-rule="evenodd" clip-rule="evenodd" d="M7.59056 13.8381L1.44808 8.00922C-0.482693 6.17704 -0.482693 3.20132 1.44808 1.36913C3.24062 -0.331881 6.06651 -0.447887 8 1.02111C9.93349 -0.447887 12.7594 -0.331881 14.5519 1.36913C16.4827 3.20132 16.4827 6.17704 14.5519 8.00922L8.40944 13.8381C8.1819 14.054 7.8181 14.054 7.59056 13.8381ZM2.26705 2.18038C0.805427 3.56738 0.805427 5.81097 2.26705 7.19796L8.0001 12.6383L13.7332 7.19796C15.1948 5.81097 15.1948 3.56738 13.7332 2.18038C12.2645 0.786714 9.8782 0.786714 8.40954 2.18038C8.182 2.3963 7.8182 2.3963 7.59067 2.18038C6.122 0.786714 3.73572 0.786714 2.26705 2.18038Z" fill="#626262")
    img(alt="Vue logo" src="./assets/logo.png")
</template>

<script>
  export default {
    name: 'App',
    components: {

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
  #app-header
    background: #151419
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.55)
    position: absolute
    left: 0%
    right: 0%
    top: 0%
    bottom: 0%
    height: 100px
    a
      display: flex
      align-items: center
    a.main-link
      color: #3C59F0
      position: absolute
      left: 4.69%
      right: 86.09%
      // top: 35%
      // bottom: 38%
      top: 0
      bottom: 0
      font-size: 24px
      letter-spacing: 2px
    a.favourites-link
      position: absolute
      left: 81.95%
      right: 6.72%
      // top: 38%
      // bottom: 34%
      top: 0
      bottom: 0
      &.active
        color: #fff
        svg path
          fill: #fff
      svg
        padding-left: .5em
        position: relative
        // bottom: .125em
</style>
