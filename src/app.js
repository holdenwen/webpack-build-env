import Vue from 'vue'
import VueRouter from 'vue-router'
// import Mint from 'mint-ui'
// import Vant from 'vant'

import routes from 'Configs/routes'


// Register
Vue.use(VueRouter)

// Create the instance of vue router
const router = new VueRouter({ routes })

// Initialize
new Vue({
    router,

})
.$mount('#app')