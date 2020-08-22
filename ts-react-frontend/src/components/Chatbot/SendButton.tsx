import React, { Component } from "react";
import './SendButton.css'

interface IButtonTypeAProps {
    text: string
}

class ButtonTypeA extends Component<IButtonTypeAProps> {
    render() {
        return (
            <div className="send-button">
                <span>{this.props.text}</span>
            </div>
        );
    }
}

export default ButtonTypeA;