import React from 'react';
import cx from 'clsx';
import './DictionarySound.scss';
import soundCheck from '../../assets/sounds/sound_check.mp3';

const DEFAULT_CLASS = 'dictionary__sound';
export default class DictionaryWord extends React.Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    activeClassName: `${DEFAULT_CLASS}_active`,
    audioPath: soundCheck,
  };

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  };

  playSound = () => {
    if (this.state.isActive) return;
    const { audioPath } = this.props;
    this.setState({ isActive: true });
    const audio = new Audio(audioPath);
    audio.onended = () => this.setState({ isActive: false });
    audio.onerror = () => {this.setState({ isActive: false })};
    audio.load();
    audio.play();
  }

  render() {
    const {
      className,
      activeClassName,
      audioPath,
      ...attributes
    } = this.props;


    return (
      <div
        {...attributes}
        className={cx(className, {
          [activeClassName]: this.state.isActive,
        })}
        onClick={this.playSound}
      ></div>
    )
  }
}
