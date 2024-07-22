import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
	DateTime: any;
};

export type ChangePasswordInput = {
	newPassword: Scalars["String"];
};

export type Comment = {
	__typename?: "Comment";
	id: Scalars["ID"];
	text: Scalars["String"];
	userId: Scalars["Float"];
	user: User;
	postId: Scalars["Float"];
	post: Post;
	parentId?: Maybe<Scalars["ID"]>;
	children: Array<Comment>;
	points: Scalars["Float"];
	voteType: Scalars["Float"];
	isSoftDeleted: Scalars["Boolean"];
	createdAt: Scalars["DateTime"];
	updatedAt: Scalars["DateTime"];
	textSnippet: Scalars["String"];
};

export type CommentMutationResponse = IMutationResponse & {
	__typename?: "CommentMutationResponse";
	code: Scalars["Float"];
	success: Scalars["Boolean"];
	message?: Maybe<Scalars["String"]>;
	comment?: Maybe<Comment>;
	errors?: Maybe<Array<FieldError>>;
};

export type Community = {
	__typename?: "Community";
	id: Scalars["ID"];
	title: Scalars["String"];
	description: Scalars["String"];
	posts?: Maybe<Array<Post>>;
	userId: Scalars["Float"];
	user: User;
	createdAt: Scalars["DateTime"];
	updatedAt: Scalars["DateTime"];
};

export type CommunityMutationResponse = IMutationResponse & {
	__typename?: "CommunityMutationResponse";
	code: Scalars["Float"];
	success: Scalars["Boolean"];
	message?: Maybe<Scalars["String"]>;
	community?: Maybe<Community>;
	errors?: Maybe<Array<FieldError>>;
};

export type CreateCommentInput = {
	text: Scalars["String"];
	postId: Scalars["Float"];
	parentId?: Maybe<Scalars["Float"]>;
};

export type CreateCommunityInput = {
	title: Scalars["String"];
	description: Scalars["String"];
};

export type CreatePostInput = {
	title: Scalars["String"];
	text: Scalars["String"];
	communityId: Scalars["Float"];
};

export type FieldError = {
	__typename?: "FieldError";
	field: Scalars["String"];
	message: Scalars["String"];
};

export type Filters = {
	createdAt?: Maybe<Scalars["String"]>;
	points?: Maybe<Scalars["String"]>;
};

export type ForgotPasswordInput = {
	email: Scalars["String"];
};

export type IMutationResponse = {
	code: Scalars["Float"];
	success: Scalars["Boolean"];
	message?: Maybe<Scalars["String"]>;
};

export type LoginInput = {
	usernameOrEmail: Scalars["String"];
	password: Scalars["String"];
};

export type Mutation = {
	__typename?: "Mutation";
	register: UserMutationResponse;
	login: UserMutationResponse;
	logout: Scalars["Boolean"];
	forgotPassword: Scalars["Boolean"];
	changePassword: UserMutationResponse;
	createPost: PostMutationResponse;
	updatePost: PostMutationResponse;
	deletePost: PostMutationResponse;
	vote: PostMutationResponse;
	createCommunity: CommunityMutationResponse;
	updateCommunity: CommunityMutationResponse;
	deleteCommunity: CommunityMutationResponse;
	createComment: CommentMutationResponse;
	updateComment: CommentMutationResponse;
	deleteComment: CommentMutationResponse;
	voteComment: CommentMutationResponse;
};

export type MutationRegisterArgs = {
	registerInput: RegisterInput;
};

export type MutationLoginArgs = {
	loginInput: LoginInput;
};

export type MutationForgotPasswordArgs = {
	forgotPasswordInput: ForgotPasswordInput;
};

export type MutationChangePasswordArgs = {
	changePasswordInput: ChangePasswordInput;
	userId: Scalars["String"];
	token: Scalars["String"];
};

export type MutationCreatePostArgs = {
	createPostInput: CreatePostInput;
};

export type MutationUpdatePostArgs = {
	updatePostInput: UpdatePostInput;
};

export type MutationDeletePostArgs = {
	id: Scalars["ID"];
};

export type MutationVoteArgs = {
	inputVoteValue: VoteType;
	postId: Scalars["Int"];
};

export type MutationCreateCommunityArgs = {
	createCommunityInput: CreateCommunityInput;
};

export type MutationUpdateCommunityArgs = {
	updateCommunityInput: UpdateCommunityInput;
};

export type MutationDeleteCommunityArgs = {
	id: Scalars["ID"];
};

export type MutationCreateCommentArgs = {
	createCommentInput: CreateCommentInput;
};

export type MutationUpdateCommentArgs = {
	updateCommentInput: UpdateCommentInput;
};

export type MutationDeleteCommentArgs = {
	id: Scalars["ID"];
};

export type MutationVoteCommentArgs = {
	inputVoteValue: VoteType;
	commentId: Scalars["Int"];
};

export type PaginatedComments = {
	__typename?: "PaginatedComments";
	totalCount: Scalars["Float"];
	cursor: Scalars["DateTime"];
	hasMore: Scalars["Boolean"];
	paginatedComments: Array<Comment>;
};

