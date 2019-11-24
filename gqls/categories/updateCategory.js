import gql from "graphql-tag";

export default gql`
  mutation updateCategory($id: Int!, $name: String!, $color: String!) {
    update_category(
      where: { id: { _eq: $id } }
      _set: { name: $name, color: $color }
    ) {
      returning {
        id
        name
      }
    }
  }
`;
