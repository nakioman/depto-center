import React from 'react';

const SuccessNotification = ({ message, closable }) => (
  <div className="alert alert-success" role="alert">
    <div className="container">
      <div className="alert-icon">
        <i className="now-ui-icons ui-2_like"></i>
      </div>
      {message}
      {closable &&
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </span>
        </button>
      }
    </div>
  </div>
);

export default SuccessNotification;
