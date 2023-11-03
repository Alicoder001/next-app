import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import React, { Fragment } from 'react';
import { navItems } from 'src/config/constants';
import { format } from 'date-fns';
import { SidebarProps } from './Sidebar.props';
import { useRouter } from 'next/router';
const Sidebar = ({ latestBlogs, categories }: SidebarProps) => {
	const router = useRouter();
	return (
		<Box width={{ xs: '100%', md: '30%' }}>
			<Box sx={{ position: 'sticky', top: '100px', transition: 'all .3s ease' }}>
				<Box padding={'20px'} border={'1px solid gray'} borderRadius={'8px'} marginTop={'20px'}>
					<Typography variant='h5'>Latest Blog</Typography>
					<Box>
						<Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
							{latestBlogs &&
								latestBlogs.map((item) => (
									<Box
										sx={{ cursor: 'pointer' }}
										onClick={() => {
											router.push(`/blog/${item.slug}`);
										}}
										key={item.title}
										marginTop={'20px'}>
										<Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
											<Image
												src={item.image.url}
												alt={item.title}
												width={100}
												height={100}
												style={{ objectFit: 'cover', borderRadius: '8px' }}
											/>
											<Box display={'flex'} flexDirection={'column'} gap={'10px '}>
												<Typography variant='body1'>{item.title}</Typography>
												<Box display={'flex'} gap={'20px'}>
													<Avatar alt={item.title} src={item.author.avatar[0].url} />
													<Box>
														<Typography variant='body2'>{item.author.name}</Typography>
														<Box>{format(new Date(item.createdAt), 'dd MMM, yyyy')}</Box>
													</Box>
												</Box>
											</Box>
										</Box>
										<Divider sx={{ marginTop: '20px' }} />
									</Box>
								))}
						</Box>
					</Box>
				</Box>
				<Box padding={'20px'} border={'1px solid gray'} borderRadius={'8px'} marginTop={'20px'}>
					<Typography variant='h5'>Category</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
						{categories.map((nav) => (
							<Fragment key={nav.slug}>
								<Button
									onClick={(e) => {
										e.preventDefault();
										router.push(`/category/${nav.slug}`);
									}}
									fullWidth
									sx={{ justifyContent: 'flex-start', height: '50%' }}>
									{nav.label}
								</Button>
								<Divider />
							</Fragment>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Sidebar;
export const data = [
	{
		image: 'https://media.graphassets.com/MxJZhmooRRuudoErkQ38',
		title: 'Technical SEO with Hygraph',
		exerpt: 'Get started with your SEO implementation when using a Headless CMS',
		author: {
			name: 'Samar Badriddinov',
			image: 'https://media.graphassets.com/DkfNqQNGRz2F4UFntKQx',
		},
	},
	{
		image: 'https://media.graphassets.com/bh3K2NNtTHCN260Xfq9h',
		title: 'Union Types and Sortable Relations with Hygraph',
		exerpt: 'Learn more about Polymorphic Relations and Sortable Relations with Hygraph',
		author: {
			name: 'Samar Badriddinov',
			image: 'https://media.graphassets.com/DkfNqQNGRz2F4UFntKQx',
		},
	},
];
