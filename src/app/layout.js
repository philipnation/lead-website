import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/global/Toast";
import localFont from "next/font/local";
import Providers from "./providers";


const myfont = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Roboto-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/Roboto-Black.ttf",
      weight: "900",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myfont.className}>
        <Providers>
          <ToastProvider />          
          {children}  
        </Providers>
      </body>
    </html>
  );
}