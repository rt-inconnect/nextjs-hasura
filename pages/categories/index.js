import Layout from "components/global/Layout";
import Table from "components/table/Table";
import withActions from "hoc/withActions";
import { withApollo } from "hoc/apollo";
import { useMutation } from "@apollo/react-hooks";
import i18n from "constants/i18n";

import QUERY_CATEGORIES, {
  queryCategories
} from "gqls/categories/queryCategories";
import DELETE_CATEGORY from "gqls/categories/deleteCategory";

const Index = () => {
  const { loading, data, total, page, variables } = queryCategories();

  const [deleteCategory, { loading: deleteLoading }] = useMutation(
    DELETE_CATEGORY
  );

  const columns = withActions(
    [
      {
        title: i18n["app.id"],
        dataIndex: "id"
      },
      {
        title: i18n["form.category.name"],
        dataIndex: "name"
      }
    ],
    {
      data,
      page,
      mutation: deleteCategory,
      refetchQueries: [{ query: QUERY_CATEGORIES, variables }]
    }
  );

  return (
    <Layout>
      <Table
        columns={columns}
        data={data}
        loading={loading || deleteLoading}
        page={page}
        pageSize={variables.limit}
        total={total}
      />
    </Layout>
  );
};

export default withApollo(Index);
