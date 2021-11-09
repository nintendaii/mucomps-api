if (
  !process.env.NODE_ENV ||
  ["development", "test"].includes(process.env.NODE_ENV)
) {
  require("dotenv").config(); // eslint-disable-line
}

export const port = Number(process.env.PORT) || 9000;

export const mongo = {
  uri: process.env.MONGO_URI || "mongodb://localhost:27017/gbn",
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
