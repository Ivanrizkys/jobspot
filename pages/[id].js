/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useGetJob } from "service/job";
import { BannerWraper } from "styles";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination } from "swiper";

export default function Detail() {
  const router = useRouter()

  const {data: job, isLoading} = useGetJob(router.query.id, !!router.query.id)
  
  const func = (e) => {
    // const applyBtn = document.getElementById("applyButton");
    // applyBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const toggleMore = document.getElementById("toggleMore");
    if (toggleMore.classList.contains("hidden")) {
      toggleMore.classList.remove("hidden");
    } else {
      toggleMore.classList.add("hidden");
    }
  };

  const toggleDonation = (e) => {
    e.preventDefault();
    const toggleDonation = document.getElementById("toggleDonation");
    if (toggleDonation.classList.contains("hidden")) {
      toggleDonation.classList.remove("hidden");
    } else {
      toggleDonation.classList.add("hidden");
    }
  };

  const copyToClipboard = (text) => {
    /* Get the text field */
    // const copyText = document.getElementById("emailCopy").classList.value;
    const alert = document.getElementById("alert");

    /* Copy the text inside the element */
    navigator.clipboard.writeText(text);

    /* Alert the copied text */
    alert.classList.remove("hidden");

    setTimeout(() => {
      alert.classList.add("hidden");
    }, 1500);
  };

  if (isLoading) return null

  return (
    <>
      <div className="flex flex-col min-h-screen max-h-full bg-white">
        <div className="mx-4 my-5">
          <div
            onClick={() => Router.back()}
            className="flex justify-center items-center bg-main-blur w-9 h-9 rounded-search cursor-pointer"
          >
            <Image
              src="/icon/arrow-back-icon.svg"
              alt="Back"
              width={17.5}
              height={17.5}
            />
          </div>

          <div className="flex flex-col mt-10">
            <div className="flex">
              <div className="flex jusify-center items-center rounded-search mr-3">
                <img
                  src={job?.data?.company_logo}
                  alt="Job Company"
                  height="40"
                  width="40"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3>{job?.data?.title}</h3>
                <p className="cursor-pointer" onClick={() => window.location.href = "/search?companyName=" + job?.data?.company_name}>{job?.data?.company_name}</p>
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
                <p className="ml-1">{job?.data?.location}</p>
                <span className="w-1 h-1 ml-1 bg-black rounded-full" />
                <p className="text-success ml-1">{job?.data?.type}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2">Job Poster</h3>
              {/* <img
                className="mt-2 rounded-search w-full h-[550px]"
                src={job?.data?.banner[0]}
                alt="Job Poster"
              /> */}
              {job?.data?.banner?.length > 0 ? (
                <BannerWraper>
                  <Swiper pagination={true} modules={[Pagination]} className="banner-swiper">
                    {job?.data?.banner?.map((img, index) => (
                      <SwiperSlide key={index} >
                        <img src={img} alt="Job Poster" className="rounded-search w-full h-[550px]" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </BannerWraper>
              ) : (
                <div>
                  <img src={job?.data?.banner[0]} alt="Job Poster" className="rounded-search w-full h-[550px]" />
                </div>
              )}
            </div>

            <div className="mt-5" dangerouslySetInnerHTML={{__html: job?.data?.description}}></div>

            <div className="flex justify-between mt-5 relative">
              <div id="toggleMore" className="hidden">
                {/* Copied */}
                <div
                  id="alert"
                  className="bg-green-200 px-3 py-1 rounded-3xl max-w-max mb-1 right-0 bottom-22 absolute transition-all duration-150 hidden"
                >
                  <p className="text-green-600">Copied!</p>
                </div>

                <div
                  id="toggleMore"
                  className="bg-white shadow-lg rounded-full bottom-10 right-0 absolute"
                >
                  <div className="flex mx-3 my-3">
                    <a
                      href={job?.data?.website_url}
                      rel="noreferrer noopener"
                      className="hover:underline cursor-pointer flex items-center mr-2"
                    >
                      <Image
                        src="/icon/internet-icon.svg"
                        height={23}
                        width={23}
                        alt="web"
                      />
                      <p className="ml-1">Via Web</p>
                    </a>
                    <a
                      href={`mailto:${job?.data?.email}`}
                      className="hover:underline cursor-pointer flex items-center mr-2"
                    >
                      <Image
                        src="/icon/mail-icon.svg"
                        height={23}
                        width={23}
                        alt="web"
                      />
                      <p className="ml-1">Via Email</p>
                    </a>
                    <a
                      onClick={() => copyToClipboard(job?.data?.email)}
                      className="hover:underline cursor-pointer flex items-center mr-2"
                    >
                      <Image
                        src="/icon/copy-icon.svg"
                        height={23}
                        width={23}
                        alt="web"
                      />
                      <p id="emailCopy" className="hr@jobspot.id">
                        Copy Email
                      </p>
                    </a>
                  </div>
                </div>
              </div>
              <button
                className="rounded-full border border-main text-main w-1/5 mr-2"
                onClick={() => window.open("https://saweria.co/qerjapp")}
              >
                <p className="my-2 mx-auto">Donasi</p>
              </button>
              <button
                id="applyButton"
                onClick={func}
                className="rounded-full border bg-main border-main w-full"
              >
                <p className="my-2 mx-auto text-white font-bold">Apply</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
