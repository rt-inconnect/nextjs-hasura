import Layout from "components/global/Layout";
import Table from "components/table/Table";
import withActions from "hoc/withActions";
import { withApollo } from "hoc/apollo";
import { useMutation } from "@apollo/react-hooks";
import i18n from "constants/i18n";

import QUERY_PRODUCTS, { queryProducts } from "gqls/products/queryProducts";
import DELETE_PRODUCT from "gqls/products/deleteProduct";

const Index = () => {
  const { loading, data, total, page, variables } = queryProducts();

  const [deleteProduct, { loading: deleteLoading }] = useMutation(
    DELETE_PRODUCT
  );

  const columns = withActions(
    [
      {
        title: i18n["app.id"],
        dataIndex: "id"
      },
      {
        title: i18n["form.product.name"],
        dataIndex: "name"
      },
      {
        title: i18n["form.product.category"],
        dataIndex: "category.name"
      },
      {
        title: i18n["form.product.price"],
        dataIndex: "price",
        render: (text) => `${text}$`
      }
    ],
    {
      data,
      page,
      mutation: deleteProduct,
      refetchQueries: [{ query: QUERY_PRODUCTS, variables }]
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
