import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firbase from 'firebase'
import '@/components/firebaseinit'

Vue.config.productionTip = false

let app;
firbase.auth().onAuthStateChanged(user =>{
  if(!app){
app = new Vue({
  router,
  store,
  render: h => h(App)
  }).$mount('#app')
  }
})


