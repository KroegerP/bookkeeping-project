import type { Request, Response } from "express";
/*
  This example route handler finds the first user and returns their name
*/

export async function postPing(req: Request, res: Response) {
  const { context } = req;

  const data = await context.db.User.findOne({
    where: {
      id: "1",
    },
  });

  if (data) {
    res.json(data.name);  
  } else {
    res.json("Pong");
  }
}