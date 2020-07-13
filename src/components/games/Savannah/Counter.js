import React from "react";
import {startCounterValue, unitOffset} from "./const";

class Counter extends React.Component {
    state = {
        counterValue: startCounterValue,
    }

    counterUpdate = () => {
        setInterval(() => this.setState({
            counterValue: startCounterValue - unitOffset,
        }), 1000)
    }

    render = () => {
        return (
            <div className="counter_wrapper">
                <span className="counter">{this.state.counterValue}</span>
            </div>
        )
    }
}

export default Counter;
