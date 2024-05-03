import { atom } from "jotai";
import { type NetWorth, type Claim, type Transaction } from "./schema";

// Claims
export const claimUpdateAtom = atom<Claim | null>(null);
export const claimUpdateDrawerHandlerAtom = atom<boolean>(false);
export const claimAllDialogHandlerAtom = atom<boolean>(false);

// Transactions
export const transactionUpdateAtom = atom<Transaction | null>(null);
export const transactionUpdateDrawerHandlerAtom = atom<boolean>(false);
export const transactionSelectedMonthYearAtom = atom<Date | null>(new Date());

// Net Worth
export const netWorthUpdateAtom = atom<NetWorth | null>(null);
export const netWorthUpdateDrawerHandlerAtom = atom<boolean>(false);
