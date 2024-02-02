import type { Lists } from ".keystone/types";
import type { ListConfig } from "@keystone-6/core";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, relationship, text, timestamp } from "@keystone-6/core/fields";

import { makeNonNullRef } from "./utils";



export const Card: ListConfig<Lists.Card.TypeInfo> = list({
  access: allowAll,

  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: "unique", ...makeNonNullRef() }),
    bank: text({ validation: { isRequired: true }, ...makeNonNullRef() }),
    lastFour: text({ validation: { isRequired: true }, isIndexed: "unique", ...makeNonNullRef() }),
    creditCard: checkbox({ defaultValue: false }),
    notes: text({ validation: { isRequired: false } }),
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