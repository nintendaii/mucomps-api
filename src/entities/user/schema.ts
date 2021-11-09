export const userEchoReponse = {
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
