import { atom } from "jotai";
import { type z } from "zod";
import { type claimFormSchema } from "./schema";

// Claims
export const claimUpdateAtom = atom<z.infer<typeof claimFormSchema> | null>(
  null,
);
export const claimUpdateDrawerHandlerAtom = atom<boolean>(false);

export const claimAllDialogHandlerAtom = atom<boolean>(false);
