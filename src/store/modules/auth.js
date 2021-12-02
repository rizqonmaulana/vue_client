import axios from 'axios';
import router from '../../router/index'

export default {
    state: {
        user: {},
        token: localStorage.getItem('token') || null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        delUser(state) {
            state.user = {}
            state.token = null
        },
    },
    actions: {
        login(context, payload) {
            return new Promise((resolve, reject) => {
              axios
                .post(`${process.env.VUE_APP_SERVER_URL}/api/embreo/user/login`, payload)
                .then(result => {
                  context.commit('setUser', result.data.data)
                  localStorage.setItem('token', result.data.data.token)
                  resolve(result) 
                })
                .catch(error => {
                  reject(error.response)
                })
            })
        },
        logout(context) {
            localStorage.removeItem('token')
            context.commit('delUser')
            router.push('/')
        },
        interceptorRequest(context) {
            console.log('interceptor Request work !')
            axios.interceptors.request.use(
              function(config) {
                // Do something before request is sent
                config.headers.Authorization = `Bearer ${context.state.token}`
                return config
              },
              function(error) {
                // Do something with request error
                return Promise.reject(error)
              }
            )
        },
        interceptorResponse(context) {
        console.log('interceptor Response work !')
        axios.interceptors.response.use(
            function(response) {
            return response
            },
            function(error) {
            if (
                error.response.data.status === 403 &&
                error.response.data.msg === 'jwt expired'
            ) {
                context.dispatch('logout')
                alert('Sorry Your token is Expired !')
            } else if (
                error.response.data.status === 403 &&
                error.response.data.msg === 'jwt malformed'
            ) {
                context.dispatch('logout')
                alert('Sorry Your token is not valid !')
            } else if (
                error.response.data.status === 403 &&
                error.response.data.msg === 'jwt invalid'
            ) {
                context.dispatch('logout')
                alert('Sorry Your token is not valid !')
            }
    
            return Promise.reject(error)
            }
        )
    }   
    },
    getters: {
        isLogin(state) {
            return state.token !== null
        },
        isVendor(state){
            return state.user.role === 'vendor'
        },
        isHR(state){
            return state.user.role === 'HR'
        },
        getUser(state) {
            return state.user
        }
    }
}
