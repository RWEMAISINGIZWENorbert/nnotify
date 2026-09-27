import {
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { applications } from "./applications.js";

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),

  applicationId: uuid("application_id")
    .notNull()
    .references(() => applications.id, {
      onDelete: "cascade",
    }),

  /**
   * Application-defined notification type.
   *
   * Examples:
   * sale.created
   * stock.low
   * message.received
   */
  type: text("type").notNull(),

  /**
   * Human-readable notification title.
   */
  title: text("title").notNull(),

  /**
   * Human-readable notification body.
   */
  body: text("body").notNull(),

  /**
   * Flexible payload used by the Flutter SDK.
   *
   * Example:
   * {
   *   "saleId": "sale_123",
   *   "organizationId": "org_456"
   * }
   */
  data: jsonb("data"),

  /**
   * Optional user who caused the event.
   * This remains an external application user ID.
   */
  actorUserId: text("actor_user_id"),

  /**
   * Optional generic context/scope.
   *
   * Example:
   * organizationId = "org_123"
   */
  contextId: text("context_id"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});