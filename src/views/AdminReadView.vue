<template lang="pug">
  v-list(subheader dense)
    v-subheader Utaite list
    v-list-item(class='legend')
      v-list-tile(avatar)
        v-list-tile-action
          v-checkbox(v-model='masterCheckbox')
        v-list-tile-content(class='')
          v-list-tile-title() Username
    template(v-for='utaite in utaites')
      v-list-item(v-bind:key='utaite.channel_id')
        v-list-tile(avatar)
          v-list-tile-action
            v-checkbox(v-model="allCheckbox[utaite.channel_id]")
          v-list-tile-content
            v-list-tile-title {{ utaite.username }}
          v-list-tile-action
            v-btn(class="orange--text" flat small v-on:click.native="editHandler(utaite)")
              v-icon(light) edit
      v-divider
    v-btn(floating class='indigo fab' v-on:click.native='fabHandler')
      v-icon(light) {{ fabStatus }}
</template>

<script>
  export default {
    data () {
      return {
        utaites: undefined,
        masterCheckbox: false,
        allCheckbox: {},
        fabStatus: 'add',
        selectedItems: [],
      }
    },
    created () {
      this.getUtaites()
    },
    watch: {
//      masterCheckbox: function () {
//        Object.keys(this.allCheckbox).forEach(checkbox => this.allCheckbox[checkbox] = this.masterCheckbox)
//      },
      allCheckbox: {
        handler: function (val) {
          const canAdd = Object.keys(val).every(checkbox => {
            if (this.allCheckbox[checkbox] === true) {
              this.fabStatus = 'delete'
              return false
            }
            return true
          })
          if (canAdd) {
            this.fabStatus = 'add'
          }
        },
        deep: true,
      },
    },
    methods: {
      getUtaites () {
        const self = this
        window.fetch('http://0.0.0.0:3333/api/v1/utaites')
          .then(
            function (response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status)
                return
              }

              // Examine the text in the response
              response.json().then(function (data) {
                self.utaites = data
                data.forEach((utaite) => {
                  // We need Vue.set to make properties reactive
                  self.$set(self.allCheckbox, utaite.channel_id, false)
                })
              })
            }
          )
          .catch(function (err) {
            console.log('Fetch Error :-S', err)
          })
      },
      fabHandler (event) {
        const self = this
        const action = event.target.querySelector('i').innerText
        if (action === 'delete') {
          const toRemove = []
          Object.keys(this.allCheckbox).forEach(checkbox => {
            if (this.allCheckbox[checkbox] === true) {
              toRemove.push(checkbox)
              return false
            }
            return true
          })
          const data = {
            channelIds: toRemove,
          }
          const formBody = Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&')
          const init = {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'include',
            body: formBody,
          }
          window.fetch('http://0.0.0.0:3333/api/v1/utaites', init)
            .then(response => {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status)
                return
              }
              Object.keys(this.allCheckbox).forEach(checkbox => {
                this.allCheckbox[checkbox] = false
              })
              this.getUtaites()
              console.log('Deleted selected utaite(s)')
            })
            .catch(err => {
              console.log('Fetch Error :-S', err)
            })
        } else {
          self.$router.push({ path: '/admin/create' })
        }
      },
      editHandler (utaite) {
          this.$root.sharedData.currentUtaite = utaite
          this.$router.push({ path: "/admin/update" })
      },
    }
  }
</script>