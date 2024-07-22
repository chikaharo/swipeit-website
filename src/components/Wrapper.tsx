import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type WrapperSize = "regular" | "small";

interface IWrapperProps {
	children: ReactNode;
	size?: WrapperSize;
}

const Wrapper = ({ children, size = "regular" }: IWrapperProps) => {
	return (
		<Box
			maxW={size === "regular" ? "1200px" : "400px"}
			w="100%"
			minH="calc(100vh-24px)"
			mt={8}
			mx="auto"
			pb={24}
		>
			{children}
		</Box>
	);
};

export default Wrapper;
