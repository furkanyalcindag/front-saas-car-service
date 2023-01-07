<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Şube
              <div class="card-header-actions">
                <!--                <CLink href="#" class="card-header-action btn-setting">-->
                <!--                  <CIcon name="cil-settings"/>-->
                <!--                </CLink>-->
                <CLink
                    class="card-header-action btn-minimize"
                    @click="formCollapsed = !formCollapsed"
                >
                  <CIcon
                      :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"
                  />
                </CLink>
                <!--                <CLink-->
                <!--                    href="#"-->
                <!--                    class="card-header-action btn-close"-->
                <!--                    v-on:click="show = !show"-->
                <!--                >-->
                <!--                  <CIcon name="cil-x-circle"/>-->
                <!--                </CLink>-->
              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <!--                <div>-->
                <!--                  <CAlert color="success" :show="isSuccess">-->
                <!--                    Marka başarıyla kaydedildi.-->
                <!--                  </CAlert>-->


                <!--                  <CAlert-->
                <!--                      v-for="(value,key) in errors"-->
                <!--                      :key="value.message"-->
                <!--                      color="danger"-->
                <!--                      :show="isError"-->
                <!--                  >-->
                <!--                    {{ value }}-->

                <!--                  </CAlert>-->
                <!--                </div>-->
                <CRow></CRow>
                <CRow>
                  <CCol lg="5">
                    <CInput
                        label="Şube Adı (Zorunlu Alan)"
                        description=""
                        autocomplete="autocomplete"
                        v-model="branch.name"

                    />


                  </CCol>


                  <CCol lg="2">

                    <div class="form-actions" style="margin-top: 29px">
                      <CButton type="submit" color="primary" @click="addBranch"
                      >Kaydet
                      </CButton>

                    </div>


                  </CCol>


                </CRow>


              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <template>
              <CCardBody>

                <CDataTable
                    :items="computedItemsBranches"
                    :fields="fieldsTableBranches"
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
                        <CButton v-if="deleteButton" color="danger" @click="setDeleteModal(item.id)">Sil</CButton>
                        <CButton color="warning" @click="getSingleBranch(item.id)">Güncelle</CButton>
                      </CButtonGroup>


                    </td>
                  </template>
                  <template #details="{ item }">
                    <CCollapse
                        :show="Boolean(item._toggled)"
                        :duration="collapseDuration"
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


    <CModal
        :show.sync="showUpdateBranch"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showUpdateBranch">
              <template>
                <CCardBody>
                  <div>
                    <!--                    <CAlert color="success" :show="isSuccessCar">-->
                    <!--                      Marka kaydedildi.-->
                    <!--                    </CAlert>-->

                    <!--                    <CAlert-->
                    <!--                        v-for="(value,key) in errorsCar"-->
                    <!--                        :key="value.message"-->
                    <!--                        color="danger"-->
                    <!--                        :show="isError"-->
                    <!--                    >-->
                    <!--                      {{ key }}: {{ value[0] }}-->
                    <!--                    </CAlert>-->
                  </div>


                  <CRow>


                    <CCol lg="12">
                      <CInput
                          label="Şube Adı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="updateBranch.name"


                      />


                    </CCol>


                  </CRow>


                </CCardBody>
              </template>

            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Şube Güncelle</h6>
        <CButtonClose @click="showUpdateBranch = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showUpdateBranch = false" color="danger">Kapat</CButton>
        <CButton @click="updateBranches()" color="success">Güncelle</CButton>
      </template>
    </CModal>


    <CModal
        title="Modal title"
        color="danger"
        :show.sync="deleteModel"
    >
      Şubeyi silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deleteBrand" color="success">Evet</CButton>
      </template>


    </CModal>


  </div>
</template>

<script>

import CustomerService from "@/services/customer.service";

import axios from "axios";
import authHeader from "@/services/auth-header";

import Category from "@/models/category";
import CategoryService from "@/services/category.service";
import Brand from "@/models/brand";
import BrandService from "@/services/brand.service";
import BranchService from "@/services/branch.service";
import Branch from "@/models/branch";


