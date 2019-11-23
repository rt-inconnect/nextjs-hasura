import { useState, useEffect } from "react";

import Layout from "components/global/Layout";
import Order from "components/forms/Order";
import { withApollo } from "hoc/apollo";
import { useRouter } from "next/router";

import { orderByPk } from "gqls/orders/orderByPk";
import UPDATE_ORDER from "gqls/orders/updateOrder";
import { queryClientsAll } from "gqls/clients/queryClients";
import { queryCategoriesAll } from "gqls/categories/queryCategories";

const Update = () => {
  const { query } = useRouter();
  const { loading, record } = orderByPk(query.id);
  const { data: clients, loading: clientsLoading } = queryClientsAll();
  const { data: categories, loading: categoriesLoading } = queryCategoriesAll();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (record.order_details)
      setDetails(
        record.order_details.map((detail) => {
          delete detail.__typename;
          return detail;
        })
      );
  }, [record]);

  return (
    <Layout>
      <Order
        loading={loading}
        record={record}
        mutation={UPDATE_ORDER}
        variables={{ id: query.id, order_details: details }}
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

export default withApollo(Update);
