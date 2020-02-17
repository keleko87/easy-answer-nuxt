// import JwtService from '../common/jwt.service'

// export default function ({ $axios, redirect }, inject) {
//   // Create a custom axios instance
//   const api = $axios.create({
//     headers: {
//       common: {
//         Accept: 'text/plain, */*'
//       }
//     }
//   })

//   console.log('PROCESS', process.env)

//   // Set baseURL to something different
//   api.setBaseURL(`${process.env.BASE_URL}/api`)

//   // Inject to context as $api
//   inject('api', api)
// }

const ApiService = {

  config ({ $axios, redirect }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
      headers: {
        common: {
          Accept: 'text/plain, */*'
        }
      }
    })

    console.log('PROCESS', process.env)

    // Set baseURL to something different
    api.setBaseURL(`${process.env.BASE_URL}/api`)

    // Inject to context as $api
    inject('api', api)
  },
  // setHeader () {
  //   Vue.axios.defaults.headers.common.Authorization = `Token ${JwtService.getToken()}`
  // },

  get (resource, slug = '') {
    return this.$axios.$get(`${resource}/${slug}`).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  post (resource, params) {
    return this.$axios.$post(`${resource}`, params)
  }

}

export default ApiService

export const TicketsService = {
  resource: 'ticket',

  getTickets () {
    return ApiService.get(this.resource, 'list')
  },

  getTicket (id) {
    return ApiService.get(this.resource, id)
  },

  saveTicket (ticket) {
    console.log(`${this.resource}/new`, '-----', ticket)
    return ApiService.post(`${this.resource}/new`, ticket)
  }
}

export const CommentService = {
  resource: 'ticket/comment',

  getTicketComments (ticketId) {
    return ApiService.get(this.resource, ticketId)
  },

  saveComment (comment, id) {
    return ApiService.post(`${this.resource}/${id}`, comment)
  }
}

export const AuthService = {
  resource: '/auth',

  login () {
    return ApiService.get(this.resource, 'login')
  },

  getUserProfile () {
    return ApiService.get(this.resource, 'profile')
  },

  logout () {
    return ApiService.get(this.resource, 'logout')
  }
}
