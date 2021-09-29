import 'core-js/stable'
import Vue from 'vue'

import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/store'
//import VeeValidate from 'vee-validate';
import VueLazyload from 'vue-lazyload'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import CxltToastr from "cxlt-vue2-toastr";

import Loading from 'vue-loading-overlay';
    // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
    // Init plugin

import axios from "axios";

Vue.use(VueLazyload)











Vue.config.performance = true

Vue.use(CoreuiVue)
//Vue.use(VeeValidate)

 Vue.use(Loading);

var toastrConfigs = {
  position: 'top right',
  timeOut: 10000,
  progressBar:true
}
Vue.use(CxltToastr,toastrConfigs)


axios.defaults.showLoader = true;


Vue.prototype.$log = console.log.bind(console)


new Vue({
  el: '#app',

  router,
  store,
  icons,

  template: '<App/>',

  data : {




  },
  components: {
    App,
    VueUploadMultipleImage
   
  },

  methods: {

    },
})
