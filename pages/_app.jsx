import "../styles/globals.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { AuthProvider } from "../components/auth/AuthProvider";
import NavBar from "../components/NavBar";
import { useRouter } from "next/router";

const createApolloClient = () => {
  const link = new HttpLink({
    uri: "http://api.syntrade.xyz",
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    // Enable sending cookies over cross-origin requests
    credentials: "include",
  });
};

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <AuthProvider>
      <ApolloProvider client={createApolloClient()}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY}
          scriptProps={{
            async: false,
            defer: true,
            appendTo: "body",
            nonce: undefined,
          }}
        >
          {router.pathname === "/signup" || router.pathname === "/login" ? (
            <Component {...pageProps} />
          ) : (
            <>
              <NavBar></NavBar>
              <Component {...pageProps} />
            </>
          )}
        </GoogleReCaptchaProvider>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default MyApp;
