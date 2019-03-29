import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Walkthrough extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
    steps: PropTypes.array,
    onAccept: PropTypes.func
  };

  state = {
    currentStep: 0
  }

  setCurrentStep = (e, currentStep) => {
    e.preventDefault();
    this.setState({ currentStep });
  }

  onAccept = (e) => {
    e.preventDefault();
    const { onAccept } = this.props;
    if (onAccept) onAccept();
  }

  render() {
    const { title, intro, steps } = this.props;
    const { currentStep } = this.state;
    const content = steps[currentStep].content;
    const childContent = steps[currentStep].childContent;
    return (
      <div className="c-modal-content">
        <div className="modal-content-inner">
          <h2 className="modal-content-header u-padding-bottom-small u-margin-bottom text -small-title -green">{title}</h2>
          <p className="text u-padding-bottom">{intro}</p>
          <ol className="modal-content-steps-index">
            {
              steps.map((step, index) => (
                <li
                  key={`step-index-${index}`}
                  className={cx(['modal-content-steps-index-item', 'u-margin-bottom', 'text', '-question-number', { '-active': index === currentStep }])}
                >
                  <button className="u-padding-bottom-small" onClick={(e) => this.setCurrentStep(e, index)}>
                    {`0${index + 1}.`}
                  </button>
                </li>
              ))
            }
          </ol>
          <ul className="modal-content-steps-content">
            <li className="modal-content-steps-content-item text  u-padding-bottom-small">
              {content}
            </li>
            {childContent &&
              <ul>
                <li className="text  u-padding-bottom-small">
                  {childContent}
                </li>
              </ul>
            }
          </ul>
          <div className="modal-content-action u-margin-top-large">
            <button className="c-button u-text-center" onClick={this.onAccept}>ok</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Walkthrough;
