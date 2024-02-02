import type { KeystoneContext } from "@keystone-6/core/types";
import type { NextFunction, Request, Response, RequestHandler } from "express";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeContextMiddleware(context: KeystoneContext<any>) {
  const middleware: RequestHandler = async (req, res, next) => {
    req.context = await context.withRequest(req, res);
    next();
  };

  return middleware;
}

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export function asyncMiddleware(fn: AsyncRequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}