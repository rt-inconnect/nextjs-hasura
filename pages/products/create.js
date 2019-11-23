import Layout from "components/global/Layout";
import Product from "components/forms/Product";
import { withApollo } from "hoc/apollo";

import INSERT_PRODUCT from "gqls/products/insertProduct";
import { queryCategoriesAll } from "gqls/categories/queryCategories";

const Create = () => {
  const { data: categories, loading: categoriesLoading } = queryCategoriesAll();
  return (
    <Layout>
      <Product
        mutation={INSERT_PRODUCT}
        categories={categories}
        categoriesLoading={categoriesLoading}
      />
    </Layout>
  );
};

export default withApollo(Create);
