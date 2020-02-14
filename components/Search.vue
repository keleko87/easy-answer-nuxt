<template>
  <div class="search">
    <input type="text" name="search" :value="query" @input="onInput">
    <button @click="search(query)" />
  </div>
</template>

<script>
export default {
  name: 'SearchComponent',

  props: {
    serviceToGet: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      query: ''
    }
  },

  watch: {
    query (query) {
      console.log('query', query)
    }
  },

  methods: {
    search (event) {
      this.serviceToGet(event)
        .then((data) => {
          this.responseEvent(data)
        })
        .catch(err => console.error(err))
    },

    responseEvent (value) {
      this.$emit('onResponse', value)
    },

    onInput (ev) {
      this.query = ev
      this.$emit('input', ev)
    }
  }
}
</script>

<style scoped></style>
