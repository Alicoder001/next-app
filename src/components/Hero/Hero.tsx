import 'react-multi-carousel/lib/styles.css';
import { Avatar, Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Carousel from 'react-multi-carousel';

import { format } from 'date-fns';
import { HeroProps } from './Hero.props';
import { calculateEstimatedTimeToRead } from 'src/helper/time.format';
const Hero = ({ blogs }: HeroProps) => {
	return (
		<Box width={'100%'} height={'70vh'}>
			<Carousel
				responsive={{
					mobile: {
						breakpoint: { max: 4000, min: 0 },
						items: 1,
					},
				}}>
				{blogs.map((item) => {
					return (
						<Box
							sx={{
								position: 'relative',
							}}
							width={'100%'}
							height={'70vh'}
							key={item.slug}>
							<Image style={{ objectFit: 'cover' }} fill src={item.image.url} alt={item.title} />
							<Box
								sx={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									width: '100%',
									height: '100%',
									backgroundColor: 'rgba(0, 0, 0, 0.7)',
								}}
							/>
							<Box
								width={{
									xs: '100%',
									sm: '70%',
								}}
								position={'relative'}
								color={'white'}
								sx={{
									top: '50%',
									transform: 'translateY(-50%)',
									paddingLeft: { xs: '10px', sm: '50px' },
								}}
								zIndex={999}>
								<Typography variant='h2'>{item.title}</Typography>
								<Typography variant='h5'>{item.excerpt}</Typography>
								<Box
									sx={{
										display: 'flex',
										gap: '10px',
										marginTop: '20px',
									}}>
									<Avatar alt={item.author.name} src={item.author.avatar[0].url} />
									<Box>
										<Typography>{item.author.name}</Typography>
										<Box>
											{format(new Date(), 'dd MMM yyyy')} &#x2022; {calculateEstimatedTimeToRead(item.description.text)}min read
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
					);
				})}
			</Carousel>
		</Box>
	);
};

export default Hero;

const data = [
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
