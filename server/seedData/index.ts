import type { Context }  from ".keystone/types";
import * as PrismaModule from ".prisma/client";
import { getContext } from "@keystone-6/core/context";

import { category } from "./category";
import { configuration } from "../keystone";

 

async function seedData() {
  const context: Context = getContext(configuration, PrismaModule);

  await configuration.db.onConnect?.(context);

  const prisma = context.prisma;

  await prisma.category.deleteMany();

  const categoryName = "Category_id_seq";

  // eslint-disable-next-line quotes
  const seqReset = `ALTER SEQUENCE
    "${categoryName}" RESTART WITH 1`;
  await prisma.$queryRawUnsafe(seqReset);

  //   const promises: any[] = [];
  
  //   category.forEach(async (category) => {
  //     console.log(`Creating category ${category.name}`);
  //     promises.push(new Promise((resolve) => 
  //       context.db.Category.createOne({ data: { name: category.name } }).then(resolve)));
  //   });
  await context.db.Category.createMany({ data: category.map((c) => ({ name: c.name })) });

//   Promise.all(promises);
}

seedData();