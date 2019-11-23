import gql from "graphql-tag";

export default gql`
  mutation deleteCategory($id: Int!) {
    delete_category(where: { id: { _eq: $id } }) {
      returning {
        id
        name
      }
    }
  }
`;
