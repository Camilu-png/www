module.exports = function override(config, env) {
  if (env === 'development') {
    config.devServer = {
      ...config.devServer,
      client: {
        overlay: {
          errors: false,
          warnings: false,
        },
      },
    };
  }
  return config;
};