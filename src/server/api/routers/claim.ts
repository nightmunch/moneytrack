import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { claims } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const claimRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ item: z.string(), amount: z.number(), date: z.date() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(claims).values({
        item: input.item,
        amount: input.amount,
        date: input.date,
        createdById: ctx.session.user.id,
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        item: z.string(),
        amount: z.number(),
        date: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(claims)
        .set({
          item: input.item,
          amount: input.amount,
          date: input.date,
        })
        .where(eq(claims.id, Number(input.id)));
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(claims).where(eq(claims.id, Number(input.id)));
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.claims.findMany({
      where: eq(claims.createdById, ctx.session.user.id),
      orderBy: (claims, { desc }) => [desc(claims.date)],
    });
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db
      .delete(claims)
      .where(eq(claims.createdById, ctx.session.user.id));
  }),
});
