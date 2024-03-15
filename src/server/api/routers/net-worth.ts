import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { netWorths } from "@/server/db/schema";
import { eq } from "drizzle-orm";

import { env } from "@/env";

export const netWorthRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        item: z.string(),
        amount: z.number(),
        remarks: z.string().optional(),
        currency: z.string(),
        category: z.string(),
        liquidity: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(netWorths).values({
        item: input.item,
        amount: input.amount,
        remarks: input.remarks,
        currency: input.currency,
        category: input.category,
        liquidity: input.liquidity,
        createdById: ctx.session.user.id,
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        item: z.string(),
        amount: z.number(),
        remarks: z.string().optional(),
        currency: z.string(),
        category: z.string(),
        liquidity: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(netWorths)
        .set(input)
        .where(eq(netWorths.id, input.id));
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(netWorths).where(eq(netWorths.id, input.id));
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.netWorths.findMany({
      where: eq(netWorths.createdById, ctx.session.user.id),
      orderBy: (netWorths, { desc }) => desc(netWorths.id),
    });
  }),
  getCryptoPriceInMYR: publicProcedure
    .input(z.object({ symbol: z.string() }))
    .query(async ({ input }) => {
      if (!env.COIN_API_KEY) {
        throw new Error("Missing COIN_API_KEY");
      }
      const response = await fetch(
        `https://rest.coinapi.io/v1/exchangerate/${input.symbol}/MYR`,
        {
          headers: {
            "X-CoinAPI-Key": env.COIN_API_KEY,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch crypto price");
      }

      const data = (await response.json()) as { rate: number };

      return data.rate;
    }),
});
