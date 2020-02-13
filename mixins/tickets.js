export default {
  data () {
    return {
      query: ''
    }
  },

  computed: {
    tickets () {
      return this.$store.state.tickets
    },

    filteredTickets () {
      if (this.query) {
        return this.tickets.filter((item) => {
          return this.query
            .toLowerCase()
            .split(' ')
            .every(v => item.title.toLowerCase().includes(v))
        })
      } else {
        return this.tickets
      }
    }
  }
}
