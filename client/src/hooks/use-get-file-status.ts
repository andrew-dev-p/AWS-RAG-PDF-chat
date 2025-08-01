import axiosClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export enum FileStatus {
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

const getFileStatus = async (key: string) => {
  const response = await axiosClient.get<{ status: FileStatus }>(
    `/files/${key}/status`
  );

  return response.data.status;
};

const useGetFileStatus = (isFileSelected: boolean, isFileUploaded: boolean) => {
  const fileKey = localStorage.getItem("fileKey") || "";

  return useQuery({
    queryKey: ["file-status", fileKey],
    queryFn: () => getFileStatus(fileKey),
    refetchInterval: 1000,
    enabled: isFileSelected && !!fileKey && !isFileUploaded,
  });
};

export default useGetFileStatus;
