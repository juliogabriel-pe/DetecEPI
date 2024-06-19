import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
// import AccountMenu from '../menuProfile';
// import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { Badge, Grid } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import logoImage from '../../image/logo.jpeg';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
    }),
);

export default function NavMenu({divOpen}) {
    const theme = useTheme();
    const location = useLocation();
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const [activeItem, setActiveItem] = useState('');
    const nomeUsuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    const { nome } = nomeUsuario;
    debugger

    useEffect(() => {

        const path = location.pathname;
        if (path === '/') {
            setActiveItem('Dashboard');
        }
        else if (path === '/facialRecognition') {
            setActiveItem('Reconhecimento Facial');
        }
        else {
            console.error('Não foi Possivel localizar esta rota')
        }
    }, [location]);

    // const dispatch = useDispatch()
    // var user = useSelector(state => state?.user);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            {
                // useSelector(state => state.usuarioLogado) > 0 ?
                <>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <AppBar position="fixed" open={open} style={{ background: "#012442"}}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{
                                        marginRight: 5,
                                        ...(open && { display: 'none' }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Grid container spacing={2}>
                                    <Grid item lx={8}>
                                    {/* user?.name */}
                                    <label style={{fontSize: "25px"}}>{nome}</label>
                                    </Grid>
                                    <Grid item xs={2}>
                                    </Grid>
                                    <Grid item xs={4}>
                                    </Grid>
                                </Grid>
                                <IconButton style={{color: '#FFF'}} aria-label="cart">
                                    <Badge badgeContent={0} color="primary">
                                        <NotificationsNoneOutlinedIcon color="#FFF" />
                                    </Badge>
                                </IconButton>
                                {/* <AccountMenu /> */}
                            </Toolbar>
                        </AppBar>
                        <Drawer variant="permanent" open={open}>
                            <DrawerHeader style={{ background: "#012442"}}>
                                <img src={"null"} alt="Logo" style={{height: 'auto'}} width={'160px'} />
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: "#fff"}} /> : <ChevronLeftIcon style={{ color: "#fff"}} />}
                                </IconButton>
                            </DrawerHeader>
                            <Divider />
                            <List>
                                <ListItem key={"Dashboard"}  disablePadding sx={{ display: 'block', textDecorationLine: "none" }}>
                                    <Link to={"/"} style={{textDecorationLine: "none", color: "#707070" }}>
                                        <ListItemButton 
                                            sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                            backgroundColor: activeItem === 'Dashboard' ? '#d3d3d3' : 'transparent'
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                            {0 % 2 === 0 ? <DashboardCustomizeOutlinedIcon /> : <MailIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={"Dashboard"} sx={{ opacity: open ? 1 : 0 }}  />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            </List>
                            <Divider />
                            {
                                // user.perfil === "Comercial" || user.perfil === "Admin" || user.perfil === "Master"  ?
                                    <ListItem key={"Reconhecimento Facial"} disablePadding sx={{ display: 'block' }}>
                                        <Link to={"/facialRecognition"} style={{textDecorationLine: "none", color: "#707070" }} underline="none">
                                            <ListItemButton
                                                sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                                backgroundColor: activeItem === 'Reconhecimento Facial' ? '#d3d3d3' : 'transparent'
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                {0 % 2 === 0 ? <PhotoCameraFrontIcon /> : <MailIcon />}
                                                </ListItemIcon>
                                                <ListItemText primary={"Reconhecimento Facial"} sx={{ opacity: open ? 1 : 0 }} />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                // :
                                // ""
                            }
                            {/* {
                                // user.perfil === "Comercial" || user.perfil === "Admin" || user.perfil === "Master"  ?
                                    <ListItem key={"Cliente"} disablePadding sx={{ display: 'block' }}>
                                        <Link to={"/clientList"} style={{textDecorationLine: "none", color: "#707070" }} underline="none">
                                            <ListItemButton
                                                sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                                backgroundColor: activeItem === 'Cliente' ? '#d3d3d3' : 'transparent'
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: open ? 3 : 'auto',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                {0 % 2 === 0 ? <FolderSharedOutlinedIcon /> : <MailIcon />}
                                                </ListItemIcon>
                                                <ListItemText primary={"Cliente"} sx={{ opacity: open ? 1 : 0 }} />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                // :
                                // ""
                            } */}
                            <ListItem key={"logout"} disablePadding sx={{ display: 'block' }}>
                                <Link to={"/"} style={{textDecorationLine: "none", color: "#707070" }} underline="none">
                                    <ListItemButton
                                        sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                        {0 % 2 === 0 ? <LogoutOutlinedIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={"Sair"} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </Drawer>
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                            <DrawerHeader />
                                {divOpen}
                            </Box>
                        </Box>
                </>
                // :
                // <Navigate to='/login' />
            }
        </>
    );
}