
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maruti Suzuki Service Estimator",
  description: "Get an instant estimate for your vehicle's service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <ThemeProvider>
        <body className={`${inter.className} antialiased`}>
          {children}
          <Toaster />
          {/* Disable react-devtools in production */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
              for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
                window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == 'function' ? () => {} : null;
              }
            }
          `,
            }}
          />
        </body>
      </ThemeProvider>
    </html>
  );
}
