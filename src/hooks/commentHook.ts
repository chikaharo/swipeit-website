import { useToast } from "@chakra-ui/react";
import {
	CommentWithUserInfoFragmentDoc,
	CreateCommentInput,
	PaginatedComments,
	UpdateCommentInput,
	useCreateCommentMutation,
	useDeleteCommentMutation,
	useUpdateCommentMutation,
} from "../generated/graphql";

const useCommentAction = () => {
	const [createComment, _c] = useCreateCommentMutation();
	const [updateComment, _u] = useUpdateCommentMutation();
	const [deleteComment, _d] = useDeleteCommentMutation();
	const toast = useToast();

	const onCreateCommentSubmit = async (values: CreateCommentInput) => {
		await createComment({
			variables: { createCommentInput: values },
			update(cache, { data }) {
				cache.modify({
					fields: {
						comments(existing) {
							if (data?.createComment.success && data.createComment.comment) {
								const newCommentRef = cache.identify(
									data.createComment.comment
								);
								console.log("existing comments: ", existing);
								console.log({ newCommentRef });

								// if (!data.createComment.comment.parentId) {
								const newCommentsAfter = {
									...existing,
									totalCount: existing.totalCount + 1,
									paginatedComments: [
										{ __ref: newCommentRef },
										...existing.paginatedComments,
									],
								};
								console.log({ newCommentsAfter });
								return newCommentsAfter;
							}
						},
					},
				});
			},
		});
	};

	const onUpdateCommentSubmit = async (values: UpdateCommentInput) => {
		await updateComment({
			variables: { updateCommentInput: values },
			update(cache, { data }) {
				cache.modify({
					id: `Comment:${values.id}`,
					fields: {
						text() {
							if (data?.updateComment.success) {
								return values.text;
							}
						},
					},
				});
			},
		});
	};

	const onDeleteComment = async (commentId: string) => {
		await deleteComment({
			variables: { id: commentId },
			update(cache, { data }) {
				if (data?.deleteComment.success) {
					toast({
						title: "Deleted comment successfully",
						status: "success",
						duration: 3000,
						isClosable: true,
					});
					cache.modify({
						id: `Comment:${commentId}`,
						fields: {
							text() {
								return "(This message was deleted";
							},
							isSoftDeleted() {
								return true;
							},
						},
					});
				}
			},
		});

		// if (router.route !== "/") router.push("/");
	};

	return { onCreateCommentSubmit, onUpdateCommentSubmit, onDeleteComment };
};

export default useCommentAction;
