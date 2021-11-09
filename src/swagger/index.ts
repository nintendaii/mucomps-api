import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import swagger, { SwaggerOptions } from "fastify-swagger";

const options: SwaggerOptions = {
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Test swagger",
      description: "Swagger docs for mucomps API",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://github.com/nintendaii/mucomps-api",
      description: "Github repo",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "user", description: "User related end-points" },
      { name: "code", description: "Code related end-points" },
    ],
    definitions: {},
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "header",
      },
    },
  },
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true,
};

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(swagger, options);
});
