import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import {
	CommentWithUserInfoFragment,
	useVoteCommentMutation,
	useVoteMutation,
	VoteType,
} from "../generated/graphql";

interface UpvoteCommentSectionProps {
	comment: CommentWithUserInfoFragment;
	flexDir?: "row" | "column";
}

enum VoteTypeValues {
	Upvote = 1,
	Downvote = -1,
}

const UpvoteCommentSection = ({
	comment,
	flexDir = "row",
}: UpvoteCommentSectionProps) => {
	const [voteComment, { loading }] = useVoteCommentMutation();

	const [loadingState, setLoadingState] = useState<
		"upvote-loading" | "downvote-loading" | "not-loading"
	>("not-loading");

	const upvote = async (commentId: string) => {
		setLoadingState("upvote-loading");
		await voteComment({
			variables: {
				inputVoteValue: VoteType.Upvote,
				commentId: parseInt(commentId),
			},
		});
		setLoadingState("not-loading");
	};

	const downvote = async (commentId: string) => {
		setLoadingState("downvote-loading");
		await voteComment({
			variables: {
				inputVoteValue: VoteType.Downvote,
				commentId: parseInt(commentId),
			},
		});
		setLoadingState("not-loading");
	};

	return (
		<Flex direction={flexDir} alignItems="center" mr={4} gap={4}>
			<IconButton
				icon={<ChevronUpIcon />}
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
			{comment.points}
			<IconButton
				icon={<ChevronDownIcon />}
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

export default UpvoteCommentSection;
