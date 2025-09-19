import Navbar from "@/components/Navbar";

export default function SoftwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
}
