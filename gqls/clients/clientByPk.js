import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const CLIENT_BY_PK = gql`
  query clientByPk($id: Int!) {
    client_by_pk(id: $id) {
      id
      name
    }
  }
`;

export default CLIENT_BY_PK;

export const defaultValues = {
  client_by_pk: {}
};

export const clientByPk = (id) => {
  const { loading, data: { client_by_pk } = defaultValues } = useQuery(
    CLIENT_BY_PK,
    {
      variables: { id }
    }
  );

  return {
    loading,
    record: client_by_pk
  };
};
