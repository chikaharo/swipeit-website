import { HamburgerIcon } from "@chakra-ui/icons";
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	IconButton,
	Input,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import NavSidebar from "./NavSidebar";

const MobileDrawler = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	return (
		<>
			<IconButton
				icon={<HamburgerIcon />}
				ref={btnRef}
				// colorScheme="teal"
				onClick={onOpen}
			>
				Open
			</IconButton>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					{/* <DrawerCloseButton />
					<DrawerHeader>Create your account</DrawerHeader>

					<DrawerBody>
						<Input placeholder="Type here..." />
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="blue">Save</Button>
					</DrawerFooter> */}
					<NavSidebar />
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MobileDrawler;
