import { gql } from 'react-apollo';

export const userQuery = gql`
query {
  user {
    id
  }
}
`;

export const createUser = gql`
mutation ($idToken: String!, $name: String!, $emailAddress: String!){
  createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress) {
    id
  }
}
`;
