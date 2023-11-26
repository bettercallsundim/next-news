import { ThemeProvider } from "@/components/theme-provider";
import Context from "@/myComponents/Context";
import NavigationMenuDemo from "@/myComponents/Nav";
import Oauth from "@/myComponents/Oauth";
import ReactQuery from "@/myComponents/ReactQuery";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NEWS",
  description: "NEWS curated from api",
};

export default function RootLayout({ children }) {
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Oauth>
          <QueryClientProvider client={queryClient}>
              <Context>
                <NavigationMenuDemo />
                {children}
                <Toaster />
              </Context>
              </QueryClientProvider>

          </Oauth>
        </ThemeProvider>
      </body>
    </html>
  );
}
