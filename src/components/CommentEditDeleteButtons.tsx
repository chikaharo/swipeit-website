import {
	Box,
	Button,
	Flex,
	IconButton,
	Text,
	useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import {
	CommentWithUserInfoFragment,
	PaginatedComments,
	useDeleteCommentMutation,
	useMeQuery,
} from "../generated/graphql";
import { Reference } from "@apollo/client";
import { useRouter } from "next/router";
import useCommentAction from "../hooks/commentHook";

interface CommentEditDeleteButtonProps {
	commentId: string;
	commentUserId: string;
	openEditting: () => void;
}

const CommentEditDeleteButton = ({
	commentId,
	commentUserId,
	openEditting,
}: CommentEditDeleteButtonProps) => {
	const router = useRouter();
	const { data: meData } = useMeQuery();
	const { onDeleteComment } = useCommentAction();
	const toast = useToast();

	// const onCommentDelete = async (commentId: string) => {
	// 	await deleteComment({
	// 		variables: { id: commentId },
	// 		update(cache, { data }) {
	// 			if (data?.deleteComment.success) {
	// 				toast({
	// 					title: "Deleted comment successfully",
	// 					status: "success",
	// 					duration: 3000,
	// 					isClosable: true,
	// 				});
	// 				cache.modify({
	// 					fields: {
	// 						comments(existing: PaginatedComments) {
	// 							const updatedCommentIdx = existing.paginatedComments.findIndex(
	// 								(comment) => comment.id.toString() === `${commentId}`
	// 							);
	// 							const updatedPaginatedComments = [
	// 								...existing.paginatedComments,
	// 							];

	// 							console.log(
	// 								"delete comment before: ",
	// 								updatedPaginatedComments[updatedCommentIdx]
	// 							);
	// 							updatedPaginatedComments[updatedCommentIdx] = {
	// 								...updatedPaginatedComments[updatedCommentIdx],
	// 								isSoftDeleted: true,
	// 								text: "(This message was deleted)",
	// 							};

	// 							console.log(
	// 								"delete comment after: ",
	// 								updatedPaginatedComments[updatedCommentIdx]
	// 							);

	// 							const newCommentsAfterDeleteion = {
	// 								...existing,
	// 								paginatedPosts: updatedPaginatedComments,
	// 							};

	// 							return newCommentsAfterDeleteion;
	// 						},
	// 					},
	// 				});
	// 			}
	// 		},
	// 	});

	// 	// if (router.route !== "/") router.push("/");
	// };

	if (meData?.me?.id !== commentUserId) return null;

	return (
		<Flex align="center" gap={2}>
			{/* <NextLink href={`/post/edit/${commentId}`}>
				<IconButton icon={<EditIcon />} aria-label="edit" mr={4} />
			</NextLink> */}
			<Button variant="outline" size="sm" onClick={openEditting}>
				<Text fontSize="small">Edit</Text>
			</Button>
			<Button
				variant="destructive"
				size="sm"
				onClick={() => onDeleteComment(commentId)}
			>
				<Text fontSize="small">Delete</Text>
			</Button>

			{/* <IconButton
				icon={<DeleteIcon />}
				aria-label="delete"
				colorScheme="red"
				onClick={onCommentDelete.bind(this, commentId)}
			/> */}
		</Flex>
	);
};

export default CommentEditDeleteButton;
