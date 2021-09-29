<template>
  <router-view></router-view>
</template>



<script>
import SettingService from "./services/setting.service"
import axios from "axios";
export default {
  name: 'App',




  data(){

    return {

      loader : ''


    }


  },
  mounted(){
    const service = new SettingService;
    this.$store.commit("setSettings",service.getSettings());
  },
  created() {

   /* this.loader=axios.interceptors.request.use((config) => {
      this.$loading.show({
                  // Optional parameters
                  container: this.fullPage ? null : this.$refs.formContainer,
                  canCancel: true,
                  onCancel: this.onCancel,
                });
      console.log('config',config)
    return config;
  }, (error) => {
    // trigger 'loading=false' event here
      this.loader.hide()
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    // trigger 'loading=false' event here
    this.loader.hide()
    return response;
  }, (error) => {
    this.loader.hide()
    // trigger 'loading=false' event here
    return Promise.reject(error);
  });



*/
  }
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';


</style>








