import gql from "graphql-tag";

export default gql`
  mutation updateClient($id: Int!, $name: String!) {
    update_client(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;
