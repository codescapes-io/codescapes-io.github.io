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

const Navbar: React.FC = () => {
    return (
        <Router>
            <nav>
                <div className='logo'>
                    <img src="/logo-bve-light.png" alt="logo-bve" />
                </div>
                <ul>
                    <li><NavLink to="/">HOME</NavLink></li>
                    <li><NavLink to="/docs">DOCS</NavLink></li>
                    <li><NavLink to="/pricing">PRICING</NavLink></li>
                    <li><NavLink to="/blog">BLOG</NavLink></li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/docs' element={<Docs />} />
                <Route path='/blog' element={<CSBlogPage />} />
            </Routes>
        </Router>
    )
}

export default Navbar
