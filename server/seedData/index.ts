import type { Context }  from ".keystone/types";
import * as PrismaModule from ".prisma/client";
import { getContext } from "@keystone-6/core/context";

import { category } from "./category";
import { resetSequence } from "./utils";
import { configuration } from "../keystone";

 

async function seedData() {
  const context: Context = getContext(configuration, PrismaModule);

  await configuration.db.onConnect?.(context);

  const prisma = context.prisma;

  await prisma.category.deleteMany();

  const categoryName = "Category_id_seq";

  await resetSequence(categoryName, context);

  await context.db.Category.createMany({ data: category.map((c) => ({ name: c.name })) });
}

seedData();