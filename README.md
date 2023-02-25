## Social UI

Social networking platform UI built with Next.js, Apollo Client, and Material UI

Social API: https://github.com/forrestwilkins/social-api

## WIP

You are entering a construction yard. Things are going to change and break regularly as the project is still getting off the ground.

Your feedback is highly welcome!

## Installation

```bash
# Install Yarn globally
$ npm install -g yarn

# Install project dependencies
$ cd social-ui && yarn

# Add .env file and edit as needed
$ cp .env.example .env
```

## Running the app

```bash
# Development
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view and interact with the UI.

## Docker

```bash
# Build and start containers
$ docker-compose up
```

## Prettier and ESLint

```bash
# Enable pre-commit hook with Husky
$ npx husky install && npx husky add .husky/pre-commit "yarn lint-staged"
```

## GraphQL Code Generator

Social UI takes advantage of code generation based on the current GraphQL schema. The generator should be run after any changes to GraphQL documents, as well as after any changes to the schema.

```bash
# Keep generated types and hooks in sync with the current schema
$ yarn generate
```

Read more about [GraphQL Code Generator](https://www.the-guild.dev/graphql/codegen/docs/getting-started).

## Testing for accessibility

Install the following Chrome extension provided by Deque Systems: [axe DevTools - Web Accessibility Testing](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd?hl=en-US)

Once the extension is installed, open up Chrome DevTools, and navigate to the **axe DevTools** tab. Here you can click the **Scan ALL of my page** button to check for any accessibility issues.

## Contributions

Social UI is open to contributions. Please read [CONTRIBUTING.md](https://github.com/forrestwilkins/social-ui/blob/main/CONTRIBUTING.md) for more details.
