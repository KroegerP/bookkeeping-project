import type { Lists } from ".keystone/types";
import type { ListConfig } from "@keystone-6/core";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { float, relationship, text, timestamp } from "@keystone-6/core/fields";



export const Purchase: ListConfig<Lists.Purchase.TypeInfo> = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // this is the fields for our User list
  fields: {

    // by adding isRequired, we enforce that every User should have a name
    //   if no name is provided, an error will be displayed
    date: timestamp({
      defaultValue: "2023-12-30T18:05:29.700Z",
      validation: { isRequired: true },
    }),

    description: text({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same
      // email as another user - this may or may not be a good idea for your project,
    }),

    cost: float({ validation: { isRequired: true } }),

    total: float({ validation: { isRequired: true } }),

    // we can use this field to see what Posts this User has authored
    //   more on that in the Post list below
    category: relationship({ ref: "Category.purchases" }),

    card: relationship({ ref: "Card.purchases" }),

    createdBy: relationship({ ref: "User.purchases" }),

    createdAt: timestamp({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: "now" },
    }),
  },
});