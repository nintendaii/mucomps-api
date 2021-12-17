import { FastifyRequest, FastifyReply } from "fastify";
import { handleErrors, IErrorObject } from "../../error";
import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "./user-model";

// interface IBody {
//   name: string;
//   email: string;
//   password: string;
// }

interface IResponseUserCreated {
  status: number;
  message: string;
}

export const createUserHandler = async (
  req: FastifyRequest<{ Body: DocumentDefinition<UserDocument> }>,
  reply: FastifyReply
): Promise<IResponseUserCreated | Error> => {
  try {
    const data = req.body;
    const candidate = await User.findOne({ email: data.email }).lean();
    if (candidate) {
      throw new Error("User already exists");
    }
    //const u = new User({email:re});

    const user = await User.create(data);
    user.save();
    console.log(user);
    reply.statusCode = 201;
    return { status: 201, message: "Ok" };
  } catch (error) {
    const errorObject = handleErrors(error);
    reply.statusCode = errorObject.statusCode;
    return error as Error;
  }
};

const bodyJsonSchema = {
  type: "object",
  required: ["name", "email", "password"],
  properties: {
    name: { type: "string", minLength: 4 },
    email: { type: "string" },
    password: { type: "string", minLength: 8 },
  },
};

const userCreatedReponse = {
  type: "object",
  properties: {
    status: { type: "string" },
    message: { type: "string" },
  },
};

const response = { 200: userCreatedReponse };

export const createUserHandlerSchema = {
  description: "User login",
  tags: ["user"],
  body: bodyJsonSchema,
  response,
};
