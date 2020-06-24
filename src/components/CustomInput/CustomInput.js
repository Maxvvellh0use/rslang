import React from "react";
import './CustomInput.scss'

class CustomInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.focusInput = this.focusInput.bind(this);
    }

    focusInput = () => {
        this.textInput.current.focus();
    }

    render = () => {
        console.log(this.props.onChange)
        return (
            <div className="letter_check">
                <span className={this.props.spanClass}>{this.props.spanValue}</span>
            <input className={this.props.class} data-check={this.props.dataCheck}
                   style={this.props.style}
                   onChange={this.props.onChange}
                   value={this.props.value}
                   ref={this.textInput} type="text"/>
            </div>

        )

    };
}

export default CustomInput;

