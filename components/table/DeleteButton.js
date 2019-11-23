import { Button, Icon, Tooltip, Popconfirm } from "antd";
import i18n from "constants/i18n";

export default ({ onDelete, id }) => (
  <Popconfirm
    title={i18n["app.btn.delete.confirm"]}
    onConfirm={() => onDelete(id)}
    okText="Да"
    cancelText="Нет"
  >
    <Tooltip title={i18n["app.btn.delete"]}>
      <Button type="default">
        <Icon type="delete" />
      </Button>
    </Tooltip>
  </Popconfirm>
);
