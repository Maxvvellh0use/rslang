import React from "react";
import {startCounterValue, unitOffset} from "./const";
import Savannah from "./Savannah";

class Counter extends React.Component {
    state = {
        counterValue: startCounterValue,
    }

    componentDidMount = () => {
        this.counterUpdate();
    }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevState.counterValue === 0) {
    //         clearInterval(this.interval);
    //
    //         this.props.hideStartScreen()
    //     }
    // }

    counterUpdate = () => {
        setInterval(() => this.setState({
            counterValue: this.state.counterValue - unitOffset,
        }), 1000)
    }

    render = () => {
        if (this.state.counterValue < 0) {
            return <Savannah />
        }
        return (
            <div className="counter_wrapper">
                <span className="counter">{this.state.counterValue}</span>
            </div>
        )
    }
}

export default Counter;
