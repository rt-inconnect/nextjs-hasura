import gql from "graphql-tag";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";

const QUERY_CLIENTS = gql`
  query queryClients($limit: Int!, $offset: Int!) {
    client(limit: $limit, offset: $offset, order_by: { id: desc }) {
      id
      name
    }
    client_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const QUERY_CLIENTS_ALL = gql`
  query queryClientsAll {
    client(order_by: { id: desc }) {
      id
      name
    }
  }
`;

export default QUERY_CLIENTS;

export const defaultValues = {
  client: [],
  client_aggregate: { aggregate: { count: 0 } }
};

export const queryClients = () => {
  const { query } = useRouter();
  const page = parseInt(query.page) || 1;

  const variables = {
    limit: 10,
    offset: (page - 1) * 10
  };

  const {
    loading,
    data: {
      client,
      client_aggregate: {
        aggregate: { count }
      }
    } = defaultValues
  } = useQuery(QUERY_CLIENTS, {
    variables,
    fetchPolicy: "cache-and-network"
  });

  return {
    page,
    loading,
    variables,
    data: client,
    total: count
  };
};

export const queryClientsAll = () => {
  const { loading, data: { client } = { client: [] } } = useQuery(
    QUERY_CLIENTS_ALL
  );

  return {
    loading,
    data: client
  };
};
