import { NetworkStatus } from "@apollo/client";
import {
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	Image,
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
import Layout from "../../../components/Layout";

import PostEditDeleteButtons from "../../../components/PostEditDeleteButtons";
import {
	CommunityDocument,
	PostsDocument,
	useCommunitiesQuery,
	useCommunityQuery,
	usePostsQuery,
} from "../../../generated/graphql";
import { addApolloState, initializeApollo } from "../../../lib/apolloClient";
import UpvoteSection from "../../../components/UpvoteSection";
import { useRouter } from "next/router";
import { AddIcon } from "@chakra-ui/icons";

export const limit = 3;

const CommunityViewPage = () => {
	const router = useRouter();
	const communityId = router.query.id as string;
	const { data, loading, fetchMore, networkStatus } = usePostsQuery({
		variables: { limit, communityId },

		// component nao render boi cai Posts query, se rerender khi networkStatus thay doi, tuc la fetchMore
		notifyOnNetworkStatusChange: true,
	});

	const { data: communityData, loading: communityLoading } = useCommunityQuery({
		variables: {
			id: communityId,
		},
	});

	const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

	const loadMorePosts = () =>
		fetchMore({ variables: { cursor: data?.posts?.cursor } });

	return (
		<>
			{loading || !loadingMorePosts ? (
				<Flex justifyContent="center" alignItems="center" minH="100vh">
					<Spinner />
				</Flex>
			) : (
				<Flex width="100%" gap={4}>
					<Stack spacing={8} width="100%">
						<VStack>
							<Stack direction="row" width="100%">
								<Image
									height="100px"
									width="100%"
									objectFit="cover"
									src="/images/banner-1.png"
									alt="banner"
								/>
							</Stack>
							<Flex width="100%" align="center" justify="space-between" p={2}>
								<Heading>s/{communityData?.community?.title}</Heading>
								<Flex align="center" gap={2}>
									<Link href={`/s/${communityId}/submit`}>
										<Flex
											align="center"
											borderRadius="25px"
											p={2}
											bg="gray.100"
										>
											<AddIcon mr={2} />
											<Text>Create a post</Text>
										</Flex>
									</Link>
								</Flex>
							</Flex>
						</VStack>
						{data?.posts?.paginatedPosts.map((post) => (
							<Flex key={post.id} p={5} shadow="md" borderWidth="1px">
								<UpvoteSection post={post} />
								<Box flex={1}>
									<NextLink href={`/post/${post.id}`}>
										<Link>
											<Heading fontSize="xl">{post.title}</Heading>
										</Link>
									</NextLink>
									<Text>posted by {post.user.username}</Text>
									<Flex align="center">
										<Text mt={4}>{post.textSnippet}</Text>
										<Box ml="auto">
											<PostEditDeleteButtons
												postId={post.id}
												postUserId={post.user.id}
											/>
										</Box>
									</Flex>
								</Box>
							</Flex>
						))}
					</Stack>
				</Flex>
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
	const communityId = context.query.id;
	// console.log({ communityId });
	const apolloClient = initializeApollo({ headers: context.req.headers });

	await apolloClient.query({
		query: PostsDocument,
		variables: {
			limit,
			communityId: communityId ? parseInt(communityId as string) : 1,
		},
	});

	return addApolloState(apolloClient, {
		props: {},
	});
};

export default CommunityViewPage;
