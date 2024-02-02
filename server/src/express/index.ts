import type { Context } from ".keystone/types";
import type { Express } from "express";
import { json } from "express";

import { createApiRouter } from "./api";
import { makeContextMiddleware } from "./utils";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function extendExpressApp(app: Express, context: Context) {
  app.use(json());

  app.get("/status", (_, res) => res.send("Ready"));

  const apiRouter = await createApiRouter();

  app.use("/api", makeContextMiddleware(context), apiRouter);
}
