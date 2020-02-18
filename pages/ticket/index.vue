<template>
  <div class="ticket-new my-5">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-8 col-md-offset-2 mx-auto">
          <h2>Create New ticket</h2>

          <div class="well">
            <div>
              <div class="form-group control-label">
                <label for="title">Title</label>
                <input
                  id="title"
                  v-model.trim="$v.form.title.$model"
                  type="text"
                  class="form-control"
                  placeholder="Enter a title for your post"
                  name="title"
                >
              </div>
              <div class="form-group">
                <label for="content">Content</label>
                <!-- <textarea
                  v-model.trim="$v.form.content.$model"
                  class="form-control"
                  rows="5"
                  id="content"
                  placeholder="Write your issue"
                  name="content"
                >
                </textarea> -->
                <no-ssr>
                  <quill-editor @input="onInput($event)" />
                </no-ssr>
              </div>
              <div class="form-group">
                <label for="tags">Tags</label>
                <select
                  id="tags"
                  v-model.trim="$v.form.tags.$model"
                  class="form-control"
                  placeholder="Choose your tag"
                  name="tags"
                >
                  <option>html</option>
                  <option>css</option>
                  <option>js</option>
                  <option>node</option>
                </select>
              </div>
              <div class="form-group">
                <input
                  id="photo"
                  ref="photo"
                  type="file"
                  name="photo"
                  @change="onSelect"
                >
              </div>

              <!-- <div class="form-group">
                <input
                  id="imageUrl"
                  ref="imageUrl"
                  v-model.trim="$v.form.imageUrl.$model"
                  type="text"
                  name="imageUrl"
                  readonly
                >
              </div> -->

              <!-- <div id="preview">
                <img v-if="photoUrl" :src="photoUrl">
              </div> -->

              <button
                type="button"
                class="btn btn-success"
                @click.prevent="onSubmit"
              >
                Send Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
// import { SAVE_TICKET } from '../store/actions'
import QuillEditor from '../../components/QuillEditor'

export default {
  name: 'Ticket',
  components: {
    QuillEditor
  },

  data () {
    return {
      form: {
        title: '',
        content: '',
        tags: [''],
        imageUrl: '',
        photo: {}
      },
      photoUrl: ''
    }
  },

  methods: {
    onSelect () {
      const photo = this.$refs.photo.files[0]
      this.photoUrl = URL.createObjectURL(photo)
      this.form.photo = photo
      this.$v.form.imageUrl.$model = this.photoUrl
    },

    onInput (ev) {
      this.form.content = ev.getHTML
      this.form.photo = ev.file
      this.form.imageUrl = ev.file.photoUrl
    },

    onSubmit () {
      const formData = new FormData()

      formData.append('title', this.form.title)
      formData.append('content', this.form.content)
      formData.append('tags', this.form.tags)
      formData.append('imageUrl', this.form.imageUrl)

      if (this.form.photo) {
        formData.append('photo', this.form.photo)
      }

      this.$store.dispatch('ticket/SAVE_TICKET', formData)
      // this.$router.push('/')
    }
  },

  validations: {
    form: {
      title: {
        required,
        minLength: minLength(5)
      },
      content: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500)
      },
      imageUrl: '',
      tags: {
        required
      },
      file: {}
    }
  }
}
</script>
