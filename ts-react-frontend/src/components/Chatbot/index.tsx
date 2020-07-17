import React, { Component } from "react";
import './Chatbot.css';

class Chatbot extends Component {
    render() {
        return (
            <div className="chatbot">
                <div className="chatbot-title"></div>
                <div className="chatbot-dialog"></div>
                <div className="chatbot-user-input">
                    <input type="text" placeholder="대화를 입력해 주세요..."/>
                </div>
            </div>
        );
    }
}

export default Chatbot;