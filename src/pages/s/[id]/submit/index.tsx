import { useCheckAuth } from "../../../../utils/useCheckAuth";
import { Flex, Spinner, Box, Button, Heading } from "@chakra-ui/react";
import Layout from "../../../../components/Layout";
import { Formik, Form } from "formik";
import InputField from "../../../../components/InputField";
import NextLink from "next/link";
import {
	CreatePostInput,
	useCreatePostMutation,
} from "../../../../generated/graphql";
import router, { useRouter } from "next/router";

const CreatePost = () => {
	const router = useRouter();
	const communityId = router.query.id as string;
	const { data: authData, loading: authLoading } = useCheckAuth();

	const initialValues = { title: "", text: "", communityId: +communityId };

	const [createPost, _] = useCreatePostMutation();

	const onCreatePostSubmit = async (values: CreatePostInput) => {
		await createPost({
			variables: { createPostInput: values },
			update(cache, { data }) {
				cache.modify({
					fields: {
						posts(existing) {
							if (data?.createPost.success && data.createPost.post) {
								// Post:new_id
								const newPostRef = cache.identify(data.createPost.post);

								const newPostsAfterCreation = {
									...existing,
									totalCount: existing.totalCount + 1,
									paginatedPosts: [
										{ __ref: newPostRef },
										...existing.paginatedPosts, // [{__ref: 'Post:1'}, {__ref: 'Post:2'}]
									],
								};

								return newPostsAfterCreation;
							}
						},
					},
				});
			},
		});
		router.push(`/s/${communityId}`);
	};

	if (authLoading || (!authLoading && !authData?.me)) {
		return (
			<Flex justifyContent="center" alignItems="center" minH="100vh">
				<Spinner />
			</Flex>
		);
	} else {
		return (
			<Flex flexDir="column" width="100%" height="100%">
				<Box marginBottom={8} pb={4} borderBottom="1px" borderColor="gray.300">
					<Heading>Create a post</Heading>
				</Box>
				<Formik initialValues={initialValues} onSubmit={onCreatePostSubmit}>
					{({ isSubmitting }) => (
						<Form>
							<InputField
								name="title"
								placeholder="Title"
								label="Title"
								type="text"
							/>

							<Box mt={4}>
								<InputField
									textarea
									name="text"
									placeholder="Text"
									label="Text"
									type="textarea"
								/>
							</Box>

							<Flex justifyContent="space-between" alignItems="center" mt={4}>
								<Button
									type="submit"
									colorScheme="teal"
									isLoading={isSubmitting}
								>
									Create Post
								</Button>
								<NextLink href="/">
									<Button>Go back to Homepage</Button>
								</NextLink>
							</Flex>
						</Form>
					)}
				</Formik>
			</Flex>
		);
	}
};

export default CreatePost;
