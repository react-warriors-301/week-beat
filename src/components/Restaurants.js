import React, { Component } from 'react'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Carousel from 'react-grid-carousel';
import Card from 'react-bootstrap/Card';

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


    topRates = (restaurantsArray) => {
        let answer = restaurantsArray.rating.map(result => {
            answer.push(result);
        })
        console.log(answer);

        return answer;
    }

    topRates;



    render() {
        return (
            <>
                <form onSubmit={(event) => this.getRestaurants(event)}>
                    <label>Enter your location</label>
                    <input type="text" name="location" placeholder='Your location' />
                    <input type="submit" value="Get Restaurants !" />
                </form>

                {/* 
                <div>
                    <Carousel>
                        {this.state.restaurantsArray.map(item => {
                            return (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={item.image}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                                                            <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>


                            )
                        })}
                    </Carousel>

                </div> */}


                <div>
                    {this.state.show &&
                        <Card>
                            <Carousel cols={3} rows={1} gap={10} loop >
                                {
                                    this.state.restaurantsArray.map((item, idx) => {
                                        console.log(item);

                                        return (

                                            <Carousel.Item>
                                                <img width="100%"
                                                    src={item.image} alt={item.name} style={{ height: '500px' }} />
                                                <Card.Header>
                                                    <h3>{item.name}</h3>
                                                    <p>{item.price}</p>
                                                </Card.Header>
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



export default Restaurants;