import React from "react";
import './ProgressBar.scss'

class ProgressBar extends React.Component{

    state = {
        progressBarWidth: this.props.width,
        counterWords: null,
        totalWords: null
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.width !== this.props.width) {
            this.setState( {
                progressBarWidth: nextProps.width
                }
            )
        }
    }

    render = () => {
        return (
            <div className="progress_block">
                <div className="progress_block__number">{this.props.startWords}</div>
                <div className="progress_block_background">
                    <div className="progress_block__bar" style={{width: this.state.progressBarWidth + '%'}}/>
                </div>
                <div className="progress_block__number">{this.props.totalWords}</div>
            </div>
        );
    }

}

export default ProgressBar;
