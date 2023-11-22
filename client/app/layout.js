import { ThemeProvider } from "@/components/theme-provider";
import Context from "@/myComponents/Context";
import NavigationMenuDemo from "@/myComponents/Nav";
import Oauth from "@/myComponents/Oauth";
import ReactQuery from "@/myComponents/ReactQuery";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NEWS",
  description: "NEWS curated from api",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
