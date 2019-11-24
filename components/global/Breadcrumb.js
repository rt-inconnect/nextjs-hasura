import Link from "next/link";
import { Breadcrumb, Icon } from "antd";

const iconStyle = { marginRight: 5 };

export default ({ items = [], style = {} }) => {
  if (items.length <= 1) return null;
  return (
    <Breadcrumb style={style}>
      {items.map((item, i) => {
        if (i != items.length - 1)
          return (
            <Breadcrumb.Item key="item.path">
              <Link href={`${item.path}`}>
                <a>
                  {item.icon && <Icon type={item.icon} style={iconStyle} />}
                  {item.name}
                </a>
              </Link>
            </Breadcrumb.Item>
          );
        if (i == items.length - 1)
          return (
            <Breadcrumb.Item key="item.path">
              {" "}
              {item.icon && <Icon type={item.icon} style={iconStyle} />}
              {item.name}
            </Breadcrumb.Item>
          );
      })}
    </Breadcrumb>
  );
};
