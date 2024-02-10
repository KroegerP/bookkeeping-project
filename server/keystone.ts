// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from "@keystone-6/core";

// to keep this file tidy, we define our schema in a different file
import { withAuth, session } from "./auth";
import { extendExpressApp } from "./src/express";
import { extendGraphqlSchema } from "./src/graphql";
import { lists } from "./src/schema";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data

export const configuration = config({
  db: {
    provider: "postgresql",
    url: "postgres://postgres:test@localhost:5432",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onConnect: async (context) => { /* ... */ },
    // Optional advanced configuration
    enableLogging: true,
    idField: { kind: "autoincrement" },
    shadowDatabaseUrl: "postgres://postgres:test@localhost:5432/shadowdb",
  },
  lists,
  session,
  server: {
    port: 5000,
    cors: { origin: "*", },
    extendExpressApp: extendExpressApp,
  },
  extendGraphqlSchema: extendGraphqlSchema,
});

export default withAuth(
  configuration,
);
