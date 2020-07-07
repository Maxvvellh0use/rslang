import React from "react";
import './CustomInput.scss'

class CustomInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.focusInput = this.focusInput.bind(this);
        this.blurInput = this.blurInput.bind(this);
    }

    focusInput = () => {
        console.log('focus')
        this.textInput.current.focus();
    }

    blurInput = () => {
        this.textInput.current.blur();
    }

    render = () => {
        return (
            <section className="letter_check">
            <span className="letter_check__block">
                <span className={this.props.spanClass} onClick={this.props.onFocus}>{this.props.spanValue}</span>
            </span>
                <input className={this.props.class} data-check={this.props.dataCheck}
                       style={this.props.style}
                       maxLength={this.props.maxLength}
                       onChange={this.props.onChange}
                       onFocus={this.props.onFocus}
                       value={this.props.value}
                       ref={this.textInput} type="text"
                       required />
            </section>
        )

    };
}

export default CustomInput;

