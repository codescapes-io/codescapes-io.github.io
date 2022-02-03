import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
} from "react-router-dom";
import Docs from '../view/Docs';
import HomePage from '../view/CSHomePage'
import CSBlogPage from '../view/CSBlogPage';
import CSMenuIcons from '../assets/icons/CSMenuIcons';
import CSCloseIcons from '../assets/icons/CSCloseIcons';
import { Drawer, List, ListItem, ListItemIcon } from '@mui/material';
import { Box } from '@mui/system';

const Navbar: React.FC = () => {
    const [drawer, setDrawer] = useState(false);

    const handleClick = () => { setDrawer(true) }
    const handleClose = () => { setDrawer(false) }

    return (
        <Router>
            <nav >
                <div className='logo'>
                    <img src="/logo-bve-light.png" alt="logo-bve" />
                </div>
                <ul>
                    <li><NavLink to="/">HOME</NavLink></li>
                    <li><NavLink to="/docs">DOCS</NavLink></li>
                    <li><NavLink to="/pricing">PRICING</NavLink></li>
                    <li><NavLink to="/blog">BLOG</NavLink></li>
                </ul>
                <Box
                    sx={{ display: { md: 'none' }, m: '32px' }}
                    onClick={handleClick}>
                    <CSMenuIcons />
                </Box>
            </nav>
            <Drawer
                anchor='right'
                open={drawer}
                onClick={handleClose}
            >
                <Box sx={{ width: 200, height: '100%', backgroundColor: '#4B4B4B' }}>
                    <List>
                        <ListItem alignItems='center'
                            sx={{
                                marginBottom: '10px',
                                padding: '32px',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 'fit-content' }}>
                                <CSCloseIcons />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem
                            sx={{
                                padding: 0,
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: 'white',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <NavLink onClick={handleClose} to="/">HOME</NavLink>
                        </ListItem>
                        <ListItem
                            sx={{
                                padding: 0,
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: 'white',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <NavLink onClick={handleClose} to="/docs">DOCS</NavLink>
                        </ListItem>
                        <ListItem
                            sx={{
                                padding: 0,
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: 'white',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <NavLink onClick={handleClose} to="/pricing">PRICING</NavLink>
                        </ListItem>
                        <ListItem
                            sx={{
                                padding: 0,
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: 'white',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <NavLink onClick={handleClose} to="/blog">BLOG</NavLink>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/docs' element={<Docs />} />
                <Route path='/blog' element={<CSBlogPage />} />
            </Routes>
        </Router>
    )
}

export default Navbar
