"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  configuration: () => configuration,
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core6 = require("@keystone-6/core");

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// src/express/index.ts
var import_express2 = require("express");

// src/express/api/index.ts
var import_express = require("express");

// src/express/api/ping.ts
async function postPing(req, res) {
  const { context } = req;
  const data = await context.db.User.findOne({
    where: {
      id: "1"
    }
  });
  if (data) {
    res.json(data.name);
  } else {
    res.json("Pong");
  }
}

// src/express/utils.ts
function makeContextMiddleware(context) {
  const middleware = async (req, res, next) => {
    req.context = await context.withRequest(req, res);
    next();
  };
  return middleware;
}
function asyncMiddleware(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

// src/express/api/index.ts
async function createApiRouter() {
  const apiRouter = (0, import_express.Router)();
  apiRouter.post("/ping", asyncMiddleware(postPing));
  return apiRouter;
}

// src/express/index.ts
async function extendExpressApp(app, context) {
  app.use((0, import_express2.json)());
  app.get("/status", (_, res) => res.send("Ready"));
  const apiRouter = await createApiRouter();
  app.use("/api", makeContextMiddleware(context), apiRouter);
}

// src/graphql/index.ts
var import_core = require("@keystone-6/core");
function sortItems(a, b) {
  if (a.createdAt === b.createdAt || !a.createdAt || !b.createdAt) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }
  return a.createdAt > b.createdAt ? 1 : -1;
}
var extendGraphqlSchema = import_core.graphql.extend((base) => {
  return {
    query: {
      getOrderedPurchases: import_core.graphql.field({
        type: base.object("Purchase"),
        args: {
          cutOffDate: import_core.graphql.arg({ type: import_core.graphql.DateTime })
        },
        async resolve(source, { cutOffDate }, context) {
          const initialSort = await context.db.Purchase.findMany({
            where: cutOffDate ? {
              date: {
                lte: cutOffDate.toISOString()
              }
            } : void 0,
            orderBy: {
              createdAt: "desc" /* Desc */
            }
          });
          const finalSort = initialSort.toSorted(sortItems);
          return finalSort;
        }
      })
    }
  };
});

// src/schema/card.ts
var import_core2 = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");

// src/schema/utils/index.ts
function makeNonNullRef() {
  return {
    graphql: {
      isNonNull: {
        read: true,
        create: true,
        update: true
      }
    }
  };
}

// src/schema/card.ts
var Card = (0, import_core2.list)({
  access: import_access.allowAll,
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique", ...makeNonNullRef() }),
    bank: (0, import_fields.text)({ validation: { isRequired: true }, ...makeNonNullRef() }),
    lastFour: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique", ...makeNonNullRef() }),
    creditCard: (0, import_fields.checkbox)({ defaultValue: false }),
    notes: (0, import_fields.text)({ validation: { isRequired: false } }),
    purchases: (0, import_fields.relationship)({ ref: "Purchase.card", many: true }),
    expiresAt: (0, import_fields.timestamp)({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: "now" }
    }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// src/schema/category.ts
var import_core3 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var Category = (0, import_core3.list)({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: import_access2.allowAll,
  // this is the fields for our User list
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true }, isIndexed: "unique", ...makeNonNullRef() }),
    purchases: (0, import_fields2.relationship)({ ref: "Purchase.category", many: true })
  }
});

// src/schema/purchase.ts
var import_core4 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var Purchase = (0, import_core4.list)({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: import_access3.allowAll,
  // this is the fields for our User list
  fields: {
    // by adding isRequired, we enforce that every User should have a name
    //   if no name is provided, an error will be displayed
    date: (0, import_fields3.timestamp)({
      defaultValue: "2023-12-30T18:05:29.700Z",
      validation: { isRequired: true },
      ...makeNonNullRef()
    }),
    description: (0, import_fields3.text)({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same
      // email as another user - this may or may not be a good idea for your project,
      ...makeNonNullRef()
    }),
    cost: (0, import_fields3.float)({
      validation: { isRequired: true },
      ...makeNonNullRef()
    }),
    total: (0, import_fields3.float)({ validation: { isRequired: true }, ...makeNonNullRef() }),
    // we can use this field to see what Posts this User has authored
    //   more on that in the Post list below
    category: (0, import_fields3.relationship)({ ref: "Category.purchases", ...makeNonNullRef() }),
    card: (0, import_fields3.relationship)({ ref: "Card.purchases" }),
    createdBy: (0, import_fields3.relationship)({ ref: "User.purchases" }),
    createdAt: (0, import_fields3.timestamp)({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: "now" }
    })
  }
});

// src/schema/user.ts
var import_core5 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var User = (0, import_core5.list)({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: import_access4.allowAll,
  // this is the fields for our User list
  fields: {
    // by adding isRequired, we enforce that every User should have a name
    //   if no name is provided, an error will be displayed
    name: (0, import_fields4.text)({ validation: { isRequired: true } }),
    email: (0, import_fields4.text)({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same
      // email as another user - this may or may not be a good idea for your project
      isIndexed: "unique"
    }),
    password: (0, import_fields4.password)({ validation: { isRequired: true } }),
    purchases: (0, import_fields4.relationship)({ ref: "Purchase.createdBy", many: true }),
    createdAt: (0, import_fields4.timestamp)({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: "now" }
    })
  }
});

// src/schema/index.ts
var lists = {
  User,
  Purchase,
  Category,
  Card
};

// keystone.ts
var configuration = (0, import_core6.config)({
  db: {
    provider: "postgresql",
    url: "postgres://postgres:test@localhost:5432",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onConnect: async (context) => {
    },
    idField: { kind: "autoincrement" },
    shadowDatabaseUrl: "postgres://postgres:test@localhost:5432/shadowdb"
  },
  lists,
  session,
  server: {
    port: 5e3,
    cors: { origin: "*" },
    extendExpressApp
  },
  extendGraphqlSchema
});
var keystone_default = withAuth(
  configuration
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configuration
});
//# sourceMappingURL=config.js.map
