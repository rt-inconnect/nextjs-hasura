import { Statistic, Row, Col, Table, Skeleton } from "antd";

import Layout from "components/global/Layout";
import CategoryBars from "components/charts/CategoryBars";
import DateLines from "components/charts/DateLines";

import { withApollo } from "hoc/apollo";
import i18n from "constants/i18n";
import moment from "moment";

import { subscriptionCategoryDetails } from "gqls/views/subscriptionCategoryDetails";
import { subscriptionDateDetails } from "gqls/views/subscriptionDateDetails";
import { subscriptionClientDetails } from "gqls/views/subscriptionClientDetails";
import { subscriptionDetails } from "gqls/views/subscriptionDetails";

const defaultMargin = { marginBottom: 25 };

const Index = (props) => {
  const {
    loading: categoriesLoading,
    data: categoriesData
  } = subscriptionCategoryDetails();

  const { loading: dateLoading, data: dateData } = subscriptionDateDetails();

  const { loading: detailsLoading, data: detailsData } = subscriptionDetails();

  const {
    loading: clientLoading,
    data: clientData
  } = subscriptionClientDetails();

  const sumAll = (field) => {
    return categoriesData.reduce((a, b) => a + b[field], 0);
  };

  const detailsColumns = [
    {
      title: i18n["form.orderDetails.created_at"],
      dataIndex: "order.created_at",
      render: (text) => moment(text).format("DD.MM.YYYY HH:mm:ss")
    },
    { title: i18n["form.client.name"], dataIndex: "order.client.name" },
    { title: i18n["form.category.name"], dataIndex: "product.category.name" },
    { title: i18n["form.product.name"], dataIndex: "product.name" },
    {
      title: i18n["form.product.price"],
      dataIndex: "price",
      render: (text) => `${text}$`
    },
    {
      title: i18n["form.orderDetails.amount"],
      dataIndex: "amount",
      render: (text) => `${text} шт.`
    },
    {
      title: i18n["form.orderDetails.total"],
      dataIndex: "total",
      render: (text) => `${text}$`
    }
  ];

  const clientColumns = [
    { title: i18n["form.client.name"], dataIndex: "name" },
    {
      title: i18n["form.orderDetails.amount"],
      dataIndex: "amount",
      render: (text) => `${text} шт.`
    },
    {
      title: i18n["form.orderDetails.total"],
      dataIndex: "total",
      render: (text) => `${text}$`
    }
  ];

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
              <Skeleton
                loading={dateLoading}
                title={false}
                paragraph={{ rows: 10 }}
                active
              />

              {!dateLoading && <DateLines data={dateData} />}
            </Col>
          </Row>
        </Col>
        <Col lg={12}>
          {!categoriesLoading && (
            <>
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
              <Row style={defaultMargin}>
                <Col lg={24} style={{ height: 200 }}>
                  <CategoryBars
                    data={[...categoriesData].sort(
                      (a, b) => a.amount - b.amount
                    )}
                  />
                </Col>
              </Row>
            </>
          )}
          <Row style={defaultMargin}>
            <Col lg={24}>
              <Table
                loading={clientLoading}
                style={{ marginTop: 0 }}
                rowKey="id"
                dataSource={clientData}
                columns={clientColumns}
                pagination={false}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={defaultMargin}>
        <Col lg={24}>
          <Table
            loading={detailsLoading}
            style={{ marginTop: 0 }}
            rowKey="id"
            dataSource={detailsData}
            columns={detailsColumns}
            pagination={false}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default withApollo(Index);
