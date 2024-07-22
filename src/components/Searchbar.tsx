import {
	Box,
	Flex,
	Input,
	List,
	ListIcon,
	ListItem,
	Text,
} from "@chakra-ui/react";
import InputField from "./InputField";
import { LinkIcon, SearchIcon } from "@chakra-ui/icons";
import { ChangeEvent, useCallback, useState } from "react";
import { title } from "process";
import { useCommunitiesQuery } from "../generated/graphql";
import NextLink from "next/link";
import { debounce } from "lodash";

const Searchbar = () => {
	const [input, setInput] = useState("");
	const { data, loading, refetch } = useCommunitiesQuery({
		variables: {
			limit: 3,
			title: input,
		},
	});

	const searchCommunities = debounce(async () => {
		if (!title) return;
		refetch();
	}, 500);

	const debouncRequest = useCallback(() => {
		searchCommunities();
	}, [searchCommunities]);

	// const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setInput(e.target.value);
	// 	debouncRequest();
	// };

	return (
		<Flex position="relative" maxW="550px">
			<Flex
				flex={1}
				w={["250px", "300px", "500px", "600px"]}
				align="center"
				bg="white"
				rounded="md"
				border="1px"
				borderColor="gray.300"
				paddingX={[2, 2, 2, 2]}
				paddingY={[1, 1, 2, 2]}
			>
				<SearchIcon mr={2} />
				<Input
					onChange={(e) => {
						setInput(e.target.value);
						debouncRequest();
					}}
					placeholder="Search communities"
					name="community"
					type="text"
					w="100%"
					border={0}
					_focusVisible={{ outline: 0 }}
				/>
			</Flex>
			{input.length > 0 ? (
				<Box
					position="absolute"
					top="60px"
					left={0}
					w={["250px", "300px", "500px", "600px"]}
					h="fit-content"
					bg="white"
					paddingX={[2, 2, 2, 2]}
					paddingY={[1, 1, 2, 2]}
				>
					{loading && (
						<Flex w="100%" align="center" gap={2}>
							<SearchIcon />
							<Text>Search for &quot;${input}&quot;</Text>
						</Flex>
					)}
					{!loading && data?.communities?.paginatedCommunities.length === 0 && (
						<Flex align="center" justify="center">
							<Text>No community found</Text>
						</Flex>
					)}
					{!loading && data?.communities?.paginatedCommunities.length && (
						<List w="100%" spacing={3}>
							{data.communities.paginatedCommunities.map((community) => (
								<NextLink key={community.id} href={`/s/${community.id}`}>
									<ListItem
										p={2}
										cursor="pointer"
										_hover={{ background: "gray.100" }}
									>
										<ListIcon as={LinkIcon} color="green.500" />
										<Text
											maxW={["250px", "300px", "500px", "600px"]}
											color="gray.600"
											// fontSize="sm"
											display="inline-block"
										>
											s/{community.title}
										</Text>
									</ListItem>
								</NextLink>
							))}
						</List>
					)}
				</Box>
			) : null}
		</Flex>
	);
};

export default Searchbar;
