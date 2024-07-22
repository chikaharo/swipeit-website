interface CommentData {
	id: string;
	text: string;
	user: Pick<UserData, "id" | "username">;
	parentId?: string | null | undefined;
	postId: string | number;
	createdAt?: string;
	updatedAt?: string;
}

interface UserData {
	id: string;
	username: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	posts?: PostData;
}

interface PostData {}
