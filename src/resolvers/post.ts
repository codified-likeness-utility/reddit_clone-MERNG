import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";

@Resolver(Post)
export class PostResolver {
	// Show all Posts
	@Query(() => [Post])
	posts(@Ctx() { em }: MyContext): Promise<Post[]> {
		return em.find(Post, {});
	}

	// Find one post
	@Query(() => Post, { nullable: true })
	post(
		@Arg("id") _id: number,
		@Ctx() { em }: MyContext
	): Promise<Post | null> {
		return em.findOne(Post, { _id });
	}

	// Create new Post
	@Mutation(() => Post)
	async createPost(
		@Arg("title") title: string,
		@Ctx() { em }: MyContext
	): Promise<Post> {
		const post = em.create(Post, { title });
		await em.persistAndFlush(post);
		return post;
	}

	// Update a Post
	@Mutation(() => Post, { nullable: true })
	async updatePost(
		@Arg("id") _id: number,
		@Arg("title", () => String, { nullable: true }) title: string,
		@Ctx() { em }: MyContext
	): Promise<Post | null> {
		const post = await em.findOne(Post, { _id });
		if (!post) {
			return null;
		}
		if (typeof title !== "undefined") {
			post.title = title;
			await em.persistAndFlush(post);
		}
		return post;
	}

	// Delete a Post
	@Mutation(() => Boolean)
	// Delete an existing Post
	async deletePost(
		@Arg("id") _id: number,
		@Ctx() { em }: MyContext
	): Promise<boolean> {
		await em.nativeDelete(Post, { _id });
		return true;
	}
}
