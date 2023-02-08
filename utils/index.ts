export const getAccessToken = (): string => {
  if ((process.env.NEXT_PUBLIC_COOKIE_NAME as string) !== "") {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(
        process.env.NEXT_PUBLIC_COOKIE_NAME as string
      );
      return token !== null ? token : "";
    }
  }

  return "";
};
export const storeAccessToken = async (accessToken: string): Promise<void> => {
  if (typeof process.env.NEXT_PUBLIC_COOKIE_NAME === "string") {
    await window.localStorage.setItem(
      process.env.NEXT_PUBLIC_COOKIE_NAME,
      accessToken
    );
  } else {
    throw new Error("Token cannot be stored");
  }
};

export const removeAccessToken = (): void => {
  if (typeof process.env.NEXT_PUBLIC_COOKIE_NAME === "string") {
    window.localStorage.removeItem(process.env.NEXT_PUBLIC_COOKIE_NAME);
  }
};

export const checkErrorResponse = async (
  response: Response
): Promise<string> => {
  let errorMessage = "";
  const clonedResponse = response.clone();

  if (!response.ok) {
    try {
      const json = await response.json();
      errorMessage = json.message;
    } catch (error) {
      const text = await clonedResponse.text();
      errorMessage = text;
    }
  }

  return errorMessage;
};