export type PaginatedCommunities = {
	__typename?: "PaginatedCommunities";
	totalCount: Scalars["Float"];
	cursor: Scalars["DateTime"];
	hasMore: Scalars["Boolean"];
	paginatedCommunities: Array<Community>;
};

export type PaginatedPosts = {
	__typename?: "PaginatedPosts";
	totalCount: Scalars["Float"];
	cursor: Scalars["DateTime"];
	hasMore: Scalars["Boolean"];
	paginatedPosts: Array<Post>;
};

export type Post = {
	__typename?: "Post";
	id: Scalars["ID"];
	title: Scalars["String"];
	userId: Scalars["Float"];
	user: User;
	communityId: Scalars["Float"];
	community: Community;
	points: Scalars["Float"];
	voteType: Scalars["Float"];
	text: Scalars["String"];
	createdAt: Scalars["DateTime"];
	updatedAt: Scalars["DateTime"];
	textSnippet: Scalars["String"];
};

export type PostMutationResponse = IMutationResponse & {
	__typename?: "PostMutationResponse";
	code: Scalars["Float"];
	success: Scalars["Boolean"];
	message?: Maybe<Scalars["String"]>;
	post?: Maybe<Post>;
	errors?: Maybe<Array<FieldError>>;
};

export type Query = {
	__typename?: "Query";
	hello: Scalars["String"];
	me?: Maybe<User>;
	posts?: Maybe<PaginatedPosts>;
	post?: Maybe<Post>;
	communities?: Maybe<PaginatedCommunities>;
	community?: Maybe<Community>;
	comments?: Maybe<PaginatedComments>;
	comment?: Maybe<Comment>;
};

export type QueryPostsArgs = {
	filters?: Maybe<Filters>;
	communityId?: Maybe<Scalars["ID"]>;
	cursor?: Maybe<Scalars["String"]>;
	limit: Scalars["Int"];
};

export type QueryPostArgs = {
	id: Scalars["ID"];
};

export type QueryCommunitiesArgs = {
	title?: Maybe<Scalars["String"]>;
	cursor?: Maybe<Scalars["String"]>;
	limit: Scalars["Int"];
};

export type QueryCommunityArgs = {
	id: Scalars["ID"];
};

export type QueryCommentsArgs = {
	cursor?: Maybe<Scalars["String"]>;
	postId: Scalars["ID"];
	limit: Scalars["Int"];
};

export type QueryCommentArgs = {
	id: Scalars["ID"];
};

export type RegisterInput = {
	username: Scalars["String"];
	email: Scalars["String"];
	password: Scalars["String"];
};

export type UpdateCommentInput = {
	id: Scalars["ID"];
	text: Scalars["String"];
};

export type UpdateCommunityInput = {
	id: Scalars["ID"];
	title: Scalars["String"];
	description: Scalars["String"];
};

export type UpdatePostInput = {
	id: Scalars["ID"];
	title: Scalars["String"];
	text: Scalars["String"];
};

export type User = {
	__typename?: "User";
	id: Scalars["ID"];
	username: Scalars["String"];
	email: Scalars["String"];
	createdAt: Scalars["DateTime"];
	updatedAt: Scalars["DateTime"];
	posts: Array<Post>;
};

export type UserMutationResponse = IMutationResponse & {
	__typename?: "UserMutationResponse";
	code: Scalars["Float"];
	success: Scalars["Boolean"];
	message?: Maybe<Scalars["String"]>;
	user?: Maybe<User>;
	errors?: Maybe<Array<FieldError>>;
};

export enum VoteType {
	Upvote = "Upvote",
	Downvote = "Downvote",
}

export type CommentMutationResponseFragment = {
	__typename?: "CommentMutationResponse";
} & {
	comment?: Maybe<{ __typename?: "Comment" } & CommentWithUserInfoFragment>;
	errors?: Maybe<Array<{ __typename?: "FieldError" } & FieldErrorFragment>>;
} & CommentMutationStatusesFragment;

export type CommentWithUserInfoFragment = { __typename?: "Comment" } & Pick<
	Comment,
	| "id"
	| "text"
	| "createdAt"
	| "updatedAt"
	| "parentId"
	| "postId"
	| "userId"
	| "points"
	| "voteType"
	| "isSoftDeleted"
> & { user: { __typename?: "User" } & Pick<User, "id" | "username"> };

export type CommunityMutationResponseFragment = {
	__typename?: "CommunityMutationResponse";
} & {
	community?: Maybe<{ __typename?: "Community" } & CommunityWithPostsFragment>;
	errors?: Maybe<Array<{ __typename?: "FieldError" } & FieldErrorFragment>>;
} & CommunityMutationStatusesFragment;

export type CommunityWithPostsFragment = { __typename?: "Community" } & Pick<
	Community,
	"id" | "title" | "description" | "createdAt" | "updatedAt"
> & {
		posts?: Maybe<Array<{ __typename?: "Post" } & PostWithUserInfoFragment>>;
		user: { __typename?: "User" } & Pick<User, "id" | "username">;
	};

export type FieldErrorFragment = { __typename?: "FieldError" } & Pick<
	FieldError,
	"field" | "message"
>;

export type UserMutationStatusesFragment = {
	__typename?: "UserMutationResponse";
} & Pick<UserMutationResponse, "code" | "success" | "message">;

