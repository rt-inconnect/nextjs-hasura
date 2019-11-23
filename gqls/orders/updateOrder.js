import gql from "graphql-tag";

export default gql`
  mutation updateOrder(
    $id: Int!
    $id_client: Int!
    $order_details: [order_details_insert_input!]!
  ) {
    update_order(where: { id: { _eq: $id } }, _set: { id_client: $id_client }) {
      affected_rows
    }
    delete_order_details(where: { id_order: { _eq: $id } }) {
      affected_rows
    }
    insert_order_details(objects: $order_details) {
      affected_rows
    }
  }
`;
