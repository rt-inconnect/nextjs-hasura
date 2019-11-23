import Head from "next/head";
import i18n from "constants/i18n";

export default ({ title, description = i18n["app.defaultDescription"] }) => (
  <Head>
    <title>{`${i18n["app.preTitle"]} - ${title}`}</title>
    <meta name="description" content={description} />
  </Head>
);
