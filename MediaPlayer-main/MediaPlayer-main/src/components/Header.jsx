import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Header() {
    const nav=useNavigate()

    const logout = () => {
        nav('/')
        sessionStorage.removeItem('userData')
    }
        
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                <i className="fa-brands fa-youtube fa-beat"  style={{color: "#e00b0b",}} />{' '}
                    Media Player
                </Navbar.Brand>
            </Container>
            <button className='btn btn-danger' onClick={logout}>Logout</button>
        </Navbar>
    )
}

export default Header