import Vue from 'vue'
import * as Tiptap from 'tiptap'
// import { TiptapExtensions } from 'tiptap-extensions'
console.log('process', process)

if (process.BROWSER_BUILD) {
  Vue.use(Tiptap)
}

// const VueEditor = {
//   install (Vue, options) {
//     Vue.component('editor-content', EditorContent)
//   }
// }
// Vue.use(Editor)
// Vue.use(VueEditor)

export default {
  Tiptap
}
// Vue.component('EditorContent', EditorContent)
// Vue.component('EditorMenuBar', EditorMenuBar)
// Vue.use(TiptapExtensions)
