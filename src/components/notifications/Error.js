import React from 'react';

const ErrorNotification = ({ message, closable }) => (
  <div className="alert alert-danger" role="alert">
    <div className="container">
      <div className="alert-icon">
        <i className="now-ui-icons objects_support-17"></i>
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

export default ErrorNotification;
