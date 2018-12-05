<template>
    <div class="chat-panel">
        <div class="message">
            <ul v-if="currentSession">
                <li v-for="item in currentMessages">
                    <span class="msg-sender" :class="{'msg-self':isSelfMessage(item)}">
                        {{`${item.sender}  ${item.date}` }}</span>
                    <span class="msg-text" v-if="item.cType===1">{{ item.content}}</span>
                    <img v-else-if="item.cType===2" class="msg-img" :src="item.url"/>
                    <a class="msg-file" target="_blank" :href="item.url" v-else-if="item.cType===3">{{item.content}}</a>
                </li>
            </ul>
        </div>
        <div class="text-input">
            <textarea placeholder="按 Ctrl + Enter 发送"
                      v-model="content" @keyup="onKeyup"></textarea>
        </div>
    </div>

</template>

<script>

    import {ChatMessage} from "../scripts/ChatMessage";

    export default {
        name: "ChatPanel",
        data() {
            return {
                content: ''
            };
        },
        methods: {
            onKeyup(e) {
                if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                    this.sendMessage(this.content);
                    this.content = '';
                }
            },
            sendMessage(content) {
                let userInfo = this.userInfo;
                console.log('userInfo=>', userInfo.name);
                let message = new ChatMessage();
                message.senderId = this.userInfo.id;
                message.id = 'xxx';
                message.sender = this.userInfo.name;
                message.cType = 1;
                message.content = content;
                this.$store.dispatch('SendMessage', message);
                this.$emit('onSendMessage', message);
            },
            isSelfMessage(item) {
                return this.userInfo.id === item.senderId;
            }
        },
        computed: {
            currentSession() {
                return this.$store.state.chat.currentSession;
            },
            currentMessages() {
                return this.currentSession.messages;
            },
            userInfo() {
                return this.$store.state.chat.userInfo;
            }
        }
    };
</script>


<style lang="less" scoped>

    .chat-panel {
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        .message {
            padding: 20px 15px 10px;
            overflow-y: auto;
            flex: 1;
            -webkit-flex: 1;
            ul {
                margin: 0;
                padding: 0;
            }
            li {
                margin-bottom: 15px;
            }

            .msg-sender {
                font-size: 14px;
                display: block;
                padding: 5px 0;
                color: #6d4cfe;
            }

            .msg-self {
                color: #2f643d;
            }

            .msg-text {
                font-size: 14px;
                color: #333;
                padding-left: 10px;
            }

            .msg-img {
                width: 100px;
                height: 100px;
                border-radius: 10px;
            }

            .msg-file {

            }
        }

        .text-input {
            height: 150px;
            border-top: solid 1px #999;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            padding: 10px;
            textarea {
                height: 100%;
                width: 100%;
                border: none;
                outline: none;
                margin: 0;
                padding: 0;
                font-family: "Micrsofot Yahei", serif;
                resize: none;
            }
        }

    }
</style>
