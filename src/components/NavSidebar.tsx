import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Hide,
	IconButton,
	Input,
	Link,
	Show,
	Text,
	VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useCommunitiesQuery } from "../generated/graphql";

import HomeIcon from "../../public/images/home.svg";
import UpTrend from "../../public/images/uptrend.svg";

const NavSidebar = () => {
	const { data: communitiesData, loading: communitiesLoading } =
		useCommunitiesQuery({
			variables: {
				limit: 3,
			},
		});

	return (
		<Box
			borderRight="1px"
			borderColor="gray.300"
			minHeight="100vh"
			position="sticky"
			minW={["200px", "200px", "250px", "250px"]}
			top={0}
			zIndex={90}
			flexDir="column"
			overflowY="auto"
			css={{
				"&::-webkit-scrollbar": {
					width: "4px",
				},
				"&::-webkit-scrollbar-track": {
					width: "6px",
				},
				"&::-webkit-scrollbar-thumb": {
					background: "scrollbarColor",
					borderRadius: "24px",
				},
			}}
		>
			<VStack
				spacing={4}
				align="start"
				maxWidth={200}
				paddingX={[4, 4, 6, 6]}
				paddingY={4}
			>
				<NextLink href="/" passHref>
					<Flex
						align="center"
						gap={2}
						w="100%"
						p={2}
						_hover={{ background: "gray.100" }}
					>
						<Image src={HomeIcon} alt="icon" />
						Home
					</Flex>
				</NextLink>
				<NextLink href="/popular">
					<Flex
						align="center"
						gap={2}
						w="100%"
						p={2}
						_hover={{ background: "gray.100" }}
					>
						<Image src={UpTrend} alt="icon" />
						Popular
					</Flex>
				</NextLink>
				<Text fontWeight={700}>Communities</Text>
				{communitiesData?.communities?.paginatedCommunities?.map(
					(community) => (
						<Flex
							w="100%"
							key={community.id}
							p={2}
							_hover={{ background: "gray.100" }}
						>
							<NextLink href={`/s/${community.id}`}>
								s/{community.title}
							</NextLink>
						</Flex>
					)
				)}
			</VStack>
		</Box>
	);
};

export default NavSidebar;
