<template>
  <form method="POST"
        action="/api/v1/users"
        id="login-container"
  >
    <v-row>
      <v-text-field
          name="email"
          label="Email"
          v-model="email"
          type="email"
          required
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
          name="username"
          label="Username"
          v-model="username"
          type="text"
          required
      v-if="this.$route.path === '/register'"></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
          name="password"
          label="Password"
          hint="At least 8 characters"
          v-model="password"
          append-icon="visibility_off"
          type="password"
          required
      ></v-text-field>
  </v-row>
    <v-btn class="indigo--text darken-1" v-on:click.native="createUser"
           v-if="this.$route.path === '/register'">Create account</v-btn>
    <v-btn class="indigo--text darken-1" v-on:click.native="loginUser"
           v-if="this.$route.path === '/login'">Log In</v-btn>
  </form>
</template>

<style lang="stylus" scoped>
  #login-container
    height 100%

  .row
    padding: 1rem
</style>

<script>
  export default {
    data () {
      return {
        email: null,
        username: null,
        password: null,
        confirmedPassword: null,
      }
    },
    methods: {
      createUser: function () {
        const self = this
        const data = {
          email: self.email,
          username: self.username,
          password: self.password,
        }
        const formBody = Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&')
        const init = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          credentials: 'include',
          body: formBody,
        }
        window.fetch('http://0.0.0.0:3333/api/v1/users', init)
          .then(response => {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status)
                return
              }
              window.fetch('http://0.0.0.0:3333/api/v1/users/login', init)
                .then(response => {
                  if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                      response.status)
                    return
                  }
                })
            }
          )
          .catch(err => {
            console.log('Fetch Error :-S', err)
          })
      },
      loginUser: function () {
        const self = this
        const data = {
          email: self.email,
          password: self.password,
        }
        const formBody = Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&')
        const init = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          credentials: 'include',
          body: formBody,
        }
        window.fetch('http://0.0.0.0:3333/api/v1/users/login', init)
          .then(response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status)
                  return
            }
            self.$router.push('admin')
          })
          .catch(err => {
            console.log('Fetch Error :-S', err)
          })
      }
    },
  }
</script>