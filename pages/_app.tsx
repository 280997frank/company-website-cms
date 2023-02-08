import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import Fonts from "@/components/Atoms/Fonts";

import { store, persistor } from "@/states/store";
import { getAccessToken } from "@/utils";

import type { AppProps } from "next/app";

import "@/styles/globals.css";

const backEndUrl =
  typeof process.env.NEXT_PUBLIC_BACKEND_URL === "string"
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "";

const client = new ApolloClient({
  uri: `${backEndUrl}/query`,
  cache: new InMemoryCache(),
  // credentials: 'include',
  headers: {
    authorization: `Bearer ${getAccessToken()}`,
  },
});

const customTheme = extendTheme({
  colors: {
    brand: {
      grey10: "#DBDBDB",
      grey80: "#393939",
      darkBlue: "#081029",
      aboutUs: "#FFA8FA",
      careers: "#F7FF7C",
      clients: "#FFBB84",
      contactUs: "#FF558A",
      zodiacEvents: "#22CBFF",
      zodiacLabs: "#ED8041",
      zodiacSolutions: "#C992FF",
      zodiacStudios: "#00FFDA",
    },
  },
  fonts: {
    heading: '"Mark Pro", sans-serif',
    body: '"Barlow", sans-serif',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <ChakraProvider theme={customTheme}>
            <DndProvider backend={HTML5Backend}>
              <Fonts />
              <Component {...pageProps} />
            </DndProvider>
          </ChakraProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
