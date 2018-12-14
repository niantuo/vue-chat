<template>
    <div class="chat-header">
        <div class="chat-header-left">
            <CircleLoading style="margin-left: 10px"/>
        </div>
        <div class="chat-header-title">{{currentSession.name}}</div>
        <div class="chat-header-right">

        </div>
    </div>
</template>

<script>
    import CircleLoading from "./loading/CircleLoading";
    export default {
        name: "ChatHeader",
        components: {CircleLoading},
        data() {
            return {}
        },
        computed: {
            currentSession() {
                return this.$store.state.chat.currentSession;
            }
        }
    }
</script>

<style scoped>
    .chat-header {
        height: 50px;
        width: 100%;
        background: linear-gradient(to right, #219cfc, #26c6fc);
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .chat-header-left {
        flex: 1;
    }

    .chat-header-right {
        flex: 1;
    }

    .chat-header-title {
        padding: 5px 15px;
        min-width: 80px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        color: white;
        font-size: 18px;
    }

    .chat-header-title:hover{
        cursor: pointer;
    }
</style>
