import { Geist, Geist_Mono } from "next/font/google";
import { Card, CardBody } from "@nextui-org/react";
import PageHead from "@/components/commons/PageHead";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20`}
    >
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <PageHead />
        <Card>
          <CardBody>
            <p>Server Kimia Fisik</p>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}