// eslint-disable-next-line import/no-named-default
import { default as format } from 'date-fns/format'
import Vue from 'vue'

const formatDate = (date) => {
  return format(new Date(date), 'DD-MM-YYYY HH:mm')
}

Vue.filter('date', formatDate)
