import axios from "axios";
import authHeader from "../auth-header";

class PlanService {


    getPlans() {

        return axios.get(process.env.VUE_APP_API_URL + '/car-service/management/plan-api', {headers: authHeader()})


    }

    getPlanApi(id) {
        const params = {
            uuid: id
        };
        return axios.get(process.env.VUE_APP_API_URL + '/car-service/management/plan-api', {
            headers: authHeader(),
            params
        })
    }


    addPlan(plan) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/management/plan-api',
            {
                name: plan.name,
                feature: plan.feature,
                netPriceMonthly: plan.netPriceMonthly,
                netPriceYearly: plan.netPriceYearly,
                taxRate: plan.taxRate
            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    deletePlan(id) {
        const params = {
            id: id

        };
        return axios.delete(process.env.VUE_APP_API_URL + '/car-service/management/plan-api', {
            headers: authHeader(),
            params
        }).then(response => {
            return response;
        }).catch((err) => {
            if (err.response) {
                return err.response
            } else if (err.request) {
                // client never received a response, or request never left
            } else {
                // anything else
            }
        })


    }

    updatePlan(plan, uuid) {

        const params = {
            id: uuid

        };
        return axios.put(process.env.VUE_APP_API_URL + '/car-service/management/plan-api',

            {
                name: plan.name,
                feature: plan.feature,
                netPriceMonthly: plan.netPriceMonthly,
                netPriceYearly: plan.netPriceYearly,
                taxRate: plan.taxRate

            }, {headers: authHeader(), params}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }
}

export default PlanService