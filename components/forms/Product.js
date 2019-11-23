import { Form, Input, Select, InputNumber } from "antd";
import FormHOC from "hoc/form";
import compose from "hoc/compose";
import i18n from "constants/i18n";

const { Option } = Select;

const FormItems = ({
  form: { getFieldDecorator },
  record = {},
  categories,
  categoriesLoading
}) => {
  return (
    <>
      <Form.Item label={i18n["form.product.name"]}>
        {getFieldDecorator("name", {
          initialValue: record.name || "",
          rules: [
            {
              required: true,
              message: i18n["form.rule.required"]
            }
          ]
        })(<Input autoComplete="off" />)}
      </Form.Item>
      <Form.Item label={i18n["form.product.category"]}>
        {getFieldDecorator("id_category", {
          initialValue: record.id_category || "",
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
            loading={categoriesLoading}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label={i18n["form.product.price"]}>
        {getFieldDecorator("price", {
          initialValue: record.price || 0
        })(
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        )}
      </Form.Item>
    </>
  );
};

export default compose(Form.create(), FormHOC)(FormItems);
