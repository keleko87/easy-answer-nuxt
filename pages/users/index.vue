<template>
  <div class="container">
    <h2>users view</h2>
    <input v-model="userId" type="text">
    <button @click="onLoadUser">
      Load User
    </button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userId: ''
    }
  },
  methods: {
    onLoadUser () {
      this.$router.push('/users/' + this.userId)
    }
  }
}
</script>
