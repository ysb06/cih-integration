import React, { Component } from 'react';
import Button from './SendButton';
import './Chatbot.css';

const SERVER_CHATBOT_URL = 'https://csproject-1b085.uc.r.appspot.com/chat';
const DEFAULT_LANGUAGE_CODE = 'ko-KR';


interface IChatbotRequest { //Chatbot 서버 송신 인터페이스
    session?: string,
    languageCode?: string,
    query: string
}

interface IChatbotResponse { //Chatbot 서버 수신 인터페이스
    languageCode?: string,
    responseText: string
}

interface IChatbotProps {
    name: string
}

interface IChatbotState {
    userInput: string,
    chatLog: ChatElement[],
    context: {
        session?: string,
        languageCode: string
    },
    isSuggestMode: Boolean
}

class Chatbot extends Component<IChatbotProps, IChatbotState> {
    constructor(props: IChatbotProps) {
        super(props);
        this.onMessageChanged = this.onMessageChanged.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    state: IChatbotState = {
        userInput: '',
        chatLog: [],
        context: {
            languageCode: DEFAULT_LANGUAGE_CODE
        },
        isSuggestMode: false
    }

    componentDidMount() {
        this.setState({
            context: {
                session: this.createSession(),
                languageCode: DEFAULT_LANGUAGE_CODE
            }
        })
    }

    async onSendMessage() {
        let query = this.state.userInput;   //사용자가 입력을 마치고 전송 요청
        if(!query) {
            console.log('Empty Query');
            return;
        }

        this.setState({
            userInput: '',      //입력 창 비움
            chatLog: [...this.state.chatLog, new ChatElement(query, 0)] //입력을 채팅 창에 업데이트
        });

        if(query === '기능 제안') {
            setTimeout(() => {
                this.setState({
                    chatLog: [...this.state.chatLog, new ChatElement('네, 제안 사항을 입력해 주세요.', 1)],
                    isSuggestMode: true
                });
            }, 250);
            return;
        }

        let reqBody: IChatbotRequest = {
            session: this.state.context.session,
            languageCode: this.state.context.languageCode,
            query: query
        }

        if(this.state.isSuggestMode) {
            let res: Response = await fetch(SERVER_CHATBOT_URL + '/suggestion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            });
            if(res.ok) {
                this.setState({
                    chatLog: [...this.state.chatLog, new ChatElement('네, 제안 사항을 접수했습니다.', 1)],
                    isSuggestMode: false
                });
            } else {
                this.setState({
                    chatLog: [...this.state.chatLog, new ChatElement('죄송해요. 서버에서 제안 사항을 처리하지 못했습니다.', 1)],
                    isSuggestMode: false
                });
            }
            return;
        }
        try {
            let res: Response = await fetch(SERVER_CHATBOT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            });

            let result: IChatbotResponse = await res.json();
            this.onMessageReceived(result);
        } catch (e) {
            console.log('Fetch Failed --> ');
            console.error(e);
        }
    }

    onMessageReceived(result: IChatbotResponse) {
        console.log(result);
        //*
        this.setState({
            chatLog: [...this.state.chatLog, new ChatElement(result.responseText, 1)],
            context: {
                session: this.state.context.session,
                languageCode: result.languageCode ? result.languageCode : DEFAULT_LANGUAGE_CODE
            }
        });
        // */
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.onSendMessage();
    }

    onMessageChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ userInput: event.target.value });
    }

    render() {
        return (
            <div className="chatbot-app">
                <div className="chatbot-header">
                    <span className="name">{this.props.name} ({this.state.context.session})</span>
                </div>
                <div className="chatbot-dialog">
                    <div className="dialog-list">
                        {this.state.chatLog.map<JSX.Element>((e, key) => e.render(key))}
                    </div>

                </div>
                <form className="chatbot-input" onSubmit={this.onSubmit}>
                    <input type="text" placeholder="대화를 입력해 주세요..." onChange={this.onMessageChanged} value={this.state.userInput} />
                    <div className="button-container" onClick={this.onSendMessage}><Button text="전송" /></div>
                </form>
            </div>
        );
    }

    createSession(): string {
        let dateNow: Date = new Date();
        let code: Number = Math.floor(Math.random() * 4096);
        let result = 
            dateNow.getFullYear().toString() + dateNow.getMonth().toString() + dateNow.getDate().toString() + '-' + 
            dateNow.getHours().toString() + dateNow.getMinutes().toString() + dateNow.getSeconds().toString() + '-' + 
            code.toString(16);
        return result;
    }
}

class ChatElement {
    message: string;
    speaker: number;
    constructor(message: string, speaker: number) {
        this.message = message;
        this.speaker = speaker;
    }

    render(key: number): JSX.Element {
        let type: string = 'user-' + this.speaker;

        return (
            <div className="dialog-element" key={key}>
                <div className={type}>
                    {this.message}
                </div>
            </div>
        );
    }
}

export default Chatbot;