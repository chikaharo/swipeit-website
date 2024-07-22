import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
	CommentWithUserInfoFragment,
	useVoteCommentMutation,
	VoteType,
} from "../generated/graphql";

interface UpvoteCommentProps {
	comment: CommentWithUserInfoFragment;
	flexDir?: "row" | "column";
	size?: "xs" | "sm" | "md" | "lg";
}

enum VoteTypeValues {
	Upvote = 1,
	Downvote = -1,
}

const UpvoteComment = ({
	comment,
	flexDir = "row",
	size,
}: UpvoteCommentProps) => {
	const [vote, { loading }] = useVoteCommentMutation();

	const [loadingState, setLoadingState] = useState<
		"upvote-loading" | "downvote-loading" | "not-loading"
	>("not-loading");

	const upvote = async (postId: string) => {
		setLoadingState("upvote-loading");
		await vote({
			variables: {
				inputVoteValue: VoteType.Upvote,
				commentId: parseInt(postId),
			},
		});
		setLoadingState("not-loading");
	};

	const downvote = async (postId: string) => {
		setLoadingState("downvote-loading");
		await vote({
			variables: {
				inputVoteValue: VoteType.Downvote,
				commentId: parseInt(postId),
			},
		});
		setLoadingState("not-loading");
	};

	return (
		<Flex direction={flexDir} alignItems="center" mr={4} gap={4}>
			<IconButton
				icon={<ChevronUpIcon />}
				size={size}
				aria-label="upvote"
				onClick={
					comment.voteType === VoteTypeValues.Upvote
						? undefined
						: upvote.bind(this, comment.id)
				}
				isLoading={loading && loadingState === "upvote-loading"}
				colorScheme={
					comment.voteType === VoteTypeValues.Upvote ? "green" : undefined
				}
			/>
			<Text fontSize={size}>{comment.points}</Text>
			<IconButton
				icon={<ChevronDownIcon />}
				size={size}
				aria-label="downvote"
				onClick={
					comment.voteType === VoteTypeValues.Downvote
						? undefined
						: downvote.bind(this, comment.id)
				}
				isLoading={loading && loadingState === "downvote-loading"}
				colorScheme={
					comment.voteType === VoteTypeValues.Downvote ? "red" : undefined
				}
			/>
		</Flex>
	);
};

export default UpvoteComment;
