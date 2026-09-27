import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { notificationRecipients } from "./notification-recipients.js";
import { installations } from "./installations.js";

export const notificationDeliveryStatus = pgEnum(
  "notification_delivery_status",
  ["pending", "delivered", "failed"],
);

export const notificationDeliveries = pgTable(
  "notification_deliveries",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    notificationRecipientId: uuid("notification_recipient_id")
      .notNull()
      .references(() => notificationRecipients.id, {
        onDelete: "cascade",
      }),

    installationId: uuid("installation_id")
      .notNull()
      .references(() => installations.id, {
        onDelete: "cascade",
      }),

    status: notificationDeliveryStatus("status")
      .notNull()
      .default("pending"),

    /**
     * Optional reason when delivery fails.
     */
    failureReason: text("failure_reason"),

    deliveredAt: timestamp("delivered_at", {
      withTimezone: true,
    }),

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
    recipientInstallationUnique: uniqueIndex(
      "notification_deliveries_recipient_installation_unique",
    ).on(table.notificationRecipientId, table.installationId),
  }),
);