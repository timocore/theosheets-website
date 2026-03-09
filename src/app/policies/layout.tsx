export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-parchment">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {children}
      </div>
    </main>
  );
}
