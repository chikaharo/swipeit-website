import { Stack } from "@chakra-ui/react";
import { CommentWithUserInfoFragment } from "../generated/graphql";
import Comment from "./Comment";

interface CommentListProps {
	comments: CommentWithUserInfoFragment[] | undefined;
}

const CommentList = ({ comments }: CommentListProps) => {
	console.log("comment list props: ", comments);
	return (
		<Stack gap={4} spacing={4}>
			{comments!.map((comment) => (
				<Comment key={comment.id} comment={comment} />
			))}
		</Stack>
	);
};

export default CommentList;
