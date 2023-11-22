import NewsCard from "@/myComponents/NewsCard";

async function getData() {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI}`
  );
  return res.json();
}
export default async function News() {
  // const { isLoading, error, data } = useQuery("news", () =>
  //   fetch(
  //     "https://jsonplaceholder.typicode.com/users"
  //   ).then((res) => res.json())
  // );
  // console.log(data);
  const data = await getData();
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
