/* eslint-disable prettier/prettier */

axios.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if(error.response.status == 401) {
            let token = localStorage.getItem("token");
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
    }
);