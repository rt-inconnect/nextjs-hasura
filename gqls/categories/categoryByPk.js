import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const CATEGORY_BY_PK = gql`
  query categoryByPk($id: Int!) {
    category_by_pk(id: $id) {
      id
      name
    }
  }
`;

export default CATEGORY_BY_PK;

export const defaultValues = {
  category_by_pk: {}
};

export const categoryByPk = (id) => {
  const { loading, data: { category_by_pk } = defaultValues } = useQuery(
    CATEGORY_BY_PK,
    {
      variables: { id }
    }
  );

  return {
    loading,
    record: category_by_pk
  };
};
