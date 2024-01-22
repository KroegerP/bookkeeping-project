import type { Lists } from ".keystone/types";
import type { ListConfig } from "@keystone-6/core";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";

import { makeNonNullRef } from "./utils";



export const Category: ListConfig<Lists.Category.TypeInfo> = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // this is the fields for our User list
  fields: {

    name: text({ validation: { isRequired: true }, isIndexed: "unique", ...makeNonNullRef() }),

    purchases: relationship({ ref: "Purchase.category", many: true }),
  },
});