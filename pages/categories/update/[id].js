import Layout from "components/global/Layout";
import Category from "components/forms/Category";
import { withApollo } from "hoc/apollo";
import { useRouter } from "next/router";

import { categoryByPk } from "gqls/categories/categoryByPk";
import UPDATE_CATEGORY from "gqls/categories/updateCategory";

const Update = () => {
  const { query } = useRouter();
  const { loading, record } = categoryByPk(query.id);

  return (
    <Layout>
      <Category
        loading={loading}
        record={record}
        mutation={UPDATE_CATEGORY}
        variables={{ id: query.id }}
      />
    </Layout>
  );
};

export default withApollo(Update);
