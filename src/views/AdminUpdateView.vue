<template>
  <v-list dense subheader>
    <v-subheader>Update utaite entry</v-subheader>
<form method="POST"
      action="/api/v1/utaites"
      class="login-container"
>
  <v-row>
    <v-text-field
        name="username"
        label="Utaite real username"
        v-model="username"
        type="text"
        required
    ></v-text-field>
  </v-row>
  <v-row>
    <v-text-field
        name="public_name"
        label="Utaite public name"
        v-model="public_name"
        type="text"
        required
    ></v-text-field>
  </v-row>
  <v-row>
    <v-text-field
        name="description"
        label="Utaite description"
        v-model="description"
        type="text"
        required
    ></v-text-field>
  </v-row>
  <v-btn class="indigo--text darken-1" v-on:click.native="updateUtaite"
  >Update utaite</v-btn>
</form>
  </v-list>
</template>

<style lang="stylus" scoped>
  .login-container
    height 100%

  .row
    padding: 1rem
</style>

<script>
  export default {
    data () {
      return {
        description: undefined,
        public_name: undefined,
        username: undefined,
      }
    },
    created () {
      const currentUtaite = this.$root.sharedData.currentUtaite
      if (currentUtaite) {
        this.description = currentUtaite.description
        this.public_name = currentUtaite.public_name
        this.username = currentUtaite.username
      }
    },
    methods: {
      updateUtaite() {
         const self = this
         const data = {
           description: this.description,
           public_name: this.public_name,
           username: this.username,
         }
         const formBody = Object.keys(data)
         .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
         .join('&')
         const init = {
         method: 'PUT',
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
         response.text().then(value => console.log(value))
         console.log('Updated utaite')
         self.$router.push({ path: '/admin' })
         })
         .catch(err => {
         console.log('Fetch Error :-S', err)
         })
      }
    }
  }
</script>