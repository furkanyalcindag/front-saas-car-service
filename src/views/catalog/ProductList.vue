<template>
  <div>

    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CRow>
                <CCol lg="3" class="text-left mt-3">
                  <h2>Ürünler</h2>

                </CCol>
                <CCol lg="9" class="text-right mt-3">
                  <CButton color="success" @click="addProductModal">
                    <CIcon :content="$options.freeSet.cilPlus" name="cil-plus"/>&nbsp;Ürün Ekle
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <template>
              <CCardBody>
                <!--                <div>-->
                <!--                  <CAlert color="success" :show="isSuccess">-->
                <!--                    Ürün başarıyla kaydedildi.-->
                <!--                  </CAlert>-->

                <!--                </div>-->

                <CRow>

                  <!--                  <CAlert color="success" :show="isSuccess">-->
                  <!--                    Servis Durumu Başarıyla Değiştirildi-->
                  <!--                  </CAlert>-->

                  <CCol lg="3" style="float: right">


                    <CInput

                        description=""
                        autocomplete="autocomplete"
                        placeholder="Ürün Kodu"
                        v-model="barcode"


                    />

                  </CCol>

                  <CCol lg="3">


                    <CButton @click="getProducts" color="success">Ara</CButton>

                  </CCol>


                </CRow>


                <CDataTable
                    :items="computedItemsProduct"
                    :fields="fieldsTableProduct"

                    :border="true"
                    :loading="loading"

                    hover
                    sorter
                    pagination
                    :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                    clickableRows

                >


                  <template #productImage="{ item, index }">
                    <td class="py-2">
                      <img :src="item.productImage" width="50px" alt=""/>
                    </td>
                  </template>
                  <template #actions="{ item, index }">
                    <td class="py-2">

                      <CButtonGroup class="mx-1 d-sm-down-none">
                        <CButton v-if="deleteButton" color="danger" @click="setDeleteModal(item.uuid)">Sil</CButton>
                        <CButton color="warning btn-sm" @click="getSingleProduct(item.uuid)">Güncelle</CButton>
                        <CButton color="info btn-sm outline" @click="showStockModal(item.uuid)">Stok Kontrol</CButton>
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

                <template>
                  <div>

                    <CPagination
                        :activePage.sync="page"
                        :pages="pageCount"
                        size="sm"
                        align="end"
                    />
                  </div>
                </template>


              </CCardBody>
            </template>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CModal
        :show.sync="showAddProduct"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showAddProduct">
              <template>
                <CCardBody>
                  <!--                  <div>-->
                  <!--                    <CAlert color="success" :show="isSuccessCar">-->
                  <!--                      Ürün başarıyla kaydedildi.-->
                  <!--                    </CAlert>-->

                  <!--                    <CAlert-->
                  <!--                        v-for="(value,key) in errorsCar"-->
                  <!--                        :key="value.message"-->
                  <!--                        color="danger"-->
                  <!--                        :show="isError"-->
                  <!--                    >-->
                  <!--                      {{ key }}: {{ value[0] }}-->
                  <!--                    </CAlert>-->
                  <!--                  </div>-->


                  <CRow>


                    <CCol lg="6">
                      <CInput
                          label="Ürün Kodu (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.barcodeNumber"


                      />
                      <CInput
                          label="Ürün Adı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.name"

                      />

                      <CInput
                          label="Alış Fiyatı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.purchasePrice"
                          type="number"

                      />

                      <CInput
                          label="Satış Fiyatı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.netPrice"
                          type="number"

                      />
                      <CInput
                          label="KDV Oranı(%) (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.taxRate"
                          type="number"

                      />


                    </CCol>
                    <CCol lg="6">
                      <CSelect
                          :options="selectCategories"
                          label="Üst Kategori (Zorunlu Alan)"
                          v-model="product.categories"
                          :value.sync="product.categories"

                      />


                      <CSelect
                          :options="selectBrands"
                          label="Marka (Zorunlu Alan)"
                          v-model="product.brand"
                          :value.sync="product.brand"

                      />

                      <CInput
                          label="Stok (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.quantity"
                          type="number"


                      />

                      <CInput
                          label="Raf Numarası"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.shelf"

                      />
                      <CInputFile
                          label="Resim Ekle"
                          horizontal
                          @change="getBase64"
                          custom
                          multiple
                          :placeholder="selectedFile"

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
        <h6 class="modal-title">Ürün EKle</h6>
        <CButtonClose @click="showAddProduct = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showAddProduct = false" color="danger">Kapat</CButton>
        <CButton @click="addProduct()" color="success">Kaydet</CButton>
      </template>
    </CModal>


    <CModal
        :show.sync="showUpdateProduct"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showUpdateProduct">
              <template>
                <CCardBody>
                  <!--                  <div>-->
                  <!--                    <CAlert color="success" :show="isSuccessCar">-->
                  <!--                      Ürün başarıyla kaydedildi.-->
                  <!--                    </CAlert>-->

                  <!--                    <CAlert-->
                  <!--                        v-for="(value,key) in errorsCar"-->
                  <!--                        :key="value.message"-->
                  <!--                        color="danger"-->
                  <!--                        :show="isError"-->
                  <!--                    >-->
                  <!--                      {{ key }}: {{ value[0] }}-->
                  <!--                    </CAlert>-->
                  <!--                  </div>-->


                  <CRow>


                    <CCol lg="6">
                      <CInput
                          label="Ürün Kodu (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.barcodeNumber"


                      />
                      <CInput
                          label="Ürün Adı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.name"

                      />

                      <CInput
                          label="Alış Fiyatı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.purchasePrice"
                          type="number"

                      />

                      <CInput
                          label="Satış Fiyatı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.netPrice"
                          type="number"

                      />
                      <CInput
                          label="KDV Oranı(%) (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.taxRate"
                          type="number"

                      />


                    </CCol>
                    <CCol lg="6">
                      <CSelect
                          :options="selectCategories"
                          label="Üst Kategori (Zorunlu Alan)"
                          v-model="product.categories"
                          :value.sync="product.categories"

                      />


                      <CSelect
                          :options="selectBrands"
                          label="Marka (Zorunlu Alan)"
                          v-model="product.brand"
                          :value.sync="product.brand"

                      />

                      <CInput
                          label="Stok (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.quantity"
                          type="number"


                      />

                      <CInput
                          label="Raf Numarası"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.shelf"

                      />

                      <img :src="product.productImage" width="50px" alt=""/>
                      <CInputFile
                          label="Resim Ekle"
                          horizontal
                          @change="getBase64"
                          custom
                          multiple
                          :placeholder="selectedFile"

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
        <h6 class="modal-title">Ürün Güncelle</h6>
        <CButtonClose @click="showUpdateProduct = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showUpdateProduct = false" color="danger">Kapat</CButton>
        <CButton @click="updateProduct()" color="success">Güncelle</CButton>
      </template>
    </CModal>


    <CModal
        title="Modal title"
        color="danger"
        :show.sync="deleteModel"
    >
      Ürünü silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deleteProduct" color="success">Evet</CButton>
      </template>


    </CModal>


    <CModal
        :show.sync="showProductStock"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="m"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showProductStock">
              <template>
                <CCardBody>


                  <CRow>


                    <CListGroup style="width: 100%">

                      <CListGroupItem  v-for="(item, index) in stocks" :key="item.uuid">
                        {{ item.branchName }}

                        <CButton v-if="item.quantity>0" color="primary" style="float: right">{{ item.quantity }}
                        </CButton>
                        <CButton v-else color="danger" style="float: right">{{ item.quantity }}</CButton>

                      </CListGroupItem>

                    </CListGroup>

                  </CRow>


                </CCardBody>
              </template>

            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Ürün Stok Bilgisi</h6>
        <CButtonClose @click="showProductStock = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showProductStock = false" color="danger">Kapat</CButton>
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
import Product from "@/models/product";
import product from "@/models/product";
import {freeSet} from '@coreui/icons'
import ProductService from "@/services/product.service";

