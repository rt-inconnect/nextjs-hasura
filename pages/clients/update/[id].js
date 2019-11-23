import Layout from "components/global/Layout";
import Client from "components/forms/Client";
import { withApollo } from "hoc/apollo";
import { useRouter } from "next/router";

import { clientByPk } from "gqls/clients/clientByPk";
import UPDATE_CLIENT from "gqls/clients/updateClient";

const Update = () => {
  const { query } = useRouter();
  const { loading, record } = clientByPk(query.id);

  return (
    <Layout>
      <Client
        loading={loading}
        record={record}
        mutation={UPDATE_CLIENT}
        variables={{ id: query.id }}
      />
    </Layout>
  );
};

export default withApollo(Update);
