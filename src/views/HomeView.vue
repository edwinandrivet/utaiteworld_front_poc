<template>
  <v-card class="card">
    <v-card-row>
      <v-card-title>
        <span class="indigo--text">Latest covers</span>
        <v-spacer></v-spacer>
        <router-link to="/covers">
          <v-btn flat class="indigo--text darken-1">See more...</v-btn>
        </router-link>
      </v-card-title>
    </v-card-row>
    <v-container class="pa-3">
      <v-row class="covers-row">
        <v-progress-circular indeterminate class="primary--text" v-if="loading"/>
        <v-col class="covers-col" xs4 v-for="cover in covers" :key="cover.etag">
          <div class="cover">
            <p class="tiny_text cover-title">{{ cover.snippet.title }}</p>
            <a target="_blank"
               v-bind:href="`https://www.youtube.com/watch?v=${cover.id.videoId}`">
              <img class="cover-img"
                   v-bind:src="cover.snippet.thumbnails.high.url">
            </a>
            <p class="tiny_text cover-subtitle">{{ cover.snippet.channelTitle }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style lang="stylus" scoped>
  .cover-title
    color black

  .cover-subtitle
    color #424242

  .card a
    text-decoration: none

  .card .card__title
    border-bottom solid #BDBDBD 1px
    padding: 0
    margin: 0rem 1rem

  .cover a
    box-sizing border-box
    border: solid #212121 1px
    height: 60%

  .cover .tiny_text:first-child
    padding: 0 0 .5em 0

  .cover .tiny_text:last-child
    padding: .5em 0 0 0

  .cover-img
    object-fit: cover
    height: 100%
    width: 100%

  .covers-row
    align-items: flex-start

  .cover
    display: flex
    flex-direction: column
    align-items: center
    height: 10em

  .tiny_text
    margin: 0
    text-align: center
    width: 100%
    white-space: nowrap
    font-size: 0.6em
    overflow: hidden
    text-overflow: ellipsis

  .progress-circular
    text-align center

</style>

<script>
  export default {
    data () {
      return {
        loading: false,
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
        this.loading = true
        window.fetch('http://0.0.0.0:3333/api/v1/covers/latest')
          .then(
            function (response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status)
                return
              }

              console.log(response)
              // Examine the text in the response
              response.json().then(function (data) {
                self.loading = false
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