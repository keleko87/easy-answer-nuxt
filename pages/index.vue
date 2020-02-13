<template>
  <div class="home">
    <div class="jumbotron">
      <h1>Easy Answer 2</h1>
      <h4>
        Join the web development community of Easy Answer to share your
        knowledge, learn or discuss!
      </h4>
    </div>

    <div class="jumbotron-filter">
      <div class="container">
        <div class="row">
          <div class="col-1" />
          <div class="col-10">
            <div class="d-flex flex-row justify-content-between">
              <div>
                <h2>All Questions</h2>
                <h5>{{ filteredTickets.length }} questions</h5>
              </div>
              <div class="search form-group">
                <label for="search" class="px-3">Filter questions</label>
                <input
                  v-model="query"
                  name="search"
                  type="text"
                  class="w-50"
                  placeholder="Search"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <ticket-list :list="filteredTickets" :type="'all'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TicketList from '@/components/TicketList'
import tickets from '@/mixins/tickets'

export default {
  layout: 'header',
  name: 'Home',

  components: {
    TicketList
  },

  mixins: [tickets],

  data () {
    return {
      env: process.env,
      query: null
    }
  },

  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  }

}
</script>

<style scoped>
.search {
  align-self: flex-end;
}
.jumbotron {
  text-align: center;
  color: #fff;
  font-weight: bold;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background: linear-gradient(-45deg, #791c96, #8e4eaf, #6894bf, #417fcc);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
