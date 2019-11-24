import Link from "next/link";
import { Menu, Icon } from "antd";

export default ({ style = {}, selectedItem, menuItems }) => (
  <Menu
    mode="horizontal"
    theme="dark"
    style={style}
    selectedKeys={[selectedItem]}
  >
    {menuItems.map((item) => (
      <Menu.Item key={item.path}>
        <Link href={`${item.path}`}>
          <a>
            <Icon type={item.icon} /> {item.name}
          </a>
        </Link>
      </Menu.Item>
    ))}
  </Menu>
);
