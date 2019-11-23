import gql from "graphql-tag";

export default gql`
  mutation insertProduct($id_category: Int!, $name: String!, $price: numeric) {
    insert_product(
      objects: { name: $name, id_category: $id_category, price: $price }
    ) {
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
