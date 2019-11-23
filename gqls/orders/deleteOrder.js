import gql from "graphql-tag";

export default gql`
  mutation deleteOrder($id: Int!) {
    delete_order(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
