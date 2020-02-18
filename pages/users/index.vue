<template>
  <div class="container">
    <h2>users view</h2>
    <input v-model="userId" type="text">
    <button @click="onLoadUser">
      Load User
    </button>

    <hr>

    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <no-ssr>
            <ods-chart
              type="singleBar"
              :data="{labels: ['label', 'label', 'label'], series: [[{meta: 'valor 1', value: 30}, {meta: 'valor 1', value: 20}, {meta: 'valor 1', value: 40}]]}"
              symbol="kg"
            />
            <ods-chart
              type="singleLine"
              :data="{labels: ['label', 'label', 'label'], series: [[{meta: 'valor 1', value: 300}, {meta: 'valor 1', value: 200}, {meta: 'valor 1', value: 400}]]}"
              :overlap="true"
              orientation="horizontal"
              symbol="kg"
            />

            <ods-chart
              type="gauge"
              :data="{series: [{meta: 'valor 1', value: 30}]}"
              :size="90"
            />
            <ods-button type="primary">
              Link Button
            </ods-button>
          </no-ssr>
        </div>
      </div>
    </div>
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
