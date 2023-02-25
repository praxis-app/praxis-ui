import { CodegenConfig } from "@graphql-codegen/cli";
require("dotenv").config();

const config: CodegenConfig = {
  schema: `${process.env.API_URL}/graphql`,
  documents: ["src/apollo/**/*.graphql"],
  ignoreNoDocuments: true,

  generates: {
    "./src/apollo/gen.ts": {
      plugins: [
        {
          add: {
            content: `
              // THIS FILE IS GENERATED, DO NOT EDIT
              /* eslint-disable */
            `,
          },
        },
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
