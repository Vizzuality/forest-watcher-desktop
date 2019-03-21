import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Confirm extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtext: PropTypes.string,
    onAccept: PropTypes.func,
    onCancel: PropTypes.func
  };

  onAccept = (e) => {
    e.preventDefault();
    const { onAccept } = this.props;
    if (onAccept) {
      onAccept();
    }
  }

  onCancel = (e) => {
    e.preventDefault();
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  render() {
    const { title, subtext } = this.props;
    return (
      <div className="c-walkthrough">
        <div className="walkthrough-content">
          <h2 className="text -small-title -green">{title}</h2>
          <p className="text">{subtext}</p>
          <div className="walkthrough-action">
            <button className="c-button -small -right u-margin-right-tiny" onClick={this.onCancel}>cancel</button>
            <button className="c-button -small" onClick={this.onAccept}>ok</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