export type PostMutationStatusesFragment = {
	__typename?: "PostMutationResponse";
} & Pick<PostMutationResponse, "code" | "success" | "message">;

export type CommunityMutationStatusesFragment = {
	__typename?: "CommunityMutationResponse";
} & Pick<CommunityMutationResponse, "code" | "success" | "message">;

export type CommentMutationStatusesFragment = {
	__typename?: "CommentMutationResponse";
} & Pick<CommentMutationResponse, "code" | "success" | "message">;

export type PostMutationResponseFragment = {
	__typename?: "PostMutationResponse";
} & {
	post?: Maybe<{ __typename?: "Post" } & PostWithUserInfoFragment>;
	errors?: Maybe<Array<{ __typename?: "FieldError" } & FieldErrorFragment>>;
} & PostMutationStatusesFragment;

export type PostWithUserInfoFragment = { __typename?: "Post" } & Pick<
	Post,
	| "id"
	| "title"
	| "text"
	| "createdAt"
	| "updatedAt"
	| "textSnippet"
	| "points"
	| "voteType"
> & {
		user: { __typename?: "User" } & Pick<User, "id" | "username">;
		community: { __typename?: "Community" } & Pick<Community, "id" | "title">;
	};

export type UserInfoFragment = { __typename?: "User" } & Pick<
	User,
	"id" | "username" | "email"
>;

export type UserMutationResponseFragment = {
	__typename?: "UserMutationResponse";
} & {
	user?: Maybe<{ __typename?: "User" } & UserInfoFragment>;
	errors?: Maybe<Array<{ __typename?: "FieldError" } & FieldErrorFragment>>;
} & UserMutationStatusesFragment;

export type ChangePasswordMutationVariables = Exact<{
	userId: Scalars["String"];
	token: Scalars["String"];
	changePasswordInput: ChangePasswordInput;
}>;

export type ChangePasswordMutation = { __typename?: "Mutation" } & {
	changePassword: {
		__typename?: "UserMutationResponse";
	} & UserMutationResponseFragment;
};

export type CreateCommentMutationVariables = Exact<{
	createCommentInput: CreateCommentInput;
}>;

export type CreateCommentMutation = { __typename?: "Mutation" } & {
	createComment: {
		__typename?: "CommentMutationResponse";
	} & CommentMutationResponseFragment;
};

export type CreateCommunityMutationVariables = Exact<{
	createCommunityInput: CreateCommunityInput;
}>;

export type CreateCommunityMutation = { __typename?: "Mutation" } & {
	createCommunity: {
		__typename?: "CommunityMutationResponse";
	} & CommunityMutationResponseFragment;
};

export type CreatePostMutationVariables = Exact<{
	createPostInput: CreatePostInput;
}>;

export type CreatePostMutation = { __typename?: "Mutation" } & {
	createPost: {
		__typename?: "PostMutationResponse";
	} & PostMutationResponseFragment;
};

export type DeleteCommentMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type DeleteCommentMutation = { __typename?: "Mutation" } & {
	deleteComment: {
		__typename?: "CommentMutationResponse";
	} & CommentMutationStatusesFragment;
};

export type DeleteCommunityMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type DeleteCommunityMutation = { __typename?: "Mutation" } & {
	deleteCommunity: {
		__typename?: "CommunityMutationResponse";
	} & CommunityMutationStatusesFragment;
};

export type DeletePostMutationVariables = Exact<{
	id: Scalars["ID"];
}>;

export type DeletePostMutation = { __typename?: "Mutation" } & {
	deletePost: {
		__typename?: "PostMutationResponse";
	} & PostMutationStatusesFragment;
};

