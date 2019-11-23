import Layout from "components/global/Layout";
import { withApollo } from "hoc/apollo";
import i18n from "constants/i18n";

const Index = (props) => {
  return (
    <Layout>
      <h1>{i18n["app.main"]}</h1>
    </Layout>
  );
};

export default withApollo(Index);
