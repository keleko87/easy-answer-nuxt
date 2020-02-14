<template>
  <div class="editor" :class="{ 'border-none': menuBarHidden }">
    <!-- <no-ssr> -->
    <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
      <div class="menubar" :class="{ 'is-hidden': menuBarHidden }">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <b-icon-type-bold />
          <!-- <icon name="bold" /> -->
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <!-- <icon name="italic" /> -->
          <b-icon-type-italic />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <!-- <icon name="strike" /> -->
          <b-icon-type-strikethrough />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <b-icon-type-underline />

          <!-- <icon name="underline" /> -->
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <b-icon-code />

          <!-- <icon name="code" /> -->
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <!-- <icon name="code" /> -->
          <b-icon-code-slash />
        </button>

        <button
          class="menubar__button v-align__text--top"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <span class="menubar__button--icon">p</span>
          <!-- <icon name="paragraph" /> -->
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <b-icon-type-h1 />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <b-icon-type-h2 />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <b-icon-type-h3 />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <!-- <icon name="ul" /> -->
          <b-icon-list-ul />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <!-- <icon name="ol" /> -->
          <b-icon-list-ol />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <!-- <icon name="quote" /> -->
          <b-icon-blockquote-left />
        </button>

        <button
          class="menubar__button v-align__text--top"
          @click="commands.horizontal_rule"
        >
          <!-- <icon name="hr" /> -->
          <span class="menubar__button--icon">hr</span>
        </button>

        <button class="menubar__button" @click="commands.undo">
          <!-- <icon name="undo" /> -->
          <b-icon-arrow-counterclockwise />
        </button>

        <button class="menubar__button" @click="commands.redo">
          <!-- <icon name="redo" /> -->
          <b-icon-arrow-clockwise />
        </button>

        <button
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
        >
          <b-icon-image-fill />
          <!-- <icon name="image" /> -->
        </button>

        <button class="menubar__button" @click="chooseFiles()">
          <b-icon-image />
          <!-- <icon name="image" /> -->
        </button>
        <input
          id="photo"
          ref="photo"
          type="file"
          name="photo"
          @change="selectFile(commands.image)"
        >
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
    <!-- </no-ssr> -->
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  Image,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'
// let tiptap
// let tiptapExtension

// // if (process.client || process.browser) {
// //   console.log('procss', process.client, process.browser)
// //   tiptap = require('tiptap')
// //   tiptapExtension = require('tiptap-extensions')
// // }

export default {
  name: 'QuillEditor',

  components: {
    EditorContent,
    EditorMenuBar
  },

  props: {
    image: {
      type: Object,
      default: () => {}
    },
    content: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
    },
    menuBarHidden: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      file: {},
      photoUrl: '',
      editor: null,
      editorChange: false
    }
  },

  watch: {
    content (value) {
      if (this.editor && !this.editorChange) {
        this.editor.setContent(value, true)
        this.$emit('input', value)
      }

      this.editorChange = false
    }
  },

  mounted () {
    this.editor = new Editor({
      editable: this.editable,
      onUpdate: ({ getHTML }) => {
        this.editorChange = true
        this.$emit('input', { getHTML: getHTML(), file: this.file })
      },
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new Image(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ],
      content: this.content
    })
  },

  beforeDestroy () {
    if (this.editor) { this.editor.destroy() }
  },

  methods: {
    selectFile (commandImage) {
      this.file = this.$refs.photo.files[0]
      this.photoUrl = URL.createObjectURL(this.file)
      this.file.photoUrl = this.photoUrl
      // this.$emit('select', this.file);
      this.showImageUploaded(commandImage)
    },

    chooseFiles () {
      window.document.getElementById('photo').click()
    },

    showImagePrompt (command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },

    showImageUploaded (command) {
      const src = this.photoUrl
      command({ src })
    }
  }

}
</script>

<style lang="scss" scoped>
.editor.border-none {
  border: none;
}

#photo {
  display: none;
}

.menubar {
  &__button {
    font-size: 23px;

    &--icon {
      font-size: 16px;
      width: 24px;
    }
  }

  &__button.v-align__text--top {
    vertical-align: super;
  }
}
</style>
