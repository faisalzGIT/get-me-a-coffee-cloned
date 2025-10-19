import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
    
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me A Coffee - Grow by Funds",
  description: "This is a website to help you grow by funds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased h-full relative`}>
        <SessionWrapper>
            <Navbar />
            <div className="relative min-h-[86vh] h-full overflow-hidden bg-gradient-to-b from-black via-black to-gray-900 flex flex-col justify-center items-center">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient   (circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient  (circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

                

                {children}
            </div>

            <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}