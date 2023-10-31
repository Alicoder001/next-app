import { Box, Button } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import Layout from 'src/Layout/Layout';
import { BlogService } from 'src/Services/blog.service';
import { Content, Sidebar } from 'src/components';
import Hero from 'src/components/Hero/Hero';
import { BlogTypes } from 'src/interfaces/blogs.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';

const IndexPage = ({ blogs, latestBlogs, categories }: HomePageProps) => {
	console.log(blogs);
	console.log(categories);
	return (
		<Layout>
			<Hero blogs={blogs.slice(0, 3)} />
			<Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' }, padding: '20px' }}>
				<Sidebar latestBlogs={latestBlogs} categories={categories} />
				<Content blogs={blogs} />
			</Box>
		</Layout>
	);
};

export default IndexPage;
export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
	const blogs = await BlogService.getAllBlogs();
	const latestBlogs = await BlogService.getLatestBlogs();
	const categories = await BlogService.GetCategories();
	return {
		props: {
			blogs,
			latestBlogs,
			categories,
		},
	};
};
interface HomePageProps {
	blogs: BlogTypes[];
	latestBlogs: BlogTypes[];
	categories: CategoriesType[];
}
