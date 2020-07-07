import React from 'react';
import './DictionaryToolPanel.scss';
import cx from 'clsx';


export default class DictionaryToolPanel extends React.Component {
  static defaultProps = {
    selectedClassName: 'dictionary__tool-panel__tool_selected',
  };

  render() {
    const { handleToolPanelClick,
      selectedClassName,
      wordSettings,
    } = this.props;
    return (
      <div className='dictionary__tool-panel'>
        <div
          className={cx('dictionary__tool-panel__tool dictionary__tool-panel__tool_subtitle', {
            [selectedClassName]: wordSettings.showTranscription,
          })}
          id='tool-panel-subtitle'
          onClick={(event) => handleToolPanelClick(event)}>
        </div>
        <div
          className={cx('dictionary__tool-panel__tool dictionary__tool-panel__tool_image', {
            [selectedClassName]: wordSettings.showImage,
          })}
          id='tool-panel-image'
          onClick={(event) => handleToolPanelClick(event)}></div>
        <div
          className={cx('dictionary__tool-panel__tool dictionary__tool-panel__tool_text', {
            [selectedClassName]: wordSettings.showExampleText,
          })}
          id='tool-panel-text'
          onClick={(event) => handleToolPanelClick(event)}></div>
      </div>
    );
  }
}