import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { navItems } from 'src/config/constants';
import { useRouter } from 'next/router';
interface Props {
	window?: () => Window;
}

const drawerWidth = 240;
const Navbar = (props: Props) => {
	const router = useRouter();
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};
	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant='h6' sx={{ my: 2 }}>
				MUI
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem
						onClick={() => {
							router.push(`/${item.route}`);
						}}
						key={item.route}
						disablePadding>
						<ListItemButton sx={{ textAlign: 'center' }}>
							<ListItemText primary={item.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;
	return (
		<Box height={'10vh'} sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar sx={{ height: '10vh', backgroundColor: '#141414' }} component='nav'>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}>
						<MenuIcon />
					</IconButton>
					<Typography
						onClick={() => {
							router.push('/');
						}}
						variant='h6'
						component='div'
						sx={{ flexGrow: 1, cursor: 'pointer', display: { xs: 'none', sm: 'block' } }}>
						MUI
					</Typography>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems?.map((item) => (
							<Button
								onClick={(e) => {
									e.preventDefault();
									router.push(`/${item.route}`);
								}}
								key={item?.route}
								sx={{ color: '#fff' }}>
								{item?.label}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						'display': { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}>
					{drawer}
				</Drawer>
			</nav>
		</Box>
	);
};

export default Navbar;
