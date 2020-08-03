import React, { Component } from 'react';
import Button from '../ButtonTypeA';
import './Chatbot.css';

interface IChatbotProps {
    name: string
}

interface IChatbotState {
    message: string,
    chatLog: ChatElement[]
}

class Chatbot extends Component<IChatbotProps, IChatbotState> {
    constructor(props: IChatbotProps) {
        super(props);
        this.onMessageChanged = this.onMessageChanged.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    state: IChatbotState = {
        message: '',
        chatLog: [new ChatElement('Test 1', 0), new ChatElement('Test 2', 1)]
    }

    onSendMessage() {
        console.log(this.state.message);
        this.setState({ message: '' });
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.onSendMessage();
    }

    onMessageChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ message: event.target.value });
    }

    render() {
        return (
            <div className="chatbot-app">
                <div className="chatbot-title">
                    <span className="chatbot-name">{this.props.name}</span>
                </div>
                <div className="chatbot-dialog">
                    <div className="chatbot-dialog-content">
                        {this.state.chatLog.map<JSX.Element>(e => e.render())}
                    </div>
                </div>
                <form className="chatbot-user-input" onSubmit={this.onSubmit}>
                    <input type="text" placeholder="대화를 입력해 주세요..." onChange={this.onMessageChanged} value={this.state.message} />
                    <div className="button-send" onClick={this.onSendMessage}><Button text="전송" /></div>
                </form>
            </div>
        );
    }
}

class ChatElement {
    message: string;
    speaker: number;
    constructor(message: string, speaker: number) {
        this.message = message;
        this.speaker = speaker;
    }

    render(): JSX.Element {
        let type: string = 'chatbot-dialog-element-' + this.speaker;

        return (
            <div className={type}>
                {this.message}
            </div>
        );
    }
}

export default Chatbot;