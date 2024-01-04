
import { readFile } from "fs";

import type { Context }  from ".keystone/types";
import * as PrismaModule from ".prisma/client";
import { getContext } from "@keystone-6/core/context";

import { configuration } from "../keystone";



function buildInitialData() {
  const purchases: { date: string; description: string; category: string; cost: number; total: number }[] = [];
  readFile("./seedData/purchasesData/2023.txt", "utf-8", (err, data) => {
    if (err) { throw err; }

    const lines = data.split(/\r?\n/);

    lines.forEach((line, index) => {
      console.log(`Line ${index + 1}: ${line}`);
      const values = line.split("\t");
      console.log(values);
      purchases.push({ 
        date: new Date(values[0]).toISOString(), 
        description: values[1],
        category: values[2],
        cost: parseFloat(values[3]), 
        total: parseFloat(values[4]),
      });
    });
  });

  return purchases;
}

export async function makePurchases() {
  const purchases = buildInitialData();
  const context: Context = getContext(configuration, PrismaModule);
  
  await configuration.db.onConnect?.(context);
  
  const prisma = context.prisma;

  await prisma.purchase.createMany({
    data: purchases.map((purchase) => ({ 
      date: purchase.date,
      description: purchase.description,
      cost: purchase.cost,
    })), 
  });
}