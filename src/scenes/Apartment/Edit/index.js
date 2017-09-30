import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { updateApartment, allApartmentsQuery, apartmentQuery } from '../../../services/queries/Apartment';

import ApartmentForm from '../components/Form';
import Error from '../components/Error';
import Loading from '../components/Loading';

class EditAparment extends Component {
  state = {
    saving: false,
  };

  submitForm = (form) => {
    this.setState({ saving: true });
    const variables = form;
    variables.id = this.props.match.params.id;
    this.props.updateApartment({
      refetchQueries: [
        { query: allApartmentsQuery },
        { query: apartmentQuery, variables: { id: this.props.match.params.id } }
      ],
      variables,
    }).then(response => {
      this.props.history.replace(`/apartment/${this.props.match.params.id}`);
    }).catch(error => {
      this.setState({ saving: false });
      console.error(error);
      this.props.notificationSystem.addNotification({
        title: (<i className="fa fa-exclamation-triangle"></i>),
        message: (
          <div>
            Hubo un error al actualizar el departamento. Intente nuevamente.
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
    const { data } = this.props;
    if (data.Apartment && !data.loading && !this.state.saving) {
      return (
        <div className="card card-no-shadow" style={{ overflow: 'visible' }}>
          <div className="card-body">
            <h6 className="card-title">Editar departamento</h6>
            <ApartmentForm submitForm={this.submitForm} apartment={data.Apartment} />
          </div>
        </div>
      );
    }
    if (!data.loading && !this.state.saving) {
      return <Error />
    }
    return <Loading />
  }
};

export default graphql(updateApartment, { name: 'updateApartment' })(graphql(apartmentQuery,
  { options: ({ match }) => ({ variables: { id: match.params.id } }) })(EditAparment));
