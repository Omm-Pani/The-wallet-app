import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { TransferHistory } from "../../../components/TransferHistory";

async function p2pReceived() {
  const session = await getServerSession(authOptions);
  const p2pReceived = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: Number(session?.user?.id),
    },
  });

  return p2pReceived.map((t: any) => ({
    time: t.timestamp,
    amount: t.amount,
    status: "received",
  }));
}

async function p2pSent() {
  const session = await getServerSession(authOptions);
  const p2pSent = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });

  return p2pSent.map((t: any) => ({
    time: t.timestamp,
    amount: t.amount,
    status: "Sent",
  }));
}

export default async function P2P() {
  const received = await p2pReceived();
  const sent = await p2pSent();
  const transfers = received.concat(sent);
  return (
    <div className="w-screen">
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <SendCard />
        </div>
        <div>
          <TransferHistory p2pTransfer={transfers} />
        </div>
      </div>
    </div>
  );
}
