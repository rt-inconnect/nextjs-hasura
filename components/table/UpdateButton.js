import { Button, Icon, Tooltip } from "antd";
import Link from "next/link";
import i18n from "constants/i18n";

export default ({ url, id }) => (
  <Link href={`${url}/[id]`} as={`${url}/${id}`}>
    <Tooltip title={i18n["app.btn.update"]}>
      <Button type="primary" style={{ marginRight: 10 }}>
        <Icon type="edit" />
      </Button>
    </Tooltip>
  </Link>
);
