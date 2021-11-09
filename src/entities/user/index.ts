import { FastifyInstance } from "fastify";
import { echoUserHandlerSchema, echoUserHandler } from "./echoUserHandler";

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/echo",
    schema: echoUserHandlerSchema,
    onRequest: (req, rep, done) => {
      fastify.log.info("onRequest: " + req);
      done();
    },
    preParsing: (req, rep, payload, done) => {
      fastify.log.info("preParsing: " + payload.readableLength);
      done();
    },
    handler: echoUserHandler,
  });
};
