import Axios from "axios";

export default class ApiServices {
    static getConfig() {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }
        return config
    }

    static  post(path,body){
        const config = this.getConfig();
        return  Axios.post(`${process.env.REACT_APP_BASE_URL}${path}`,body,config)
    }
}