export default {
  name: "Branch",

  data() {
    return {

      fieldsTableBranches: [
        {key: 'name', label: "Şube Adı", _style: "min-width:100px"},

        {key: "actions", label: "İşlemler"}
      ],
      pageLabel: {label: 'sasasa', external: true,},
      page: 1,
      numberOfPages: 0,
      selected: [],
      rowsPerPageItems: [5],
      search: '',
      total: 0,
      loading: false,
      pagination: {external: true},
      branch: new Brand("", ""),
      updateBranch: new Brand("", ""),
      categoryUpdate: new Category("", "", "0"),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,
      details: [],
      errors: [],
      errorsCar: [],
      branches: [],
      collapseDuration: 0,
      darkModal: false,
      carModal: false,
      showUpdateBranch: false,
      show: true,
      showAddCar: true,
      horizontal: {label: "col-3", input: "col-9"},
      deleteId: 0,
      deleteModel: false,
      deleteButton: false,

      selectOptions: [
        "Option 1",
        "Option 2",
        "Option 3",
        {
          value: "some value",
          label: "Selected option",
        },
      ],
      selectedOption: "some value",

      formCollapsed: true,
      checkboxNames: [
        "Checkboxes",
        "Inline Checkboxes",
        "Checkboxes - custom",
        "Inline Checkboxes - custom",
      ],
      radioNames: [
        "Radios",
        "Inline Radios",
        "Radios - custom",
        "Inline Radios - custom",
      ],
    };
  },

  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },


    async addBranch() {

      let a = await new BranchService().addBranch(this.branch);
      if (a.status === 200) {
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.$toast.success(
            "Şube ekleme işlemi başarıyla gerçekleşti")
        this.branch.name = ''
        this.successHide();
        await this.getBranches();

      } else if (a.response.status === 401) {
        // this.isError = false;
        // this.isError = true;
        this.$toast.error({
          title: 'Hata',
          message: "Yetkiniz bulunmamaktadır."
        })
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        // this.isError = false;
        // this.isError = true;
        this.errors = a.response.data;
        for (const [key, value] of Object.entries(this.errors)) {
          this.$toast.error(
              `${value}`
          )
        }
        this.errorHide();
      }
    },

    updateCa(categoryId) {


      this.categoryUpdateModal = true
      this.categoryUpdate.id = categoryId
      this.categoryUpdate.parent = 5


    },

    async updateBranches() {

      let a = await new BranchService().updateBranch(this.updateBranch);
      if (a.status === 200) {
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.showUpdateBranch = false;
        this.successHide();
        await this.getBranches();
        this.updateBranch = new Branch()
        this.$toast.success(
            'Şube güncelleme işi başarı ile gerçekleşti')

      } else if (a.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        this.$toast.error({
          title: 'Hata',
          message: 'Yetkiniz Bulunmamaktadır.'
        })
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.response.data;
        for (const [key, value] of Object.entries(this.errors)) {
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
          })
        }
        this.errorHide();
      }
    },

    async deleteBranch() {

      let a = await new BranchService().deleteBranch(this.deleteId);
      if (a.status === 200) {
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.deleteModel = false;
        this.successHide();
        await this.getBranches();
        this.updateBranch = new Branch()
        this.$toast.success({
          title: 'Bilgi',
          message: 'Şube başarıyla silindi'
        })

      } else if (a.status === 204) {
        // this.isError = false;
        // this.isError = true;
        let x = [{'1': 'Bu marka, kaydedilen bir ürünle ilişkili olduğu için silinemez'}]
        this.errors = x;
        this.errors.forEach((mess) => {
          this.$toast.error({
            title: 'Uyarı',
            message: mess[1]
          })

        })
        this.errorHide();
      } else if (a.status === 401) {
        // this.isError = false;
        // this.isError = true;
        this.$toast.error({
          title: 'Uyarı',
          message: 'Lütfen daha sonra tekrar deneyiniz'
        })
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        // this.isError = false;
        // this.isError = true;
        this.errors = a.data;
        this.$toast.error({
          title: 'Uyarı',
          message: 'Lütfen daha sonra tekrar deneyiniz'
        })
        this.errorHide();
      }
    },

    groupControl() {
      if (localStorage.getItem("user_group") === "Admin") {
        this.deleteButton = true
      }
    },

    async getSingleBranch(id) {


      let response = await new BranchService().getBranch(id);
      this.updateBranch = response.data
      this.showUpdateBranch = true

    },

    setDeleteModal(id) {

      this.deleteId = id
      this.deleteModel = true

    },

    errorHide() {
      setTimeout(() => (this.isError = false), 5000);
    },
    successHide() {
      setTimeout(() => (this.isSuccess = false), 5000);
    },
    errorHideCar() {
      setTimeout(() => (this.isErrorCar = false), 5000);
    },
    successHideCar() {
      setTimeout(() => (this.isSuccessCar = false), 5000);
    },


    async getBranches() {
      let response = await new BranchService().getBranches();

      if (response.status === 200) {
        this.branches = response.data.data
      } else {
        await this.$router.push("/pages/login");
      }


    },




  },

  watch: {},

  created() {


  },
  async mounted() {
    this.groupControl()
    await this.getBranches()
    //await this.getCategories();
    //await this.getSelectCategories();

  },
  computed: {

    computedItemsBranches() {

      return this.branches.map(item => {
        return {
          ...item,


        }
      })
    }
  }

};
</script>
