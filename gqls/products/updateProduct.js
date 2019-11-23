import gql from "graphql-tag";

export default gql`
  mutation updateProduct(
    $id: Int!
    $id_category: Int!
    $name: String!
    $price: numeric
  ) {
    update_product(
      where: { id: { _eq: $id } }
      _set: { id_category: $id_category, name: $name, price: $price }
    ) {
      returning {
        id
        name
        price
        id_category
        category {
          id
          name
        }
      }
    }
  }
`;
