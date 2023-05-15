import Card from "components/Card";
import MenuBar from "components/MenuBar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useGetAllJob, useGetJobCategories } from "service/job";

export default function Home() {
  const [limit] = useState(10);
  const [offset] = useState(1);

  const router = useRouter()
  
  const { data: jobs, isLoading: loadingJobs } = useGetAllJob({
    limit: 5,
    offset: 1,
  });

  const { data: jobCategories, isLoading: loadingJobCategories } =
    useGetJobCategories();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      // router.push({
      //   pathname: "/search",
      //   query: {
      //     title: e.target.value
      //   }
      // });
      window.location.href = "/search?title=" + e.target.value
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen max-h-full bg-gray-200">
        <div className="bg-main h-jumbotron">
          <div className="mx-4 my-5">
            <div className="flex justify-between">
              <Image src="/img/logo.png" alt="logo" width={61} height={14} />
            </div>
            <div className="flex w-full mt-5 bg-white rounded-search">
              <div className="flex w-full mx-4 my-2">
                <Image
                  src="/icon/search-icon.svg"
                  alt="logo"
                  width={17}
                  height={17}
                />
                <input
                  type="search"
                  onKeyDown={(e) => handleSearch(e)}
                  placeholder='Cari "Backend Engineer"'
                  className="w-full ml-3 text-search text-black placeholder:text-search placeholder:text-black"
                />
              </div>
            </div>

            <div className="flex mt-5 bg-white rounded-search">
              <div className="mx-4 my-5 w-full">
                <h3 className="mb-4">Kategori</h3>
                <div className="grid grid-cols-4 justify-between gap-5 tablet:gap-9 mt-1 mb-2">
                  {jobCategories &&
                    jobCategories?.data?.map((jobCategory) => (
                      <div
                        key={jobCategory?.id}
                        className="cursor-pointer hover:underline"
                        onClick={() => window.location.href = "/search?categoryId=" + jobCategory?.id}
                      >
                        <div className="flex w-11 h-11 tablet:w-14 tablet:h-14 justify-center align-center shadow-lg rounded-search mx-auto">
                          <div className="my-auto mx-auto">
                            <div className="flex justify-center rounded-box">
                              <Image
                                src={jobCategory?.image}
                                alt={"icon " + jobCategory?.name}
                                width={23}
                                height={23}
                                className="mx-auto"
                              />
                            </div>
                          </div>
                        </div>
                        <p className="flex mt-1.5 justify-center">
                          {jobCategory?.name}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 my-5 mb-20 mt-60">
          <div className="flex justify-between mt-5">
            <h3 className="mb-2">Feeds</h3>
            <p className="text-main underline">View All</p>
          </div>
          {/* <Card /> */}
          {jobs &&
            jobs?.data?.map((job) => (
              <Card
                key={job?.id}
                banner={job?.banner}
                compro={job?.company_logo}
                title={job?.title}
                compname={job?.company_name}
                location={job?.location}
                type={job?.type}
                webUrl={job?.website_url}
                id={job?.id}
              />
            ))}
          <MenuBar currentPage={1} />
        </div>
      </div>
    </>
  );
}
