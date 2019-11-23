import gql from "graphql-tag";

export default gql`
  mutation deleteClient($id: Int!) {
    delete_client(where: { id: { _eq: $id } }) {
      returning {
        id
        name
      }
    }
  }
`;
