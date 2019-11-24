import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";

const SUBSCRIPTION_DATE_DETAILS = gql`
  subscription subscriptionDateDetails {
    v_date_details(order_by: { total: asc }) {
      created_at
      id
      name
      color
      total
      amount
    }
  }
`;

export default SUBSCRIPTION_DATE_DETAILS;

export const subscriptionDateDetails = () => {
  const {
    loading,
    data: { v_date_details } = { v_date_details: [] }
  } = useSubscription(SUBSCRIPTION_DATE_DETAILS);

  return {
    loading,
    data: v_date_details
  };
};
