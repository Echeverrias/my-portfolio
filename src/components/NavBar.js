import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import {SocialIcon} from 'react-social-icons';

function NavBar(){
    return (
            <div className='navBar'>
                <header className="bg-red-600">
                    <div className="container mx-auto flex justify-between">
                        <nav className="flex">
                            <NavLink 
                                to="/" 
                                activeClassName='text-white'
                                className="inflex-flex items-center py-6 px-3 mr-4 text-red-100 hover:text-green-800 text-4xl font-bold cursive tracking-widest"
                            >
                                Home
                            </NavLink>
                            <NavLink to="/project" 
                                className="inflex-flex items-center py-3 px-3 my-6 rounded text-red-200 hover:text-green-800"
                                activeClassName="text-red-100 bg-red-700"
                            >
                                Projects
                            </NavLink>
                            <NavLink to="/about" 
                                className="inflex-flex items-center py-3 px-3 my-6 rounded text-red-200 hover:text-green-800"
                                activeClassName="text-red-100 bg-red-700"
                            >
                                About Me!
                            </NavLink>
                        </nav>
                        <div className='navBar__socials inline-flex py-3 px-3 my-4'>
                            <SocialIcon 
                                url='http://linkedin.com/name'
                                className='mr-4'
                                target='_blank'
                                fgColor='#fff'
                                style={{height: 45, width: 45}}
                            />
                            <SocialIcon 
                                url='http://github.com/name'
                                className='mr-4'
                                target='_blank'
                                fgColor='#fff'
                                style={{height: 45, width: 45}}
                            />
                        </div>
                    </div>
                </header>
            </div>
        )
    
}

export default NavBar;