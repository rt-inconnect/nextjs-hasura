import gql from "graphql-tag";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";

const QUERY_PRODUCTS = gql`
  query queryProducts($limit: Int!, $offset: Int!) {
    product(limit: $limit, offset: $offset, order_by: { id: desc }) {
      id
      name
      price
      id_category
      category {
        id
        name
      }
    }
    product_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const QUERY_PRODUCTS_ALL = gql`
  query queryProductsAll {
    product(order_by: { id: desc }) {
      id
      name
    }
  }
`;

export default QUERY_PRODUCTS;

export const defaultValues = {
  product: [],
  product_aggregate: { aggregate: { count: 0 } }
};

export const queryProducts = () => {
  const { query } = useRouter();
  const page = parseInt(query.page) || 1;

  const variables = {
    limit: 10,
    offset: (page - 1) * 10
  };

  const {
    loading,
    data: {
      product,
      product_aggregate: {
        aggregate: { count }
      }
    } = defaultValues
  } = useQuery(QUERY_PRODUCTS, {
    variables,
    fetchPolicy: "cache-and-network"
  });

  return {
    page,
    loading,
    variables,
    data: product,
    total: count
  };
};

export const queryProductsAll = () => {
  const { loading, data: { product } = { product: [] } } = useQuery(
    QUERY_PRODUCTS_ALL
  );

  return {
    loading,
    data: product
  };
};