export type ForgotPasswordMutationVariables = Exact<{
	forgotPasswordInput: ForgotPasswordInput;
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
	Mutation,
	"forgotPassword"
>;

export type LoginMutationVariables = Exact<{
	loginInput: LoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
	login: { __typename?: "UserMutationResponse" } & UserMutationResponseFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
	Mutation,
	"logout"
>;

export type RegisterMutationVariables = Exact<{
	registerInput: RegisterInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
	register: { __typename?: "UserMutationResponse" } & Pick<
		UserMutationResponse,
		"code" | "success" | "message"
	> & {
			user?: Maybe<{ __typename?: "User" } & UserInfoFragment>;
			errors?: Maybe<Array<{ __typename?: "FieldError" } & FieldErrorFragment>>;
		};
};

export type UpdateCommentMutationVariables = Exact<{
	updateCommentInput: UpdateCommentInput;
}>;

export type UpdateCommentMutation = { __typename?: "Mutation" } & {
	updateComment: {
		__typename?: "CommentMutationResponse";
	} & CommentMutationResponseFragment;
};

export type UpdateCommunityMutationVariables = Exact<{
	updateCommunityInput: UpdateCommunityInput;
}>;

export type UpdateCommunityMutation = { __typename?: "Mutation" } & {
	updateCommunity: {
		__typename?: "CommunityMutationResponse";
	} & CommunityMutationResponseFragment;
};

export type UpdatePostMutationVariables = Exact<{
	updatePostInput: UpdatePostInput;
}>;

export type UpdatePostMutation = { __typename?: "Mutation" } & {
	updatePost: {
		__typename?: "PostMutationResponse";
	} & PostMutationResponseFragment;
};

export type VoteMutationVariables = Exact<{
	inputVoteValue: VoteType;
	postId: Scalars["Int"];
}>;

export type VoteMutation = { __typename?: "Mutation" } & {
	vote: { __typename?: "PostMutationResponse" } & PostMutationResponseFragment;
};

export type VoteCommentMutationVariables = Exact<{
	inputVoteValue: VoteType;
	commentId: Scalars["Int"];
}>;

export type VoteCommentMutation = { __typename?: "Mutation" } & {
	voteComment: {
		__typename?: "CommentMutationResponse";
	} & CommentMutationResponseFragment;
};

export type CommentIdsQueryVariables = Exact<{
	limit: Scalars["Int"];
	postId: Scalars["ID"];
	cursor?: Maybe<Scalars["String"]>;
}>;

export type CommentIdsQuery = { __typename?: "Query" } & {
	comments?: Maybe<
		{ __typename?: "PaginatedComments" } & {
			paginatedComments: Array<
				{ __typename?: "Comment" } & Pick<Comment, "id">
			>;
		}
	>;
};

export type CommentsQueryVariables = Exact<{
	limit: Scalars["Int"];
	cursor?: Maybe<Scalars["String"]>;
	postId: Scalars["ID"];
}>;

export type CommentsQuery = { __typename?: "Query" } & {
	comments?: Maybe<
		{ __typename?: "PaginatedComments" } & Pick<
			PaginatedComments,
			"totalCount" | "cursor" | "hasMore"
		> & {
				paginatedComments: Array<
					{ __typename?: "Comment" } & {
						children: Array<
							{ __typename?: "Comment" } & CommentWithUserInfoFragment
						>;
					} & CommentWithUserInfoFragment
				>;
			}
	>;
};

export type CommunitiesQueryVariables = Exact<{
	limit: Scalars["Int"];
	cursor?: Maybe<Scalars["String"]>;
	title?: Maybe<Scalars["String"]>;
}>;

export type CommunitiesQuery = { __typename?: "Query" } & {
	communities?: Maybe<
		{ __typename?: "PaginatedCommunities" } & Pick<
			PaginatedCommunities,
			"totalCount" | "cursor" | "hasMore"
		> & {
				paginatedCommunities: Array<
					{ __typename?: "Community" } & Pick<
						Community,
						"id" | "title" | "description"
					>
				>;
			}
	>;
};

export type CommunityQueryVariables = Exact<{
	id: Scalars["ID"];
}>;

export type CommunityQuery = { __typename?: "Query" } & {
	community?: Maybe<{ __typename?: "Community" } & CommunityWithPostsFragment>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
	me?: Maybe<{ __typename?: "User" } & UserInfoFragment>;
};

export type PostQueryVariables = Exact<{
	id: Scalars["ID"];
}>;

export type PostQuery = { __typename?: "Query" } & {
	post?: Maybe<
		{ __typename?: "Post" } & {
			community: { __typename?: "Community" } & Pick<
				Community,
				"id" | "title" | "description"
			>;
		} & PostWithUserInfoFragment
	>;
};

export type PostIdsQueryVariables = Exact<{
	limit: Scalars["Int"];
	cursor?: Maybe<Scalars["String"]>;
}>;

export type PostIdsQuery = { __typename?: "Query" } & {
	posts?: Maybe<
		{ __typename?: "PaginatedPosts" } & {
			paginatedPosts: Array<{ __typename?: "Post" } & Pick<Post, "id">>;
		}
	>;
};

export type PostsQueryVariables = Exact<{
	limit: Scalars["Int"];
	cursor?: Maybe<Scalars["String"]>;
	communityId?: Maybe<Scalars["ID"]>;
	filters?: Maybe<Filters>;
}>;

export type PostsQuery = { __typename?: "Query" } & {
	posts?: Maybe<
		{ __typename?: "PaginatedPosts" } & Pick<
			PaginatedPosts,
			"totalCount" | "cursor" | "hasMore"
		> & {
				paginatedPosts: Array<
					{ __typename?: "Post" } & PostWithUserInfoFragment
				>;
			}
	>;
};

export const CommentMutationStatusesFragmentDoc = gql`
	fragment commentMutationStatuses on CommentMutationResponse {
		code
		success
		message
	}
`;
export const CommentWithUserInfoFragmentDoc = gql`
	fragment commentWithUserInfo on Comment {
		id
		text
		createdAt
		updatedAt
		parentId
		postId
		userId
		points
		voteType
		isSoftDeleted
		user {
			id
			username
		}
	}
`;
export const FieldErrorFragmentDoc = gql`
	fragment fieldError on FieldError {
		field
		message
	}
`;
export const CommentMutationResponseFragmentDoc = gql`
	fragment commentMutationResponse on CommentMutationResponse {
		...commentMutationStatuses
		comment {
			...commentWithUserInfo
		}
		errors {
			...fieldError
		}
	}
	${CommentMutationStatusesFragmentDoc}
	${CommentWithUserInfoFragmentDoc}
	${FieldErrorFragmentDoc}
`;
export const CommunityMutationStatusesFragmentDoc = gql`
	fragment communityMutationStatuses on CommunityMutationResponse {
		code
		success
		message
	}
`;
export const PostWithUserInfoFragmentDoc = gql`
	fragment postWithUserInfo on Post {
		id
		title
		text
		createdAt
		updatedAt
		textSnippet
		points
		voteType
		user {
			id
			username
		}
		community {
			id
			title
		}
	}
`;
export const CommunityWithPostsFragmentDoc = gql`
	fragment communityWithPosts on Community {
		id
		title
		description
		createdAt
		updatedAt
		posts {
			...postWithUserInfo
		}
		user {
			id
			username
		}
	}
	${PostWithUserInfoFragmentDoc}
`;
export const CommunityMutationResponseFragmentDoc = gql`
	fragment communityMutationResponse on CommunityMutationResponse {
		...communityMutationStatuses
		community {
			...communityWithPosts
		}
		errors {
			...fieldError
		}
	}
	${CommunityMutationStatusesFragmentDoc}
	${CommunityWithPostsFragmentDoc}
	${FieldErrorFragmentDoc}
`;
export const PostMutationStatusesFragmentDoc = gql`
	fragment postMutationStatuses on PostMutationResponse {
		code
		success
		message
	}
`;
export const PostMutationResponseFragmentDoc = gql`
	fragment postMutationResponse on PostMutationResponse {
		...postMutationStatuses
		post {
			...postWithUserInfo
		}
		errors {
			...fieldError
		}
	}
	${PostMutationStatusesFragmentDoc}
	${PostWithUserInfoFragmentDoc}
	${FieldErrorFragmentDoc}
`;
export const UserMutationStatusesFragmentDoc = gql`
	fragment userMutationStatuses on UserMutationResponse {
		code
		success
		message
	}
`;
export const UserInfoFragmentDoc = gql`
	fragment userInfo on User {
		id
		username
		email
	}
`;
export const UserMutationResponseFragmentDoc = gql`
	fragment userMutationResponse on UserMutationResponse {
		...userMutationStatuses
		user {
			...userInfo
		}
		errors {
			...fieldError
		}
	}
	${UserMutationStatusesFragmentDoc}
	${UserInfoFragmentDoc}
	${FieldErrorFragmentDoc}
`;
export const ChangePasswordDocument = gql`
	mutation ChangePassword(
		$userId: String!
		$token: String!
		$changePasswordInput: ChangePasswordInput!
	) {
		changePassword(
			userId: $userId
			token: $token
			changePasswordInput: $changePasswordInput
		) {
			...userMutationResponse
		}
	}
	${UserMutationResponseFragmentDoc}
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
	ChangePasswordMutation,
	ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(
	baseOptions?: Apollo.MutationHookOptions<
		ChangePasswordMutation,
		ChangePasswordMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		ChangePasswordMutation,
		ChangePasswordMutationVariables
	>(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
	typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
	Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
	ChangePasswordMutation,
	ChangePasswordMutationVariables
>;
export const CreateCommentDocument = gql`
	mutation CreateComment($createCommentInput: CreateCommentInput!) {
		createComment(createCommentInput: $createCommentInput) {
			...commentMutationResponse
		}
	}
	${CommentMutationResponseFragmentDoc}
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
	CreateCommentMutation,
	CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      createCommentInput: // value for 'createCommentInput'
 *   },
 * });
 */
