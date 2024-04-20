export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="p-4 border bg-white rounded-xl bg-[#ededed]">
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
