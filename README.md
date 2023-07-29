## Praxis

Praxis is an open source social network with features for collaborative decision making. Proposals are the main focus and come with a wide variety of voting models, with consensus as the default. Create a group and set it to no-admin, allowing group members to create proposals and democratically decide on name, settings, roles, or planning of real world events.

While model of consensus is the default, group members will also be able to use regular majority vote, and have the ability to create and assign new roles with various permissions. All of this can be tailored in group settings to meet the specific needs of your community, either by a groups admin, or by proposals as a group evolves over time.

The tech stack includes:

- Apollo Client
- Material UI
- Next.js
- TypeScript

Praxis API: https://github.com/praxis-project/praxis-api

Praxis is free and open source software, as specified by the GNU General Public License.

## Work in Progress

You are entering a construction yard. Things are going to change and break regularly as the project is still getting off the ground. Your feedback is highly welcome.

Core features currently in development:

- Change group roles, permissions, and settings all via proposals
- Plan real world events via proposals and voting
- Federation with ActivityPub

## Installation

Ensure that you're using Node v16.13.2 before proceeding.

```bash
# Install Yarn globally
$ npm install -g yarn

# Install project dependencies
$ cd praxis-ui && yarn

# Add .env file and edit as needed
$ cp .env.example .env
```

Instructions for setting up the API are located here: https://github.com/praxis-app/praxis-api#installation

## Running the app

```bash
# Development
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view and interact with the UI.

## Make and Docker

Ensure that you have [Make](https://www.gnu.org/software/make) and [Docker](https://docs.docker.com/engine/install) installed to use the following commands.

```bash
# Build the app
$ make build-dev

# Start the app
$ make start-dev
```

## Prettier and ESLint

```bash
# Enable pre-commit hook with Husky
$ npx husky install && npx husky add .husky/pre-commit "yarn lint-staged"
```

## GraphQL Code Generator

Praxis takes advantage of code generation based on the current GraphQL schema. The generator should be run after any changes to GraphQL documents, as well as after any changes to the schema.

```bash
# Keep generated types and hooks in sync with the current schema
$ yarn generate
```

Read more about [GraphQL Code Generator](https://www.the-guild.dev/graphql/codegen/docs/getting-started).

## Testing

```bash
# Unit tests
$ yarn test

# Test coverage
$ yarn test --coverage
```

## Accessibility

Install the following Chrome extension provided by Deque Systems: [axe DevTools - Web Accessibility Testing](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd?hl=en-US)

Once the extension is installed, open up Chrome DevTools, and navigate to the "axe DevTools" tab. Here you can click the "Scan ALL of my page" button to check for any accessibility issues.

## Contributions

Praxis is open to contributions. Please read [CONTRIBUTING.md](https://github.com/praxis-project/praxis-ui/blob/main/CONTRIBUTING.md) for more details.
