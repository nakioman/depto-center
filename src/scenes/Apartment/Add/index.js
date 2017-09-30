import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { createApartment, allApartmentsQuery } from '../../../services/queries/Apartment';
import { userQuery } from '../../../services/queries/User';

import ApartmentForm from '../components/Form';
import Loading from '../components/Loading';

class AddAparment extends Component {
  state = {
    saving: false,
  };

  submitForm = (form) => {
    this.setState({ saving: true });
    const variables = form;
    variables.userId = this.props.data.user.id;
    this.props.createApartment({
      refetchQueries: [{ query: allApartmentsQuery }],
      variables,
    }).then(response => {
      const data = response.data.createApartment;
      this.props.history.replace(`/apartment/${data.id}`);
    }).catch(error => {
      this.setState({ saving: false });
      console.error(error);
      this.props.notificationSystem.addNotification({
        title: (<i className="fa fa-exclamation-triangle"></i>),
        message: (
          <div>
            Hubo un error al guardar el departamento. Intente nuevamente.
            </div>
        ),
        level: 'error',
        position: 'tr',
        autoDismiss: 5,
        dismissible: false,
      });
    })
  }
  render() {
    if (!this.state.saving) {
      return (
        <div className="card card-no-shadow" style={{ overflow: 'visible' }}>
          <div className="card-body">
            <h6 className="card-title">Agregar departamento</h6>
            <ApartmentForm submitForm={this.submitForm} />
          </div>
        </div>
      );
    }
    return <Loading />
  }
};

export default graphql(createApartment, { name: 'createApartment' })(graphql(userQuery)(AddAparment));
