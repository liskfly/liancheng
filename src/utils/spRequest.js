import axios from 'axios'
let http = window.webConfig.webApiBaseUrl


const service = axios.create({
    baseURL: http,
    // timeout: 2*6000, 
})
export default service