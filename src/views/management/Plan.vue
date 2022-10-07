<template>
  <div>



    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard >
            <template>
              <CCardBody>

                <CDataTable
                    :items="computedItemsPlans"
                    :fields="fieldsTablePlan"
                    column-filter
                    :border="true"
                    :items-per-page="10"
                    :activePage="4"
                    hover
                    sorter
                    pagination
                    :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                    clickableRows

                >

                  <template #actions="{ item, index }">
                    <td class="py-2">

                      <CButtonGroup class="mx-1 d-sm-down-none">
                        <CButton  color="danger" @click="console.log('sil')">Sil</CButton>
                        <CButton color="warning" @click="console.log('sil')">Güncelle</CButton>
                      </CButtonGroup>


                    </td>
                  </template>
                  <template #details="{ item }">
                    <CCollapse
                        :show="Boolean(item._toggled)"
                        :duration="3"
                    >

                    </CCollapse>
                  </template>
                </CDataTable>


              </CCardBody>
            </template>
          </CCard>
        </transition>
      </CCol>
    </CRow>






  </div>
</template>

<script>
import PlanService from "../../services/management/plan.service";

export default {
  name: "Plan",


  data() {
    return {

      plans: [],

      fieldsTablePlan: [
        {key: 'name', label: "Adı", _style: "min-width:100px"},
        {key: 'feature', label: "Özellikleri", _style: "min-width:100px"},
        {key: 'netPriceMonthly', label: "Aylık Net", _style: "min-width:100px"},
        {key: 'netPriceYearly', label: "Yıllık Net", _style: "min-width:100px"},
        {key: 'taxRate', label: "Vergi Oranı", _style: "min-width:100px"},
        {key: "actions", label: "İşlemler"}
      ],
    }


  },
  methods: {

    async getPlans() {
      let response = await new PlanService().getPlans();
      if (response.status === 200) {
         console.log("sasa",response)
        this.plans = response.data
        console.log("sasa",this.plans)
      } else {
        await this.$router.push("/pages/login");
      }

    },

  },
  created() {
  },

  async mounted() {

    await this.getPlans()
  },

 watch: {},
  computed: {

    computedItemsPlans() {


      return this.plans.map(item => {
        return {
          ...item,


        }
      })
    }
  }

}
</script>

<style scoped>

</style>