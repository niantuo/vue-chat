<template>
    <div class="session-list">
        <ul>
            <li v-for="item in sessions"
                :class="{ active: item.id === currentId }"
                @click="selectSession(item.id)">
                <img class="avatar" :alt="item.name" :src="item.avatar">
                <div class="chat-info">
                    <div class="name-and-time">
                        <span class="name">{{item.name}}</span>
                    </div>
                    <span class="last-message">{{lastMessage(item)}}</span>
                </div>

            </li>
        </ul>
    </div>
</template>
<script>

    export default {
        data() {
            return {}
        },
        methods: {
            selectSession(id) {
                this.$store.dispatch('SelectSession', id);
            },
            lastMessage(session) {
                let messages = session.messages;
                if (messages && messages.length) {
                    let lastMessage = messages[messages.length - 1];
                    if (lastMessage.cType === 1) {
                        return lastMessage.content;
                    }
                }
                return ''
            }
        },
        computed: {
            sessions() {
                return this.$store.state.chat.sessions;
            },
            currentSession() {
                return this.$store.state.chat.currentSession;
            },
            currentId() {
                let currentSession = this.currentSession;
                console.log('currentSession=>', currentSession);
                return this.currentSession.id;
            }
        }
    };
</script>


<style scoped lang="less">
    .session-list {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        ul {
            padding: 0;
            margin: 0;
        }

        li {
            padding: 12px 10px;
            cursor: pointer;
            transition: background-color .1s;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            &:hover {
                background-color: rgba(255, 255, 255, 0.03);
            }
            &.active {
                background-color: rgba(186, 186, 186, 0.33);
                border-left: solid 5px green;
            }

        }
        .avatar {
            display: block;
            height: 40px;
            width: 40px;
            border-radius: 100%;
        }
        .avatar {

        }

        .chat-info {
            display: flex;
            display: -webkit-flex;
            flex: 1;
            flex-direction: column;
            padding-left: 10px;
        }

        .name-and-time {
            flex: 1;
            display: flex;
            display: -webkit-flex;
            -webkit-flex: 1;
            padding-bottom: 5px;
        }

        .name {
            vertical-align: middle;
            display: inline-block;
            margin-right: 10px;
            color: #333;
            font-weight: 600;
        }

        .last-message {
            display: block;
            color: #666;
            font-weight: 400;
            font-size: 15px;
        }
    }
</style>
