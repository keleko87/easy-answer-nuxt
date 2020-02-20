const state = () => ({
  isAuthenticated: true,
  currentUser: {},
  tags: [],
  tickets: [],
  isLoading: true,
  ticketsCount: 0
})

const actions = {
  async GET_TICKETS (context) {
    // REFACTOR
    const URL = '/api/ticket/list'
    console.log('PROCESS ENV ', process.env.baseUrl)

    this.$axios.defaults.baseURL = process.env.baseUrl
    const data = await this.$axios.$get(URL)
    if (data) {
      context.commit('SET_TICKETS', data)
      context.commit('SET_TICKETS_COUNT', data.length)
    }
  }
}

const mutations = {
  FETCH_START (state) {
    state.isLoading = true
  },
  FETCH_END (state) {
    state.isLoading = false
  },
  SET_TICKETS (state, tickets) {
    state.tickets = tickets
  },
  SET_TICKETS_COUNT (state, ticketsLength) {
    state.ticketsCount = ticketsLength
  }
}

export default {
  state,
  // getters,
  actions,
  mutations
}
