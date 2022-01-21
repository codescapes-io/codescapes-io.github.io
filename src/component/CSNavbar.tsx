import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Docs from '../view/Docs';
import HomePage from '../view/CSHomePage'

const Navbar: React.FC = () => {
    return (
        <Router>
            <nav>
                <div className='logo'>
                    <img src="/logo-bve-light.png" alt="logo-bve" />
                </div>
                <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/docs">DOCS</Link></li>
                    <li><Link to="/pricing">PRICING</Link></li>
                    <li><Link to="/blog">BLOG</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/docs' element={<Docs />} />
            </Routes>
        </Router>
    )
}

export default Navbar
