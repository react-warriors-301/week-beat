import React, { Component } from 'react'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Carousel from 'react-grid-carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { withAuth0 } from '@auth0/auth0-react';
// import { FormLabel } from 'react-bootstrap';

// import FavoriteBtn from './FavoriteBtn';
import TopFive from './TopFive';



class Restaurants extends Component {


    constructor(props) {
        super(props);
        this.state = {

            // server : process.env.REACT_APP_SERVER_URL,

            restaurantsArray: [],
            show: false
            
        }

    }



    getRestaurants = (event) => {
        event.preventDefault();


        let searchQuery = event.target.location.value;



        // const URL = `${this.state.server}/restaurants?location=${searchQuery}` 
        // http://localhost:3001/restaurants?location=Houston
        const URL = `http://localhost:3001/restaurants?location=${searchQuery}`



        axios
            .get(URL)
            .then(results => {
                this.setState({
                    restaurantsArray: results.data,
                    show: true

                })
                console.log(results.data);

            })
            .catch(err => {
                console.log(err);
            })


    }




    addRes = (event) => {
        event.preventDefault();

        
        const favUrl = `http://localhost:3001/Favorites`;
        console.log(event.target.id);
        const name = event.target.name.alt;
        const image =  event.target.name.src;
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
                // this.setState({
                //     restaurantsArray: result.data
                // })
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



    render() {
        return (
            <>
                <form onSubmit={(event) => this.getRestaurants(event)}>
                    <label>Enter your location</label>
                    <input type="text" name="location" placeholder='Your location' />
                    <input type="submit" value="Get Restaurants !" />
                </form>

                <TopFive
           restaurantsArray={this.state.restaurantsArray} />
 {<br/>}
                {<br/>}
                {<br/>}
                {<br/>}
                

                <div>
                    {this.state.show &&
                        <Card>
                            <Carousel cols={3} rows={1} gap={10} loop >
                                {
                                    this.state.restaurantsArray.map((item, idx) => {
                                        console.log(item);

                                        return (

                                            <Carousel.Item>

                                                <form onSubmit={(event) => this.addRes(event)}>
                                                
                                                <img width="100%"
                                                    src={item.image} alt={item.name} style={{ height: '500px' }} name="name"/>
                                                <Card.Header>
                                                    <h3>{item.name}</h3>
                                                    <p>{item.price}</p>

                                                    <Button variant="danger" id={this} type="submit" >Add fav</Button>
                                                    {/* <FavoriteBtn/> */}
                                                </Card.Header>

                                                </form>


                                            </Carousel.Item>

                                        )
                                    })}
                            </Carousel>
                        </Card>}
                </div>




            </>

        )
    }



}



export default withAuth0(Restaurants);