<template>
    <div class="chat-container">
        <slot name="tool"></slot>
        <div class="im-chat-container">
            <div class="chat-users">
                <ChatSessions class="user-list"/>
            </div>
            <ChatPanel class="chat-content"/>
        </div>
    </div>
</template>

<script>
    import ChatSessions from "./ChatSessions";
    import ChatPanel from "./ChatPanel";

    export default {
        name: "IMChat",
        components: {ChatPanel, ChatSessions}
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
