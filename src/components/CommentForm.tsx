import { useCheckAuth } from "../utils/useCheckAuth";
import { Flex, Spinner, Box, Button } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import NextLink from "next/link";
import {
	CreateCommentInput,
	CreateCommunityInput,
	CreatePostInput,
	UpdateCommentInput,
	useCreateCommentMutation,
	useCreateCommunityMutation,
	useCreatePostMutation,
	useUpdateCommentMutation,
} from "../generated/graphql";
import router from "next/router";

interface CommentFormProps {
	autoFocus?: boolean;
	initialValues: {
		id?: number;
		postId?: number;
		text: string;
		parentId?: number;
	};
	handleSubmit: (values: any) => void;
	onClose?: () => void;
}

const CommentForm = ({
	autoFocus = false,
	initialValues,
	handleSubmit,
	onClose,
}: CommentFormProps) => {
	// const { data: authData, loading: authLoading } = useCheckAuth();

	// if (authLoading || (!authLoading && !authData?.me)) {
	if (false) {
		return (
			<Flex justifyContent="center" alignItems="center" minH="100vh">
				<Spinner />
			</Flex>
		);
	} else {
		return (
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{({ isSubmitting }) => (
					<Form>
						<Flex w="100%" align="stretch" gap={1}>
							<Flex flex={1}>
								<InputField
									name="text"
									placeholder="Add a comment"
									autoFocus={autoFocus}
									type="text"
									textarea
								/>
							</Flex>
							<Flex flexDir="column" gap={1}>
								<Button
									type="button"
									colorScheme="teal"
									variant="outline"
									disabled={isSubmitting}
									onClick={onClose}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									colorScheme="teal"
									isLoading={isSubmitting}
								>
									{initialValues.id ? "Update" : "Comment"}
								</Button>
							</Flex>
						</Flex>
					</Form>
				)}
			</Formik>
		);
	}
};

export default CommentForm;
