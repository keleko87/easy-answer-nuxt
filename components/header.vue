<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <nuxt-link to="/">
        Easy Answer 2
      </nuxt-link>

      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <button class="btn btn-lg btn-slack" @click="login">
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
          <nuxt-link to="/ticket">
            New Ticket
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/settings">
            <i class="ion-compose" />Settings
          </nuxt-link>
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
          <span @click="logout">
            Logout
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

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

<style lang="scss">
  .navbar-nav {
    margin-top: 0;

    .nav-item {
      padding: 0 0.5rem;
    }
  }
</style>
