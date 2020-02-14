// import Vue from 'vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import JwtService from '../common/jwt.service'

// const API_URL = process.env.VUE_APP_API

// const ApiService = {
//   init () {
//     console.log(process.env)
//     Vue.use(VueAxios, axios)
//     Vue.axios.defaults.baseURL = API_URL
//   },

//   setHeader () {
//     Vue.axios.defaults.headers.common.Authorization = `Token ${JwtService.getToken()}`
//   },

//   query (resource, params) {
//     return Vue.axios.get(resource, params).catch((error) => {
//       throw new Error(`[RWV] ApiService ${error}`)
//     })
//   },

//   get (resource, slug = '') {
//     return Vue.axios.get(`${resource}/${slug}`).catch((error) => {
//       throw new Error(`[RWV] ApiService ${error}`)
//     })
//   },

//   post (resource, params) {
//     return Vue.axios.post(`${resource}`, params)
//   },

//   update (resource, slug, params) {
//     return Vue.axios.put(`${resource}/${slug}`, params)
//   },

//   put (resource, params) {
//     return Vue.axios.put(`${resource}`, params)
//   },

//   delete (resource) {
//     return Vue.axios.delete(resource).catch((error) => {
//       throw new Error(`[RWV] ApiService ${error}`)
//     })
//   }
// }

// export default ApiService

// export const TicketsService = {
//   resource: 'ticket',

//   getTickets () {
//     return ApiService.get(this.resource, 'list')
//   },

//   getTicket (id) {
//     return ApiService.get(this.resource, id)
//   },

//   saveTicket (ticket) {
//     return ApiService.post(`${this.resource}/new`, ticket)
//   }
// }

// export const CommentService = {
//   resource: 'ticket/comment',

//   getTicketComments (ticketId) {
//     return ApiService.get(this.resource, ticketId)
//   },

//   saveComment (comment, id) {
//     return ApiService.post(`${this.resource}/${id}`, comment)
//   }
// }

// export const AuthService = {
//   resource: '/auth',

//   login () {
//     return ApiService.get(this.resource, 'login')
//   },

//   getUserProfile () {
//     return ApiService.get(this.resource, 'profile')
//   },

//   logout () {
//     return ApiService.get(this.resource, 'logout')
//   }
// }
