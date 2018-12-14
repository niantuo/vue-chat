import ChatHeader from './components/ChatHeader'
import ChatSessions from './components/ChatSessions'
import ChatPanel from './components/ChatPanel'
import IMChat from './components/IMChat'
import chat from './store/modules/sessions'
import chatStore from './store'


/**
 * @Author :tuonina
 * @Date : 2018/12/6
 * @Version: 1.0
 * @Last Modified by :
 * @Last Modified Date: 2018/12/6
 *
 **/

export default {
    install(Vue) {
        Vue.component('chat-header', ChatHeader);
        Vue.component('chat-sessions', ChatSessions);
        Vue.component('chat-panel', ChatPanel);
        Vue.component('im-chat', IMChat)
    }
}

/**
 * 需要将这个注入到store里面去
 */
export {
    chat,
    chatStore
}
