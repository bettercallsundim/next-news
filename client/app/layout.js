import { ThemeProvider } from "@/components/theme-provider";
import Context from "@/myComponents/Context";
import NavigationMenuDemo from "@/myComponents/Nav";
import ReactQuery from "@/myComponents/ReactQuery";
import { Inter } from "next/font/google";
import "./globals.css";
import Oauth from "@/myComponents/Oauth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NEWS",
  description: "NEWS curated from api",
};

export default function RootLayout({ children }) {
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
          <ReactQuery>
            <Context>
              <NavigationMenuDemo />
              {children}
            </Context>
          </ReactQuery>
          </Oauth>
        </ThemeProvider>
      </body>
    </html>
  );
}
