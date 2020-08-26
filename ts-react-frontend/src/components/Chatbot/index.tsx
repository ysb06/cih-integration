import React, { Component } from 'react';
import Button from './SendButton';
import './Chatbot.css';

const SERVER_CHATBOT_URL = '//localhost:3001/chat';
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
    }
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
        }
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

        this.setState({
            userInput: '',      //입력 창 비움
            chatLog: [...this.state.chatLog, new ChatElement(query, 0)] //입력을 채팅 창에 업데이트
        });

        let reqBody: IChatbotRequest = {
            session: this.state.context.session,
            languageCode: this.state.context.languageCode,
            query: query
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
                    <span className="name">{this.props.name}</span>
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