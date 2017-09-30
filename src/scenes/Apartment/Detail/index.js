import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { apartmentQuery, deleteApartment, allApartmentsQuery } from '../../../services/queries/Apartment';
import Detail from './components/Detail';
import Error from '../components/Error';
import Loading from '../components/Loading';
import SuccessNotification from '../../../components/notifications/Success';
import queryString from 'query-string';

class ApartmentDetail extends Component {
  state = {
    deleting: false,
    showSuccess: false
  };
  componentDidMount() {
    this.props.setTitle('Departamento');
    const parsed = queryString.parse(this.props.location.search);
    if (parsed.added !== undefined) {
      this.setState({ showSuccess: true });
      this.props.history.replace(this.props.match.url);
      setTimeout(() => {
        this.setState({ showSuccess: false });
      }, 3000);
    }
  }
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
      return (
        <div>
          {this.state.showSuccess &&
            <SuccessNotification message="El departamento fue guardado satisfactoriamente." />
          }
          <Detail apartment={data.Apartment} deleteAction={this.delete} editAction={this.edit} />
        </div>
      );
    }
    if (!data.loading && !this.state.deleting) {
      return <Error />
    }
    return <Loading />
  }
}

export default graphql(deleteApartment, { name: 'deleteApartment' })(graphql(apartmentQuery,
  { options: ({ match }) => ({ variables: { id: match.params.id } }) })(ApartmentDetail));
