import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './app.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

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
    routes: [

    ]
  })
})

App.$mount('#app')
