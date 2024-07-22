import { Box, Flex, Heading, Link, Button, Hide } from "@chakra-ui/react";
import NextLink from "next/link";
import {
	MeDocument,
	MeQuery,
	useLogoutMutation,
	useMeQuery,
} from "../generated/graphql";
import { Reference, gql } from "@apollo/client";
import MobileDrawler from "./MobileDrawler";
import Searchbar from "./Searchbar";

const Navbar = () => {
	const { data, loading: useMeQueryLoading } = useMeQuery();
	const [logout, { loading: useLogoutMutationLoading }] = useLogoutMutation();

	const logoutUser = async () => {
		await logout({
			update(cache, { data }) {
				if (data?.logout) {
					cache.writeQuery<MeQuery>({
						query: MeDocument,
						data: { me: null },
					});

					cache.modify({
						fields: {
							posts(existing) {
								existing.paginatedPosts.forEach((post: Reference) => {
									cache.writeFragment({
										id: post.__ref, // `Post:17`
										fragment: gql`
											fragment VoteType on Post {
												voteType
											}
										`,
										data: {
											voteType: 0,
										},
									});
								});

								return existing;
							},
						},
					});
				}
			},
		});
	};

	let body;

	if (useMeQueryLoading) {
		body = null;
	} else if (!data?.me) {
		body = (
			<>
				<NextLink href="/login">
					<Button mr={4}>Login</Button>
				</NextLink>
				<NextLink href="/register">
					<Button>Register</Button>
				</NextLink>
			</>
		);
	} else {
		body = (
			<Flex>
				<NextLink href="/create-community">
					<Button mr={4}>Create Community</Button>
				</NextLink>
				<Button onClick={logoutUser} isLoading={useLogoutMutationLoading}>
					Logout
				</Button>
			</Flex>
		);
	}

	return (
		<Box bg="tan" p={4} position="sticky" top={0} zIndex={100}>
			<Flex maxW={1200} justifyContent="space-between" align="center" m="auto">
				<Hide above="md">
					<MobileDrawler />
				</Hide>
				<NextLink href="/">
					<Heading>Swipeit</Heading>
				</NextLink>
				<Searchbar />
				<Box>{body}</Box>
			</Flex>
		</Box>
	);
};

export default Navbar;
