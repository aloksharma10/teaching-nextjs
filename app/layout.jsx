import { Inter } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "@/components/provider/product-provider";
import { CustomerProvider } from "@/components/provider/customer-provider";
import { InvoiceProvider } from "@/components/provider/invoice-provider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GST Invoice - Mukesh Traders",
  description: "Generated with very much effort.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange>
          <ProductProvider>
            <CustomerProvider>
              <InvoiceProvider>
                {children}
              </InvoiceProvider>
            </CustomerProvider>
          </ProductProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
