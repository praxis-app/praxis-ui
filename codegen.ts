import { CodegenConfig } from "@graphql-codegen/cli";
require("dotenv").config();

const config: CodegenConfig = {
  schema: `${process.env.API_URL}/graphql`,
  documents: ["src/apollo/**/*.graphql"],
  ignoreNoDocuments: true,

  generates: {
    "src/apollo/gen.ts": {
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
      ],
    },

    "src/apollo/": {
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "gen.ts",
        folder: "../generated",
        extension: ".ts",
      },
      plugins: [
        {
          add: {
            content: `
              // THIS FILE IS GENERATED, DO NOT EDIT
              /* eslint-disable */
            `,
          },
        },
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: { withHooks: true },
    },

    "schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
