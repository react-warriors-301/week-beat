import React from 'react'
import Login from './Login';
import LogoutButton from './Logout';
import Profile from './Profile';
import { withAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Blog from './Blog';
import Fav from './Fav';
import Events from './Events';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Movies from './Movies';
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Main from './Main';
import Restaurants from './Restaurants';
import Activity from './Activity';
class Header extends React.Component {

    render() {





        const { isAuthenticated, user } = this.props.auth0;
        return (
            <>

                <Router>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand>
                          <Link to='/Main'>
                          <Image src={'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'} />
                          </Link>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Link to='/Movies'>Movies</Link>
                                    <Link to='/Restaurants'>Restaurants</Link>
                                    <Link to='/Events'>Events</Link>
                                    <Link to='/Activities'>Activities</Link>
                                    <Link to='/Main'>Home</Link>

                                  
                                </Nav>
                                <Nav>
                                    <Nav.Link>



                                        {/* {isAuthenticated ? <LogoutButton /> : <Login />}
                                        <Profile />     */}
                                        {isAuthenticated ?
                                            <Dropdown as={ButtonGroup}>
                                                <Button variant="success">
                                                <Link to='/Profile'>
                                                <img src={user.picture} alt={user.name} />

                                                </Link>
                                                </Button>

                                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />


                                                <Dropdown.Menu>

                                                    <Dropdown.Item><LogoutButton /> </Dropdown.Item>

                                                    <Dropdown.Item><Link to='/Favorites'>My Favorites</Link></Dropdown.Item>
                                                   
                                                    <Dropdown.Item><Link to='/Blog'>My Blogs</Link></Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            : <Login />}
                                    </Nav.Link>

                                </Nav>
                            </Navbar.Collapse>
                        </Container>

                    </Navbar>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/Restaurants">
                            <Restaurants />
                        </Route>
                        <Route path="/Activities">
                            <Activity />
                        </Route>  
                        <Route path="/Movies">
                            <Movies />
                        </Route>
                        <Route path="/Events">
                            <Events />
                        </Route>
                        <Route path="/Profile">
                        <Profile/>
                        </Route>
                        <Route path="/Favorites">
                            <Fav />
                        </Route>
                        <Route path="/Blog">
                        <Blog />
                        </Route>
                        <Route path="/Main">
                        <Main />
                        </Route>
                    </Switch>
                </Router>



                <h1>hello from header!</h1>

            </>
        )
    }
}

export default withAuth0(Header);
