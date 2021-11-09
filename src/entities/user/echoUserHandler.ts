import { FastifyRequest, FastifyReply } from "fastify";
import { handleErrors, IErrorObject } from "../../error";
import { IResponseUser } from "./model";
import { userEchoReponse } from "./schema";

export const echoUserHandler = async (
  req: FastifyRequest<{ Body: IResponseUser }>,
  reply: FastifyReply
): Promise<any | IErrorObject> => {
  try {
    const a = req.body;
    req.log.info(a);
    return a;
  } catch (error) {
    const errorObject = handleErrors(error);
    reply.statusCode = errorObject.statusCode;
    return errorObject;
  }
};

const bodyJsonSchema = {
  type: "object",
  required: ["name", "albums"],
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    albums: {
      type: "array",
      maxItems: 3,
      items: { type: "integer" },
    },
  },
};

const headersJsonSchema = {
  type: "object",
  properties: {
    "x-foo": { type: "string" },
  },
  required: ["x-foo"],
};

const response = { 200: userEchoReponse };

export const echoUserHandlerSchema = {
  description: "Test endpoint. Echo request",
  tags: ["user"],
  body: bodyJsonSchema,
  headers: headersJsonSchema,
  response,
};
