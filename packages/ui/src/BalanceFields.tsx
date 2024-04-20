export function BalanceFields({
  fieldName,
  amount,
}: {
  fieldName: string;
  amount: number;
}): JSX.Element {
  return (
    <div className="flex justify-between border-b border-slate-300 py-2">
      <div>{fieldName}</div>
      <div>{amount} INR</div>
    </div>
  );
}
