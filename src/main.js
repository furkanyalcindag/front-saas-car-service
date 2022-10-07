import 'core-js/stable'
import Vue from 'vue'

import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import {iconsSet as icons} from './assets/icons/icons.js'
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
import "vue-easytable/libs/theme-default/index.css"; // import style
import VueEasytable from "vue-easytable";
import {extend, ValidationProvider} from "vee-validate"; // import library

import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';



Vue.use(VueEasytable);
Vue.use(VueLazyload)


Vue.config.performance = true

Vue.use(CoreuiVue)
//Vue.use(VeeValidate)

Vue.use(Loading);


Vue.use(VueToast, {
    // One of the options
    position: 'top'
})

var toastrConfigs = {
    position: 'top right',
    timeOut: 10000,
    progressBar: true
}
//Vue.use(CxltToastr, toastrConfigs)


axios.defaults.showLoader = true;


Vue.prototype.$log = console.log.bind(console)
Vue.component('ValidationProvider', ValidationProvider);

extend('positive', value => {
  return value >= 0;
});

new Vue({
    el: '#app',

    router,
    store,
    icons,

    template: '<App/>',

    data: {},
    components: {
        App,
        VueUploadMultipleImage

    },

    methods: {},
})
