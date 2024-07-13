import React from 'react';
import { Logo, Container, LogoutBtn } from '../index.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Header() {
    const authState = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authState
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authState
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authState
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authState
        }
    ]

    return ( 
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>

                    <ul className='flex ml-auto'>
                        {
                            navItems.map( (item) => (
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={navigate(item.slug)}
                                            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                        >{item.name}</button>
                                    </li>
                                ) : null 
                            ))
                        }
                        {
                            // if authState is true then () will execute
                            authState && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </Container>
        </header>
     );
}

export default Header;