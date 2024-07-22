import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CommentForm from "./CommentForm";
import {
	CommentWithUserInfoFragment,
	CreateCommentInput,
	UpdateCommentInput,
	useCreateCommentMutation,
	useMeQuery,
	useUpdateCommentMutation,
} from "../generated/graphql";
import CommentList from "./CommentList";
import UpvoteSection from "./UpvoteSection";
import UpvoteCommentSection from "./UpvoteCommentSection";
import UpvoteComment from "./UpvoteComment";
import CommentEditDeleteButton from "./CommentEditDeleteButtons";
import useCommentAction from "../hooks/commentHook";

interface CommentProps {
	comment: {
		children: CommentWithUserInfoFragment[];
	} & CommentWithUserInfoFragment;
	// childComments: CommentWithUserInfoFragment[] | undefined;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
	timeStyle: "short",
});

const Comment = ({ comment }: CommentProps) => {
	const [childrenHidden, setChildrenHidden] = useState(false);
	const [isReplying, setIsReplying] = useState(false);
	const [onEditting, setOnEditting] = useState(false);
	const { data: authData, loading: authLoading } = useMeQuery();
	const { onUpdateCommentSubmit, onCreateCommentSubmit } = useCommentAction();

	const setEditting = () => {
		setIsReplying(true);
		setOnEditting(true);
	};

	const closeEditting = () => {
		setIsReplying(false);
		setOnEditting(false);
	};

	const openCreating = () => {
		setIsReplying(true);
		setOnEditting(false);
	};

	const closeCreating = () => {
		setIsReplying(false);
		setOnEditting(false);
	};

	return (
		<Flex flexDir="column" mt={2}>
			<Box
				width="100%"
				paddingX={4}
				paddingY={4}
				border="gray.300"
				borderWidth={1}
				borderRadius="25px"
			>
				<Flex flexDir="row" align="center" justify="space-between">
					<Text fontWeight="semibold" color="blue.500">
						{comment.user.username}
					</Text>
					<Text>{dateFormatter.format(new Date(comment.createdAt))}</Text>
				</Flex>
				<Box paddingY={4} paddingX={2} marginY={2}>
					{comment.isSoftDeleted ? (
						<Text color="gray.600" fontSize="sm">
							{comment.text}
						</Text>
					) : (
						<Text>{comment.text}</Text>
					)}
				</Box>
				<Flex flexDir="row" gap={2}>
					<IconButton
						onClick={openCreating}
						icon={<ChatIcon />}
						aria-label="comment"
						size="sm"
						mr={4}
					/>
					<UpvoteComment comment={comment} size="sm" />
					<CommentEditDeleteButton
						commentId={comment.id}
						commentUserId={`${comment.userId}`}
						openEditting={setEditting}
					/>
				</Flex>
			</Box>
			{authData?.me && isReplying && !onEditting && (
				<Box ml={3} mt={1}>
					<CommentForm
						handleSubmit={onCreateCommentSubmit}
						initialValues={{
							text: "",
							postId: +comment.postId,
							parentId: +comment.id,
						}}
						onClose={closeCreating}
					/>
				</Box>
			)}
			{authData?.me && isReplying && onEditting && !comment.isSoftDeleted && (
				<Box ml={3} mt={1}>
					<CommentForm
						handleSubmit={onUpdateCommentSubmit}
						initialValues={{
							text: comment.text,
							id: +comment.id,
						}}
						onClose={closeEditting}
					/>
				</Box>
			)}
			{comment.children && comment.children.length > 0 && (
				<Box ml={4}>
					<CommentList comments={comment.children} />
				</Box>
			)}
		</Flex>
	);
};

export default Comment;
