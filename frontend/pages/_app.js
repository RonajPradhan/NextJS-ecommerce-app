import Page from "../components/Page";
import NProgress from "nprogress";
import Router from "next/router";
import { ApolloProvider } from "@apollo/client";
import "nprogress/nprogress.css";
import withData from "../lib/withData.js";
import { CartStateProvider, useCart } from "../lib/cartState.js";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
	return (
		<ApolloProvider client={apollo}>
			<CartStateProvider>
				<Page>
					<Component {...pageProps} />
				</Page>
			</CartStateProvider>
		</ApolloProvider>
	);
}

//  Tell next.js that it needs to go and fetch all the queries that are in all the child component

MyApp.getInitialProps = async function ({ Component, ctx }) {
	let pageProps = {};
	// if any of the pages has getInitialProps in them we are going to go fetch get them.
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	pageProps.query = ctx.query;
	return { pageProps };
};

export default withData(MyApp);

// Wrapping it withData injecting Apollo client in MyApp
