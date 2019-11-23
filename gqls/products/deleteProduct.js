import gql from "graphql-tag";

export default gql`
  mutation deleteProduct($id: Int!) {
    delete_product(where: { id: { _eq: $id } }) {
      returning {
        id
        name
        id_category
        category {
          id
          name
        }
      }
    }
  }
`;
