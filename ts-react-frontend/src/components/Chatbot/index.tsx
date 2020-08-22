import React, { Component } from 'react';
import Button from './SendButton';
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
        chatLog: [new ChatElement('Test 1 Long Line', 0), new ChatElement('Test 2', 1)]
    }

    onSendMessage() {
        console.log(this.state.message);
        this.setState({
            message: '',
            chatLog: [...this.state.chatLog, new ChatElement(this.state.message, 0)]
        });
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
                <div className="chatbot-header">
                    <span className="name">{this.props.name}</span>
                </div>
                <div className="chatbot-dialog">
                    <div className="dialog-list">
                        {this.state.chatLog.map<JSX.Element>((e, key) => e.render(key))}
                    </div>

                </div>
                <form className="chatbot-input" onSubmit={this.onSubmit}>
                    <input type="text" placeholder="대화를 입력해 주세요..." onChange={this.onMessageChanged} value={this.state.message} />
                    <div className="button-container" onClick={this.onSendMessage}><Button text="전송" /></div>
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