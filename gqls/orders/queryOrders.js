import gql from "graphql-tag";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";

const QUERY_ORDERS = gql`
  query queryOrders($limit: Int!, $offset: Int!) {
    order(limit: $limit, offset: $offset, order_by: { id: desc }) {
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
    order_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export default QUERY_ORDERS;

export const defaultValues = {
  order: [],
  order_aggregate: { aggregate: { count: 0 } }
};

export const queryOrders = () => {
  const { query } = useRouter();
  const page = parseInt(query.page) || 1;

  const variables = {
    limit: 10,
    offset: (page - 1) * 10
  };

  const {
    loading,
    data: {
      order,
      order_aggregate: {
        aggregate: { count }
      }
    } = defaultValues
  } = useQuery(QUERY_ORDERS, {
    variables,
    fetchPolicy: "cache-and-network"
  });

  return {
    page,
    loading,
    variables,
    data: order,
    total: count
  };
};
