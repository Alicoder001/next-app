import { Avatar, Box, Divider, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { Content } from 'next/font/google';
import Image from 'next/image';
import React from 'react';
import Layout from 'src/Layout/Layout';
import { BlogService } from 'src/Services/blog.service';
import { Sidebar } from 'src/components';
import { calculateEstimatedTimeToRead } from 'src/helper/time.format';
import { BlogTypes } from 'src/interfaces/blogs.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import SEO from 'src/Layout/seo/seo';
import Head from 'next/head';
const DetailedBlog = ({ blog, latestBlogs, categories }: DetailedBlogProps) => {
	const router = useRouter();
	return (
		<SEO metaTitle={`${router.query.slug}-blog`}>
			<Layout>
				<Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' }, padding: '20px' }}>
					<Box width={{ xs: '100%', md: '70%' }}>
						<Box
							sx={{ backgroundColor: 'black', padding: '20px', borderRadius: '8px', boxShadow: '0 8px 16px rgba(255,255,255,.1)' }}
							position={'relative'}
							width={'100%'}
							height={{ xs: '30vh', md: '50vh' }}>
							<Image
								src={blog.image.url}
								alt={blog.title}
								fill
								style={{
									objectFit: 'cover',
									borderRadius: '10px',
								}}
							/>
						</Box>
						<Box display={'flex'} flexDirection={'column'} rowGap={'10px'}>
							<Box
								sx={{
									display: 'flex',
									gap: '10px',
									marginTop: '20px',
								}}>
								<Avatar alt={blog.author.name} src={blog.author.avatar[0].url} />
								<Box>
									<Typography>{blog.author.name}</Typography>
									<Box color={'gray'}>
										{format(new Date(blog.createdAt), 'dd MMM yyyy')} &#x2022;{' '}
										{calculateEstimatedTimeToRead(blog.description.text)}
										min read
									</Box>
								</Box>
							</Box>
							<Typography variant='h3'>{blog.title}</Typography>
							<Typography color={'gray'}>{blog.excerpt}</Typography>
							<Divider />
							<div style={{ opacity: 0.8 }} dangerouslySetInnerHTML={{ __html: blog.description.html }} />
						</Box>
					</Box>
					<Sidebar latestBlogs={latestBlogs} categories={categories} />
				</Box>
			</Layout>
		</SEO>
	);
};

export default DetailedBlog;

export const getServerSideProps: GetServerSideProps<DetailedBlogProps> = async ({ query }) => {
	const blog = await BlogService.getDetailedBlog(query.slug as string);
	const latestBlogs = await BlogService.getLatestBlogs();
	const categories = await BlogService.GetCategories();
	return {
		props: {
			blog,
			latestBlogs,
			categories,
		},
	};
};
export interface DetailedBlogProps {
	blog: BlogTypes;
	latestBlogs: BlogTypes[];
	categories: CategoriesType[];
}
