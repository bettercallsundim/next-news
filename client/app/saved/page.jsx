"use client";
import NewsCard from "@/myComponents/NewsCard";
import { useQuery } from "@tanstack/react-query";

async function getData() {
  const retrieved_user = JSON.parse(localStorage.getItem("state"))?.user;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/news/saved/${retrieved_user?.email}`
  );
  return res.json();
}
export default function SavedNews() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["saved_news"],
    queryFn: getData,
  });

  console.log(data);

  return (
    <div>
      <div className="flex flex-wrap justify-evenly gap-8">
        {data?.data?.map((elm) => {
          return <NewsCard news={elm} />;
        })}
      </div>
    </div>
  );
}