export default {
  name: "ProductList",
  freeSet,


  data() {

    return {

      fieldsTableProduct: [
        {key: 'productImage', label: "Resim", _style: "min-width:100px"},
        {key: 'barcodeNumber', label: "Barkod", _style: "min-width:100px"},
        {key: 'shelf', label: "Raf", _style: "min-width:100px"},
        {key: "name", label: "Ürün Adı"},
        {key: "quantity", label: "Adet"},
        {key: "brandName", label: "Marka"},
        {key: "purchasePrice", label: "Alış Fiyatı"},
        {key: "netPrice", label: "Net Fiyat"},
        {key: "taxRate", label: "KDV"},
        {key: "totalProduct", label: "Toplam Fiyat"},
        {key: "actions", label: "İşlemler"}
      ],
      showProductStock: false,
      pageCount: 0,
      pageLabel: {label: 'sasasa', external: true,},
      page: 1,
      barcode: '',
      numberOfPages: 0,
      selected: [],
      rowsPerPageItems: [5],
      search: '',
      total: 0,
      loading: false,
      pagination: {external: true},
      categories: [],
      selectCategories: [],
      selectBrands: [],
      categoryUpdateModal: false,
      showUpdateCategory: true,
      product: new Product("", "", "", "", "", "", "", "", "", "", "", "", ""),
      products: [],
      category: new Category("", "", "0"),
      categoryUpdate: new Category("", "", "0"),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,
      x: '',
      selectedFile: "Dosya Seçiniz",


      details: [],
      errors: [],
      errorsCar: [],
      deleteId: 0,
      deleteModel: false,
      collapseDuration: 0,
      darkModal: false,
      carModal: false,
      show: true,
      showAddCar: true,
      horizontal: {label: "col-3", input: "col-9"},

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
      showAddProduct: false,
      showUpdateProduct: false,
      deleteButton: false,
      stocks: []
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
    groupControl() {
      if (localStorage.getItem("user_group") === "Admin") {
        this.deleteButton = true
      }
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },


    getBase64(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event[0]);
      this.selectedFile = event.length + ' dosya seçildi'
      var x = this
      reader.onload = function () {
        x.product.productImages = reader.result


      };
      reader.onerror = function (error) {
      };


      this.product.productImages = x
    }
    ,
    setDeleteModal(id) {

      this.deleteId = id
      this.deleteModel = true

    },

    async deleteProduct() {

      let a = await new ProductService().deleteProduct(this.deleteId);
      if (a.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.deleteModel = false;
        this.successHide();
        await this.getProducts();
        this.$toast.success({
          title: 'Bilgi',
          message: 'Ürün başarıyla silindi'
        })


      } else if (a.status === 204) {
        this.isError = false;
        this.isError = true;
        let x = [{'1': 'Bu ürün, kaydedilen bir ürünle ilişkili olduğu için silinemez'}]
        this.errors = x;
        this.errors.forEach((mess) => {
          this.$toast.error({
            title: 'Uyarı',
            message: mess[1]
          })
        })
        this.errorHide();
      } else if (a.status === 401) {
        this.isError = false;
        this.isError = true;
        this.$toast.error({
          title: 'Uyarı',
          message: 'Lütfen daha sonra tekrar deneyiniz'
        })
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.data;
        this.$toast.error({
          title: 'Uyarı',
          message: 'Lütfen daha sonra tekrar deneyiniz'
        })
        this.errorHide();
      }
    },
    async addProduct() {


      this.product.isOpen = true

      let productResponse = await new ProductService().addProduct(this.product);

      if (productResponse.status === 200) {
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.showAddProduct = false;
        this.successHide();
        this.getProducts();
        this.product = new Product()
        this.$toast.success({
          title: 'Bilgi',
          message: 'Ürün başarıyla eklendi'
        })
      } else if (productResponse.status === 401) {
        // this.isError = false;
        // this.isError = true;
        this.errorHide();
        this.$toast.error({
          title: 'Uyarı',
          message: 'Lütfen daha sonra tekrar deneyiniz'
        })
        await this.$router.push("/pages/login");
      } else {
        // this.isError = false;
        // this.isError = true;
        this.errorsCar = productResponse.response.data;
        for (const [key, value] of Object.entries(this.errorsCar)) {
          this.$toast.error({
            title: 'Uyarı',
            message: `${key}: ${value}`
          })
        }

        this.errorHide();
      }


    },

    async updateProduct() {


      this.product.isOpen = true

      let productResponse = await new ProductService().updateProduct(this.product);

      if (productResponse.status === 200) {
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.showUpdateProduct = false;
        this.successHide();
        this.getProducts();
        this.product = new Product()
        this.$toast.success({
          title: 'Bilgi',
          message: 'Ürün başarıyla güncellendi'
        })
      } else if (productResponse.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        this.$toast.error({
          title: 'Uyarı',
          message: 'Lütfen daha sonra tekrar deneyiniz'
        })
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errorsCar = productResponse.response.data;
        for (const [key, value] of Object.entries(this.errorsCar)) {
          this.$toast.error({
            title: 'Uyarı',
            message: `${key}: ${value}`
          })
        }
        this.errorHide();
      }


    },

    async getSingleProduct(uuid) {


      let response = await new ProductService().getProduct(uuid);

      this.product = response.data
      this.showUpdateProduct = true

    },

    async addCategory() {
      let a = await new CategoryService().categoryAdd(this.category);
      if (a.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.successHide();
        this.getCategories();
      } else if (a.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.response.data["username"];
        this.errorHide();
      }
    },

    updateCategoryModal(categoryId) {


      this.categoryUpdateModal = true
      this.categoryUpdate.id = categoryId
      this.categoryUpdate.parent = 5


    },


    showStockModal(product_id) {


      this.showProductStock = true
      this.getProductStockQuantity(product_id)


    },


    addProductModal() {

      this.showAddProduct = true
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


    getProducts() {

      // get by search keyword
      this.loading = true;
      //const {page, itemsPerPage} = this.options;
      //let pageNumber = page;
      var x = '';
      if (this.barcode != null) {
        x = this.barcode;
      }


      const params = {
        activePage: this.page,
        barcode: x

      };


      axios.get(process.env.VUE_APP_API_URL + "/car-service/product-api", {headers: authHeader(), params})
          .then(res => {
            this.products = res.data.data;
            this.pageCount = res.data.activePage


          })
          .catch(err => {
            if (err.response.status === 401) {
              localStorage.clear()
              this.$router.push("/pages/login");
            }

            this.$toast.error(
                'Lütfen daha sonra tekrar deneyiniz'
            )


          }).finally(() => this.loading = false);
      this.loading = false
    },


    getSelectCategories() {

      // get by search keyword

      this.loading = true;
      //const {page, itemsPerPage} = this.options;
      // let pageNumber = page;


      axios.get(process.env.VUE_APP_API_URL + "/car-service/category-select-api", {headers: authHeader()})
          .then(res => {
            this.selectCategories = res.data;


          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
    },

    getProductStockQuantity(id) {

      // get by search keyword

      this.loading = true;
      //const {page, itemsPerPage} = this.options;
      // let pageNumber = page;


      const params = {

        id: id

      };


      axios.get(process.env.VUE_APP_API_URL + "/car-service/product-branch-stock-api", {headers: authHeader(),params})
          .then(res => {
            this.stocks = res.data;


          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
    },

    getSelectBrands() {

      // get by search keyword

      this.loading = true;
      //const {page, itemsPerPage} = this.options;
      // let pageNumber = page;


      axios.get(process.env.VUE_APP_API_URL + "/car-service/brand-select-api", {headers: authHeader()})
          .then(res => {
            this.selectBrands = res.data;


          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
    },


  },

  watch: {}
  ,

  created() {


  }
  ,
  async mounted() {
    this.groupControl()
    await this.getProducts();
    await this.getSelectCategories();
    await this.getSelectBrands()

  }
  ,
  computed: {

    computedItemsProduct() {

      return this.products.map(item => {
        return {
          ...item,

          brandName: item.brand != null ? item.brand.name : "",


        }
      })
    }
  }

}
;
</script>
