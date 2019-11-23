const path = require("path");
const withCSS = require("@zeit/next-css");

/* Without CSS Modules, with PostCSS */
module.exports = withCSS({
  webpack: function(config, options) {
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["constants"] = path.join(__dirname, "constants");
    config.resolve.alias["gqls"] = path.join(__dirname, "gqls");
    config.resolve.alias["hoc"] = path.join(__dirname, "hoc");
    return config;
  }
});

/* With CSS Modules */
// module.exports = withCSS({ cssModules: true })

/* With additional configuration on top of CSS Modules */
/*
module.exports = withCSS({
  cssModules: true,
  webpack: function (config) {
    return config;
  }
});
*/
