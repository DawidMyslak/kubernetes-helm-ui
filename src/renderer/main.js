import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import loader from './utils/loader'

Vue.config.productionTip = false

const promise = () => {
  return store.dispatch('loadConfig')
    .then(() => store.dispatch('loadContexts'))
    .then(() => store.dispatch('loadNamespaces'))
    .then(() => store.dispatch('loadReleasesAndDeployments'))
}
loader.wrapPromise(promise)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
