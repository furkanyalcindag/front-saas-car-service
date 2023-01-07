<template>
  <CDropdown
      inNav
      class="c-header-nav-items"
      placement="bottom-end"
      add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink style="border-style: solid;
    border-width: 1px;
    padding:5px;
    border-color:#303c54;">
        <div>
          {{ activeBranch }} Şube
          <CIcon :content="$options.freeSet.cilLevelDown"/>
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Şubeler</strong>
    </CDropdownHeader>

    <CDropdownItem v-for="(branch,i) in selectBranches" v-bind:key="`${i}-${branch.value}`" v-on:click="changeActiveBranch(branch.value)" >
      <CIcon :content="$options.freeSet.cilBuilding"/>
      {{ branch.label }} Şube
      <!--<CBadge color="info" class="ml-auto">{{ itemsCount }}</CBadge> -->
    </CDropdownItem>


  </CDropdown>
</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";
import {freeSet} from '@coreui/icons'

export default {
  name: 'TheHeaderDropdownBranch',
  freeSet,
  data() {
    return {
      itemsCount: 42,
      username: '',
      nameSurname: '',
      selectBranches: [],
      activeBranch: '',
    }
  },
  methods: {

    changeActiveBranch(id) {

      localStorage.setItem("active_branch", id);
      const found =  this.selectBranches.find(x => x.value === id);
      this.activeBranch = found.label
      this.$router.go()

    },
    defaultActiveBranch(){


      if(localStorage.getItem("active_branch") == null)
      {
        let first = this.selectBranches.at(0);

        localStorage.setItem("active_branch",first.value);


        this.activeBranch = first.label
      }
      else {

        this.activeBranch = this.selectBranches.find(x => x.value === localStorage.getItem("active_branch")).label;
      }


    },


     getSelectBranches() {



      return axios.get(process.env.VUE_APP_API_URL + "/car-service/branch-select-header-api", {headers: authHeader()})
    }
  },

  async beforeCreate() {



  },

  async created() {
    let x = await this.getSelectBranches()
    this.selectBranches = x.data

     this.defaultActiveBranch()



  },
  watch: {
    nameSurname() {
      this.nameSurname = localStorage.getItem('user_name_surname')
      // isOpen datasındaki değişliği yakaladık.
    }
  }
}
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>