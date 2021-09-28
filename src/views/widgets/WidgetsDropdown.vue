<template>
  <div>


    <CRow>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            :header="this.dashData.totalCheckingAccountDaily + ` ₺`"
            text="CARİ (Günlük)"
            color="primary"
            :icon-padding="false"
        >
          <CIcon :content="$options.freeSet.cilMoney"  class="mx-2 " width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            :header="this.dashData.totalCheckingAccountMonthly + ` ₺`"
            text="CARİ (Aylık)"
            color="info"
            :icon-padding="false"
        >
          <CIcon :content="$options.freeSet.cilMoney"  class="mx-2 " width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            :header="this.dashData.totalCheckingAccountYearly + ` ₺`"
            text="CARİ (Yıllık)"
            color="warning"
            :icon-padding="false"
        >
          <CIcon :content="$options.freeSet.cilMoney" name="cil-moon" class="mx-2 " width="24"/>

        </CWidgetIcon>
      </CCol>


      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
            :header="this.dashData.remainingDebt ? this.dashData.remainingDebt : '0.00'  + ` ₺`"
            text="Toplam Alacak"
            color="danger"
            :icon-padding="false"
        >
          <CIcon :content="$options.freeSet.cilMoney" name="cil-chartPie" class="mx-2 " width="24"/>

        </CWidgetIcon>
      </CCol>


    </CRow>


    <CRow>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.customerCount"
            text="MÜŞTERİ SAYISI"
            color="info"
            inverse
            :value="100"
        >
          <CIcon name="cil-people" height="36"/>
        </CWidgetProgressIcon>
      </CCol>

      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.carCount"
            text="ARAÇ SAYISI"
            color="success"
            inverse
            :value="100"
        >
          <CIcon :content="$options.freeSet.cilCarAlt"  name="cil-userFollow" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.uncompletedServiceCount"
            text="DEVAM EDEN"
            color="warning"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilListRich"  name="cil-basket" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.waitingApproveServiceCount"
            text="ONAY BEKLEYEN"
            color="primary"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilCheck"  name="cil-chartPie" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.productCount"
            text="ÜRÜN SAYISI"
            color="danger"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilBlur" name="cil-speedometer" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.outOfStockCount"
            text="STOK BİTENLER"
            color="info"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilSpeech" name="cil-speech" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
    </CRow>





  </div>


</template>

<script>
import {CChartLineSimple, CChartBarSimple} from '../charts/index.js'
import {freeSet} from "@coreui/icons";

export default {
  name: 'WidgetsDropdown',
  components: {CChartLineSimple, CChartBarSimple},
  freeSet,
  props: {
    dashData: {
      type: Object,
      default: () => {
        return {}
      }


    }
  },
}
</script>