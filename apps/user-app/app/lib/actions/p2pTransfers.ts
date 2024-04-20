"use server";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";

export async function p2pTransfers(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Error while sending",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });
  if (!toUser) {
    return {
      message: "User not found",
    };
  }

  await prisma.$transaction(async (tx: any) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
    const fromBalance = await tx.balance.findUnique({
      where: {
        userId: Number(from),
      },
    });

    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("insufficientFunds");
    }

    await tx.balance.update({
      where: {
        userId: Number(from),
      },
      data: {
        amount: { decrement: amount },
      },
    });

    await tx.balance.update({
      where: {
        userId: Number(toUser.id),
      },
      data: {
        amount: { increment: amount },
      },
    });
    await tx.p2pTransfer.create({
      data: {
        fromUserId: Number(from),
        toUserId: Number(toUser.id),
        amount: amount,
        timestamp: new Date(),
      },
    });
  });
}
