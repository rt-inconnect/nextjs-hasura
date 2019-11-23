import Layout from "components/global/Layout";
import Table from "components/table/Table";
import withActions from "hoc/withActions";
import { withApollo } from "hoc/apollo";
import { useMutation } from "@apollo/react-hooks";
import i18n from "constants/i18n";

import QUERY_CLIENTS, { queryClients } from "gqls/clients/queryClients";
import DELETE_CLIENT from "gqls/clients/deleteClient";

const Index = () => {
  const { loading, data, total, page, variables } = queryClients();

  const [deleteClient, { loading: deleteLoading }] = useMutation(DELETE_CLIENT);

  const columns = withActions(
    [
      {
        title: i18n["app.id"],
        dataIndex: "id"
      },
      {
        title: i18n["form.client.name"],
        dataIndex: "name"
      }
    ],
    {
      data,
      page,
      mutation: deleteClient,
      refetchQueries: [{ query: QUERY_CLIENTS, variables }]
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
