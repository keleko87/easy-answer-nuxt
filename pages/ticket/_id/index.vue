<template>
  <div v-if="getTicket" class="container">
    <div v-if="getTicket.creatorId && getTicket.creatorId.length" class="row">
      <div class="col-md-1" />
      <div class="col-md-10">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between ">
              <div class="card-message">
                <h5 class="card-title">
                  {{ getTicket.title }}
                </h5>
                <div class="content expanded card-text">
                  <!-- <div v-html="getTicket.content"></div> -->

                  <quill-editor
                    :content="getTicket.content"
                    :editable="false"
                    :menu-bar-hidden="true"
                  />
                </div>
                <!-- <div
                  class="ticket-image"
                  v-if="getTicket.image.filename !== 'nofile'"
                >
                  <img
                    :src="getTicket.imageUrl"
                    alt="ticket image"
                    class="card-image image-responsive"
                  />
                </div> -->
              </div>

              <div class="ticket-comments pt-1">
                <div class="comments text-center">
                  23
                </div>
                <small>answers</small>
              </div>
            </div>

            <div class="actions">
              <div>
                <template v-if="isTicketCreator">
                  <a href="#" class="card-link">Edit</a>
                  <a href="#" class="card-link">Delete</a>
                </template>
                <a href="#" class="card-link">Share</a>
              </div>
              <div class="tag">
                <span class="tag-text">
                  {{ getTicket.tags }}
                </span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="row">
              <div class="col-auto">
                <img
                  :src="getTicket.creatorId[0].imgAvatar"
                  class="image-avatar rounded-circle"
                >
              </div>

              <div class="col-auto p-0">
                <div class="">
                  <span><b>{{ getTicket.creatorId[0].username }} </b>posted a
                    question</span>
                </div>
                <small
                  class="text-muted time"
                >asked:{{ getTicket.created_at | date }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="getComments.length > 0" class="row">
      <div class="col-md-2" />
      <div class="col-xs-12 col-md-8 col-md-offset-2">
        <div v-for="comment in getComments" :key="comment._id" class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between ">
              <div class="card-message">
                <p>{{ comment.content }}</p>

                <div v-if="comment.image !== 'nofile'" class="ticket-image">
                  <img
                    :src="comment.image"
                    alt="comment image"
                    class="comment-image"
                  >
                </div>
              </div>

              <div class="ticket-comments votes pt-1">
                <span
                  class="arrow"
                  @click="
                    () => {
                      window.console.log('up');
                    }
                  "
                ><b-icon-chevron-up /></span>
                <div class="comments text-center">
                  5
                </div>
                <span
                  class="arrow"
                  @click="
                    () => {
                      window.console.log('down');
                    }
                  "
                ><b-icon-chevron-down /></span>
              </div>
            </div>
          </div>

          <div v-if="comment.creatorCommentId" class="card-footer">
            <div class="row">
              <div class="col-auto">
                <img
                  :src="comment.creatorCommentId.imgAvatar"
                  :alt="comment.creatorCommentId.imgAvatar"
                  class="image-avatar rounded-circle"
                >
              </div>

              <div class="col-auto p-0">
                <div class="">
                  <span><b>{{ comment.creatorCommentId.username }}</b></span>
                </div>
                <small class="text-muted time">{{
                  comment.creatorCommentId.created_at | date
                }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <new-comment />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BIconChevronDown, BIconChevronUp } from 'bootstrap-vue'
// import { GET_TICKET, REPLACE_IMAGE_URL } from '../store/actions.type'
import NewComment from '../../../components/NewComment'
import QuillEditor from '../../../components/QuillEditor'
// import store from '../../../store'

export default {
  name: 'TicketDetail',

  components: {
    QuillEditor,
    NewComment,
    BIconChevronDown,
    BIconChevronUp
  },
  data () {
    return {
      uploadsURL: `${process.env.VUE_APP_API}/uploads/`
    }
  },

  computed: {
    ...mapGetters(['getTicket', 'getComments']),
    // DOUBT -> Move to store: getter ??
    isTicketCreator () {
      // return this.ticket && this.ticket.creatorId[0] && (this.isTicketCreator[0]._id === this.currentUser._id);
      return true
    }
  },

  beforeRouteEnter (to, from, next) {
    const { id } = to.params
    this.$store.dispatch('GET_TICKET', id).then(() => {
      next()
    })
  },

  created () {
    this.contentPhotoReplace()
  },

  methods: {
    contentPhotoReplace () {
      this.$store.dispatch('REPLACE_IMAGE_URL', { ticket: this.getTicket })
    },

    getTicketById () {
      const { id } = this.$route.params
      this.$store.dispatch('GET_TICKET', id)
    }
  }
}
</script>

<style scoped>
.content.expanded {
  height: auto;
  overflow: visible;
  text-overflow: unset;
}

/* >>> To add styles in <img> tag into v-html content */
.content.expanded >>> img {
  width: 100%;
}

.ticket-comments.votes {
  height: auto;
  font-weight: bold;
  color: #404040;
  background-color: transparent;
}

.ticket-comments.votes .arrow {
  font-size: 21px;
}

.ticket-image {
  max-width: 700px;
}

.ticket-image img {
  width: 100%;
}

.ticket-image .comment-image {
  width: 75%;
}

.card .card-body .actions {
  margin-top: 3rem;
}

.card-link {
  font-size: 14px;
  color: #fff;
  background-color: #593196;
  padding: 5px 10px;
  border-radius: 1px;
}
</style>
