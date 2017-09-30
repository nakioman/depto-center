import { gql } from 'react-apollo';

export const createApartment = gql`
mutation($address: String!, $postalCode: String!, $state: String!, $userId: ID!) {
  createApartment(address: $address, postalCode: $postalCode, state: $state, userId: $userId) {
    address,
    id
  }
}
`;

export const allApartmentsQuery = gql `
query {
  allApartments {
    id,
    address
  }
}
`;
export const apartmentQuery = gql `
query($id: ID!) {
  Apartment(id: $id) {
    address,
    postalCode,
    state
  }
}
`;

export const deleteApartment = gql`
mutation($id: ID!) {
  deleteApartment(id: $id) {
    id
  }
}
`;

export const updateApartment = gql`
mutation($id: ID!, $address: String!, $postalCode: String!, $state: String!) {
  updateApartment(id: $id, address: $address, postalCode: $postalCode, state: $state) {
    id
  }
}
`;
