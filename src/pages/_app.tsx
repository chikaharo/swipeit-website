import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps);
	return (
		<ApolloProvider client={apolloClient}>
			<ChakraProvider resetCSS theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</ApolloProvider>
	);
}

export default MyApp;
