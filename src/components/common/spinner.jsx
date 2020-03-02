import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Spinner = ({ className, marginTop }) => (
  <div className={className}>
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

Spinner.propTypes = {
  marginTop: PropTypes.bool
};

export default styled(Spinner)`
  margin-top: ${({ marginTop }) => marginTop && '100px'};
  text-align: center;
`;
