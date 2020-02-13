<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand">
        Easy Answer 2
      </router-link>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <button @click="login" class="btn btn-lg btn-slack">
            <i class="fa fa-slack" />Login Slack
          </button>

          <a href="/auth/login" class="btn btn-primary">Login</a>
        </li>
        <li class="nav-item">
          <!-- <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'logout' }"
          >
            <i class="ion-compose"></i>Sign in
          </router-link> -->
        </li>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            :to="{ name: 'new' }"
            class="nav-link"
          >
            <i class="ion-compose" />&nbsp;New Ticket
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'settings' }"
            class="nav-link"
            exact
          >
            <i class="ion-gear-a" />&nbsp;Settings
          </router-link>
        </li>
        <li v-if="currentUser.username" class="nav-item">
          <router-link
            :to="{
              name: 'profile',
              params: { username: currentUser.username }
            }"
            class="nav-link"
            exact
          >
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <button @click="logout" class="btn btn-lg btn-slack">
            <i class="fa fa-slack" />Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
// import { LOGIN, LOGOUT } from '../store/actions'

export default {
  name: 'Header',
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },

  methods: {
    login () {
      this.$store.dispatch('LOGIN')
    },

    logout () {
      this.$store.dispatch('LOGOUT')
    }
  }
}
</script>
