<template>
  <v-app top-toolbar>
    <header>
      <v-toolbar>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title
            v-on:click="goToHome"
        >
          Utaite World
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/login">
          <v-btn
              icon
              dark
          >
            <v-icon>account_circle</v-icon>
          </v-btn>
        </router-link>
        <v-btn
            icon
            dark
            v-on:click.native="logout"
        >
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar>
    </header>

    <main>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      goToHome() {
        console.log('hey')
        this.$router.push({ path: '/' })
      },
      logout() {
        const self = this
        window.fetch('http://0.0.0.0:3333/api/v1/users/logout', { credentials: 'include', })
          .then(
            function (response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status)
                return
              }
              console.log('Logged out')
              self.goToHome()
            }
          )
          .catch(function (err) {
            console.log('Fetch Error :-S', err)
          })
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  @import './css/main.css'
</style>