import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        {/* <span><a href="https://www.vobo.ai/terms-of-service.html">Terms</a> | <a href="https://www.vobo.ai/privacy-policy.html">Privacy</a>  </span>
        <span className="ml-auto">&copy;  {(new Date().getFullYear())}, <a href="http://www.vobo.ai/">Vobo.ai, All Rights Reserved. </a></span> */}
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