export function useCreateCommentMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateCommentMutation,
		CreateCommentMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		CreateCommentMutation,
		CreateCommentMutationVariables
	>(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<
	typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult =
	Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
	CreateCommentMutation,
	CreateCommentMutationVariables
>;
export const CreateCommunityDocument = gql`
	mutation CreateCommunity($createCommunityInput: CreateCommunityInput!) {
		createCommunity(createCommunityInput: $createCommunityInput) {
			...communityMutationResponse
		}
	}
	${CommunityMutationResponseFragmentDoc}
`;
export type CreateCommunityMutationFn = Apollo.MutationFunction<
	CreateCommunityMutation,
	CreateCommunityMutationVariables
>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      createCommunityInput: // value for 'createCommunityInput'
 *   },
 * });
 */
export function useCreateCommunityMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateCommunityMutation,
		CreateCommunityMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		CreateCommunityMutation,
		CreateCommunityMutationVariables
	>(CreateCommunityDocument, options);
}
export type CreateCommunityMutationHookResult = ReturnType<
	typeof useCreateCommunityMutation
>;
export type CreateCommunityMutationResult =
	Apollo.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = Apollo.BaseMutationOptions<
	CreateCommunityMutation,
	CreateCommunityMutationVariables
>;
export const CreatePostDocument = gql`
	mutation CreatePost($createPostInput: CreatePostInput!) {
		createPost(createPostInput: $createPostInput) {
			...postMutationResponse
		}
	}
	${PostMutationResponseFragmentDoc}
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
	CreatePostMutation,
	CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreatePostMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreatePostMutation,
		CreatePostMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
		CreatePostDocument,
		options
	);
}
export type CreatePostMutationHookResult = ReturnType<
	typeof useCreatePostMutation
>;
export type CreatePostMutationResult =
	Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
	CreatePostMutation,
	CreatePostMutationVariables
>;
export const DeleteCommentDocument = gql`
	mutation DeleteComment($id: ID!) {
		deleteComment(id: $id) {
			...commentMutationStatuses
		}
	}
	${CommentMutationStatusesFragmentDoc}
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<
	DeleteCommentMutation,
	DeleteCommentMutationVariables
