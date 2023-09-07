import React from 'react';
import { Navbar, Nav, Button, Form, FormControl, Dropdown } from 'react-bootstrap';
import { FaStar, FaSearch, FaMoon } from 'react-icons/fa';
import logo from '../images/logo.gif';

function Header() {
    return (
        <Navbar 
            bg="white" 
            sticky="top"
            expand="lg" 
            style={{ 
                borderBottom: '1px solid #e0e0e0',
                paddingBottom: '10px',
                paddingLeft: '20px',
                paddingRight: '20px',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'flex-end', flexGrow: 1 }}>
                <Navbar.Brand href="#home">
                    <img src={logo} alt="Logo" height="35" className="mr-3" /> 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#cryptocurrencies" className="text-dark">Cryptocurrencies</Nav.Link>
                        <Nav.Link href="#exchanges" className="text-dark">Exchanges</Nav.Link>
                        <Nav.Link href="#community" className="text-dark">Community</Nav.Link>
                        <Nav.Link href="#products" className="text-dark">Products</Nav.Link>
                        <Nav.Link href="#learn" className="text-dark">Learn</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                <div className="d-flex align-items-center mb-2"> 
                    <FaMoon style={{ marginRight: '25px' }} /><Dropdown className="mr-2">
                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" style={{fontSize: '0.70rem', padding: '0.3rem 0.5rem'}}>
                            English
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>English</Dropdown.Item>
                            <Dropdown.Item>Spanish</Dropdown.Item>
                            <Dropdown.Item>French</Dropdown.Item>
                            <Dropdown.Item>German</Dropdown.Item>
                            <Dropdown.Item>Chinese</Dropdown.Item>
                            <Dropdown.Item>Japanese</Dropdown.Item>
                            <Dropdown.Item>Italian</Dropdown.Item>
                            {/* Add more language options here */}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="primary" className="mr-2" style={{fontSize: '0.70rem', padding: '0.3rem 0.5rem'}}>
                        Sign Up
                    </Button>
                    <Button variant="outline-primary" className="mr-2" style={{fontSize: '0.70rem', padding: '0.3rem 0.5rem'}}>
                        Sign In
                    </Button>
                </div>
                <div className="d-flex align-items-center">
                    {/* Favorites & Portfolio buttons */}
                    <Button variant="outline-dark" className="mr-2" style={{fontSize: '0.70rem'}}>
                        <FaStar />
                    </Button>
                    <Button variant="outline-dark" className="mr-2" style={{fontSize: '0.70rem'}}>
                        Portfolio
                    </Button>
                    
                    {/* SearchBox */}
                    <Form inline className="mr-2">
                        <Form.Group className="d-flex">
                            <FormControl 
                                type="text" 
                                placeholder="Search"
                                className="mr-2"
                                style={{borderRadius: '25px 0 0 25px', fontSize: '0.70rem'}}
                            />
                            <Button 
                                variant="outline-secondary"
                                style={{borderRadius: '0 25px 25px 0', fontSize: '0.70rem'}}
                            >
                                <FaSearch />
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </Navbar>
    );
}

export default Header;
