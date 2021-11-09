import Fastify, {
  fastify,
  FastifyInstance,
  RouteShorthandOptions,
} from "fastify";
import swagger from "./swagger";
import { port, mongo } from "./config/index";

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
    console.log("Works");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
