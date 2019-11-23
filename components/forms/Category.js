import { Form, Input } from "antd";
import FormHOC from "hoc/form";
import compose from "hoc/compose";
import i18n from "constants/i18n";

const FormItems = ({ form: { getFieldDecorator }, record = {} }) => {
  return (
    <Form.Item label={i18n["form.category.name"]}>
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
  );
};

export default compose(Form.create(), FormHOC)(FormItems);
