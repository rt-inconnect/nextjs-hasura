import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";

const SUBSCRIPTION_CATEGORY_DETAILS = gql`
  subscription subscriptionCategoryDetails {
    v_category_details(order_by: { total: asc }) {
      id
      name
      color
      total
      amount
    }
  }
`;

export default SUBSCRIPTION_CATEGORY_DETAILS;

export const subscriptionCategoryDetails = () => {
  const {
    loading,
    data: { v_category_details } = { v_category_details: [] }
  } = useSubscription(SUBSCRIPTION_CATEGORY_DETAILS);

  return {
    loading,
    data: v_category_details
  };
};
