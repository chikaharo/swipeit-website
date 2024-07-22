import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { PostWithUserInfoFragment } from "../generated/graphql";
import UpvoteSection from "./UpvoteSection";
import NextLink from "next/link";
import PostEditDeleteButtons from "./PostEditDeleteButtons";

interface PostRowProps {
	post: PostWithUserInfoFragment;
}

const PostRow = ({ post }: PostRowProps) => {
	return (
		<Flex key={post.id} p={5} shadow="md" borderWidth="1px">
			<UpvoteSection post={post} />
			<Box flex={1}>
				<Flex align="center" gap={2}>
					<NextLink href={`/s/${post.community.id}`}>
						<Text fontSize="small" fontWeight="semibold">
							s/{post.community.title}
						</Text>
					</NextLink>
					<Text fontSize="small" color="gray.600">
						Posted by {post.user.username}
					</Text>
				</Flex>
				<NextLink href={`/post/${post.id}`}>
					<Heading fontSize="xl">{post.title}</Heading>
				</NextLink>
				<Flex align="center">
					<Text mt={4}>{post.text}</Text>
					<Box ml="auto">
						<PostEditDeleteButtons postId={post.id} postUserId={post.user.id} />
					</Box>
				</Flex>
			</Box>
		</Flex>
	);
};

export default PostRow;
