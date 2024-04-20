import { Card } from "@repo/ui/card";
import { BalanceFields } from "@repo/ui/BalanceFields";
import React from "react";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title={"Balance"}>
      <BalanceFields fieldName={"Unlocked Balance"} amount={amount} />
      <BalanceFields fieldName={"Total Locked Balance"} amount={locked} />
      <BalanceFields fieldName={"Total Balance"} amount={locked + amount} />
    </Card>
  );
};
