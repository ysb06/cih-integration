export enum ChatRole {
    User, Chatbot, Manager
}

export interface IChat {
    role: ChatRole,
    text: string
}

interface SessionList<T> {
    [id: string]: T[]
}
//만약 IChat[]을 좀 더 잘 관리하기 위해서는 Session을 구현하고 이것으로 대체할 필요가 있음
//예를 들어 Key값 리스트를 얻게 하기 위해서 어떻게 해야 하는가?

const data: SessionList<IChat> = {};

export default class SessionManager {
    addChat(sessionId: string, chat: IChat): void {
        if(data[sessionId] === undefined) {
            data[sessionId] = new Array<IChat>();
        }
        data[sessionId].push(chat);
    }

    getSession(sessionId: string): IChat[] {
        console.log(data[sessionId]);
        return data[sessionId];
    }
}