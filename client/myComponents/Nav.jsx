"use client";

import DarkMode from "@/components/DarkMode";
import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { context } from "./Context";

export default function NavigationMenuDemo() {
  const router = useRouter();
  const { state, setState } = React.useContext(context);
  const userFound = state?.user;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/news" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              News
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Saved
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {!userFound && (
          <NavigationMenuItem>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                setState({ ...state, user: credentialResponse.credential });
                router.push("/news");
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </NavigationMenuItem>
        )}
        {userFound && (
          <NavigationMenuItem>
            <button
              onClick={() => {
                setState({ ...state, user: undefined });
                router.push("/");
                googleLogout();
              }}
            >
              Logout
            </button>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <DarkMode />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
