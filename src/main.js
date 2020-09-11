import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Vant from 'vant';
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
