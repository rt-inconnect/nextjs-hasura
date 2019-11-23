import { Form, Button, Icon, Spin } from "antd";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";
import i18n from "constants/i18n";

const defaultStyle = { width: 800, margin: "20px auto" };

export default (BaseComponent) => ({
  form,
  handleSubmit,
  loading = false,
  style = defaultStyle,
  mutation,
  variables = {},
  ...props
}) => {
  const [handleMutation, { loading: loadingMutation }] = useMutation(mutation);

  const onSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        // console.log({ ...values, ...variables });
        handleMutation({
          variables: { ...values, ...variables },
          update: () => {
            Router.back();
          }
        });
      }
    });
  };

  return (
    <>
      <Button type="default" onClick={() => Router.back()}>
        <Icon type="left" />
        {i18n["app.back"]}
      </Button>
      <Spin
        spinning={loadingMutation || loading}
        size="large"
        tip={i18n["app.post"]}
      >
        <Form layout="vertical" style={style} onSubmit={onSubmit}>
          <BaseComponent form={form} {...props} />
          <Button type="primary" htmlType="submit">
            {i18n["app.save"]}
          </Button>
        </Form>
      </Spin>
    </>
  );
};
