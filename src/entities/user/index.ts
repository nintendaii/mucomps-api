import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  createUserHandlerSchema,
} from "./create-user-handler";

export default async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/signup",
    schema: createUserHandlerSchema,
    handler: createUserHandler,
  });
};
