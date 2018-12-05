/**
 * @Author :tuonina
 * @Date : 2018/12/5
 * @Version: 1.0
 * @Last Modified by :
 * @Last Modified Date: 2018/12/5
 *
 **/
import {ChatMessage, ChatSession, CType, UserInfo} from "./ChatMessage";

export function AddTestData({dispatch}) {

    let userInfo = new UserInfo();
    userInfo.id = '3';
    userInfo.name = '对面那个很二很二的人';
    userInfo.avatar = 'http://img0.imgtn.bdimg.com/it/u=3608811462,3973853404&fm=26&gp=0.jpg';
    dispatch('SetUserInfo', userInfo);


    let sessionA = new ChatSession();
    sessionA.id = '1';
    sessionA.avatar = 'http://pic27.nipic.com/20130227/8786105_153051386191_2.jpg';
    sessionA.name = '某个很二很二的人';

    dispatch('AddSession', sessionA);

    setTimeout(() => {
        let sessionB = new ChatSession();
        sessionB.id = '2';
        sessionB.avatar = 'http://p2.gexing.com/G1/M00/0E/D1/rBACFFJFuK6BmUmeAAFZKHPfEnc600.jpg';
        sessionB.name = '那个很二很二的人';
        dispatch('AddSession', sessionB);
    }, 2000);

}


export function ReplyToMe(session,content) {
    let message = new ChatMessage();
    message.senderId = session.id;
    message.content = content;
    message.sender = session.name;
    message.cType = CType.IMG;
    message.url='http://p2.gexing.com/G1/M00/0E/D1/rBACFFJFuK6BmUmeAAFZKHPfEnc600.jpg';
    return message;
}
