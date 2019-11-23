import { useRouter } from "next/router";
import { menuItems, buildBreadcrumbsTree } from "constants/menuItems";

import Head from "./Head";
import Menu from "./Menu";
import Breadcrumb from "./Breadcrumb";
import "antd/dist/antd.css";

const layoutStyle = {
  margin: "10px 20px"
};

export default ({ children }) => {
  const { route } = useRouter();
  const selectedItem = `/${route.split("/")[1]}`;
  const items = buildBreadcrumbsTree(route.split("/"));
  return (
    <>
      <Head title={items[items.length - 1].name} />
      <Menu
        style={{ marginBottom: 20 }}
        selectedItem={selectedItem}
        menuItems={menuItems}
      />
      <Breadcrumb style={{ margin: "0 40px 20px" }} items={items} />
      <div style={layoutStyle}>{children}</div>
    </>
  );
};
