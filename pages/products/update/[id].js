import Layout from "components/global/Layout";
import Product from "components/forms/Product";
import { withApollo } from "hoc/apollo";
import { useRouter } from "next/router";

import { productByPk } from "gqls/products/productByPk";
import UPDATE_PRODUCT from "gqls/products/updateProduct";
import { queryCategoriesAll } from "gqls/categories/queryCategories";

const Update = () => {
  const { query } = useRouter();
  const { loading, record } = productByPk(query.id);
  const { data: categories, loading: categoriesLoading } = queryCategoriesAll();

  return (
    <Layout>
      <Product
        loading={loading}
        record={record}
        mutation={UPDATE_PRODUCT}
        variables={{ id: query.id }}
        categories={categories}
        categoriesLoading={categoriesLoading}
      />
    </Layout>
  );
};

export default withApollo(Update);
