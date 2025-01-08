export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"min-h-screen flex flex-col bg-blue-100"}>
      <div>{children}</div>
    </div>
  );
}
