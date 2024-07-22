import { useCheckAuth } from "../utils/useCheckAuth";
import { Flex, Spinner, Box, Button, Heading } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import NextLink from "next/link";
import {
	CreateCommunityInput,
	CreatePostInput,
	useCreateCommunityMutation,
	useCreatePostMutation,
} from "../generated/graphql";
import router from "next/router";

const CreateCommunity = () => {
	const { data: authData, loading: authLoading } = useCheckAuth();

	const initialValues = { title: "", description: "" };

	const [CreateCommunity, _] = useCreateCommunityMutation();

	const onCreatePostSubmit = async (values: CreateCommunityInput) => {
		await CreateCommunity({
			variables: { createCommunityInput: values },
			update(cache, { data }) {
				// cache.modify({
				// 	fields: {
				// 		communities(existing) {
				if (data?.createCommunity.success && data.createCommunity.community) {
					const newCommunityRef = cache.identify(
						data.createCommunity.community
					);
					console.log({ newCommunityRef });
					// const newCommunitiesAfter = [...existing, newCommunityRef];
					// return newCommunitiesAfter;
				}
			},
			// 	},
			// });
			// },
		});
		router.push("/");
	};

	if (authLoading || (!authLoading && !authData?.me)) {
		// if (false) {
		return (
			<Flex justifyContent="center" alignItems="center" minH="100vh">
				<Spinner />
			</Flex>
		);
	} else {
		return (
			<Flex flexDir="column" width="100%" minHeight="100%">
				<Box marginBottom={8} pb={4} borderBottom="1px" borderColor="gray.300">
					<Heading>Create a community</Heading>
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
									name="description"
									placeholder="Description"
									label="Description"
									type="textarea"
								/>
							</Box>

							<Flex justifyContent="space-between" alignItems="center" mt={4}>
								<Button
									type="submit"
									colorScheme="teal"
									isLoading={isSubmitting}
								>
									Create Community
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

export default CreateCommunity;
