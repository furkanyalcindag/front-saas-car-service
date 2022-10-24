<template>
  <div>
    <CRow>
      <CCol lg="12">


        <CCard>
          <CCardHeader>

            <CRow>
              <CCol lg="3" class="text-left mt-3">

                <h5>Organizasyon Planları</h5>
              </CCol>
              <CCol lg="9" class="text-right ">
                <CButton color="success" @click="showAddModalFunction">
                  <CIcon :content="$options.freeSet.cilPlus" name="cil-plus"/>&nbsp;
                </CButton>
              </CCol>
            </CRow>


          </CCardHeader>
          <CCardBody>
            <div>
              <ve-table
                  id="loading-container"
                  :columns="columns"
                  row-key-field-name="uuid"
                  :table-data="organizations"
                  :checkbox-option="checkboxOption"
                  :event-custom-option="eventCustomOption"
                  :max-height="500"
                  :fixed-header="true"
                  :cell-style-option="cellStyleOption"


              >

                <template #b="{ item, index }">
                  <td class="py-2">

                    <CButtonGroup class="mx-1 d-sm-down-none">
                      <CButton v-if="deleteButton" color="danger" @click="setDeleteModal(item.uuid)">Aylık</CButton>
                      <CButton color="warning" @click="getSingleProduct(item.uuid)">Güncelle</CButton>
                    </CButtonGroup>


                  </td>
                </template>
              </ve-table>

              <div v-show="showEmpty" class="empty-data">Data Empty.</div>

              <div class="table-pagination">
                <ve-pagination
                    :total="totalCount"
                    :page-index="pageIndex"
                    :page-size="pageSize"
                    :layout="['total', 'prev',  'next', 'sizer']"

                    @on-page-number-change="null"
                    @on-page-size-change="null"
                />
              </div>
            </div>
          </CCardBody>
        </CCard>


      </CCol>
    </CRow>


    <div>

    </div>


    <CModal
        :show.sync="showAddOrganizationModal"
        :no-close-on-backdrop="false"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >

      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard>
              <CCardBody>
                <CRow></CRow>
                <CRow>
                  <ve-table
                      id="loading-container"
                      :columns="planColumns"
                      row-key-field-name="uuid"
                      :table-data="plans"
                      :event-custom-option="eventCustomOption"
                      :max-height="500"
                      :fixed-header="true"
                      :cell-style-option="cellStyleOption"
                      style="width:100%"


                  >
                  </ve-table>
                </CRow>
              </CCardBody>
            </CCard>
          </transition>
        </CCol>
      </CRow>

      <template #header>
        <h6 class="modal-title">Plan Seç</h6>
        <CButtonClose @click="showAddOrganizationModal = false" class="text-white"/>
      </template>
      <template #footer>

        <table style="border-collapse: collapse;
  width: 100%">
          <tr>
            <th style="border: 1px solid #dddddd; text-align: left;padding: 8px;">Adı</th>
            <th style="border: 1px solid #dddddd; text-align: left;padding: 8px;">Üyelik Tipi</th>
            <th style="border: 1px solid #dddddd; text-align: left;padding: 8px;">Net Ücret</th>
            <th style="border: 1px solid #dddddd; text-align: left;padding: 8px;">Vergi Oranı</th>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; text-align: left;padding: 8px;">{{ choosedPlan.name }}</td>

            <td style="border: 1px solid #dddddd; text-align: left;padding: 8px;"> {{ choosedPlan.subscriptionType }}
            </td>

            <td style="border: 1px solid #dddddd; text-align: left;padding: 8px;">{{ choosedPlan.netPrice }}</td>

            <td style="border: 1px solid #dddddd; text-align: left;padding: 8px;">{{ choosedPlan.taxRate }}</td>
          </tr>
        </table>


        <CButton @click="showAddOrganizationModal = false" color="danger">Kapat</CButton>
        <CButton @click="addOrganizationPlan()" type="submit" color="success">Kaydet</CButton>

      </template>
    </CModal>

  </div>


</template>

<script>
import Customer from "../../models/customer";
import Organization from "../../models/Organization";
import {freeSet} from "@coreui/icons";
import OrganizationService from "@/services/management/organization.service";
import ProductService from "@/services/product.service";
import Product from "@/models/product";
import GeneralService from "@/services/general.service";
import PlanService from "@/services/management/plan.service";
import ChoosedPlan from "@/models/ChoosedPlan";

