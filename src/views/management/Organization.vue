<template>
  <div>
    <CRow>
      <CCol lg="12">


        <CCard>
          <CCardHeader>

            <CRow>
              <CCol lg="3" class="text-left mt-3">

                <h5>Organizasyon</h5>
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
                      <CButton v-if="deleteButton" color="danger" @click="setDeleteModal(item.uuid)">Sil</CButton>
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
      <CForm class="row g-3 needs-validation">
        <CRow>
          <CCol lg="12">
            <transition name="fade">
              <CCard>
                <CCardBody>
                  <CRow></CRow>
                  <CRow>
                    <CCol lg="4">
                      <CInput
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.firstNameValidation"
                          label="Ad (*)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organization.firstName"
                      />
                      <CInput
                          label="Soyad (*)"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.lastNameValidation"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organization.lastName"
                      />
                      <CInput
                          label="Email Adresi (*)"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.emailValidation"
                          description=""
                          type="email"
                          autocomplete="email"
                          prepend="@"
                          v-model="organization.email"
                      />
                    </CCol>
                    <CCol lg="4">
                      <CInput
                          label="Telefon Numarası (*)"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.mobilePhoneValidation"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organization.mobilePhone"
                      />
                      <CTextarea
                          :rows="3"
                          label="Adres(*)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organization.address"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.addressValidation"
                      />
                      <CInput
                          label="Subdomain (*)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organization.subdomain"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.subdomainValidation"
                      />
                    </CCol>
                    <CCol lg="4">
                      <CInput
                          label="Firma Adı (*)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organization.name"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.firmNameValidation"
                      />
                      <CInput
                          label="Vergi Dairesi (*)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organization.taxOffice"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.taxOfficeValidation"
                      />
                      <CInput
                          label="Vergi Numarası (*)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organization.taxNumber"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.taxNumberValidation"
                      />
                    </CCol>
                    <CCol lg="4">
                      <CInput
                          label="Şifre"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organization.password"
                      />
                    </CCol>
                    <CCol lg="4">
                      <CInput
                          label="Şifre tekrarı"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organization.confirmPassword"
                      />
                    </CCol>
                    <CCol lg="4">
                      <CInputFile
                          label="Logo"
                          horizontal
                          @change="getBase64"
                          custom
                          multiple
                          :placeholder="selectedFile"

                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </transition>
          </CCol>
        </CRow>
      </CForm>
      <template #header>
        <h6 class="modal-title">Organizasyon Ekle</h6>
        <CButtonClose @click="showAddOrganizationModal = false" class="text-white"/>
      </template>
      <template #footer>

        <CButton @click="showAddOrganizationModal = false" color="danger">Kapat</CButton>
        <CButton @click="addOrganization()" type="submit" color="success">Kaydet</CButton>

      </template>
    </CModal>

    <CModal
        :show.sync="showUpdateOrganizationModal"
        :no-close-on-backdrop="false"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CForm>
        <CRow>
          <CCol lg="12">
            <transition name="fade">
              <CCard>
                <CCardBody>
                  <CRow></CRow>
                  <CRow>
                    <CCol lg="4">
                      <CInput
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.firstNameValidation"
                          label="Ad (*)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organizationUpdate.firstName"
                      />
                      <CInput
                          label="Soyad (*)"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.lastNameValidation"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organizationUpdate.lastName"
                      />
                      <CInput
                          label="Telefon Numarası (*)"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.mobilePhoneValidation"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organizationUpdate.mobilePhone"
                      />
                    </CCol>
                    <CCol lg="4">
                      <CInput
                          label="Firma Adı (*)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organizationUpdate.name"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.firmNameValidation"
                      />
                      <CInput
                          label="Vergi Dairesi (*)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organizationUpdate.taxOffice"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.taxOfficeValidation"
                      />
                      <CInput
                          label="Vergi Numarası (*)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organizationUpdate.taxNumber"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.taxNumberValidation"
                      />

                    </CCol>
                    <CCol lg="4">
                      <CTextarea
                          :rows="3"
                          label="Adres(*)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="organizationUpdate.address"
                          valid-feedback=""
                          invalid-feedback="Lütfen bu alanı boş bırakmayınız!"
                          :is-valid="validator.addressValidation"
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </transition>
          </CCol>
        </CRow>
      </CForm>
      <template #header>
        <h6 class="modal-title">Organizasyon Güncelle</h6>
        <CButtonClose @click="showUpdateOrganizationModal = false" class="text-white"/>
      </template>
      <template #footer>

        <CButton @click="showUpdateOrganizationModal = false" color="danger">Kapat</CButton>
        <CButton @click="updateOrganization()" type="submit" color="success">Güncelle</CButton>

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

