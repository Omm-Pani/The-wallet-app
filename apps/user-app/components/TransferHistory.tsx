import { Card } from "@repo/ui/card";

export const TransferHistory = ({
  p2pTransfer,
}: {
  p2pTransfer: {
    time: Date;
    amount: number;
    status: string;
  }[];
}) => {
  if (!p2pTransfer?.length) {
    return (
      <Card title="Recent transactions">
        <div className="text-center pb-8 pt-8"> No Recent Transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {p2pTransfer.map((p) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">{p.status} INR</div>
              <div className="text-slate-600 text-xs">
                {p.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">+ Rs {p.amount}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};
