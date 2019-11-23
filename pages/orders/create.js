import { useState } from "react";

import Layout from "components/global/Layout";
import Order from "components/forms/Order";
import { withApollo } from "hoc/apollo";

import INSERT_ORDER from "gqls/orders/insertOrder";
import { queryClientsAll } from "gqls/clients/queryClients";
import { queryCategoriesAll } from "gqls/categories/queryCategories";

const Create = () => {
  const { data: clients, loading: clientsLoading } = queryClientsAll();
  const { data: categories, loading: categoriesLoading } = queryCategoriesAll();
  const [details, setDetails] = useState([]);

  return (
    <Layout>
      <Order
        mutation={INSERT_ORDER}
        variables={{ order_details: details }}
        clients={clients}
        clientsLoading={clientsLoading}
        categories={categories}
        categoriesLoading={categoriesLoading}
        details={details}
        setDetails={setDetails}
      />
    </Layout>
  );
};

export default withApollo(Create);
