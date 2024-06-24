import "dotenv/config";

export const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT
  },
  db: {
    uri: process.env.DB_URI
  },
  jwt: {}
};
