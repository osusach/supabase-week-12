export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={"bg-blue-100"}>{children}</div>;
}
