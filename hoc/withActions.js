import Router, { useRouter } from "next/router";
import i18n from "constants/i18n";

import UpdateButton from "components/table/UpdateButton";
import DeleteButton from "components/table/DeleteButton";

export default (columns, { data, page, mutation, refetchQueries }) => {
  const { route } = useRouter();

  const onDelete = async (id) => {
    try {
      await mutation({
        variables: { id },
        refetchQueries
      });
      if (data.length - 1 === 0 && page > 1) {
        Router.push({
          pathname: route,
          query: { page: page - 1 }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  let actions = {
    title: i18n["app.actions"],
    key: "action",
    render: (text, record) => (
      <>
        <UpdateButton url={`${route}/update`} id={record.id} />
        <DeleteButton onDelete={onDelete} id={record.id} />
      </>
    )
  };

  return [...columns, actions];
};
