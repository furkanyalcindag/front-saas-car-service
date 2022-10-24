import axios from "axios";
import authHeader from "../auth-header";

class OrganizationService {


    getOrganizations(activePage, count, firmName) {

        var x = firmName
        if (firmName == null) {
            x = ''
        }
        const params = {
            activePage: activePage,
            firmName: x,
            count: count
        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/saas/organization-api`, {
            headers: authHeader(),
            params
        })
    }

    getSingleOrganizations(uuid) {
        const params = {
            uuid: uuid,
        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/saas/organization-api`, {
            headers: authHeader(),
            params
        })
    }


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


    addOrganization(organization) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/saas/organization-api',
            {
                name: organization.name,
                subdomain: organization.subdomain,
                firstName: organization.firstName,
                lastName: organization.lastName,
                mobilePhone: organization.mobilePhone,
                taxNumber: organization.taxNumber,
                taxOffice: organization.taxOffice,
                address: organization.address,
                password: organization.password,
                confirmPassword: organization.confirmPassword,
                logo: organization.logo,
                email: organization.email
            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    updateOrganization(organization) {

        debugger
        const params = {
            uuid: organization.uuid
        };
        return axios.put(process.env.VUE_APP_API_URL + '/car-service/saas/organization-api',
            {
                name: organization.name,
                firstName: organization.firstName,
                lastName: organization.lastName,
                mobilePhone: organization.mobilePhone,
                taxNumber: organization.taxNumber,
                taxOffice: organization.taxOffice,
                address: organization.address,
                logo: organization.logo,
            }, {
                headers: authHeader(),
                params
            }).then(response => {


            return response;
        }).catch(error => {
            return error
        });


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



    getOrganizationPlans(activePage, count, uuid) {


        const params = {
            activePage: activePage,
            count: count,
            uuid:uuid
        };
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/management/organization-plan-api`, {
            headers: authHeader(),
            params
        })
    }

    addOrganizationPlan(choosedPlan,organizationUuid){
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/management/organization-plan-api',
            {
                planUuid: choosedPlan.uuid,
                organizationUuid:organizationUuid,
                subscriptionType: choosedPlan.subscriptionType,

            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });




    }
}

export default OrganizationService