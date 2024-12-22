import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./components/ReduxProvider";
import GradientBackground from "./components/GradientBackground";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Resumate",
    description:
        "Get tips on how to build a more professional resume with generative artificial intelligence to help you get the job you want.",
};

export const viewport = {
    initialScale: 1.0,
    maximumScale: 1.0,
    width: "device-width",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${instrumentSans}} antialiased relative min-h-screen bg-[hsla(224,25%,90%,1)] sm:bg-[hsla(224,25%,60%,1)] flex py-10 items-center`}
            >
                <GradientBackground />
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
