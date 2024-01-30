import { postRouter } from "@/server/api/routers/post";
import { claimRouter } from "@/server/api/routers/claim";
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
});

// export type definition of API
export type AppRouter = typeof appRouter;
