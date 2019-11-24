import gql from "graphql-tag";

export default gql`
  mutation insertCategory($name: String!, $color: String!) {
    insert_category(objects: { name: $name, color: $color }) {
      returning {
        id
        name
      }
    }
  }
`;
