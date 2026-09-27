import {
  pgTable,
  text,
  timestamp,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { applications } from "./applications.js";

export const applicationUsers = pgTable(
  "application_users",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    applicationId: uuid("application_id")
      .notNull()
      .references(() => applications.id, {
        onDelete: "cascade",
      }),

    /**
     * ID belonging to the application's own user system.
     *
     * Example:
     * Rinsam → "user_123"
     */
    externalUserId: text("external_user_id").notNull(),

    /**
     * Optional generic scope/context.
     *
     * Example:
     * Rinsam → organizationId
     * School app → schoolId
     * Team app → teamId
     */
    contextId: text("context_id"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    applicationExternalUserUnique: uniqueIndex(
      "application_users_application_external_user_unique",
    ).on(table.applicationId, table.externalUserId),
  }),
);