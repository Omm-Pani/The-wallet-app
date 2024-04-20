import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/AddMoney";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

export default async function Transfers() {
  const transactions = await getOnRampTransactions();
  const balance = await getBalance();
  return (
    <div className="w-screen">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