>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteCommentMutation,
		DeleteCommentMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		DeleteCommentMutation,
		DeleteCommentMutationVariables
	>(DeleteCommentDocument, options);
}
export type DeleteCommentMutationHookResult = ReturnType<
	typeof useDeleteCommentMutation
>;
export type DeleteCommentMutationResult =
	Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
	DeleteCommentMutation,
	DeleteCommentMutationVariables
>;
export const DeleteCommunityDocument = gql`
	mutation DeleteCommunity($id: ID!) {
		deleteCommunity(id: $id) {
			...communityMutationStatuses
		}
	}
	${CommunityMutationStatusesFragmentDoc}
`;
export type DeleteCommunityMutationFn = Apollo.MutationFunction<
	DeleteCommunityMutation,
	DeleteCommunityMutationVariables
>;

/**
 * __useDeleteCommunityMutation__
 *
 * To run a mutation, you first call `useDeleteCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommunityMutation, { data, loading, error }] = useDeleteCommunityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommunityMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeleteCommunityMutation,
		DeleteCommunityMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		DeleteCommunityMutation,
		DeleteCommunityMutationVariables
	>(DeleteCommunityDocument, options);
}
export type DeleteCommunityMutationHookResult = ReturnType<
	typeof useDeleteCommunityMutation
>;
export type DeleteCommunityMutationResult =
	Apollo.MutationResult<DeleteCommunityMutation>;
export type DeleteCommunityMutationOptions = Apollo.BaseMutationOptions<
	DeleteCommunityMutation,
	DeleteCommunityMutationVariables
>;
export const DeletePostDocument = gql`
	mutation DeletePost($id: ID!) {
		deletePost(id: $id) {
			...postMutationStatuses
		}
	}
	${PostMutationStatusesFragmentDoc}
`;
export type DeletePostMutationFn = Apollo.MutationFunction<
	DeletePostMutation,
	DeletePostMutationVariables
>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(
	baseOptions?: Apollo.MutationHookOptions<
		DeletePostMutation,
		DeletePostMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
		DeletePostDocument,
		options
	);
}
export type DeletePostMutationHookResult = ReturnType<
	typeof useDeletePostMutation
>;
export type DeletePostMutationResult =
	Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
	DeletePostMutation,
	DeletePostMutationVariables
>;
export const ForgotPasswordDocument = gql`
	mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
		forgotPassword(forgotPasswordInput: $forgotPasswordInput)
	}
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
	ForgotPasswordMutation,
	ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPasswordInput: // value for 'forgotPasswordInput'
 *   },
 * });
 */
export function useForgotPasswordMutation(
	baseOptions?: Apollo.MutationHookOptions<
		ForgotPasswordMutation,
		ForgotPasswordMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		ForgotPasswordMutation,
		ForgotPasswordMutationVariables
	>(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
	typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
	Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
	ForgotPasswordMutation,
	ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
	mutation Login($loginInput: LoginInput!) {
		login(loginInput: $loginInput) {
			...userMutationResponse
		}
	}
	${UserMutationResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
	LoginMutation,
	LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(
	baseOptions?: Apollo.MutationHookOptions<
		LoginMutation,
		LoginMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
		LoginDocument,
		options
	);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
	LoginMutation,
	LoginMutationVariables
>;
export const LogoutDocument = gql`
	mutation Logout {
		logout
	}
`;
export type LogoutMutationFn = Apollo.MutationFunction<
	LogoutMutation,
	LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
	baseOptions?: Apollo.MutationHookOptions<
		LogoutMutation,
		LogoutMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
		LogoutDocument,
		options
	);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
	LogoutMutation,
	LogoutMutationVariables
>;
export const RegisterDocument = gql`
	mutation Register($registerInput: RegisterInput!) {
		register(registerInput: $registerInput) {
			code
			success
			message
			user {
				...userInfo
			}
			errors {
				...fieldError
			}
		}
	}
	${UserInfoFragmentDoc}
	${FieldErrorFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
	RegisterMutation,
	RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(
	baseOptions?: Apollo.MutationHookOptions<
		RegisterMutation,
		RegisterMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
		RegisterDocument,
		options
	);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
	RegisterMutation,
	RegisterMutationVariables
>;
export const UpdateCommentDocument = gql`
	mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {
		updateComment(updateCommentInput: $updateCommentInput) {
			...commentMutationResponse
		}
	}
	${CommentMutationResponseFragmentDoc}
`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<
	UpdateCommentMutation,
	UpdateCommentMutationVariables
>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      updateCommentInput: // value for 'updateCommentInput'
 *   },
 * });
 */
export function useUpdateCommentMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateCommentMutation,
		UpdateCommentMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateCommentMutation,
		UpdateCommentMutationVariables
	>(UpdateCommentDocument, options);
}
export type UpdateCommentMutationHookResult = ReturnType<
	typeof useUpdateCommentMutation
>;
export type UpdateCommentMutationResult =
	Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<
	UpdateCommentMutation,
	UpdateCommentMutationVariables
>;
export const UpdateCommunityDocument = gql`
	mutation UpdateCommunity($updateCommunityInput: UpdateCommunityInput!) {
		updateCommunity(updateCommunityInput: $updateCommunityInput) {
			...communityMutationResponse
		}
	}
	${CommunityMutationResponseFragmentDoc}
`;
export type UpdateCommunityMutationFn = Apollo.MutationFunction<
	UpdateCommunityMutation,
	UpdateCommunityMutationVariables
>;

/**
 * __useUpdateCommunityMutation__
 *
 * To run a mutation, you first call `useUpdateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommunityMutation, { data, loading, error }] = useUpdateCommunityMutation({
 *   variables: {
 *      updateCommunityInput: // value for 'updateCommunityInput'
 *   },
 * });
 */
export function useUpdateCommunityMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateCommunityMutation,
		UpdateCommunityMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<
		UpdateCommunityMutation,
		UpdateCommunityMutationVariables
	>(UpdateCommunityDocument, options);
}
export type UpdateCommunityMutationHookResult = ReturnType<
	typeof useUpdateCommunityMutation
