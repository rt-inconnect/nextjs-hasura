import Layout from "components/global/Layout";
import Client from "components/forms/Client";
import { withApollo } from "hoc/apollo";

import INSERT_CLIENT from "gqls/clients/insertClient";

const Create = () => {
  return (
    <Layout>
      <Client mutation={INSERT_CLIENT} />
    </Layout>
  );
};

export default withApollo(Create);
