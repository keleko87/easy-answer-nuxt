import Vue from 'vue'
import { TicketsService, CommentService } from '../plugins/api.service'

const state = () => ({
  data: {},
  comments: []
})

const getters = {
  getTicket (state) {
    return state.data
  },

  getComments (state) {
    return state.comments
  }
}

const actions = {
  async 'GET_TICKET' (context, id) {
    const { data } = await TicketsService.getTicket(id)
    context.commit('SET_TICKET', data)
    context.dispatch('GET_TICKET_COMMENTS', id)
  },

  async 'GET_TICKET_COMMENTS' (context, ticketId) {
    const { data } = await CommentService.getTicketComments(ticketId)
    context.commit('SET_COMMENTS', data)
    return data
  },

  async 'SAVE_TICKET' (context, form) {
    try {
      await this.$axios.$post(`${process.env.BASE_URL}/api/ticket/new`, form)
      // await TicketsService.saveTicket(form)
      context.commit('SET_TICKET', form)
    } catch (err) {
      window.console.log('error', err)
      return err
    }
  },

  async 'SAVE_COMMENT' (context, { form, id }) {
    const { data } = await CommentService.saveComment(form, id)

    if (data) {
      context.commit('SET_COMMENT_IN_TICKET', data)
      context.dispatch('GET_TICKET_COMMENTS', id)
    }
  },

  'REPLACE_IMAGE_URL' (context, { ticket }) {
    context.commit('SET_IMAGE_URL', ticket)
  }
}

const mutations = {
  'SET_TICKET' (state, newTicket) {
    state.data = { ...newTicket } // Equivalent to Object.assign({}, newTicket);
  },
  'SET_COMMENTS' (state, comments) {
    state.comments = [...comments]
  },
  'SET_COMMENT_IN_TICKET' (state, comment) {
    // state.comments.push(comment); // NO REACTIVE
    Vue.set(state.comments, state.comments.length, comment) // REACTIVE!!
  },
  'SET_IMAGE_URL' (state, ticket) {
    state.data.content = ticket.content.replace(
      `blob:${process.env.BASE_URL}/${ticket.image.filename}`,
      ticket.imageUrl
    )
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