>;
export type UpdateCommunityMutationResult =
	Apollo.MutationResult<UpdateCommunityMutation>;
export type UpdateCommunityMutationOptions = Apollo.BaseMutationOptions<
	UpdateCommunityMutation,
	UpdateCommunityMutationVariables
>;
export const UpdatePostDocument = gql`
	mutation UpdatePost($updatePostInput: UpdatePostInput!) {
		updatePost(updatePostInput: $updatePostInput) {
			...postMutationResponse
		}
	}
	${PostMutationResponseFragmentDoc}
`;
export type UpdatePostMutationFn = Apollo.MutationFunction<
	UpdatePostMutation,
	UpdatePostMutationVariables
>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostInput: // value for 'updatePostInput'
 *   },
 * });
 */
export function useUpdatePostMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdatePostMutation,
		UpdatePostMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
		UpdatePostDocument,
		options
	);
}
export type UpdatePostMutationHookResult = ReturnType<
	typeof useUpdatePostMutation
>;
export type UpdatePostMutationResult =
	Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
	UpdatePostMutation,
	UpdatePostMutationVariables
>;
export const VoteDocument = gql`
	mutation Vote($inputVoteValue: VoteType!, $postId: Int!) {
		vote(inputVoteValue: $inputVoteValue, postId: $postId) {
			...postMutationResponse
		}
	}
	${PostMutationResponseFragmentDoc}
`;
export type VoteMutationFn = Apollo.MutationFunction<
	VoteMutation,
	VoteMutationVariables
>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      inputVoteValue: // value for 'inputVoteValue'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(
	baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<VoteMutation, VoteMutationVariables>(
		VoteDocument,
		options
	);
}
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<
	VoteMutation,
	VoteMutationVariables
>;
export const VoteCommentDocument = gql`
	mutation VoteComment($inputVoteValue: VoteType!, $commentId: Int!) {
		voteComment(inputVoteValue: $inputVoteValue, commentId: $commentId) {
			...commentMutationResponse
		}
	}
	${CommentMutationResponseFragmentDoc}
`;
export type VoteCommentMutationFn = Apollo.MutationFunction<
	VoteCommentMutation,
	VoteCommentMutationVariables
>;

