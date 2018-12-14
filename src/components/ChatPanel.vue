<template>
    <div class="chat-panel">
        <div class="message chat-scrollbar" ref="chatRecords">
            <ul v-if="currentSession">
                <li v-for="item in currentMessages" @click="onClickMessage(item)">
                    <span class="msg-sender" :class="{'msg-self':isSelfMessage(item)}">
                        {{`${item.sender}  ${item.date}` }}</span>
                    <div class="message-content">
                        <span class="msg-text" v-if="item.cType===cType.TEXT">{{ item.content}}</span>
                        <img v-else-if="item.cType===cType.IMG" class="msg-img"
                             :src="item.url" :alt="item.content"/>
                        <span class="msg-file"
                              v-else-if="item.cType===cType.FILE">{{item.content}}</span>
                        <DotLoading v-if="item.state===cState.SENDING" class="spinner"/>
                        <img @click="onSendMessage(item)" class="send-fail" v-if="item.state===cState.FAILED"
                             src="./icons/ic_failed.png"/>
                    </div>
                </li>
            </ul>
        </div>
        <div class="text-input">
            <div class="input-tool">
                <img class="tool-icon" @click="selectImage" alt="发送图片" src="./icons/ic_img.png"/>
                <img class="tool-icon" alt="发送文件" src="./icons/ic_file.png"/>
            </div>
            <div id="inputArea" class="chat-scrollbar" @keyup="onKeyup"  ref="inputArea"></div>
            <input @change="imgChange" ref="imgInput" type="file" hidden accept="image/*"/>
            <div class="input-btns">
                <button class="input-btn">关闭</button>
                <button @click="send" class="input-btn blue-btn">发送</button>
            </div>
        </div>
    </div>

</template>

<script>

    import {ChatMessage, CType, CState} from "../scripts/ChatMessage";
    import CircleLoading from "./loading/CircleLoading";
    import DotLoading from "./loading/DotLoading";
    import Squire from 'squire-rte'

    export default {
        name: "ChatPanel",
        components: {DotLoading, CircleLoading},
        data() {
            return {
                content: '',
                cType: CType,
                cState: CState,
                inputType:CType.TEXT,
                editor:undefined
            };
        },
        methods: {
            onKeyup(e) {
                if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                    this.sendMessage(this.content);
                    this.content = '';
                }
            },
            send() {
                let content = this.editor.getHTML();
                console.log('content=>',content);

                this.editor.insertImage('http://p2.gexing.com/G1/M00/0E/D1/rBACFFJFuK6BmUmeAAFZKHPfEnc600.jpg'
                    ,{class:'input-img'});

                if (this.content.length) {
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
                message.cType = CType.TEXT;
                message.content = content;
                this.$store.dispatch('SendMessage', message);
                this.onSendMessage(message);

            },
            onSendMessage(message) {
                this.$emit('onSendMessage', message, this.currentSession);
            },
            isSelfMessage(item) {
                return this.userInfo.id === item.senderId;
            },
            onClickMessage(message) {
                this.$emit('onClickMessage', message, this.currentSession);
            },
            scrollToBottom() {
                console.log('scrollToBottom');
                let panel = this.$refs.chatRecords;
                panel.scrollTop = panel.scrollHeight;
            },
            selectImage(){
                this.$refs.imgInput.click();
            },
            imgChange(event){
                let files = this.$refs.imgInput.files;
                if (files&&files.length){
                    let file = files[0];
                    const windowURL = window.URL || window.webkitURL;
                    const dataURL=windowURL.createObjectURL(file);
                    this.editor.insertImage(dataURL,{class:'input-img'});
                }
            },
            editorInit(){
                this.editor = new Squire(this.$refs.inputArea);
                console.log('editor=>',this.editor)
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
        },
        watch: {
            currentMessages() {
                this.$nextTick(this.scrollToBottom.bind(this))
            }
        },
        mounted(){
            this.editorInit();
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

            li:hover {
                cursor: pointer;
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
                padding: 0 10px;
            }

            .msg-img {
                width: 100px;
                height: 100px;
                border-radius: 10px;
                padding: 0 10px;
            }

            .msg-file {
                padding: 0 10px;
            }
        }

        .text-input {
            height: 150px;
            border-top: solid 1px #999;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            padding: 2px 10px 10px;
            position: relative;

            #inputArea{
                flex: 1;
                width: 100%;
                border: none;
                outline: none;
                overflow-y: auto;
                overflow-x: hidden;
            }
            textarea {
                flex: 1;
                width: 100%;
                border: none;
                outline: none;
                margin: 0;
                padding: 0;
                font-family: "Micrsofot Yahei", serif;
                resize: none;
            }

            .input-tool {
                height: 25px;
                padding-bottom: 10px;
                .tool-icon {
                    width: 25px;
                    height: 25px;
                    border-radius: 5px;
                    display: inline-block;
                    padding-right: 10px;
                }
                .tool-icon:hover {
                    cursor: pointer;
                }
            }

            .input-btns {
                position: absolute;
                right: 10px;
                bottom: 10px;
                .input-btn {
                    width: 60px;
                    height: 35px;
                    border: solid 1px lightgray;
                    border-radius: 5px;
                    background-color: transparent;
                }

                .blue-btn{
                    background-color: #0ebbff;
                    color: white;
                }
            }

            .file-input{
                flex: 1;
                width: 100%;
                border: none;
                outline: none;
                margin: 0;
                padding: 0;
                font-family: "Micrsofot Yahei", serif;
                resize: none;
            }

        }

        .spinner {
            width: 15px;
            height: 15px;
        }

        .send-fail {
            width: 15px;
            height: 15px;
        }

        .message-content {
            width: 100%;
            padding: 5px 0;
        }


    }
</style>
