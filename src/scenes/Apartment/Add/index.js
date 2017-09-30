import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { createApartment, allApartmentsQuery } from '../../../services/queries/Apartment';
import { userQuery } from '../../../services/queries/User';
import ApartmentForm from '../components/Form';
import Loading from '../components/Loading';
import ErrorNotification from '../../../components/notifications/Error';

class AddAparment extends Component {
  state = {
    saving: false,
    showError: false,
  };
  componentDidMount() {
    this.props.setTitle('Agregar departamento');
  }
  submitForm = (form) => {
    this.setState({ saving: true });
    const variables = form;
    variables.userId = this.props.data.user.id;
    this.props.createApartment({
      refetchQueries: [{ query: allApartmentsQuery }],
      variables,
    }).then(response => {
      const data = response.data.createApartment;
      this.props.history.replace(`/apartment/${data.id}?added`);
    }).catch(error => {
      this.setState({ saving: false, showError: true });
      console.error(error);
      setTimeout(() => {
        this.setState({ showError: false });
      }, 3000);
    })
  }
  render() {
    if (!this.state.saving) {
      return (
        <div>
          {this.state.showError &&
            <ErrorNotification message="Hubo un error al guardar el departamento. Intente nuevamente." />
          }
          <div className="card card-no-shadow" style={{ overflow: 'visible' }}>
            <div className="card-body">
              <ApartmentForm submitForm={this.submitForm} />
            </div>
          </div>
        </div>
      );
    }
    return <Loading />
  }
};

export default graphql(createApartment, { name: 'createApartment' })(graphql(userQuery)(AddAparment));
