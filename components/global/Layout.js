import { useRouter } from "next/router";
import { menuItems, buildBreadcrumbsTree } from "constants/menuItems";

import { Layout } from "antd";
const { Header, Content } = Layout;

import Head from "./Head";
import Menu from "./Menu";
import Breadcrumb from "./Breadcrumb";
import "antd/dist/antd.css";
import "./styles.css";

export default ({ children }) => {
  const { route } = useRouter();
  const selectedItem = `/${route.split("/")[1]}`;
  const items = buildBreadcrumbsTree(route.split("/"));
  return (
    <>
      <Head title={items[items.length - 1].name} />
      <Layout>
        <Header>
          <Menu selectedItem={selectedItem} menuItems={menuItems} />
        </Header>
        <Content>
          <Breadcrumb items={items} />
          <div className="app-content">{children}</div>
        </Content>
      </Layout>
    </>
  );
};
