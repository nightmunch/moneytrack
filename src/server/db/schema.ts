import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  primaryKey,
  text,
  varchar,
  timestamp,
  index,
  integer,
  bigserial,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const posts = pgTable(
  "post",
  {
    id: bigserial("id", { mode: "number" }).notNull().primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const transactionGroups = pgTable(
  "transactionGroup",
  {
    id: bigserial("id", { mode: "number" }).notNull().primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    income: doublePrecision("income").notNull().default(0.0),
  },
  (transactionGroup) => ({
    createdByIdIdx: index("createdById_idx").on(transactionGroup.createdById),
    nameIndex: index("name_idx").on(transactionGroup.name),
  }),
);

export const transactionGroupsRelations = relations(
  transactionGroups,
  ({ one, many }) => ({
    createdById: one(users, {
      fields: [transactionGroups.createdById],
      references: [users.id],
    }),
    transactionGroupsUsers: many(transactionGroupUsers),
  }),
);

export const transactions = pgTable(
  "transaction",
  {
    id: bigserial("id", { mode: "number" }).notNull().primaryKey(),
    item: varchar("item", { length: 256 }).notNull(),
    category: varchar("category", { length: 256 }).notNull(),
    amount: doublePrecision("amount").notNull(),
    date: timestamp("date").notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (transaction) => ({
    createdByIdIdx: index("createdById_idx").on(transaction.createdById),
    nameIndex: index("name_idx").on(transaction.item),
    dateIndex: index("date_idx").on(transaction.date),
  }),
);

export const transactionRelations = relations(transactions, ({ one }) => ({
  createdById: one(users, {
    fields: [transactions.createdById],
    references: [users.id],
  }),
}));

export const transactionGroupUsers = pgTable(
  "transactionGroupUser",
  {
    transactionGroupId: bigserial("transactionGroupId", {
      mode: "number",
    })
      .notNull()
      .references(() => transactionGroups.id, { onDelete: "cascade" }),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdById: varchar("createdById", { length: 255 }).notNull(),
  },
  (transactionGroupUser) => ({
    transactionGroupIdIdx: index("transactionGroupId_idx").on(
      transactionGroupUser.transactionGroupId,
    ),
    createdByIdIdx: index("createdById_idx").on(
      transactionGroupUser.createdById,
    ),
    userIdIdx: index("userId_idx").on(transactionGroupUser.userId),
    compoundKey: primaryKey(
      transactionGroupUser.transactionGroupId,
      transactionGroupUser.userId,
    ),
  }),
);

export const transactionGroupUsersRelations = relations(
  transactionGroupUsers,
  ({ one }) => ({
    createdById: one(users, {
      fields: [transactionGroupUsers.createdById],
      references: [users.id],
    }),
    user: one(users, {
      fields: [transactionGroupUsers.userId],
      references: [users.id],
    }),
    transactionGroup: one(transactionGroups, {
      fields: [transactionGroupUsers.transactionGroupId],
      references: [transactionGroups.id],
    }),
  }),
);

export const claims = pgTable(
  "claim",
  {
    id: bigserial("id", { mode: "number" }).notNull().primaryKey(),
    item: varchar("item", { length: 256 }).notNull(),
    amount: doublePrecision("amount").notNull(),
    date: timestamp("date").notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (claim) => ({
    createdByIdIdx: index("createdById_idx").on(claim.createdById),
    nameIndex: index("name_idx").on(claim.item),
    dateIndex: index("date_idx").on(claim.date),
  }),
);

export const claimsRelations = relations(claims, ({ one }) => ({
  createdById: one(users, {
    fields: [claims.createdById],
    references: [users.id],
  }),
}));

export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    precision: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  claims: many(claims),
  transactions: many(transactions),
  transactionGroupUsers: many(transactionGroupUsers),
}));

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = pgTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
