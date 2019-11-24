import { Statistic, Row, Col } from "antd";

import Layout from "components/global/Layout";
import CategoryBars from "components/charts/CategoryBars";
import DateLines from "components/charts/DateLines";

import { withApollo } from "hoc/apollo";
import i18n from "constants/i18n";

import { subscriptionCategoryDetails } from "gqls/views/subscriptionCategoryDetails";
import { subscriptionDateDetails } from "gqls/views/subscriptionDateDetails";

const defaultMargin = { marginBottom: 25 };

const Index = (props) => {
  const {
    loading: categoriesLoading,
    data: categoriesData
  } = subscriptionCategoryDetails();
  const { loading: dateLoading, data: dateData } = subscriptionDateDetails();

  const sumAll = (field) => {
    return categoriesData.reduce((a, b) => a + b[field], 0);
  };

  return (
    <Layout>
      <Row gutter={30}>
        <Col lg={12}>
          <Row type="flex" justify="center" style={defaultMargin}>
            <Col lg={24}>
              <Statistic
                className="statistic-total"
                title={i18n["app.main.salesAll"]}
                value={sumAll("total")}
                suffix="$"
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={defaultMargin}>
            <Col lg={24} style={{ height: 400 }}>
              <DateLines data={dateData} />
            </Col>
          </Row>
        </Col>
        <Col lg={12}>
          <Row type="flex" style={defaultMargin} gutter={[10, 20]}>
            {categoriesData.reverse().map((category) => (
              <Col lg={6} xs={24} key={category.id}>
                <Statistic
                  title={category.name}
                  value={category.total || 0}
                  style={{ background: category.color }}
                  suffix="$"
                />
              </Col>
            ))}
          </Row>
          <Row>
            <Col lg={24} style={{ height: 200 }}>
              <CategoryBars
                data={[...categoriesData].sort((a, b) => a.amount - b.amount)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default withApollo(Index);
