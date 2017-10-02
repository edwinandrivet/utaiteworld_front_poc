<template lang="pug">
  v-list(two-line subheader)
    v-subheader Latest covers
    template(v-for='cover in covers')
      v-list-item(v-bind:key='cover.etag')
        v-list-tile(target="_blank"
        v-bind:href="`https://www.youtube.com/watch?v=${cover.id.videoId}`")
          div(class='list-tile-img')
            img(class="cover-img"
            v-bind:src="cover.snippet.thumbnails.high.url")
          v-list-tile-content
            v-list-tile-title(class='cover-info') {{ cover.snippet.title }}
            v-list-tile-sub-title(class='cover-info') {{ cover.snippet.channelTitle }}
      v-divider
</template>

<style lang="stylus" scoped>
  .list--two-line .list__tile
    height: 7.15rem

  .list__tile__content
    padding: 1em 0
    justify-content space-around

  .list__tile__title, .list__tile__sub-title
    text-align center

  .list__tile__title
    color black

  .list__tile__sub-title
    color #424242

  .list-tile-img
    padding: 0
    height 70%
    width 10rem

  .cover-img
    box-sizing border-box
    border solid #BDBDBD 1px
    object-fit cover
    height 100%
    width: 100%

  .subheader
    font-weight normal
    color black
    background-color #C5CAE9
    margin-bottom: 1rem

  .cover-info
    font-size: 0.6em

</style>

<script>
  export default {
    data () {
      return {
        covers: null,
      }
    },
    created () {
      this.getCovers()
    },
    computed: {},
    methods: {
      getCovers () {
        const self = this
        window.fetch('http://0.0.0.0:3333/api/v1/covers/latest?maxResults=50')
          .then(
            function (response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status)
                return
              }

              // Examine the text in the response
              response.json().then(function (data) {
                self.covers = data
                console.log(data)
              })
            }
          )
          .catch(function (err) {
            console.log('Fetch Error :-S', err)
          })
      }
    }
  }
</script>