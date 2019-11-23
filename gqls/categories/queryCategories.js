import gql from "graphql-tag";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";

const QUERY_CATEGORIES = gql`
  query queryCategories($limit: Int!, $offset: Int!) {
    category(limit: $limit, offset: $offset, order_by: { id: desc }) {
      id
      name
    }
    category_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const QUERY_CATEGORIES_ALL = gql`
  query queryCategoriesAll {
    category(order_by: { id: desc }) {
      id
      name
      products {
        id
        name
        id_category
        price
      }
    }
  }
`;

export default QUERY_CATEGORIES;

export const defaultValues = {
  category: [],
  category_aggregate: { aggregate: { count: 0 } }
};

export const queryCategories = () => {
  const { query } = useRouter();
  const page = parseInt(query.page) || 1;

  const variables = {
    limit: 10,
    offset: (page - 1) * 10
  };

  const {
    loading,
    data: {
      category,
      category_aggregate: {
        aggregate: { count }
      }
    } = defaultValues
  } = useQuery(QUERY_CATEGORIES, {
    variables,
    fetchPolicy: "cache-and-network"
  });

  return {
    page,
    loading,
    variables,
    data: category,
    total: count
  };
};

export const queryCategoriesAll = () => {
  const { loading, data: { category } = { category: [] } } = useQuery(
    QUERY_CATEGORIES_ALL
  );

  return {
    loading,
    data: category
  };
};
