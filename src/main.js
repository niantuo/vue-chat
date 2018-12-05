// polyfill
import 'babel-polyfill';

import './styles/index.scss'

import Vue from 'vue';
import App from './App';
import store from './store';

Vue.config.devtools = true;

let vm = new Vue({
    el: '#app',
    components: {App},
    store: store,
    template: '<App/>'
});
Vue.use(vm);
