import gql from "graphql-tag";

export default gql`
  mutation insertClient($name: String!) {
    insert_client(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;
