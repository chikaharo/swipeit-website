import { ReactNode } from "react";
import Navbar from "./Navbar";
import Wrapper from "./Wrapper";
import { Flex } from "@chakra-ui/react";
import NavSidebar from "./NavSidebar";

interface INestedLayoutProps {
	children: ReactNode;
}

const NestedLayout = ({ children }: INestedLayoutProps) => {
	return (
		<Wrapper>
			<Flex
				width="100%"
				minH="100vh"
				justifyContent="space-between"
				gap={4}
				position="relative"
			>
				<NavSidebar />
				{children}
			</Flex>
		</Wrapper>
	);
};

export default NestedLayout;
