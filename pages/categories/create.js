import Layout from "components/global/Layout";
import Category from "components/forms/Category";
import { withApollo } from "hoc/apollo";

import INSERT_CATEGORY from "gqls/categories/insertCategory";

const Create = () => {
  return (
    <Layout>
      <Category mutation={INSERT_CATEGORY} />
    </Layout>
  );
};

export default withApollo(Create);
