import Dictionary from '../../common/Dictionary';

export enum ChatRole {
    User, Chatbot, Manager
}

export interface IChat {
    role: ChatRole,
    text: string
}


//만약 IChat[]을 좀 더 잘 관리하기 위해서는 IChat[] 대신 Session을 구현하고 이것으로 대체할 필요가 있음
//예를 들어 Key값 리스트를 얻게 하기 위해서 어떻게 해야 하는가?

const sessions: Dictionary<IChat> = {};

export default class SessionManager {
    addChat(sessionId: string, chat: IChat): void {
        if(sessions[sessionId] === undefined) {
            sessions[sessionId] = new Array<IChat>();
        }
        sessions[sessionId].push(chat);
    }

    getSession(sessionId: string): IChat[] {
        return sessions[sessionId];
    }

    getSessions(): Dictionary<IChat> {
        return sessions;
    }
}