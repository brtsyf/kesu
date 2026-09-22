export const metadata = {
  title: "Kesu Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-auto">
      {children}
    </div>
  );
}
