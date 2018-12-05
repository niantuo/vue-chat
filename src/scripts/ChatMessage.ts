/**
 * 消息类型
 */
export const CType = {
    TEXT: 0,
    IMG: 1,
    FILE: 2
};

/**
 * 消息状态
 * @property CState.SENDING 消息发送中
 * @property CState.FAILED 消息发送失败
 * @property CState.SEND 消息发送成功
 */
export const CState = {
    SENDING: 1,
    FAILED: -1,
    SEND: 2
};


/**
 * 聊天记录模板
 */
export class ChatMessage {
    id: string;
    date: string = Date();
    content: string;
    cType: number = 0;//0:文字，1：图片，2：文档
    url: string;
    senderId: string;
    sender: string;
    state: number = CState.SENDING;

    // 构造
    constructor() {

    }

}

/**
 * session数据
 */
export class ChatSession {
    messages: Array<ChatMessage> = [];
    id: string;
    avatar: string;
    name: string;
    current: number = 1;
    pageSize: number = 15;

    constructor() {

    }

    addMessage(message: ChatMessage) {
        this.messages.push(message)
    };

    removeMessage(message: ChatMessage) {
        let index = this.messages.indexOf(message);
        this.messages = this.messages.splice(index, 1);
    }
}


export class UserInfo {
    id: string;
    name: string;
    avatar: string;

    constructor() {
    }
}

