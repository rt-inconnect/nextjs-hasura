import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const PRODUCT_BY_PK = gql`
  query productByPk($id: Int!) {
    product_by_pk(id: $id) {
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
`;

export default PRODUCT_BY_PK;

export const defaultValues = {
  product_by_pk: {}
};

export const productByPk = (id) => {
  const { loading, data: { product_by_pk } = defaultValues } = useQuery(
    PRODUCT_BY_PK,
    {
      variables: { id }
    }
  );

  return {
    loading,
    record: product_by_pk
  };
};
