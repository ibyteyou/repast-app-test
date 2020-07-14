<template lang="pug">
  .random-breed
    img(:src="imgUrl")
    p.name {{ name }}
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
</style>
