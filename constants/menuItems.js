import i18n from "constants/i18n";

export const menuItems = [
  { path: "/", name: i18n["app.main"], icon: "home" },
  {
    path: "/clients",
    name: i18n["client.index"],
    icon: "team",
    items: [
      { path: "/create", icon: "user-add", name: i18n["client.create"] },
      { path: "/update", icon: "edit", name: i18n["client.update"] }
    ]
  },
  {
    path: "/categories",
    name: i18n["category.index"],
    icon: "bars",
    items: [
      { path: "/create", icon: "plus", name: i18n["category.create"] },
      { path: "/update", name: i18n["category.update"] }
    ]
  },
  {
    path: "/products",
    name: i18n["product.index"],
    icon: "barcode",
    items: [
      { path: "/create", icon: "plus", name: i18n["product.create"] },
      { path: "/update", name: i18n["product.update"] }
    ]
  },
  {
    path: "/orders",
    name: i18n["order.index"],
    icon: "shopping-cart",
    items: [
      { path: "/create", icon: "plus", name: i18n["order.create"] },
      { path: "/update", name: i18n["order.update"] }
    ]
  }
];

export const buildBreadcrumbsTree = (routes) => {
  let items = [];
  routes.forEach((item, i) => {
    if (i > 0 && !item) return;
    let el = menuItems.find((el) => el.path == `/${item}`);
    if (!el && items[i - 1] && items[i - 1].items)
      el = items[i - 1].items.find((el) => el.path == `/${item}`);
    if (el) items.push(el);
  });
  return items;
};
