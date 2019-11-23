import { Form, Input, Select, InputNumber, Tabs, Table } from "antd";
import FormHOC from "hoc/form";
import compose from "hoc/compose";
import i18n from "constants/i18n";

const { Option } = Select;
const { TabPane } = Tabs;

const FormItems = ({
  form: { getFieldDecorator },
  record = {},
  clients,
  clientsLoading,
  categories,
  categoriesLoading,
  details,
  setDetails,
  loading
}) => {
  const notFound = { amount: null, total: null };

  const getDetailByProduct = (id_product) => {
    if (!details) return notFound;
    const result = details.find((rec) => rec.id_product === id_product);
    if (!result) return notFound;
    return result;
  };

  let timer = null;
  const onAmountChange = (product, amount) => {
    if (isNaN(parseInt(amount), amount)) return false;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const detail = getDetailByProduct(product.id);
      let result = {
        id_product: product.id,
        price: detail.price || product.price,
        amount: parseInt(amount)
      };
      if (detail.id) result.id = detail.id;
      if (record.id) result.id_order = record.id;
      if (detail.created_at) result.created_at = detail.created_at;
      result.total = parseInt(amount) * result.price;

      setDetails([
        result,
        ...details.filter((rec) => rec.id_product !== product.id)
      ]);
    });
  };

  const productColumns = [
    {
      title: i18n["form.product.name"],
      dataIndex: "name"
    },
    {
      title: i18n["form.product.price"],
      dataIndex: "price",
      render: (text, record, index) => `${text}$`
    },
    {
      title: i18n["form.orderDetails.amount"],
      dataIndex: "amount",

      render: (text, record, index) => (
        <InputNumber
          value={getDetailByProduct(record.id).amount}
          onChange={(val) => onAmountChange(record, val)}
        />
      )
    },
    {
      title: i18n["form.orderDetails.total"],
      dataIndex: "total",
      render: (text, record, index) => (
        <InputNumber
          formatter={(value) =>
            value && `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          value={getDetailByProduct(record.id).total}
          readOnly={true}
        />
      )
    }
  ];

  return (
    <>
      <Form.Item label={i18n["form.order.client"]}>
        {getFieldDecorator("id_client", {
          initialValue: record.id_client || "",
          rules: [
            {
              required: true,
              message: i18n["form.rule.required"]
            }
          ]
        })(
          <Select
            showSearch
            style={{ width: 200 }}
            loading={clientsLoading}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {clients.map((client) => (
              <Option key={client.id} value={client.id}>
                {client.name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      {!loading && (
        <Tabs defaultActiveKey="1" style={{ marginBottom: 40 }}>
          {categories.map((category) => (
            <TabPane tab={category.name} key={category.id}>
              <Table
                rowKey="id"
                columns={productColumns}
                dataSource={category.products}
                pagination={false}
              />
            </TabPane>
          ))}
        </Tabs>
      )}
    </>
  );
};

export default compose(Form.create(), FormHOC)(FormItems);
