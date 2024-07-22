import { NetworkStatus } from "@apollo/client";
import { Button, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PostsDocument, usePostsQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import PostRow from "../components/PostRow";

const limit = 10;

const Popular = () => {
	const { data, loading, fetchMore, networkStatus } = usePostsQuery({
		variables: { limit, filters: { points: "DESC" } },

		// component nao render boi cai Posts query, se rerender khi networkStatus thay doi, tuc la fetchMore
		notifyOnNetworkStatusChange: true,
	});

	const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

	const loadMorePosts = () =>
		fetchMore({ variables: { cursor: data?.posts?.cursor } });

	return (
		<>
			{loading ? (
				<Flex justifyContent="center" alignItems="center" minH="100vh">
					<Spinner />
				</Flex>
			) : (
				<Stack spacing={8}>
					{data?.posts?.paginatedPosts.map((post) => (
						<PostRow key={post.id} post={post} />
					))}
				</Stack>
			)}

			{data?.posts?.hasMore && (
				<Flex>
					<Button
						m="auto"
						my={8}
						isLoading={loadingMorePosts}
						onClick={loadMorePosts}
					>
						{loadingMorePosts ? "Loading" : "Show more"}
					</Button>
				</Flex>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const apolloClient = initializeApollo({ headers: context.req.headers });

	await apolloClient.query({
		query: PostsDocument,
		variables: {
			limit,
			filters: {
				points: "DESC",
			},
		},
	});

	return addApolloState(apolloClient, {
		props: {},
	});
};

export default Popular;
