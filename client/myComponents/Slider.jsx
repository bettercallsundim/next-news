"use client";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

// Import Swiper styles
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function Slider() {
  const [news, setNews] = useState([]);
  async function getData() {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI}`
    );
    const resp = await res.json();
    setNews(resp?.articles);
    return;
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {news?.map((elm) => (
        <SwiperSlide className="">
          <img className="w-[500px]" src={elm?.urlToImage} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
