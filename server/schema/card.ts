import type { Lists } from ".keystone/types";
import type { ListConfig } from "@keystone-6/core";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, relationship, text, timestamp } from "@keystone-6/core/fields";



export const Card: ListConfig<Lists.Card.TypeInfo> = list({
  access: allowAll,

  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    bank: text({ validation: { isRequired: true } }),
    lastFour: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    creditCard: checkbox(),
    notes: text(),
    purchases: relationship({ ref: "Purchase.card", many: true }),
    expiresAt: timestamp({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: "now" },
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});