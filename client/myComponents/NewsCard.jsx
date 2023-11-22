"use client";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { context } from "./Context";

export default function NewsCard({ className, ...props }) {
  const { news } = props;
  const router = useRouter();
  const { state, setState } = useContext(context);
  console.log("state",state);
  function handleClick(article) {
    setState({ ...state, current: article });
    router.push(`/news/${article.title.split(" ").join("-")}`);
  }
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>{news.title}</CardTitle>
        <CardDescription>{news.source.name}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md ">
          <div className="flex-1 space-y-1">
            <p className="mb-4">
              <img src={news.urlToImage} alt="" />
            </p>
            <p className="text-sm font-medium leading-none">
              {news.description}
            </p>
          </div>
        </div>
        <div></div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handleClick(news)} className="w-full">
          <Check className="mr-2 h-4 w-4" /> Read More
        </Button>
      </CardFooter>
    </Card>
  );
}
