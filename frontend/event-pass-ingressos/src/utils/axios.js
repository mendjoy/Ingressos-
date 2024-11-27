import axios from "axios"
        
const api = axios.create({
    baseURL:  "http://localhost:8080"
})

api.interceptors.request.use(function(config){
    const token = sessionStorage.getItem("token")

    if(token !== null){

        config.headers.Authorization = `Bearer ${token}`
        return config

    }else{
        
        return config
    }
})

export default api