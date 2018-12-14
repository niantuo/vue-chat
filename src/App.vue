<template>
    <div id="app">
        <IMChat @onSendMessage="onSendMessage" @onClickMessage="onClickMessage">
        </IMChat>
    </div>
</template>

<script>

    import {AddTestData, ReplyToMe} from './scripts/ChatTest'
    import IMChat from "./components/IMChat";

    export default {
        components: {IMChat},
        data() {
            return {}
        },
        methods: {
            onSendMessage(message,session) {
                console.log('onSendMessage=>',message);
                setTimeout(() => {
                    let reply = ReplyToMe(session, '你好嘛？');
                    this.$store.dispatch('SendMessage', reply)
                }, 1000)
            },
            onClickMessage(message,session){
                console.log('onClickMessage=>',message,session)
            }
        },
        computed: {
            user() {
                return this.$store.state.chat.userInfo;
            }
        },
        created() {
            AddTestData(this.$store);
        }
    }
</script>


<style lang="less" scoped>
    #app {
        height: 100%;
        width: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        background-color: #233;

    }
</style>
