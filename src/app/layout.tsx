import type { Metadata } from "next";
import "./globals.css";
import { StateProvider } from "./StateProvider";
import Navbar from "@/components/Navbar";
import { verifySession } from "./lib/dal";

export const metadata: Metadata = {
  title: "Rentify",
  description: "Find your rental car now!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  const userId: number | null =
    session.userId != null ? (session.userId as number) : null;
  return (
    <html lang="en">
      <body className={`flex items-center justify-center column flex-col`}>
        <StateProvider>
          {
            <>
              <Navbar userId={userId} />
              {children}
            </>
          }
        </StateProvider>
      </body>
    </html>
  );
}