/**
 * __useVoteCommentMutation__
 *
 * To run a mutation, you first call `useVoteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteCommentMutation, { data, loading, error }] = useVoteCommentMutation({
 *   variables: {
 *      inputVoteValue: // value for 'inputVoteValue'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useVoteCommentMutation(
	baseOptions?: Apollo.MutationHookOptions<
		VoteCommentMutation,
		VoteCommentMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<VoteCommentMutation, VoteCommentMutationVariables>(
		VoteCommentDocument,
		options
	);
}
export type VoteCommentMutationHookResult = ReturnType<
	typeof useVoteCommentMutation
>;
export type VoteCommentMutationResult =
	Apollo.MutationResult<VoteCommentMutation>;
export type VoteCommentMutationOptions = Apollo.BaseMutationOptions<
	VoteCommentMutation,
	VoteCommentMutationVariables
>;
export const CommentIdsDocument = gql`
	query CommentIds($limit: Int!, $postId: ID!, $cursor: String) {
		comments(limit: $limit, postId: $postId, cursor: $cursor) {
			paginatedComments {
				id
			}
		}
	}
`;

/**
 * __useCommentIdsQuery__
 *
 * To run a query within a React component, call `useCommentIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentIdsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      postId: // value for 'postId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCommentIdsQuery(
	baseOptions: Apollo.QueryHookOptions<
		CommentIdsQuery,
		CommentIdsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<CommentIdsQuery, CommentIdsQueryVariables>(
		CommentIdsDocument,
		options
	);
}
export function useCommentIdsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		CommentIdsQuery,
		CommentIdsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<CommentIdsQuery, CommentIdsQueryVariables>(
		CommentIdsDocument,
		options
	);
}
export type CommentIdsQueryHookResult = ReturnType<typeof useCommentIdsQuery>;
export type CommentIdsLazyQueryHookResult = ReturnType<
	typeof useCommentIdsLazyQuery
>;
export type CommentIdsQueryResult = Apollo.QueryResult<
	CommentIdsQuery,
	CommentIdsQueryVariables
>;
export const CommentsDocument = gql`
	query Comments($limit: Int!, $cursor: String, $postId: ID!) {
		comments(limit: $limit, cursor: $cursor, postId: $postId) {
			totalCount
			cursor
			hasMore
			paginatedComments {
				...commentWithUserInfo
				children {
					...commentWithUserInfo
				}
			}
		}
	}
	${CommentWithUserInfoFragmentDoc}
`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(
	baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(
		CommentsDocument,
		options
	);
}
export function useCommentsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		CommentsQuery,
		CommentsQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(
		CommentsDocument,
		options
	);
}
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<
	typeof useCommentsLazyQuery
>;
export type CommentsQueryResult = Apollo.QueryResult<
	CommentsQuery,
	CommentsQueryVariables
>;
export const CommunitiesDocument = gql`
	query Communities($limit: Int!, $cursor: String, $title: String) {
		communities(limit: $limit, cursor: $cursor, title: $title) {
			totalCount
			cursor
			hasMore
			paginatedCommunities {
				id
				title
				description
			}
		}
	}
`;

/**
 * __useCommunitiesQuery__
 *
 * To run a query within a React component, call `useCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunitiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCommunitiesQuery(
	baseOptions: Apollo.QueryHookOptions<
		CommunitiesQuery,
		CommunitiesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<CommunitiesQuery, CommunitiesQueryVariables>(
		CommunitiesDocument,
		options
	);
}
export function useCommunitiesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		CommunitiesQuery,
		CommunitiesQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<CommunitiesQuery, CommunitiesQueryVariables>(
		CommunitiesDocument,
		options
	);
}
export type CommunitiesQueryHookResult = ReturnType<typeof useCommunitiesQuery>;
export type CommunitiesLazyQueryHookResult = ReturnType<
	typeof useCommunitiesLazyQuery
>;
export type CommunitiesQueryResult = Apollo.QueryResult<
	CommunitiesQuery,
	CommunitiesQueryVariables
>;
export const CommunityDocument = gql`
	query Community($id: ID!) {
		community(id: $id) {
			...communityWithPosts
		}
	}
	${CommunityWithPostsFragmentDoc}
`;

/**
 * __useCommunityQuery__
 *
 * To run a query within a React component, call `useCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommunityQuery(
	baseOptions: Apollo.QueryHookOptions<CommunityQuery, CommunityQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<CommunityQuery, CommunityQueryVariables>(
		CommunityDocument,
		options
	);
}
export function useCommunityLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		CommunityQuery,
		CommunityQueryVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<CommunityQuery, CommunityQueryVariables>(
		CommunityDocument,
		options
	);
}
export type CommunityQueryHookResult = ReturnType<typeof useCommunityQuery>;
export type CommunityLazyQueryHookResult = ReturnType<
	typeof useCommunityLazyQuery
>;
export type CommunityQueryResult = Apollo.QueryResult<
	CommunityQuery,
	CommunityQueryVariables
>;
export const MeDocument = gql`
	query Me {
		me {
			...userInfo
		}
	}
	${UserInfoFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
	baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
	query Post($id: ID!) {
		post(id: $id) {
			community {
				id
				title
				description
			}
			...postWithUserInfo
		}
	}
	${PostWithUserInfoFragmentDoc}
`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(
	baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
}
export function usePostLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(
		PostDocument,
		options
	);
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostIdsDocument = gql`
	query PostIds($limit: Int!, $cursor: String) {
		posts(limit: $limit, cursor: $cursor) {
			paginatedPosts {
				id
			}
		}
	}
`;

/**
 * __usePostIdsQuery__
 *
 * To run a query within a React component, call `usePostIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostIdsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostIdsQuery(
	baseOptions: Apollo.QueryHookOptions<PostIdsQuery, PostIdsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<PostIdsQuery, PostIdsQueryVariables>(
		PostIdsDocument,
		options
	);
}
export function usePostIdsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<PostIdsQuery, PostIdsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<PostIdsQuery, PostIdsQueryVariables>(
		PostIdsDocument,
		options
	);
}
export type PostIdsQueryHookResult = ReturnType<typeof usePostIdsQuery>;
export type PostIdsLazyQueryHookResult = ReturnType<typeof usePostIdsLazyQuery>;
export type PostIdsQueryResult = Apollo.QueryResult<
	PostIdsQuery,
	PostIdsQueryVariables
>;
export const PostsDocument = gql`
	query Posts(
		$limit: Int!
		$cursor: String
		$communityId: ID
		$filters: Filters
	) {
		posts(
			limit: $limit
			cursor: $cursor
			communityId: $communityId
			filters: $filters
		) {
			totalCount
			cursor
			hasMore
			paginatedPosts {
				...postWithUserInfo
			}
		}
	}
	${PostWithUserInfoFragmentDoc}
`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      communityId: // value for 'communityId'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function usePostsQuery(
	baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<PostsQuery, PostsQueryVariables>(
		PostsDocument,
		options
	);
}
export function usePostsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(
		PostsDocument,
		options
	);
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<
	PostsQuery,
	PostsQueryVariables
>;
