import Vue from 'vue'
import Vuex from 'vuex'

import chat from './modules/sessions'
import user from './modules/user'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        chat, user
    },
});

export default store
