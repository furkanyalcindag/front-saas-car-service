import axios from "axios";
import authHeader from "@/services/auth-header";


class BranchService {

    addBranch(brand) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/branch-api',
            {
                name: brand.name,

            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    getBranches() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/branch-api`, {headers: authHeader()})


    }

    getBranch(id) {
        const params = {
            id: id

        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/branch-api`, {headers: authHeader(), params})


    }


    deleteBranch(id) {
        const params = {
            id: id

        };
        return axios.delete(process.env.VUE_APP_API_URL + `/car-service/branch-api`, {headers: authHeader(), params}).then(response => {
            return response;
        }).catch(error => {
            return error;
        });


    }

    updateBranch(branch) {

        const params = {
            id: branch.id

        };


        return axios.put(process.env.VUE_APP_API_URL + '/car-service/branch-api',
            {

                name: branch.name

            }, {
                headers: authHeader(),
                params
            }).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }



}

export default BranchService