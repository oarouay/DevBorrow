import { Fugaz_One,Open_Sans } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });
const opensans = Open_Sans({ subsets: ["latin"]});

export const metadata = {
  title: "DevBorrow",
  description: "Arouay .inc",
};
const Footer = () => (
  <footer className="p-4 sm:p-8 grid place-items-center">
    <p className={' ' + fugaz.className}>All rights belong to Arouay Inc.</p>
  </footer>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${opensans.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
