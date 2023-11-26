"use client";
import NewsCard from "@/myComponents/NewsCard";
import { useQuery } from "@tanstack/react-query";

async function getData() {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI}`
  );
  return res.json();
}
export default async function News() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["news"],
    queryFn: getData,
  });

  console.log(data);

  return (
    <div>
      <div className="flex flex-wrap justify-evenly gap-8">
        {data?.articles?.map((elm) => {
          return <NewsCard news={elm} />;
        })}
      </div>
    </div>
  );
}
