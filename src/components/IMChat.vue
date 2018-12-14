<template>
    <div class="chat-container">
        <ChatHeader></ChatHeader>
        <div class="im-chat-container">
            <div v-show="sessions.length>1" class="chat-users">
                <ChatSessions class="user-list"/>
            </div>
            <ChatPanel @onSendMessage="onSendMessage" class="chat-content" @onClickMessage="onClickMessage"/>
        </div>
    </div>
</template>

<script>
    import ChatSessions from "./ChatSessions";
    import ChatPanel from "./ChatPanel";
    import ChatHeader from "./ChatHeader";

    export default {
        name: "IMChat",
        components: {ChatHeader, ChatPanel, ChatSessions},
        data() {
            return {}
        },
        methods: {
            onSendMessage(message, session) {
                this.$emit('onSendMessage', message, session)
            },
            onClickMessage(message, session) {
                this.$emit('onClickMessage', message, session)
            }
        },
        computed: {
            sessions() {
                return this.$store.state.chat.sessions;
            }
        }
    }
</script>

<style scoped>

    .im-chat-container {
        display: -webkit-flex;
        display: flex;
        flex: 1;
        -webkit-flex: 1;
        flex-direction: row;
    }

    .user-list {
        flex: 1;
        -webkit-flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        border-right: solid 1px #999;
        padding: 10px 0;
    }

    .chat-content {
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }


</style>
