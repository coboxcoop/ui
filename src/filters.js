import Vue from 'vue'
import bytes from 'bytes'

Vue.filter('bytes', value => bytes(value))