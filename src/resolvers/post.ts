import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Resolver, Query, Ctx } from "type-graphql";

@Resolver(Post)
export class PostResolver {
	@Query(() => [Post])
	posts(@Ctx() { em }: MyContext): Promise<Post[]> {
		return em.find(Post, {});
	}
}
