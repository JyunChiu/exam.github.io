const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '~~apis': path.resolve(__dirname, "src/apis/"),
      '~~components': path.resolve(__dirname, "src/components/"),
      '~~features': path.resolve(__dirname, "src/features/"),
      '~~reducers': path.resolve(__dirname, "src/reducers/"),
      '~~redux': path.resolve(__dirname, "src/redux/"),
      '~~routes': path.resolve(__dirname, "src/routes/"),
      '~~statics': path.resolve(__dirname, "src/statics/"),
      '~~store': path.resolve(__dirname, "src/store/"),
      '~~styles': path.resolve(__dirname, "src/styles/"),
      '~~utils': path.resolve(__dirname, "src/utils/"),
    }
  },
};