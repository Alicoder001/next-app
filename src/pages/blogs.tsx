import { Avatar, Box, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from 'src/Layout/Layout';
import SEO from 'src/Layout/seo/seo';
import { BlogService } from 'src/Services/blog.service';
import { calculateEstimatedTimeToRead } from 'src/helper/time.format';
import { BlogTypes } from 'src/interfaces/blogs.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';

const Blogs = ({ blogs }: BlogsProps) => {
	const router = useRouter();
	return (
		<SEO metaTitle={`Blogs`}>
			<Layout>
				<Box width={'100%'} textAlign={'center'} display={'flex'} justifyContent={'center'}>
					<Box textAlign={'start'} width={{ xs: '100%', md: '70%' }}>
						{blogs.map((item) => (
							<Box
								key={item.id}
								sx={{
									cursor: 'pointer',
									backgroundColor: 'rgba(0,0,0,.5)',
									padding: '20px',
									marginTop: '20px',
									borderRadius: '8px',
									boxShadow: '0 8px 16px rgba(255,255,255,.1)',
								}}
								onClick={() => {
									router.push(`/blog/${item.slug}`);
								}}>
								<Box position={'relative'} width={'100%'} height={'50vh'}>
									<Image
										src={item.image.url}
										alt={item.title}
										fill
										style={{
											objectFit: 'cover',
											borderRadius: '10px',
										}}
									/>
								</Box>
								<Typography marginTop={'30px'} variant='h4'>
									{item.title}
								</Typography>
								<Typography variant='body1' color={'gray'}>
									{item.excerpt}
								</Typography>
								<Divider sx={{ marginTop: '30px' }} />
								<Box display={'flex'} gap={'20px'} marginTop={'20px'}>
									<Avatar alt={item.title} src={item.author.avatar[0].url} />
									<Box>
										<Typography variant='body2'>{item.author.name}</Typography>
										<Box color={'gray'}>
											{format(new Date(item.createdAt), 'dd MMM, yyyy')} &#x2022;{' '}
											{calculateEstimatedTimeToRead(item.description.text)}
											min read
										</Box>
									</Box>
								</Box>
							</Box>
						))}
					</Box>
				</Box>
			</Layout>
		</SEO>
	);
};

export default Blogs;
export const getServerSideProps: GetServerSideProps<BlogsProps> = async () => {
	const blogs = await BlogService.getAllBlogs();
	return {
		props: {
			blogs,
		},
	};
};
export interface BlogsProps {
	blogs: BlogTypes[];
}
