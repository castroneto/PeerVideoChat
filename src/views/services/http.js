import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
var token = localStorage.getItem('token')
if(token){
    axios.defaults.headers.common['Authorization'] = token
}
axios.defaults.headers.post['Content-Type'] = 'application/json';


const HttpService = {
    axios: axios,
};


export default HttpService;