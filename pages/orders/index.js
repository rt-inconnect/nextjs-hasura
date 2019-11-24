import Layout from "components/global/Layout";
import { Table as AntdTable } from "antd";
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

  const sumDetails = (details) => details.reduce((a, b) => a + b.total, 0);

  const expandedRowRender = (rec, index) => {
    const columns = [
      { title: i18n["form.product.name"], dataIndex: "product.name" },
      {
        title: i18n["form.product.price"],
        dataIndex: "price",
        render: (text) => `${text}$`
      },
      {
        title: i18n["form.orderDetails.amount"],
        dataIndex: "amount",
        render: (text) => `${text} шт.`
      },
      {
        title: i18n["form.orderDetails.total"],
        dataIndex: "total",
        render: (text) => `${text}$`
      }
    ];

    return (
      <AntdTable
        style={{ marginTop: 0 }}
        rowKey="id"
        dataSource={data[index].order_details}
        columns={columns}
        pagination={false}
      />
    );
  };

  const columns = withActions(
    [
      {
        title: i18n["app.id"],
        dataIndex: "id"
      },
      {
        title: i18n["form.client.name"],
        dataIndex: "client.name"
      },
      {
        title: i18n["form.order.total"],
        render: (text, record) => {
          return `${sumDetails(record.order_details)}$`;
        }
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
        expandedRowRender={expandedRowRender}
      />
    </Layout>
  );
};

export default withApollo(Index);
