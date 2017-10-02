import Vue from 'vue'
import Router from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CoversView from '../views/CoversView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import AdminReadView from '../views/AdminReadView.vue'
import AdminCreateView from '../views/AdminCreateView.vue'
import AdminUpdateView from '../views/AdminUpdateView.vue'

Vue.use(Router)

const checkLogin = (to, from, next) => {
  const init = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  }
  window.fetch('http://0.0.0.0:3333/api/v1/users/login', init)
    .then(response => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status)
        if (response.status === 401) {
          if (to.path === '/admin') {
            next('/login')
            return
          } else if (to.path === '/login') {
            next()
            return
          }
        }
        next('/')
        return
      }
      if (to.path === '/login') {
        next('/admin')
        return
      }
      next()
      return
    })
    .catch(err => {
      console.log('Fetch Error :-S', err)
    })
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomeView },
    { path: '/covers', component: CoversView },
    { path: '/login', component: LoginView, beforeEnter: checkLogin },
    { path: '/register', component: LoginView },
    {
      path: '/admin',
      component: AdminView,
      children: [
        { path: '', component: AdminReadView },
        { path: 'read', component: AdminReadView },
        { path: 'create', component: AdminCreateView },
        { path: 'update', component: AdminUpdateView },
      ],
      beforeEnter: checkLogin,
    },
  ],
})