export default {
  name: "Organization",
  freeSet,

  data() {
    return {
      rowStyleOption: {
        stripe: true,
      },
      validator: {
        firstNameValidation: null,
        lastNameValidation: null,
        emailValidation: null,
        firmNameValidation: null,
        taxNumberValidation: null,
        taxOfficeValidation: null,
        mobilePhoneValidation: null,
        addressValidation: null,
        passwordValidation: null,
        confirmPasswordValidation: null,
        subdomainValidation: null
      },
      searchValue: "",
      showAddOrganizationModal: false,
      showUpdateOrganizationModal: false,
      selectedRowKeys: [],
      showCustomerForm: true,
      formCollapsed: true,
      customer: new Customer("", "", "", "", "", "", "", "", ""),
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
          field: "name",
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
        {field: "email", key: "c", title: "Email", align: "left"},
        {field: "subdomain", key: "d", title: "Subdomain", align: "left"},
        {field: "firstName", key: "e", title: "Yetkili Adı", width: ""},
        {field: "lastName", key: "f", title: "YetkiliSoyadı", width: ""},
        {field: "mobilePhone", key: "g", title: "Telefon", width: ""},
        {field: "taxNumber", key: "h", title: "Vergi No", width: ""},
        {field: "taxOffice", key: "i", title: "Vergi Dairesi", width: ""},
        {field: "uuid", key: "j", title: "İşlemler", width: "", renderBodyCell: this.renderRowIndex},


      ],
      loadingInstance: null,
      selectedFile: "Lütfen resim seçiniz",
      errors: [],


    }
  },

  mounted() {


  },

  methods: {

    initDatabase() {

      for (let i = 0; i < 1000; i++) {
        this.DB_DATA.push({
          rowKey: i,
          name: "John" + i,
          date: "1900-05-20",
          hobby: "coding and coding repeat" + i,
          address: "No.1 Century Avenue, Shanghai" + i,
        });
      }
      console.log(this.DB_DATA)
    },

    renderRowIndex({row, column, rowIndex}) {
      return (

          <CButtonGroup class="mx-1 d-sm-down-none">
            <CButton color="danger" on-click={() => this.showAddModalFunction()}>Sil</CButton>
            <CButton color="warning" on-click={() => this.prepareUpdateOrganization(row.uuid)}>Güncelle</CButton>
            <CButton color="primary" on-click={() => this.$router.push({name: 'ManagementOrganizationPlan', params: { organizationId: row.uuid}})}>Plan</CButton>
          </CButtonGroup>


      )
    },

    errorHide() {
      setTimeout(() => (this.isError = false), 5000);
    },
    successHide() {
      setTimeout(() => (this.isSuccess = false), 5000);
    },

    async prepareUpdateOrganization(row) {

      this.showUpdateOrganizationModal = true

      this.loadingInstance.show()
      let response = await new OrganizationService().getSingleOrganizations(row)
      this.organizationUpdate = response.data

      this.loadingInstance.close()

      console.log(row)
    },
    async addOrganization() {
      this.loadingInstance.show()
      var x = this.formValidator()
      if (x === true) {

        let response = await new OrganizationService().addOrganization(this.organization);
        if (response.status === 200) {
          // this.isSuccess = false;
          // this.isSuccess = true;
          this.showAddOrganizationModal = false;
          this.successHide();
          await this.getOrganizationList(this.pageIndex + 1, this.pageSize, this.searchValue)
          this.organization = new Organization()

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

      }
      this.loadingInstance.close()
    },


    async updateOrganization() {
      this.loadingInstance.show()
      var x = this.updateFormValidator()
      if (x === true) {

        let response = await new OrganizationService().updateOrganization(this.organizationUpdate);
        if (response.status === 200) {
          // this.isSuccess = false;
          // this.isSuccess = true;
          this.showUpdateOrganizationModal = false;
          this.successHide();
          await this.getOrganizationList(this.pageIndex + 1, this.pageSize, this.searchValue)
          this.organizationUpdate = new Organization()

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
      }
        this.loadingInstance.close()
    },


    async getOrganizationList(activePage, count, firmName) {

      this.loadingInstance.show()

      let response = await new OrganizationService().getOrganizations(activePage - 1, count, firmName)

      this.organizations = response.data.data
      this.pageCount = response.data.activePage + 1
      this.totalCount = response.data.recordsFiltered

      if (this.totalCount === 0) {
        this.showEmpty = true
      }

      this.loadingInstance.close()

    }
    ,

    showAddModalFunction() {
      this.showAddOrganizationModal = true
    }
    ,

    resetFormValidator() {

      this.validator = {
        firstNameValidation: null,
        lastNameValidation: null,
        emailValidation: null,
        firmNameValidation: null,
        taxNumberValidation: null,
        taxOfficeValidation: null,
        mobilePhoneValidation: null,
        addressValidation: null,
        passwordValidation: null,
        confirmPasswordValidation: null,
        subdomainValidation: null
      }

    }
    ,

    formValidator() {

      let valid = true

      if (this.organization.firstName === '') {
        this.validator.firstNameValidation = false
        valid = false
      } else {
        this.validator.firstNameValidation = true
      }

      if (this.organization.lastName === '') {
        this.validator.lastNameValidation = false
        valid = false
      } else {
        this.validator.lastNameValidation = true
      }

      if (this.organization.address === '') {
        this.validator.addressValidation = false
        valid = false
      } else {
        this.validator.addressValidation = true
      }

      if (this.organization.email === '') {
        this.validator.emailValidation = false
        valid = false
      } else {
        this.validator.emailValidation = true
      }

      if (this.organization.name === '') {
        this.validator.firmNameValidation = false
        valid = false
      } else {
        this.validator.firmNameValidation = true
      }

      if (this.organization.mobilePhone === '') {
        this.validator.mobilePhoneValidation = false
        valid = false
      } else {
        this.validator.mobilePhoneValidation = true
      }

      if (this.organization.subdomain === '') {
        this.validator.subdomainValidation = false
        valid = false
      } else {
        this.validator.subdomainValidation = true
      }


      if (this.organization.taxNumber === '') {
        this.validator.taxNumberValidation = false
        valid = false
      } else {
        this.validator.taxNumberValidation = true
      }

      if (this.organization.taxOffice === '') {
        this.validator.taxOfficeValidation = false
        valid = false
      } else {
        this.validator.taxOfficeValidation = true
      }

      return valid

    }
    ,

    updateFormValidator() {

      let valid = true

      if (this.organizationUpdate.firstName === '') {
        this.validator.firstNameValidation = false
        valid = false
      } else {
        this.validator.firstNameValidation = true
      }

      if (this.organizationUpdate.lastName === '') {
        this.validator.lastNameValidation = false
        valid = false
      } else {
        this.validator.lastNameValidation = true
      }

      if (this.organizationUpdate.address === '') {
        this.validator.addressValidation = false
        valid = false
      } else {
        this.validator.addressValidation = true
      }

      if (this.organizationUpdate.name === '') {
        this.validator.firmNameValidation = false
        valid = false
      } else {
        this.validator.firmNameValidation = true
      }

      if (this.organizationUpdate.mobilePhone === '') {
        this.validator.mobilePhoneValidation = false
        valid = false
      } else {
        this.validator.mobilePhoneValidation = true
      }
      if (this.organizationUpdate.taxNumber === '') {
        this.validator.taxNumberValidation = false
        valid = false
      } else {
        this.validator.taxNumberValidation = true
      }

      if (this.organizationUpdate.taxOffice === '') {
        this.validator.taxOfficeValidation = false
        valid = false
      } else {
        this.validator.taxOfficeValidation = true
      }

      return valid

    },


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
    }


  },

  created() {
    this.loadingInstance = this.$veLoading({
      target: document.querySelector("#loading-container"),
      name: "wave",
    });
    this.getOrganizationList(this.pageIndex + 1, this.pageSize, this.searchValue)


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