import { Button, Icon } from "antd";
import Link from "next/link";
import i18n from "constants/i18n";

export default ({ url }) => {
  return (
    <Link href={`${url}`}>
      <Button type="primary">
        <Icon type="plus" />
        {i18n["app.btn.create"]}
      </Button>
    </Link>
  );
};
