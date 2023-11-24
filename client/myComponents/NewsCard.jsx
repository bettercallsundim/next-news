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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { context } from "./Context";

export default function NewsCard({ className, ...props }) {
  const { news } = props;
  const router = useRouter();
  const { state, setState } = useContext(context);
  const { user } = state;
  const [fav, setFave] = useState(false);
  function handleClick(article) {
    setState({ ...state, current: article });
    router.push(`/news/${article.title.split(" ").join("-")}`);
  }
  async function handleFav(news) {
    setFave(!fav);
    console.log(state);
    if (user?.token) {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND}/news/save`, {
          news,
          user,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("something wrong");
    }
  }
  function handleUnfav() {
    setFave(!fav);
  }
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>{news.title}</CardTitle>
        <div className="flex justify-between">
          <CardDescription>{news.source.name}</CardDescription>
          {fav ? (
            <button onClick={handleUnfav}>
              <FaHeart size="20px" />
            </button>
          ) : (
            <button
              onClick={() => {
                handleFav({
                  title: news.title,
                  description: news.description,
                  content: news.content,
                  img: news.urlToImage,
                  url: news.url,
                });
              }}
            >
              <FaRegHeart size="20px" />
            </button>
          )}
        </div>
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
