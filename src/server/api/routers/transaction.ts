import { z } from "zod";
import { transactions, transactionGroups } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { and, eq } from "drizzle-orm";

export const transactionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        item: z.string(),
        amount: z.number(),
        category: z.string(),
        date: z.date(),
        transactionGroupId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(transactions).values({
        item: input.item,
        amount: input.amount,
        category: input.category,
        date: input.date,
        createdById: ctx.session.user.id,
        transactionGroupId: input.transactionGroupId,
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        item: z.string(),
        amount: z.number(),
        category: z.string(),
        date: z.date(),
        transactionGroupId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(transactions)
        .set({
          item: input.item,
          amount: input.amount,
          category: input.category,
          date: input.date,
          transactionGroupId: input.transactionGroupId,
        })
        .where(eq(transactions.id, Number(input.id)));
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(transactions)
        .where(eq(transactions.id, Number(input.id)));
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        transactionGroupId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.transactions.findMany({
        where: eq(transactions.transactionGroupId, input.transactionGroupId),
        orderBy: (transactions, { desc }) => [desc(transactions.date)],
      });
    }),
  getAllByMonth: protectedProcedure
    .input(
      z.object({
        transactionGroupId: z.number(),
        year: z.number(),
        month: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.transactions.findMany({
        where: and(
          eq(transactions.createdById, ctx.session.user.id),
          eq(transactions.date, new Date(input.year, input.month - 1, 1)),
        ),
        orderBy: (transactions, { desc }) => [desc(transactions.date)],
      });
    }),
  getUserTransactionGroups: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.transactionGroups.findMany({
      where: and(
        eq(transactionGroups.createdById, ctx.session.user.id),
        eq(transactionGroups.editable, false),
      ),
    });
  }),
});
