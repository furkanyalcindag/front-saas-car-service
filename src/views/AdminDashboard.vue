<template>
  <div>
    <WidgetsDropdown :dashData="data"/>
    <CRow>
      <CCol lg="6">
        <CCard>
          <CCardHeader>Servis Durumları</CCardHeader>
          <CCardBody>
            <CChartPieExample :dashData="data"/>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg="6">

        <CCard>
          <CCardHeader>
           Ciro Çizgi Grafiği
            <div class="card-header-actions">
              <a
                  href="https://coreui.io/vue/docs/components/charts"
                  class="card-header-action"
                  rel="noreferrer noopener"
                  target="_blank"
              >

              </a>
            </div>
          </CCardHeader>
          <CCardBody>
            <CChartLineExample :dashData="data"/>
          </CCardBody>
        </CCard>




      </CCol>
    </CRow>


  </div>
</template>

<script>
import MainChartExample from "./charts/MainChartExample";
import WidgetsDropdown from "./widgets/WidgetsDropdown";
import WidgetsBrand from "./widgets/WidgetsBrand";
import AuthService from "../services/auth.service"
import DashboardService from "@/services/dashboard.service";
import {freeSet} from "@coreui/icons";
import * as Charts from "@/views/charts";


export default {
  name: "Dashboard",
  components: {
    MainChartExample,
    WidgetsDropdown,
    WidgetsBrand,
    ...Charts,
  },
  freeSet,
  data() {
    return {

      data: {


        productCount: '0',
        outOfStockCount: '0',
        carCount: '0',
        customerCount: '0',
        remainingDebt: '0',
        uncompletedServiceCount: '0',
        completedServiceCount: "0",
        waitingApproveServiceCount: '0',
        totalCheckingAccountDaily: '0',
        totalCheckingAccountMonthly: '0',
        totalCheckingAccountYearly: '0',
        lineChartIncome:[]


      }


    }
  },
  methods: {
    //  async setUser(){
    //    let response = await  AuthService.getUserInfo()
    //   localStorage.setItem('user_name_surname',response.data)
    // },

    async getDashboardData() {
      let response = await new DashboardService().getAdminDashboard();
      if(response.status===200){
        this.data = response.data
      }
      else {
        await this.$router.push("/pages/login");
      }



    },

  },


  async beforeCreate() {
    if (!AuthService.localStorageControl()) {
      this.$router.push('/pages/login');
    }

    // await this.setUser()


  },

  async mounted() {
    await this.getDashboardData();



  },


};
</script>
