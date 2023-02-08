import { getAccessToken, checkErrorResponse } from "utils/index";

export interface TUploadSingleFilePayload {
  file: File | string;
  toast?: any;
}

export interface TDataSingleResponse {
  message: string;
  content: {
    url: string;
  };
}

interface UnknownPayload {
  [s: string]: unknown;
}

type TStoryDetailImage = {
  url: string;
  caption: string;
};

const URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

const isStoryDetailImage = (
  toBeDetermined: unknown
): toBeDetermined is TStoryDetailImage => {
  if (typeof (toBeDetermined as TStoryDetailImage).url === "string") {
    return true;
  }

  return false;
};

const setOptions = (restOptions: UnknownPayload) => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  ...restOptions,
});

const setFormData = (payload: TUploadSingleFilePayload) => {
  const formData = new window.FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val: string | Blob | TStoryDetailImage) => {
        if (!isStoryDetailImage(val)) {
          formData.append(key, val);
        }
      });
    } else if (typeof value === "boolean") {
      if (value) {
        formData.append(key, "true");
      } else {
        formData.append(key, "false");
      }
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

export const PostSingleFile = async (
  payload: TUploadSingleFilePayload
): Promise<TDataSingleResponse> => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: setFormData(payload),
  };

  const response = await window.fetch(
    `${URL}/admin/upload`,
    setOptions(options)
  );
  const errorMessage = await checkErrorResponse(response.clone());

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json;
};

export const UploadSingleFile = async (
  payload: TUploadSingleFilePayload
): Promise<TDataSingleResponse> => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: setFormData(payload),
  };

  const response = await window.fetch(
    `${URL}/admin/upload`,
    setOptions(options)
  );

  const errorMessage = await checkErrorResponse(response.clone());

  if (errorMessage) {
    return payload.toast({
      title: errorMessage,
      description:
        response && response.status === 403
          ? "Your token might be expired !"
          : "Something wrong",
      position: "bottom",
      isClosable: true,
      status: "error",
    });
  }

  const json = await response.json();
  return json;
};
