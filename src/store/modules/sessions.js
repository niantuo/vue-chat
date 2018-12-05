/**
 * sessions.对话的相关信息。
 * @type {{state: {isInit: boolean, dict: Array, param: Array}, mutations: {SET_DICT(*, *): void, SET_PARAM(*, *): void}, actions: {initDict({commit?: *}): *, initParam({commit?: *, state: *}): *}}}
 */

export default {
    state: {
        // 会话列表
        sessions: [],
        currentSession: undefined,
        sessionIdMap: {},
        userInfo: {
            id: '',
            avatar: undefined,
            name: ''
        }
    },
    mutations: {
        ADD_MESSAGE({currentSession}, message) {
            if (currentSession) {
                if (!currentSession.messages) {
                    currentSession.messages = [];
                }
                currentSession.messages.push(message)
            } else {
                console.error('SEND_MESSAGE currentSession is null.')
            }
        },
        // 选择会话
        SELECT_SESSION(state, id) {
            let session = state.sessionIdMap[id];
            if (session) {
                state.currentSession = session;
            } else {
                console.error('SELECT_SESSION no select session=> ', id)
            }

        },
        ADD_SESSION(state, session) {
            if (session && session.id) {
                state.sessionIdMap[session.id] = session;
                state.sessions.push(session);
                state.currentSession = session;
            } else {
                console.error('ADD_SESSION no session id', session)
            }
        },
        SET_INFO(state, info) {
            state.userInfo = info;
        },

        REMOVE_SESSION(state, session) {
            if (session && session.id) {
                let session = state.sessionIdMap[session.id];
                if (session) {
                    let index = state.sessions.indexOf(session.id);
                    state.sessions.slice(index, 1);
                }
                state.sessionIdMap[session.id] = undefined;
            } else {
                console.error('REMOVE_SESSION no session id =>', session)
            }
        }

    },
    actions: {
        AddSession({commit}, message) {
            commit('ADD_SESSION', message)
        },
        SendMessage({commit}, message) {
            commit('ADD_MESSAGE', message)
        },
        SelectSession({commit}, id) {
            commit('SELECT_SESSION', id)
        },
        SetUserInfo({commit}, userInfo) {
            commit('SET_INFO', userInfo);
        }
    }
};
