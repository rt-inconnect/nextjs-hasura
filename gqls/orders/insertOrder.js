import gql from "graphql-tag";

export default gql`
  mutation insertOrder(
    $id_client: Int!
    $order_details: [order_details_insert_input!]!
  ) {
    insert_order(
      objects: {
        id_client: $id_client
        order_details: { data: $order_details }
      }
    ) {
      affected_rows
    }
  }
`;
