import { ReactNode } from "react";
import Navbar from "./Navbar";
import Wrapper from "./Wrapper";
import { Box, Flex, Show } from "@chakra-ui/react";
import NavSidebar from "./NavSidebar";

interface ILayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
	return (
		<>
			<Navbar />
			<Wrapper>
				<Flex flexDir="row" width="100%" minH="calc(100vh-24px)" gap="3rem">
					<Show above="sm">
						<Box position="sticky" top={8} h="calc(100vh- 24px)">
							<NavSidebar />
						</Box>
					</Show>
					<Flex
						flex={1}
						pb={["24px", "24px", "32px", "36px"]}
						paddingX={[8, 8, 6, 6]}
						flexDir="column"
					>
						{children}
					</Flex>
				</Flex>
			</Wrapper>
		</>
	);
};

export default Layout;
