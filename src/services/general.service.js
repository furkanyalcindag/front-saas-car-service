import axios from "axios";
import authHeader from "@/services/auth-header";

class GeneralService {


    getGroups() {
        return axios.get(process.env.VUE_APP_API_URL + `/car-service/group-api`, {headers: authHeader()})
    }

    static showToast(msg, type) {

        this.$toast.open({
            message: 'msg',
            type: 'type',
            // all of other options may go here
        });
    }


}

export default GeneralService