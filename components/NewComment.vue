<template>
  <div class="row">
    <div class="col-md-1" />
    <div class="col-md-10">
      <form enctype="multipart/form-data" @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="content">Your answer</label>
          <textarea
            id="content"
            v-model.trim="$v.form.content.$model"
            class="form-control"
            rows="5"
            placeholder="Write your answer"
            name="content"
          />
        </div>

        <div class="form-group">
          <input ref="photoComment" type="file" name="photo-comment" @change="onSelect">
          <!-- <file-upload /> -->
        </div>
        <button type="submit" class="btn btn-success">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'NewComment',

  data () {
    return {
      comments: [],
      form: {
        content: '',
        photoComment: ''
      }
    }
  },

  methods: {
    onSelect () {
      const photo = this.$refs.photoComment.files[0]
      this.form.photoComment = photo
    },

    onSubmit () {
      const formData = new FormData()
      formData.append('content', this.form.content)

      if (this.form.photoComment) {
        formData.append('photoComment', this.form.photoComment)
      }

      const { id } = this.$route.params
      this.$store.dispatch('SAVE_COMMENT', { form: formData, id })
    }
  },

  validations: {
    form: {
      content: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(2500)
      }
    }
  }
}

</script>
