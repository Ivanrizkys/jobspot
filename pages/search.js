
import Card from "components/Card";
import MenuBar from "components/MenuBar";
import { useDebounce } from "hooks/debounce";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGetAllJobInfinite } from "service/job";

export default function Home() {  
  const [title, setTitle] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [fetching, setFetching] = useState(true)
  
  const router = useRouter()
  const { ref, inView } = useInView()
  const debounceSearch = useDebounce(searchValue, 1500);

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetAllJobInfinite({
    limit: 5,
    offset: 1,
    title,
    categoryId,
    companyName,
    enabled: fetching
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage])

  useEffect(() => {
    if (router.isReady) {
      setTitle(router.query.title)
      setCategoryId(router.query.categoryId ?? "")
      setCompanyName(router.query.companyName ?? "")
      setFetching(true)
    }
  }, [router.isReady])

  useEffect(() => {
    setTitle(searchValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  return (
    <>
      <div className="flex flex-col min-h-screen max-h-full bg-gray-200">
        <div className="bg-main pb-7">
          <div className="mx-4 my-5">
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
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder='Cari "Backend Engineer"'
                  className="w-full ml-3 text-search text-black placeholder:text-search placeholder:text-black"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 my-5 mb-20 mt-2">
          <div className="flex justify-between mt-5">
            <h3 className="mb-2">Feeds</h3>
            <p className="text-main underline">View All</p>
          </div>
          {isLoading ? (
            <div className="dot-load animate-dot-loader mx-auto mt-52"></div>
          ) : (
            <div>
              {data && data?.pages?.map((group, i) => (
                <React.Fragment key={i}>
                  {group?.map((job) => (
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
                </React.Fragment>
              ))}
            </div>
          )}
          {data && <div ref={ref}></div>}
          {isFetchingNextPage && <div className="dot-load animate-dot-loader mx-auto mt-2"></div>}
          <MenuBar currentPage={2} />
        </div>
      </div>
    </>
  );
}
