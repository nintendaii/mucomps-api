import Fastify, { FastifyInstance } from "fastify";
import swagger from "./swagger";
import mongoose from "mongoose";
import { port, mongo } from "./config/index";
import { ConnectionOptions } from "tls";

const prettyLogOptions = {
  prettyPrint: {
    colorize: true,
    ignore: "hostname",
    translateTime: true,
  },
};

const server: FastifyInstance = Fastify({
  logger: process.env?.NODE_ENV === "development" ? prettyLogOptions : true,
});

server.register(swagger);

const start = async () => {
  try {
    await server.listen(port);
    await mongoose.connect(mongo.uri, mongo.options as ConnectionOptions);
    server.log.info("Works");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
