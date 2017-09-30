import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { apartmentQuery, deleteApartment, allApartmentsQuery } from '../../../services/queries/Apartment';
import Detail from './components/Detail';
import Error from '../components/Error';
import Loading from '../components/Loading';

class ApartmentDetail extends Component {
  state = {
    deleting: false,
  };
  delete = () => {
    this.setState({ deleting: true });
    const variables = {
      id: this.props.match.params.id
    };
    this.props.deleteApartment({
      refetchQueries: [{ query: allApartmentsQuery }],
      variables
    }).then(() => {
      this.props.history.replace('/');
    }).catch((error) => {
      console.error(error);
      this.setState({ deleting: false });
      this.props.notificationSystem.addNotification({
        title: (<i className="fa fa-exclamation-triangle"></i>),
        message: (
          <div>
            Hubo un error al eliminar el departamento. Intente nuevamente.
            </div>
        ),
        level: 'error',
        position: 'tr',
        autoDismiss: 5,
        dismissible: false,
      });
    })
  }
  edit = () => {
    this.props.history.push(`/apartment/edit/${this.props.match.params.id}`);
  }
  render() {
    const { data } = this.props;
    if (data.Apartment && !data.loading && !this.state.deleting) {
      return <Detail apartment={data.Apartment} deleteAction={this.delete} editAction={this.edit} />
    }
    if (!data.loading && !this.state.deleting) {
      return <Error />
    }
    return <Loading />
  }
}

export default graphql(deleteApartment, { name: 'deleteApartment' })(graphql(apartmentQuery,
  { options: ({ match }) => ({ variables: { id: match.params.id } }) })(ApartmentDetail));
