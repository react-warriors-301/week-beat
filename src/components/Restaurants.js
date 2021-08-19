import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Carousel from 'react-grid-carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { withAuth0 } from '@auth0/auth0-react';
import "../CSS/restaurants.css";
import TopFive from './TopFive';
import Form from 'react-bootstrap/Form';
import Header from './Header';
import AddedModal from './AddedModal';
class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // server : process.env.REACT_APP_SERVER_URL,
            restaurantsArray: [],
            show: false,
            loaded:false,
        showAdd:false        }
    }
    getRestaurants = (event) => {
        event.preventDefault();
        let searchQuery = event.target.location.value;
        // const URL = `${this.state.server}/restaurants?location=${searchQuery}` 
        // http://localhost:3001/restaurants?location=Houston
        //const URL = `http://localhost:3001/restaurants?location=${searchQuery}`
        const URL=`https://week-beat.herokuapp.com/restaurants?location=${searchQuery}`
        axios
            .get(URL)
            .then(results => {
                this.setState({
                    restaurantsArray: results.data,
                    show: true, 
                    loaded:true
                })
                console.log(results.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    addRes = (event) => {
        event.preventDefault();
        const favUrl = `https://week-beat.herokuapp.com/Favorites`;
        console.log(event.target.id);
        const name = event.target.name.alt;
        const image = event.target.name.src;
        const rating = 3;
        const price = 4;
        const body = {
            email: this.props.auth0.user.email,
            name: name,
            image: image,
            rating: rating,
            price: price,
        }
        console.log(body);
        axios
            .post(favUrl, body)
            .then(result => {
                console.log(result.data);
                
                this.setState({

                restaurantsArray: result.data,
                showAdd:true,
                })
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    }
    // topRates = (restaurantsArray) => {
    //     let answer = restaurantsArray.rating.map(result => {
    //         answer.push(result);
    //     })
    //     console.log(answer);
    //     return answer;
    // }
    // topRates;
    handleClose = () => {
        this.setState({
            showAdd: false
        })
    }
  
    render() {
        { if(this.state.loaded===false){
             <center>

            <img src="https://i.ibb.co/chSLz3B/foodrush-loader-unscreen.gif" alt="loadergif" border="0" style={{ width: '300px' }} />
        </center>}
        }
        const { user, isAuthenticated, isLoading } = this.props.auth0;

        if (isLoading) {
            return <div>
                <center>

                    <img src="https://i.ibb.co/chSLz3B/foodrush-loader-unscreen.gif" alt="loadergif" border="0" style={{ width: '300px' }} />
                </center>
            </div>;
        }
        return (
            <>
                <Header />
                <div className="pagebackground">
                    <div>
                        <section className="sextion1">
                            <Form className="form" onSubmit={(event) => this.getRestaurants(event)}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Enter your location</Form.Label>
                                    <Form.Control type="text" placeholder='Your location' name="location" />
                                </Form.Group>
                                <Button className="button" variant="warning" type="submit" value="Get Restaurants !">
                                    Get Restaurants !
                                </Button>
                            </Form>
                        </section>
                        <section className="sextion2">
                            <img src="https://hmp.me/do1l" alt="resturants" />
                        </section>
                    </div>
                    {<br />}
                    {<br />}
                    {<br />}
                    <div>
                      
                        {this.state.show &&


                            <TopFive
                                restaurantsArray={this.state.restaurantsArray} />
                        }

                        {this.state.show &&
                            <center>

                                <Card style={{ width: "80rem", 'margin-top': '20px' }} >
                                    <Carousel cols={3} rows={1} gap={80} loop >
                                        {
                                            this.state.restaurantsArray.map((item, idx) => {
                                                console.log(item);
                                                return (
                                                    <Carousel.Item>
                                                        <form onSubmit={(event) => this.addRes(event)}>
                                                            <img
                                                                name="name"
                                                                className="d-block w-100"
                                                                width="100em"
                                                                src={item.image} alt={item.name} style={{ height: '500px', 'margin-top': '20px' }} name="name" />
                                                            <Card.Header classname="smallcards">
                                                                <h5>{item.name}</h5>
                                                                <p>{item.price}</p>
                                                                <Button variant="danger" type="submit" >🤍</Button>
                                                                {/* <FavoriteBtn/> */}
                                                            </Card.Header>
                                                        </form>
                                                    </Carousel.Item>
                                                )
                                            })}
                                    </Carousel>
                                </Card>
                            </center>}
                    </div>
                </div>
                <AddedModal
                        show={this.state.showAdd}
                        hide={this.handleClose}
                    />
            </>
        )
    }
}
export default withAuth0(Restaurants);