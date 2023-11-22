import Loader from "@/myComponents/Loader";

export default function loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader />
    </div>
  );
}
