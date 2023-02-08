import {
  TUploadSingleFilePayload,
  PostSingleFile,
  TDataSingleResponse,
  UploadSingleFile,
} from "@/utils/restAPI";
import { useCallback, useState } from "react";

export const useUploadFileViaAPI = () => {
  const [loading, setLoading] = useState(false);
  const fetchUploadFile = useCallback(
    async (payload: TUploadSingleFilePayload) => {
      setLoading(true);
      const responseUploadFile: TDataSingleResponse = await PostSingleFile(
        payload
      );
      setLoading(false);
      return responseUploadFile;
    },
    []
  );
  return {
    loading,
    fetchUploadFile,
  };
};

export const useUploadSingleFileViaAPI = () => {
  const [loading, setLoading] = useState(false);
  const fetchUploadFile = useCallback(
    async (payload: TUploadSingleFilePayload) => {
      setLoading(true);
      const responseUploadFile: TDataSingleResponse = await UploadSingleFile(
        payload
      );
      setLoading(false);
      return responseUploadFile;
    },
    []
  );
  return {
    loading,
    fetchUploadFile,
  };
};
