import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';

import { updateApartment, allApartmentsQuery, apartmentQuery } from '../../../services/queries/Apartment';
import { waitApolloClientRefetch } from '../../../services/helpers';
import ApartmentForm from '../components/Form';
import Error from '../components/Error';
import Loading from '../components/Loading';
import ErrorNotification from '../../../components/notifications/Error';

class EditAparment extends Component {
  state = {
    saving: false,
    showError: false,
  };
  componentDidMount() {
    this.props.setTitle('Editar departamento');
  }
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
      waitApolloClientRefetch(this.props.client).then(() => {
        this.props.history.replace(`/apartment/${this.props.match.params.id}?added`);
      });
    }).catch(error => {
      this.setState({ saving: false, showError: true });
      console.error(error);
      setTimeout(() => {
        this.setState({ showError: false });
      }, 3000);
    })
  }
  render() {
    const { data } = this.props;
    if (data.Apartment && !data.loading && !this.state.saving) {
      return (
        <div>
          {this.state.showError &&
            <ErrorNotification message="Hubo un error al guardar el departamento. Intente nuevamente." />
          }
          <div className="card card-no-shadow" style={{ overflow: 'visible' }}>
            <div className="card-body">
              <ApartmentForm submitForm={this.submitForm} apartment={data.Apartment} />
            </div>
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

export default withApollo(graphql(updateApartment, { name: 'updateApartment' })(graphql(apartmentQuery,
  { options: ({ match }) => ({ variables: { id: match.params.id } }) })(EditAparment)));
