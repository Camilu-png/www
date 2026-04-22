const cracoConfig = {
  style: {
    rules: [
      {
        test: /\.module\.css$/,
        options: {
          modules: true
        }
      }
    ]
  },
  devServer: {
    client: {
      overlay: false
    }
  }
};

module.exports = cracoConfig;