require("dotenv").config();
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
import getConfig from "next/config";
import path from "path";
const { serverRuntimeConfig } = getConfig();

const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync(
  path.join(serverRuntimeConfig.PROJECT_ROOT, "lib/utils/lightning.proto"),
  loaderOptions
);

process.env.GRPC_SSL_CIPHER_SUITES = "HIGH+ECDSA";

// get the macaroon from the environment
let macaroon = process.env.NEXT_PUBLIC_MACAROON;

// build meta data credentials
let metadata = new grpc.Metadata();
metadata.add("macaroon", macaroon);
let macaroonCreds = grpc.credentials.createFromMetadataGenerator(
  (_args, callback) => {
    callback(null, metadata);
  }
);

// build ssl credentials without needing to pass in the cert
const sslCreds = grpc.credentials.createSsl();
//console.log('sslCreds: ', sslCreds);

// combine the cert credentials and the macaroon auth credentials
// such that every call is properly encrypted and authenticated
let credentials = grpc.credentials.combineChannelCredentials(
  sslCreds,
  macaroonCreds
);
//console.log('credetials: ', credentials);
// Pass the crendentials when creating a channel
let lnrpcDescriptor = grpc.loadPackageDefinition(packageDefinition);
//console.log('lnrpcDescriptor: ', lnrpcDescriptor);
let lnrpc = lnrpcDescriptor.lnrpc;
//console.log('lnrpc: ', lnrpc);
export const lndClient = new lnrpc.Lightning(
  process.env.NEXT_PUBLIC_HOST_PORT,
  credentials
);
//console.log('client: ', client);
