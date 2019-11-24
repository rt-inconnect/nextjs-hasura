import { Table } from "antd";
import Router, { useRouter } from "next/router";
import CreateButton from "./CreateButton";

export default ({
  columns,
  data,
  loading,
  page,
  pageSize,
  total,
  style = { marginTop: 20 },
  ...other
}) => {
  const { route } = useRouter();

  const onPagination = (page, size) => {
    Router.push({
      pathname: route,
      query: { page }
    });
  };

  const pagination = {
    total,
    pageSize,
    current: page,
    onChange: onPagination
  };

  return (
    <>
      <CreateButton url={`${route}/create`} />
      <Table
        style={style}
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        {...other}
      />
    </>
  );
};
