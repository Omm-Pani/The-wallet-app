"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }

  const token = (Math.random() * 1000).toString();
  await prisma.onRampTransaction.create({
    data: {
      provider: provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      amount: amount,
      userId: Number(session?.user?.id),
    },
  });

  return {
    message: "Done",
  };
}
