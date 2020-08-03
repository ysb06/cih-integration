import React, { Component } from "react";
import './ButtonTypeA.css'

interface IButtonTypeAProps {
    text: string
}

class ButtonTypeA extends Component<IButtonTypeAProps> {
    render() {
        return (
            <div className="button-type-a">
                <span>{this.props.text}</span>
            </div>
        );
    }
}

export default ButtonTypeA;