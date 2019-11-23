import Layout from "components/global/Layout";
import Table from "components/table/Table";
import withActions from "hoc/withActions";
import { withApollo } from "hoc/apollo";
import { useMutation } from "@apollo/react-hooks";
import i18n from "constants/i18n";

import QUERY_ORDERS, { queryOrders } from "gqls/orders/queryOrders";
import DELETE_ORDER from "gqls/orders/deleteOrder";

const Index = () => {
  const { loading, data, total, page, variables } = queryOrders();

  const [deleteOrder, { loading: deleteLoading }] = useMutation(DELETE_ORDER);

  const columns = withActions(
    [
      {
        title: i18n["app.id"],
        dataIndex: "id"
      },
      {
        title: i18n["form.client.name"],
        dataIndex: "client.name"
      }
    ],
    {
      data,
      page,
      mutation: deleteOrder,
      refetchQueries: [{ query: QUERY_ORDERS, variables }]
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
