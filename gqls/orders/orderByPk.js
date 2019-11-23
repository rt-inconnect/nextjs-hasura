import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const ORDER_BY_PK = gql`
  query orderByPk($id: Int!) {
    order_by_pk(id: $id) {
      id
      id_client
      created_at
      updated_at
      client {
        id
        name
      }
      order_details {
        id
        id_order
        id_product
        amount
        price
        total
        created_at
        updated_at
      }
    }
  }
`;

export default ORDER_BY_PK;

export const defaultValues = {
  order_by_pk: {}
};

export const orderByPk = (id) => {
  const { loading, data: { order_by_pk } = defaultValues } = useQuery(
    ORDER_BY_PK,
    {
      variables: { id }
    }
  );

  return {
    loading,
    record: order_by_pk
  };
};
