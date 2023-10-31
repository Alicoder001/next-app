import { Avatar, Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { data } from '../Sidebar/Sidebar';
import Image from 'next/image';
import { format } from 'date-fns';
import { ContentProps } from './content.props';

const Content = ({ blogs }: ContentProps) => {
	return (
		<Box width={{ xs: '100%', md: '70%' }}>
			{blogs.map((item) => (
				<Box
					key={item.id}
					sx={{
						backgroundColor: 'rgba(0,0,0,.5)',
						padding: '20px',
						marginTop: '20px',
						borderRadius: '8px',
						boxShadow: '0 8px 16px rgba(255,255,255,.1)',
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
							<Box color={'gray'}>{format(new Date(item.createdAt), 'dd MMM, yyyy')} &#x2022; 10min read</Box>
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default Content;
