import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import React from 'react';
import Layout from 'src/Layout/Layout';
import SEO from 'src/Layout/seo/seo';
import { BlogService } from 'src/Services/blog.service';
import { Content, Sidebar } from 'src/components';
import { BlogTypes } from 'src/interfaces/blogs.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';

const CategoryDetailPage = ({ categoryBlogs, categories, latestBlogs }: CategoryProps) => {
	console.log(categoryBlogs);
	const router = useRouter();
	return (
		<SEO metaTitle={`${router.query.slug}-categories`}>
			<Layout>
				<Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' }, padding: '20px' }}>
					<Sidebar latestBlogs={latestBlogs} categories={categories} />
					<Content blogs={categoryBlogs} />
				</Box>
			</Layout>
		</SEO>
	);
};

export default CategoryDetailPage;

export const getServerSideProps: GetServerSideProps<CategoryProps> = async ({ query }) => {
	const categoryBlogs = await BlogService.getDetailCategory(query.slug as string);
	const latestBlogs = await BlogService.getLatestBlogs();
	const categories = await BlogService.GetCategories();
	return {
		props: {
			categoryBlogs,
			categories,
			latestBlogs,
		},
	};
};
export interface CategoryProps {
	categoryBlogs: BlogTypes[];
	categories: CategoriesType[];
	latestBlogs: BlogTypes[];
}
