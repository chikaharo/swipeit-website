import { NetworkStatus } from "@apollo/client";
import {
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	Link,
	List,
	ListItem,
	Spinner,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import Layout from "../components/Layout";
import PostEditDeleteButtons from "../components/PostEditDeleteButtons";
import {
	CommentsDocument,
	PostsDocument,
	useCommentsQuery,
	useCommunitiesQuery,
	usePostsQuery,
} from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import UpvoteSection from "../components/UpvoteSection";
import Image from "next/image";
import NavSidebar from "../components/NavSidebar";
import PostRow from "../components/PostRow";

export const limit = 3;

const Index = () => {
	const { data, loading, fetchMore, networkStatus } = usePostsQuery({
		variables: { limit },

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
		},
	});

	return addApolloState(apolloClient, {
		props: {},
	});
};

export default Index;
