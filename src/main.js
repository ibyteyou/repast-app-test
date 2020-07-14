import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueStorage from 'vue-ls'
import { API_URL } from './consts'
import app from './app.vue'
import MainPage from './pages/main'
import FavouritesPage from './pages/favourites'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueStorage, {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
})

Vue.http.options.root = API_URL
Vue.prototype.$apiUrl = API_URL

const App = new Vue({
  render: h => h(app),
  router: new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior (to, from, savedPosition) {
      switch (true) {
        case !!to.meta.keepScroll || from.meta.keepScroll === 'extensive':
          return savedPosition
        case to.path !== from.path:
          return savedPosition || { x: 0, y: document.documentElement.scrollTop || 0 }
        default:
          return savedPosition
      }
    },
    routes: [{
      path: '/',
      component: MainPage
    }, {
      path: '/favourites',
      component: FavouritesPage
    }, {
      path: '/:breed',
      component: MainPage
    }]
  })
})

App.$mount('#app')
