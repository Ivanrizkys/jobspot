import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axiosInstance from "config/api";

export const useGetAllJobInfinite = ({
  limit = 10,
  offset = 1,
  title = "",
  categoryId = "",
  companyName = "",
  enabled = false
}) => {
  // console.log(enabled)
  // console.log(title)
  return useInfiniteQuery({
    queryKey: [
      "jobs-infinite",
      {
        limit,
        offset,
        title,
        categoryId,
        companyName,
      },
      enabled
    ],
    queryFn: async ({ pageParam = offset }) => {
      const res = await getAllJob({
        limit,
        offset: pageParam,
        title,
        categoryId,
        companyName,
      });
      return res.data;
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === limit ? pages.length + 1 : undefined,
    enabled
  });
};

export const useGetAllJob = ({
  limit = 10,
  offset = 1,
  title = "",
  categoryId = "",
  companyName = "",
}) => {
  return useQuery({
    queryKey: [
      "jobs",
      {
        limit,
        offset,
        title,
        categoryId,
        companyName,
      },
    ],
    queryFn: () =>
      getAllJob({
        limit,
        offset,
        categoryId,
        companyName,
      }),
  });
};

export const useGetJob = (id, enabled) => {
  return useQuery({
    queryKey: ["job", { id }],
    queryFn: () => getJob(id),
    enabled,
  });
};

export const useGetJobCategories = () => {
  return useQuery({
    queryKey: ["job-categories"],
    queryFn: getJobCategories,
  });
};

async function getAllJob({
  limit = 10,
  offset = 1,
  title = "",
  categoryId = "",
  companyName = "",
}) {
  let url = `/jobs?limit=${limit}&offset=${offset}`;
  if (categoryId) {
    url = `${url}&categoryId=${categoryId}`;
  }
  if (companyName) {
    url = `${url}&companyName=${companyName}`;
  }
  if (title) {
    url = `${url}&title=${title}`;
  }

  const res = await axiosInstance.get(url);
  return res.data;
}

async function getJob(id) {
  const res = await axiosInstance.get(`/job/${id}`);
  return res.data;
}

async function getJobCategories() {
  const res = await axiosInstance.get("/job-categories");
  return res.data;
}
