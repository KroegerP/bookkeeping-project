// Welcome to some authentication for Keystone
//
// This is using @keystone-6/auth to add the following
// - A sign-in page for your Admin UI
// - A cookie-based stateless session strategy
//    - Using a User email as the identifier
//    - 30 day cookie expiration
//
// This file does not configure what Users can do, and the default for this starter
// project is to allow anyone - logged-in or not - to do anything.
//
// If you want to prevent random people on the internet from accessing your data,
// you can find out how by reading https://keystonejs.com/docs/guides/auth-and-access-control
//
// If you want to learn more about how our out-of-the-box authentication works, please
// read https://keystonejs.com/docs/apis/auth#authentication-api

// see https://keystonejs.com/docs/apis/session for the session docs
import { statelessSessions } from "@keystone-6/core/session";

// import { createPingAuth } from "./createPingAuth";
// import { isPerformingCi, isProduction } from "../../../utils/environ";


// for a stateless session, a SESSION_SECRET should always be provided
const sessionSecret = process.env.SESSION_SECRET;
// if (!sessionSecret && isProduction() && !isPerformingCi()) {
//   throw new Error("Session secret is not defined!");
// }

// const { withPingAuth } = createPingAuth({
//   listKey: "User",
//   identityField: "email",
//   sessionData: "email firstName lastName lastActiveAt token",
// });

// statelessSessions uses cookies for session tracking
//   these cookies have an expiry, in seconds
//   Expire after 2 hours, like PingID tokens
const sessionMaxAge = 60 * 60 * 2;

// you can find out more at https://keystonejs.com/docs/apis/session#session-api
const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

export { session };
