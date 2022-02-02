import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
} from "react-router-dom";
import Docs from '../view/Docs';
import HomePage from '../view/CSHomePage'
import CSBlogPage from '../view/CSBlogPage';
// import CSArticle from '../view/CSArticle';
import CSMenuIcons from '../assets/icons/CSMenuIcons';
import CSCloseIcons from '../assets/icons/CSCloseIcons';

const Navbar: React.FC = () => {

    const handleClick = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar?.classList.remove('translate-x-full');
    }

    const handleClose = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar?.classList.add('translate-x-full');
    }

    return (
        <Router>
            <nav className='justify-end md:justify-center'>
                <div className='logo block'>
                    <img src="/logo-bve-light.png" alt="logo-bve" />
                </div>
                <ul className='hidden md:flex'>
                    <li><NavLink to="/">HOME</NavLink></li>
                    <li><NavLink to="/docs">DOCS</NavLink></li>
                    <li><NavLink to="/pricing">PRICING</NavLink></li>
                    <li><NavLink to="/blog">BLOG</NavLink></li>
                </ul>
                <div className='block m-8 md:hidden' onClick={handleClick}>
                    <CSMenuIcons />
                </div>
            </nav>
            <div
                className="flex flex-col items-center w-1/2 z-10 translate-x-full fixed right-0 top-0 transition-transform sidebar">
                <div className='m-8 self-end' onClick={handleClose}>
                    <CSCloseIcons />
                </div>
                <NavLink onClick={handleClose} to="/" className='text-base text-white mb-3'>HOME</NavLink>
                <NavLink onClick={handleClose} to="/docs" className='text-base text-white mb-3'>DOCS</NavLink>
                <NavLink onClick={handleClose} to="/pricing" className='text-base text-white mb-3'>PRICING</NavLink>
                <NavLink onClick={handleClose} to="/blog" className='text-base text-white mb-3'>BLOG</NavLink>
            </div>
            <div className="hidden w-full shadow"></div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/docs' element={<Docs />} />
                <Route path='/blog' element={<CSBlogPage />} />
                {/* <Route path='/blog/:id' element={<CSArticle />} /> */}
            </Routes>
        </Router>
    )
}

export default Navbar
