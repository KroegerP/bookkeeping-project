import { Router } from "express";

import { postPing } from "./ping";
import { asyncMiddleware } from "../utils";



export async function createApiRouter() {
  const apiRouter = Router();
  // const accessControlHandler = jwtHandler(authApi);

  apiRouter.post("/ping", asyncMiddleware(postPing));

  return apiRouter;
}