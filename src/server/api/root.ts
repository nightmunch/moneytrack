import { postRouter } from "@/server/api/routers/post";
import { claimRouter } from "@/server/api/routers/claim";
import { netWorthRouter } from "@/server/api/routers/net-worth";
import { transactionRouter } from "@/server/api/routers/transaction";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  claim: claimRouter,
  transaction: transactionRouter,
  netWorth: netWorthRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
