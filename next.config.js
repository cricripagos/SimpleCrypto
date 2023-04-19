/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    turbotrace: {
      // control the log level of the turbotrace, default is `error`
      logLevel: "error",
      // control if the log of turbotrace should contain the details of the analysis, default is `false`
      logDetail: true,
      // show all log messages without limit
      // turbotrace only show 1 log message for each categories by default
      logAll: true,
      // control the context directory of the turbotrace
      // files outside of the context directory will not be traced
      // set the `experimental.outputFileTracingRoot` has the same effect
      // if the `experimental.outputFileTracingRoot` and this option are both set, the `experimental.turbotrace.contextDirectory` will be used
      // if there is `process.cwd()` expression in your code, you can set this option to tell `turbotrace` the value of `process.cwd()` while tracing.
      // for example the require(process.cwd() + '/package.json') will be traced as require('/path/to/cwd/package.json')
    },
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  output: "standalone",
};

module.exports = nextConfig;
