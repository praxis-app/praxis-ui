require("dotenv").config();

module.exports = {
  projects: {
    app: {
      schema: `${process.env.API_URL}/graphql`,
      documents: "./src/apollo/**/*.graphql",
    },
  },
};
