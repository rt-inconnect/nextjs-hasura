import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";

const SUBSCRIPTION_CLIENT_DETAILS = gql`
  subscription subscriptionClientDetails {
    v_client_details(order_by: { total: desc }, limit: 5) {
      id
      name
      total
      amount
    }
  }
`;

export default SUBSCRIPTION_CLIENT_DETAILS;

export const subscriptionClientDetails = () => {
  const {
    loading,
    data: { v_client_details } = { v_client_details: [] }
  } = useSubscription(SUBSCRIPTION_CLIENT_DETAILS);

  return {
    loading,
    data: v_client_details
  };
};
