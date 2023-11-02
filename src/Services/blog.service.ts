import { graphql } from 'graphql';
import { request, gql } from 'graphql-request';
import { BlogTypes } from 'src/interfaces/blogs.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';
const graphAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;
export const BlogService = {
	async getAllBlogs() {
		const query = gql`
			query GetDetailBlog {
				blogs {
					slug
					title
					id
					excerpt
					image {
						url
					}
					author {
						name
						avatar {
							url
						}
					}
					category {
						slug
						label
					}
					description {
						text
					}
					createdAt
				}
			}
		`;
		const result = await request<{ blogs: BlogTypes[] }>(graphAPI, query);
		return result.blogs;
	},
	async getLatestBlogs() {
		const query = gql`
			query GetLatestBlog {
				blogs(last: 3) {
					slug
					title
					id
					image {
						url
					}
					author {
						name
						avatar {
							url
						}
					}
					createdAt
				}
			}
		`;
		const result = await request<{ blogs: BlogTypes[] }>(graphAPI, query);
		return result.blogs;
	},
	async GetCategories() {
		const query = gql`
			query Categories {
				categories {
					label
					slug
				}
			}
		`;
		const result = await request<{ categories: CategoriesType[] }>(graphAPI, query);
		return result.categories;
	},
};
