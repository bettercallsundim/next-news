import NewsCard from "@/myComponents/NewsCard";

async function getData() {
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=20d7fe409f074afa9f617e806689631a"
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