import { Form, Button, Icon, Spin, Row, Col } from "antd";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import i18n from "constants/i18n";

const defaultStyle = { margin: "20px" };

export default (BaseComponent) => ({
  form,
  handleSubmit,
  loading = false,
  style = defaultStyle,
  mutation,
  variables = {},
  ...props
}) => {
  const router = useRouter();
  const [handleMutation, { loading: loadingMutation }] = useMutation(mutation);

  const onBack = () => {
    if (Object.keys(router.components).length < 3) {
      return router.push("/" + router.pathname.split("/")[1]);
    }
    return router.back();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        handleMutation({
          variables: { ...values, ...variables },
          update: onBack
        });
      }
    });
  };

  return (
    <>
      <Button type="default" onClick={onBack}>
        <Icon type="left" />
        {i18n["app.back"]}
      </Button>
      <Spin
        spinning={loadingMutation || loading}
        size="large"
        tip={i18n["app.post"]}
      >
        <Row type="flex" justify="center">
          <Col xl={12} xs={24} lg={20}>
            <Form layout="vertical" style={style} onSubmit={onSubmit}>
              <BaseComponent form={form} {...props} />
              <Button type="primary" htmlType="submit">
                {i18n["app.save"]}
              </Button>
            </Form>
          </Col>
        </Row>
      </Spin>
    </>
  );
};
