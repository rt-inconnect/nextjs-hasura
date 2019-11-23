import gql from "graphql-tag";

export default gql`
  mutation insertCategory($name: String!) {
    insert_category(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;
