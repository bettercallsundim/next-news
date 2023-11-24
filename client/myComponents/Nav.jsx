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
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { context } from "./Context";

export default function NavigationMenuDemo() {
  const router = useRouter();
  const { state, setState } = React.useContext(context);
  const [user, setUser] = React.useState({});
  const userFound = state?.user;
  const logged_in = () => toast.success("Successfully logged in");
  React.useEffect(() => {
    const retrieved_user = JSON.parse(localStorage.getItem("state"))?.user;
    setUser({
      ...retrieved_user,
    });
  }, []);
  async function signUp(cred) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/signup`,
        {
          credentials: cred,
        }
      );
      if (data.success) {
        const retrieved = JSON.parse(localStorage.getItem("state"));
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...retrieved,
            user: {
              ...retrieved.user,
              name: data.data.name,
              email: data.data.email,
              picture: data.data.picture,
              saved_news: data.data.saved_news,
            },
          })
        );
        setState({
          ...retrieved,
          user: {
            ...retrieved.user,
            name: data.data.name,
            email: data.data.email,
            picture: data.data.picture,
            saved_news: data.data.saved_news,
          },
        });
        const again_retrieved = JSON.parse(localStorage.getItem("state"))?.user;
        setUser(again_retrieved);
      }
    } catch (er) {
      console.log(er);
    }
  }
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
              Saved{" "}
              <span className="ml-2">
                <FaHeart size="20px" />
              </span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {!userFound && (
          <NavigationMenuItem>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                setState({
                  ...state,
                  user: {
                    ...state.user,
                    token: credentialResponse.credential,
                  },
                });
                router.push("/news");
                signUp(credentialResponse);
                const retrieved = JSON.parse(
                  localStorage.getItem("state")
                )?.user;
                console.log(retrieved);
                localStorage.setItem(
                  "state",
                  JSON.stringify({
                    user: {
                      ...retrieved,
                      token: credentialResponse.credential,
                    },
                  })
                );
                console.log(credentialResponse);
                logged_in();
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </NavigationMenuItem>
        )}
        {user?.email && (
          <NavigationMenuItem>
            <img
              className="w-10 h-10 rounded-full inline-block"
              src={user?.picture}
            />
          </NavigationMenuItem>
        )}
        {userFound && (
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <button
                onClick={() => {
                  setState({ ...state, user: undefined });
                  localStorage.removeItem("state");
                  router.push("/");
                  googleLogout();
                  setUser(null);
                }}
              >
                Logout
              </button>
            </NavigationMenuLink>
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
