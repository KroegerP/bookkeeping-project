
import { promises as fs } from "fs";

import type { Context }  from ".keystone/types";
import * as PrismaModule from ".prisma/client";
import { getContext } from "@keystone-6/core/context";

import { category } from "./category";
import { resetSequence } from "./utils";
import { configuration } from "../keystone";



const PURCHASE_FILE_PATHS = [
  "./seedData/purchasesData/2020.txt",
  "./seedData/purchasesData/2021.txt",
  "./seedData/purchasesData/2022.txt",
  "./seedData/purchasesData/2023.txt",
];

async function buildInitialData() {
  PURCHASE_FILE_PATHS.forEach(async (path) => {
    const data = await fs.readFile(path, "utf-8");

    const lines = data.split(/\r?\n/);

    lines.forEach((line) => {
      const values = line.split("\t");

      const valueId = category.find((c) => c.name === values[2]);

      console.log(values);

      purchases.push({ 
        date: new Date(values[0]).toISOString(), 
        description: values[1],
        category: valueId?.id.toString() ?? "12",
        cost: parseFloat(values[3]), 
        total: parseFloat(values[4]),
      });
    });
  });
  
  const purchases: { date: string; description: string; category: string; cost: number; total: number }[] = [];
  

  return purchases;
}

export async function makePurchases() {
  const purchases = await buildInitialData();
  const context: Context = getContext(configuration, PrismaModule);
  
  await configuration.db.onConnect?.(context);

  await context.prisma.purchase.deleteMany();

  await resetSequence("Purchase_id_seq", context);

  await context.db.Purchase.createMany({
    data: purchases.map((purchase) => ({ 
      date: purchase.date,
      description: purchase.description,
      cost: purchase.cost,
      total: purchase.total,
      category: { connect: { id: purchase.category } },
    })), 
  });
}

makePurchases();