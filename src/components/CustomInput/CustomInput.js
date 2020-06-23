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
        return (
            <input data-check={this.props.dataCheck} style={this.props.style}
                   ref={this.textInput} type="text"/>

        )

    };
}

export default CustomInput;

