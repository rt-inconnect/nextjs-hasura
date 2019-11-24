import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";

const SUBSCRIPTION_DETAILS = gql`
  subscription subscriptionDetails {
    order_details(order_by: { created_at: desc }, limit: 10) {
      id
      created_at
      amount
      price
      total
      order {
        created_at
        client {
          name
          id
        }
      }
      product {
        name
        category {
          name
        }
      }
    }
  }
`;

export default SUBSCRIPTION_DETAILS;

export const subscriptionDetails = () => {
  const {
    loading,
    data: { order_details } = { order_details: [] }
  } = useSubscription(SUBSCRIPTION_DETAILS);

  return {
    loading,
    data: order_details
  };
};
