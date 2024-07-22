import {
	Alert,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	IconButton,
	Link,
	Spinner,
	Stack,
	Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import {
	CommentsQuery,
	CommentWithUserInfoFragment,
	PaginatedComments,
	PostDocument,
	PostIdsDocument,
	PostIdsQuery,
	PostQuery,
	useCommentsQuery,
	useMeQuery,
	usePostQuery,
} from "../../../generated/graphql";
import { addApolloState, initializeApollo } from "../../../lib/apolloClient";
import { limit } from "../../index";
import { ArrowBackIcon, ChatIcon } from "@chakra-ui/icons";
import UpvoteSection from "../../../components/UpvoteSection";
import CommentForm from "../../../components/CommentForm";
import CommentList from "../../../components/CommentList";
import { NetworkStatus } from "@apollo/client";
import useCommentAction from "../../../hooks/commentHook";
// import { useEffect, useState } from "react";

const Post = () => {
	const router = useRouter();
	const { data: authData, loading: authLoading } = useMeQuery();
	const {
		data: commentsData,
		loading: commentsLoading,

		fetchMore,
		networkStatus,
	} = useCommentsQuery({
		variables: { limit, postId: router.query.id as string },
		notifyOnNetworkStatusChange: true,
	});
	const loadingMoreComments = networkStatus === NetworkStatus.fetchMore;
	const { data, loading, error } = usePostQuery({
		variables: { id: router.query.id as string },
	});
	const { onCreateCommentSubmit } = useCommentAction();

	const loadMoreComments = () => {
		fetchMore({
			variables: { cursor: commentsData?.comments?.cursor },
			// @ts-ignore
			updateQuery(
				previousQueryResult,
				{ fetchMoreResult }: { fetchMoreResult: CommentsQuery | undefined }
			): CommentsQuery {
				console.log({ fetchMoreResult });
				if (fetchMoreResult) {
					const dataReturn = {
						comments: {
							...fetchMoreResult.comments,
							paginatedComments: [
								...previousQueryResult.comments!.paginatedComments,
								...fetchMoreResult.comments!.paginatedComments,
							],
						},
					};
					console.log({ dataReturn });
					return {
						// @ts-ignore
						comments: {
							...fetchMoreResult.comments,
							paginatedComments: [
								...previousQueryResult.comments!.paginatedComments,
								...fetchMoreResult.comments!.paginatedComments,
							],
						},
					};
				} else {
					return previousQueryResult;
				}
			},
		});
	};

	if (error) {
		return (
			<Alert>
				<AlertIcon />
				<AlertTitle>{error.message}</AlertTitle>
			</Alert>
		);
	}

	if (loading || authLoading || (commentsLoading && !commentsData?.comments))
		return (
			<Layout>
				<Flex justifyContent="center" alignItems="center" minH="100vh">
					<Spinner />
				</Flex>
			</Layout>
		);

	if (!loading && !data?.post) {
		return (
			<Layout>
				<Alert>
					<AlertIcon />
					<AlertTitle>Post not found</AlertTitle>
				</Alert>
			</Layout>
		);
	}

	return (
		<Flex width="100%" minH="100vh" flexDir="column">
			<Flex width="100%" flexDir="column">
				<Flex align="center" gap={2}>
					<Link href={`/s/2`}>
						<IconButton
							icon={<ArrowBackIcon />}
							h={10}
							p={2}
							borderRadius="100%"
							aria-label="back"
						/>
						{/* Back */}
					</Link>
					<Flex flexDir="column">
						<Flex flexDir="row" align="centers" gap={1}>
							<Link fontSize="sm" fontWeight="semibold" href={`/s/2`}>
								s/{data?.post?.title}
							</Link>
							<Text fontSize="sm" color="gray.600">
								1 hours ago
							</Text>
						</Flex>
						<Box>
							<Text color="gray.800">{data?.post?.user.username}</Text>
						</Box>
					</Flex>
				</Flex>
				<Box marginY={2}>
					<Heading>{data?.post?.title}</Heading>
					<Flex mt={3}>
						<Text>{data?.post?.text}</Text>
					</Flex>
				</Box>
			</Flex>
			<Flex flexDir="row" align="center" gap={3} mt={4}>
				<UpvoteSection post={data!.post!} flexDir="row" />
				<Flex
					borderRadius={25}
					p={2}
					bg="gray.100"
					align="center"
					cursor="pointer"
				>
					<Icon as={ChatIcon} boxSize={4} mr={2} />
					<Text color="gray.600">1.8K</Text>
				</Flex>
			</Flex>
			<Box mt={4}>
				<Heading fontSize={24} mb={2}>
					Comments
				</Heading>
				{authData && authData.me && (
					<CommentForm
						autoFocus
						initialValues={{ text: "", postId: +router.query.id! }}
						handleSubmit={onCreateCommentSubmit}
					/>
				)}
				<Stack mt={4}>
					{commentsLoading && (
						<Flex justifyContent="center" alignItems="center" minH="400px">
							<Spinner />
						</Flex>
					)}
					{!commentsLoading &&
					!commentsData?.comments?.paginatedComments.length ? (
						<Flex justifyContent="center" alignItems="center" minH="400px">
							<Text>This post dont have a comment yet</Text>
						</Flex>
					) : !commentsLoading &&
					  commentsData?.comments?.paginatedComments.length ? (
						<CommentList
							comments={commentsData.comments.paginatedComments.filter(
								(comment) => comment.parentId == null
							)}
						/>
					) : (
						<div>Comment failed</div>
					)}
				</Stack>
			</Box>
			{commentsData?.comments?.hasMore && (
				<Flex>
					<Button
						m="auto"
						my={8}
						isLoading={loadingMoreComments}
						onClick={loadMoreComments}
					>
						{loadingMoreComments ? "Loading" : "Show more"}
					</Button>
				</Flex>
			)}
		</Flex>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const apolloClient = initializeApollo();

	const { data } = await apolloClient.query<PostIdsQuery>({
		query: PostIdsDocument,
		variables: { limit },
	});

	return {
		paths: data.posts!.paginatedPosts.map((post) => ({
			params: { id: `${post.id}` },
		})),
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps<
	{ [key: string]: any },
	{ id: string }
> = async ({ params }) => {
	const apolloClient = initializeApollo();

	await apolloClient.query<PostQuery>({
		query: PostDocument,
		variables: { id: params?.id },
	});

	return addApolloState(apolloClient, { props: {} });
};

export default Post;