export default {
  name: "Organization",
  freeSet,

  data() {
    return {
      rowStyleOption: {
        stripe: true,
      },

      searchValue: "",
      showAddOrganizationModal: false,
      showUpdateOrganizationModal: false,
      selectedRowKeys: [],
      showCustomerForm: true,
      formCollapsed: true,
      customer: new Customer("", "", "", "", "", "", "", "", ""),
      choosedPlan: new ChoosedPlan("", "", "", "", ""),
      organization: new Organization(),
      organizationUpdate: new Organization(),
      pageIndex: 1,
      totalCount: 0,
      DB_DATA: [],
      showEmpty: false,

      organizations: [],
      // page size
      pageSize: 10,
      selectedRowKeysCollection: [],
      eventCustomOption: {},
      checkboxOption: {
        // 可控属性
        selectedRowKeys: [],
        // 行选择改变事件
        selectedRowChange: ({row, isSelected, selectedRowKeys}) => {
          this.changeSelectedRowKeys(row, isSelected);
        },
        // 全选改变事件
        selectedAllChange: ({isSelected, selectedRowKeys}) => {
          this.changeSelectAll(isSelected, selectedRowKeys);
        },
      },
      columns: [
        {
          field: "",
          key: "a",
          title: "#",
          align: "center",
          renderBodyCell: ({row, column, rowIndex}, h) => {
            return (this.pageIndex - 1) * this.pageSize + rowIndex + 1;
          },
        },
        {
          field: "",
          key: "checkbox",
          // type=checkbox
          type: "checkbox",
          title: "",
          width: 50,
          align: "center",
        },

        {
          field: "organizationName",
          key: "b",
          title: "Firma Adı",

          align: "left",
          width: "15%",


          filterCustom: {
            defaultVisible: false,
            render: ({showFn, closeFn}, h) => {
              return (
                  <div class="custom-name-filter">
                    <input
                        value={this.searchValue}
                        on-input={(e) => (this.searchValue = e.target.value)}
                        placeholder="Search name"
                    />
                    <div class="custom-name-filter-operation">
                                            <span
                                                class="name-filter-cancel"
                                                on-click={() => this.searchCancel(closeFn)}
                                            >
                                                Cancel
                                            </span>
                      <span
                          class="name-filter-confirm"
                          on-click={() => this.searchConfirm(closeFn)}
                      >
                                                Search
                                            </span>
                    </div>
                  </div>
              );
            },
          },
        },

        {field: "planName", key: "c", title: "Plan Adı", align: "left"},
        {field: "subscriptionType", key: "d", title: "Üyelik Tipi", align: "left"},
        {field: "netPrice", key: "e", title: "Net Ücret", width: ""},
        {field: "taxRate", key: "f", title: "Vergi Oranı", width: ""},
        {field: "totalPrice", key: "g", title: "Toplam", width: ""},
        {field: "totalSMS", key: "h", title: "Toplam SMS", width: ""},
        {field: "remainSMS", key: "i", title: "Kalan SMS", width: ""},
        {field: "subscriptionStart", key: "j", title: "Başlangıç", width: ""},
        {field: "subscriptionEnd", key: "k", title: "Bitiş", width: ""},
        {field: "isActive", key: "l", title: "Durum", width: ""},
        {field: "uuid", key: "m", title: "İşlemler", width: "", renderBodyCell: this.renderRowIndex},


      ],


      planColumns: [
        {
          field: "",
          key: "a",
          title: "#",
          align: "center",
          renderBodyCell: ({row, column, rowIndex}, h) => {
            return rowIndex + 1;
          },
        },


        {
          field: "name",
          key: "b",
          title: "Plan Adı",

          align: "left",
          width: "15%",

        },

        {field: "feature", key: "c", title: "Özellik", align: "left"},
        {field: "sms", key: "d", title: "SMS Adet", align: "left"},
        {field: "netPriceMonthly", key: "e", title: "Aylık Net Ücret", width: ""},
        {field: "netPriceYearly", key: "f", title: " Yıllık Net Ücret", width: ""},
        {field: "taxRate", key: "g", title: "Vergi Oranı", width: ""},
        {field: "uuid", key: "m", title: "İşlemler", width: "", renderBodyCell: this.renderRowIndexPlan},


      ],

      plans: [],


      loadingInstance: null,
      selectedFile: "Lütfen resim seçiniz",
      errors: [],


    }
  },

  mounted() {

    console.log("mounted", this.pageIndex)
  },

  methods: {


    renderRowIndex({row, column, rowIndex}) {
      return (

          <CButtonGroup class="mx-1 d-sm-down-none">

            <CButton color="primary" on-click={() => this.showAddModalFunction()}>Cari</CButton>
          </CButtonGroup>


      )
    },

    renderRowIndexPlan({row, column, rowIndex}) {
      return (

          <CButtonGroup class="mx-1 d-sm-down-none">
            <CButton color="primary" on-click={() => this.choosePlan(row, 1)}>Deneme</CButton>
            <CButton color="info" on-click={() => this.choosePlan(row, 2)}>Aylık</CButton>
            <CButton color="secondary" on-click={() => this.choosePlan(row, 3)}>Yıllık</CButton>
          </CButtonGroup>


      )
    },

    choosePlan(row, subscriptionType) {

      this.choosedPlan.uuid = row.uuid
      this.choosedPlan.name = row.name
      this.choosedPlan.taxRate = row.taxRate;


      if (subscriptionType === 1) {
        this.choosedPlan.netPrice = 0;
        this.choosedPlan.subscriptionType = "TRIAL"
      } else if (subscriptionType === 2) {
        this.choosedPlan.netPrice = row.netPriceMonthly;
        this.choosedPlan.subscriptionType = "MONTHLY"
      } else if (subscriptionType === 3) {
        this.choosedPlan.netPrice = row.netPriceYearly;
        this.choosedPlan.subscriptionType = "YEARLY"
      } else {
        console.log("error")
      }

    },

    errorHide() {
      setTimeout(() => (this.isError = false), 5000);
    },
    successHide() {
      setTimeout(() => (this.isSuccess = false), 5000);
    },

    async getOrganizationPlanList(activePage, count, uuid) {

      this.loadingInstance.show()
      debugger

      let response = await new OrganizationService().getOrganizationPlans(activePage - 1, count, uuid)

      this.organizations = response.data.data
      this.pageCount = response.data.activePage + 1
      this.totalCount = response.data.recordsFiltered

      if (this.totalCount === 0) {
        this.showEmpty = true
      }

      this.loadingInstance.close()

    }
    ,

    async getPlans() {
      let response = await new PlanService().getPlans();
      if (response.status === 200) {

        this.plans = response.data

      } else {
        await this.$router.push("/pages/login");
      }

    },
    showAddModalFunction() {
      this.showAddOrganizationModal = true
    }
    ,


    changeSelectedRowKeys(keys) {
      this.checkboxOption.selectedRowKeys = keys;
    }
    ,

    changeSelectedRowKeysByRowClick(currentRowKey) {
      const {selectedRowKeys} = this.checkboxOption;

      if (selectedRowKeys.includes(currentRowKey)) {
        const rowKeyIndex = selectedRowKeys.indexOf(currentRowKey);
        selectedRowKeys.splice(rowKeyIndex, 1);
      } else {
        selectedRowKeys.push(currentRowKey);
      }
    }
    ,

    // reset selectedRowKeys


    search() {
      const searchValue = this.searchValue;
      this.DB_DATA = this.sourceData.filter(
          (x) =>
              !searchValue.length ||
              x.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }
    ,

    // search cancel
    searchCancel(closeFn) {
      closeFn();
    }
    ,

    // search cancel
    searchConfirm(closeFn) {
      this.search();
      closeFn();
    }
    ,

    getBase64(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event[0]);
      this.selectedFile = event.length + ' dosya seçildi'
      var x = this
      reader.onload = function () {
        x.organization.logo = reader.result
      };
      reader.onerror = function (error) {
      };


      this.product.productImages = x
    },



    async addOrganizationPlan() {
      this.loadingInstance.show()

        let response = await new OrganizationService().addOrganizationPlan(this.choosedPlan, this.$route.params.organizationId);
        if (response.status === 200) {
          // this.isSuccess = false;
          // this.isSuccess = true;
          this.showAddOrganizationModal = false;
          this.successHide();
          await this.getOrganizationPlanList(this.pageIndex + 1, this.pageSize, this.$route.params.organizationId)
          this.choosedPlan = new ChoosedPlan()

          this.$toast.open({
            message: 'işlem Başarılı!',
            type: 'success',
            // all of other options may go here
          });

        } else if (response.status === 401) {
          // this.isError = false;
          // this.isError = true;
          this.errorHide();

          this.$toast.open({
            message: 'işlem Başarısız!',
            type: 'error',
            // all of other options may go here
          });
          this.loadingInstance.close()
          await this.$router.push("/pages/login");
        } else {
          // this.isError = false;
          // this.isError = true;
          this.errors = response.response.data;
          for (const [key, value] of Object.entries(this.errors)) {
            this.$toast.open({

              message: `${key}: ${value}`,
              type: 'error',
            })
          }

          this.loadingInstance.close()
          this.errorHide();
          this.resetFormValidator()


        }


      this.loadingInstance.close()
    },




  },

  created() {
    this.loadingInstance = this.$veLoading({
      target: document.querySelector("#loading-container"),
      name: "wave",
    });

    console.log("created", this.pageIndex)
    this.getOrganizationPlanList(this.pageIndex + 1, this.pageSize, this.$route.params.organizationId)


    this.getPlans()


  },


  computed: {
    // table data
    /*tableData() {
      const {pageIndex, pageSize} = this;
      return this.DB_DATA.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    },
    // total count
    totalCount() {
      return this.DB_DATA.length;
    },*/
  },


}
</script>

<style>

.custom-name-filter {
  padding: 10px;
}

.custom-name-filter-operation {
  cursor: pointer;
  margin: 10px 10px 0px 0;
}

.name-filter-cancel .name-filter-confirm :hover {
  color: #1890ff;
}


.name-filter-cancel {
  float: left;
}

.name-filter-confirm {
  float: right;
}

.table-pagination {
  margin-top: 20px;
  text-align: right;
}


</style>