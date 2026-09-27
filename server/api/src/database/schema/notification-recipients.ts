import {
  pgTable,
  timestamp,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { notifications } from "./notifications.js";
import { applicationUsers } from "./users.js";

export const notificationRecipients = pgTable(
  "notification_recipients",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    notificationId: uuid("notification_id")
      .notNull()
      .references(() => notifications.id, {
        onDelete: "cascade",
      }),

    applicationUserId: uuid("application_user_id")
      .notNull()
      .references(() => applicationUsers.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    notificationUserUnique: uniqueIndex(
      "notification_recipients_notification_user_unique",
    ).on(table.notificationId, table.applicationUserId),
  }),
);