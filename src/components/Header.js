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
import header from '../images/header.gif';
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
import Home from './Home';
import '../CSS/header.css'
class Header extends React.Component {

    render() {





        const { isAuthenticated, user } = this.props.auth0;
        return (
            <>  
                 <div>


                    <Navbar collapseOnSelect expand="lg" className='nav' >
                        <Container>

                            <Navbar.Brand>
                                <Link to='/Main'>
                                <Image src="https://i.ibb.co/txN2Qx5/cbimage.png" alt="cbimage" border="0"/>
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto navbar">
                                <Link to='/Home' style={{'text-decoration': 'none','color':'white' ,'padding':'10px','font-size': 'large'}}><b>Home</b></Link> 

                                <Link to='/Movies' style={{'text-decoration': 'none','color':'white' ,'padding':'10px','font-size': 'large'}}><b>Movies</b> </Link>
                                    <Link to='/Restaurants' style={{'text-decoration': 'none','color':'white' ,'padding':'10px','font-size': 'large'}}><b>Restaurants</b></Link>
                                    <Link to='/Events' style={{'text-decoration': 'none','color':'white' ,'padding':'10px','font-size': 'large'}}><b>Events</b></Link>
                                    <Link to='/Activities' style={{'text-decoration': 'none','color':'white' ,'padding':'10px','font-size': 'large'}}><b>Activities</b></Link>
                                    
                                    
                                     </Nav>
                                <Nav>
                                    <Nav.Link>



                                        {/* {isAuthenticated ? <LogoutButton /> : <Login />}
                                        <Profile />     */}
                                        {isAuthenticated ?
                                            <Dropdown  className='khair' as={ButtonGroup}>
                                                <Button  className='khair'>
                                                    <Link to='/Profile'>
                                                        <img src={user.picture} alt={user.name} className='proPic' />

                                                    </Link>
                                                </Button>

                                                <Dropdown.Toggle split className='khair'/>


                                                <Dropdown.Menu>

                                                    <Dropdown.Item><LogoutButton /> </Dropdown.Item>

                                                    <Dropdown.Item><Link to='/Favorites' style={{'text-decoration': 'none','color':'red' ,'padding':'10px','font-size': 'large'}}>My Favorites</Link></Dropdown.Item>

                                                    <Dropdown.Item><Link to='/Blog' style={{'text-decoration': 'none','color':'red' ,'padding':'10px','font-size': 'large'}}>My Blogs</Link></Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            : <Login />}
                                    </Nav.Link>

                                </Nav>
                            </Navbar.Collapse>
                        </Container>

                    </Navbar>

     

   

                         
</div>
               
            </>
        )
    }
}

export default withAuth0(Header);
