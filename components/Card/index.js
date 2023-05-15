/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination } from "swiper";
import { BannerWraper } from "styles";

/* eslint-disable @next/next/no-img-element */
export default function Card({banner, compro, title, compname, location, type, webUrl, id}) {
  return (
    <div className="flex flex-col rounded-search bg-white mt-4">
      {banner.length > 0 ? (
        <BannerWraper>
          <Swiper pagination={true} modules={[Pagination]} className="banner-swiper">
            {banner.map((img, index) => (
              <SwiperSlide key={index} >
                <img src={img} alt="Job Poster" className="w-full h-[500px]" />
              </SwiperSlide>
            ))}
          </Swiper>
        </BannerWraper>
      ) : (
        <div>
          <img src={banner[0]} alt="Job Poster" className="w-full h-[500px]" />
        </div>
      )}
      <div className="flex flex-col mx-4 my-5">
        <div className="flex">
          <div className="flex jusify-center items-center rounded-search mr-3">
            <Image
              src={compro}
              alt="Job Company"
              height="40"
              width="40"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3>{title}</h3>
            <p>{compname}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center">
            <Image
              src="/icon/location-icon.svg"
              alt="Location"
              width={10}
              height={10}
            />
            <p className="ml-1">{location}</p>
            <span className="w-1 h-1 ml-1 bg-black rounded-full" />
            <p className="text-success ml-1">{type}</p>
          </div>
        </div>

        <div className="flex justify-between mt-5 relative">
          <button
            onClick={() => window.open(webUrl)}
            className="rounded-full border border-black w-1/5"
          >
            <p className="my-2 mx-auto">Follow</p>
          </button>
          <button
            className="rounded-full border border-main w-1/4"
            onClick={() => window.open("https://saweria.co/qerjapp")}
          >
            <p className="my-2 mx-auto text-main">Dukung Kami</p>
          </button>
          <Link href={id}>
            <button className="rounded-full border bg-main border-main w-1/2">
              <p className="my-2 mx-auto text-white font-bold">Apply</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
