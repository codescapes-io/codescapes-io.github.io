import React, { useState } from 'react'
import {
    HashRouter as Router,
    Routes,
    Route,
    NavLink
} from "react-router-dom";
import Docs from '../../view/Docs';
import HomePage from '../../view/CSHomePage/CSHomePage'
import CSBlogPage from '../../view/CSBlogPage/CSBlogPage';
import CSMenuIcons from '../../assets/icons/CSMenuIcons';
import CSCloseIcons from '../../assets/icons/CSCloseIcons';
import { Drawer, List, ListItem, ListItemIcon } from '@mui/material';
import { Box } from '@mui/system';
import CSArticle from '../../view/CSArticle';

const Navbar: React.FC = () => {
    const [bDrawerOpen, setDrawerOpen] = useState(false);

    const handleClick = () => { setDrawerOpen(true) }
    const handleClose = () => { setDrawerOpen(false) }

    return (
        <Router>
            <nav title='navbar'>
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
                    title='menu-icon'
                    sx={{ display: { md: 'none' }, m: '32px' }}
                    onClick={handleClick}>
                    <CSMenuIcons />
                </Box>
            </nav>
            <Drawer
                title='side-drawer'
                anchor='right'
                open={bDrawerOpen}
                onClose={handleClose}
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
                            <ListItemIcon sx={{ minWidth: 'fit-content' }} title='close-icon' onClick={handleClose}>
                                <CSCloseIcons />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem
                            button
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
                            <NavLink className='sidebar-anchor' onClick={handleClose} to="/">HOME</NavLink>
                        </ListItem>
                        <ListItem
                            button
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
                            <NavLink className='sidebar-anchor' onClick={handleClose} to="/docs">DOCS</NavLink>
                        </ListItem>
                        <ListItem
                            button
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
                            <NavLink className='sidebar-anchor' onClick={handleClose} to="/pricing">PRICING</NavLink>
                        </ListItem>
                        <ListItem
                            button
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
                            <NavLink className='sidebar-anchor' onClick={handleClose} to="/blog">BLOG</NavLink>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/docs' element={<Docs />} />
                <Route path='/blog' element={<CSBlogPage />} />
                <Route path='/blog/:id' element={<CSArticle />} />
            </Routes>
        </Router>

    )
}

export default Navbar
