import type { Request, Response } from "express";
/*
  This example route handler creates a test brand and returns its ID
*/

export async function postPing(req: Request, res: Response) {
  // const { context } = req;


  res.json("Pong");
}