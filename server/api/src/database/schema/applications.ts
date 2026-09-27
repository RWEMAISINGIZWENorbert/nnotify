import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),

    /**
     * Store only a hash of the application secret.
     * The plaintext secret belongs only to the application's backend.
     */
    secretHash: text("secret_hash").notNull(),

    /**
     * Increment when rotating the application secret.
     */
    secretVersion: text("secret_version").notNull().default("1"),

    isActive: boolean("is_active").notNull().default(true),

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
    nameUniqueIndex: uniqueIndex("applications_name_unique").on(table.name),
  }),
);